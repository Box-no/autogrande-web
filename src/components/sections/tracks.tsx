import Link from "next/link";
import { tracks } from "@/content/site";

export function Tracks() {
  return (
    <section aria-label="Det vi gjør" className="bg-paper py-16 md:py-20">
      <ul className="mx-auto grid max-w-site gap-x-10 px-5 md:grid-cols-3 md:px-10">
        {tracks.map((track) => (
          <li key={track.href} className="border-t-2 border-ink">
            <Link href={track.href} className="group flex h-full flex-col py-6 md:py-8">
              <h2 className="font-display text-display-md text-balance">{track.eyebrow}</h2>
              <p className="mt-3 font-semibold">{track.title}</p>
              <p className="mt-2 flex-1 leading-relaxed text-stone-dark">{track.body}</p>
              <span className="mt-6 w-fit text-sm font-semibold underline decoration-brand decoration-2 underline-offset-[6px] group-hover:text-brand-deep">
                Les mer
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
