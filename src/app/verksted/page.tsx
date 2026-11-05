import { PageFrame } from "@/components/page-frame";
import { Workshop } from "@/components/sections/workshop";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Verksted",
  "Bilverksted hos AutoGrande i Grenland. Avtalt pris, og beskjed før noe blir dyrere. Bestill time.",
  "/verksted",
);

export default function WorkshopPage() {
  return (
    <PageFrame>
      <Workshop headingLevel="h1" />
    </PageFrame>
  );
}
