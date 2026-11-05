import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { tracks } from "@/content/site";

export function Tracks() {
  return (
    <section aria-label="Det vi gjør" className="border-b border-line-dark bg-ink">
      <ul className="mx-auto grid max-w-site md:grid-cols-3">
        {tracks.map((track, i) => (
          <li key={track.href} className={i > 0 ? "border-t border-line-dark md:border-t-0 md:border-l" : ""}>
            <Reveal delay={i * 0.08}>
              <Link href={track.href} className="group flex h-full flex-col px-5 py-14 md:px-10 md:py-20">
                <p className="flex items-center gap-3 text-eyebrow font-medium uppercase tracking-eyebrow text-stone">
                  <span aria-hidden="true" className="h-px w-8 bg-brand" />
                  {track.eyebrow}
                </p>
                <h2 className="mt-8 font-display text-display-md tracking-display">{track.title}</h2>
                <p className="mt-5 flex-1 leading-relaxed text-stone">{track.body}</p>
                <span className="mt-10 inline-flex items-center gap-3 text-sm font-semibold tracking-wide">
                  Les mer
                  <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
