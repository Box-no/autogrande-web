import type { Metadata } from "next";
import { PageFrame } from "@/components/page-frame";
import { FeaturedCars } from "@/components/sections/featured-cars";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Team } from "@/components/sections/team";
import { Tracks } from "@/components/sections/tracks";
import { VisitBanner } from "@/components/sections/visit";
import { TrustBar } from "@/components/sections/trust-bar";
import { company, heroCar } from "@/content/site";

const title = "AutoGrande – Audi, BMW og Mercedes-Benz fra Tyskland | Skien";
const description =
  "Selvstendig bilimportør i Skien siden 2016. Vi henter og kjører bilene hjem fra Tyskland selv, med minimum ett års garanti på nesten alle biler. Vi kjøper også din elbil.";

export const metadata: Metadata = {
  title: { absolute: title },
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

export default function Home() {
  return (
    <PageFrame>
      <Hero />
      <TrustBar />
      <Tracks />
      <FeaturedCars />
      <Services />
      <Team variant="home" />
      <VisitBanner />
    </PageFrame>
  );
}
