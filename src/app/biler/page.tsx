import { PageFrame } from "@/components/page-frame";
import { Brands } from "@/components/sections/brands";
import { FeaturedCars } from "@/components/sections/featured-cars";
import { Journey } from "@/components/sections/journey";
import { legacySiteUrl } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Biler på lager",
  "Utvalgte Audi, BMW og Mercedes-Benz hos AutoGrande i Skien. Hentet og kjørt hjem fra Tyskland av oss, med garanti.",
  "/biler",
);

export default function BilerPage() {
  return (
    <PageFrame>
      <FeaturedCars
        headingLevel="h1"
        listingHref={`${legacySiteUrl}/biler`}
        listingLabel="Alle annonser"
      />
      <Journey />
      <Brands />
    </PageFrame>
  );
}
