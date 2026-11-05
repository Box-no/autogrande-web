import Link from "next/link";
import { tracks } from "@/content/site";

export function Tracks() {
  return (
    <section aria-label="Det vi gjør" className="bg-paper py-16 md:py-24">
      <ul className="mx-auto grid max-w-site gap-4 px-5 md:grid-cols-3 md:px-10">
        {tracks.map((track) => (
          <li key={track.href}>
            <Link
              href={track.href}
              className="group flex h-full flex-col rounded-card border-2 border-transparent bg-surface p-7 transition-colors duration-200 hover:border-ink motion-reduce:transition-none md:p-9"
            >
              <p className="text-sm font-semibold text-stone-dark">{track.eyebrow}</p>
              <h2 className="mt-5 font-display text-display-md text-balance">{track.title}</h2>
              <p className="mt-4 flex-1 leading-relaxed text-stone-dark">{track.body}</p>
              <span className="mt-8 w-fit text-sm font-semibold underline decoration-brand decoration-2 underline-offset-[6px] group-hover:text-brand-deep">
                Les mer
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
