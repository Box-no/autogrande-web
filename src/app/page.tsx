import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Brands } from "@/components/sections/brands";
import { FeaturedCars } from "@/components/sections/featured-cars";
import { Hero } from "@/components/sections/hero";
import { Journey } from "@/components/sections/journey";
import { SellEv } from "@/components/sections/sell-ev";
import { Services } from "@/components/sections/services";
import { Team } from "@/components/sections/team";
import { TrustBar } from "@/components/sections/trust-bar";
import { Visit } from "@/components/sections/visit";
import { Workshop } from "@/components/sections/workshop";
import { company, heroCar } from "@/content/site";

export async function generateMetadata(): Promise<Metadata> {
  const title = "AutoGrande – Audi, BMW og Mercedes-Benz fra Tyskland | Skien";
  const description =
    "Selvstendig bilimportør i Skien siden 2016. Vi henter og kjører bilene hjem fra Tyskland selv, med minimum ett års garanti på nesten alle biler. Vi kjøper også din elbil.";
  return {
    title,
    description,
    alternates: { canonical: "/" },
    openGraph: {
      title,
      description,
      locale: "nb_NO",
      type: "website",
      siteName: company.name,
      images: [{ url: heroCar.image, width: 2560, height: 1460, alt: heroCar.alt }],
    },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoDealer",
  name: company.name,
  telephone: "+4797666380",
  email: company.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: company.street,
    postalCode: company.postalCode,
    addressLocality: company.city,
    addressCountry: "NO",
  },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Friday"], opens: "09:00", closes: "17:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Thursday", opens: "09:00", closes: "19:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "10:00", closes: "14:00" },
  ],
  sameAs: [company.facebookUrl],
} as const;

export default function Home() {
  return (
    <>
      <a
        href="#innhold"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-pill focus:bg-bone focus:px-5 focus:py-3 focus:text-ink"
      >
        Hopp til innhold
      </a>
      <SiteHeader />
      <main id="innhold">
        <Hero />
        <TrustBar />
        <FeaturedCars />
        <Journey />
        <Brands />
        <SellEv />
        <Workshop />
        <Services />
        <Team />
        <Visit />
      </main>
      <SiteFooter />
      <script
        type="application/ld+json"
        // JSON-LD from static, trusted content only.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
