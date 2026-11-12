import { PageFrame } from "@/components/page-frame";
import { Brands } from "@/components/sections/brands";
import { FeaturedCars } from "@/components/sections/featured-cars";
import { Journey } from "@/components/sections/journey";
import { cars } from "@/content/cars";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Biler på lager",
  "Audi, BMW, Mercedes-Benz og flere hos AutoGrande i Skien. Hentet og kjørt hjem fra Tyskland av oss, med garanti.",
  "/biler",
);

export default function BilerPage() {
  return (
    <PageFrame>
      <FeaturedCars
        headingLevel="h1"
        cars={cars}
        title="Biler på lager."
        intro="Alle bilene som står annonsert hos oss akkurat nå."
        showListingLink={false}
      />
      <Journey />
      <Brands />
    </PageFrame>
  );
}
