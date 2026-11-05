"""Snapshot of autogrande.no/biler into src/content/cars.json. Run when stock changes."""

import json
import re
import urllib.request
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

LISTING = "https://autogrande.no/biler"
OUT = Path(__file__).resolve().parents[1] / "src" / "content" / "cars.json"


def fetch(url: str) -> str:
    req = urllib.request.Request(url, headers={"User-Agent": "AutoGrandeWeb/1.0"})
    with urllib.request.urlopen(req, timeout=40) as res:
        return res.read().decode("utf-8", "replace")


def text_of(html: str) -> str:
    html = re.sub(r"<br\s*/?>", "\n", html, flags=re.I)
    html = re.sub(r"</p>", "\n\n", html, flags=re.I)
    html = re.sub(r"<[^>]+>", "", html)
    html = html.replace("&nbsp;", " ").replace("&amp;", "&").replace("&#039;", "'")
    html = html.replace("&quot;", '"')
    lines = [re.sub(r"[ \t]+", " ", line).strip() for line in html.splitlines()]
    paragraphs: list[str] = []
    buf: list[str] = []
    for line in lines:
        if not line:
            if buf:
                paragraphs.append(" ".join(buf))
                buf = []
            continue
        buf.append(line)
    if buf:
        paragraphs.append(" ".join(buf))
    return paragraphs


def pairs(html: str, label_re: str, value_re: str) -> list[dict[str, str]]:
    found = re.findall(label_re + r"\s*" + value_re, html)
    items = []
    seen = set()
    for label, value in found:
        label = re.sub(r"\s+", " ", label).strip()
        value = re.sub(r"\s+", " ", value).strip()
        if not label or not value or label in seen:
            continue
        seen.add(label)
        items.append({"label": label, "value": value})
    return items


def parse_detail(slug: str, html: str, summary: dict) -> dict:
    images = []
    for url in re.findall(r"https://cdn\.autonet\.no/[^\"'\s]+", html):
        if url not in images:
            images.append(url)
    title = summary["title"]
    match = re.search(r'property="og:title" content="([^"]+)"', html)
    if match:
        title = match.group(1)
    price = summary["price"]
    price_match = re.search(r'class="mt-2 text-5xl font-bold text-gray-500">\s*([^<]+)', html)
    if price_match:
        price = re.sub(r"\s+", " ", price_match.group(1)).strip()
    highlights = pairs(
        html,
        r'<span class="m-0 block p-0 text-xs">\s*([^<]+?)\s*</span>',
        r'<span class="m-0 block p-0 font-medium">\s*([^<]+?)\s*</span>',
    )
    specs = pairs(
        html,
        r'<div class="text-sm font-semibold text-black">\s*([^<]+?)\s*</div>',
        r'<div class="text-lg font-normal text-gray-700">\s*([^<]+?)\s*</div>',
    )
    prose = re.search(r'<div\s+class="prose"[\s\S]*?<p>([\s\S]*?)</p>', html)
    description = text_of(prose.group(1)) if prose else []
    return {
        **summary,
        "title": title,
        "price": price,
        "images": images or ([summary["image"]] if summary["image"] else []),
        "highlights": highlights,
        "specs": specs,
        "description": description,
    }


def parse_listing(html: str) -> list[dict]:
    chunks = re.split(r'(?=<img\s)', html)
    cars = []
    seen = set()
    for chunk in chunks:
        link = re.search(r'href="https://autogrande\.no/biler/(\d+-[a-z0-9\-]+)"', chunk)
        img = re.search(r'src="(https://cdn\.autonet\.no/[^"]+)"', chunk)
        title = re.search(r'href="https://autogrande\.no/biler/[^"]+">\s*(?:<span[^>]*>\s*</span>\s*)?([^<]+)', chunk)
        if not link or not title:
            continue
        slug = link.group(1)
        if slug in seen:
            continue
        seen.add(slug)
        model = re.search(r'<p class="text-sm text-black/60">([^<]+)</p>', chunk)
        year = re.search(r"Årsmodell[\s\S]{0,240}?(\d{4})", chunk)
        km = re.search(r"Kilometer[\s\S]{0,240}?([\d\s]+km)", chunk)
        price = re.search(r"Totalpris[\s\S]{0,240}?(kr\s[\d\s]+)", chunk)
        cars.append(
            {
                "slug": slug,
                "id": slug.split("-", 1)[0],
                "title": re.sub(r"\s+", " ", title.group(1)).strip(),
                "model": model.group(1).strip() if model else "",
                "year": int(year.group(1)) if year else None,
                "km": re.sub(r"\s+", " ", km.group(1)).strip() if km else "",
                "price": re.sub(r"\s+", " ", price.group(1)).strip() if price else "",
                "image": img.group(1) if img else "",
            }
        )
    return cars


def main() -> None:
    listing = fetch(LISTING)
    summaries = parse_listing(listing)
    print(f"listing cars: {len(summaries)}")

    def load(summary: dict) -> dict:
        url = f"https://autogrande.no/biler/{summary['slug']}"
        try:
            return parse_detail(summary["slug"], fetch(url), summary)
        except Exception as error:  # noqa: BLE001
            print("failed", summary["slug"], error)
            return {**summary, "images": [summary["image"]] if summary["image"] else [], "highlights": [], "specs": [], "description": []}

    with ThreadPoolExecutor(max_workers=8) as pool:
        cars = list(pool.map(load, summaries))

    OUT.write_text(json.dumps(cars, ensure_ascii=False, indent=2) + "\n")
    print(f"wrote {len(cars)} -> {OUT}")


if __name__ == "__main__":
    main()
