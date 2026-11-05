import { PageFrame } from "@/components/page-frame";
import { Services } from "@/components/sections/services";
import { Visit } from "@/components/sections/visit";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Kontakt",
  "Besøk AutoGrande i Håvundvegen 214, 3746 Skien. Ring 97 66 63 80 eller send e-post til bil@autogrande.no.",
  "/kontakt",
);

export default function ContactPage() {
  return (
    <PageFrame>
      <Visit headingLevel="h1" />
      <Services />
    </PageFrame>
  );
}
