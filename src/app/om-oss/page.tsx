import { PageFrame } from "@/components/page-frame";
import { Team } from "@/components/sections/team";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Om oss",
  "AutoGrande AS i Skien, etablert 2016. Eierne har importert bil siden 2007 og leverer i snitt 300 biler i året.",
  "/om-oss",
);

export default function AboutPage() {
  return (
    <PageFrame>
      <Team headingLevel="h1" />
    </PageFrame>
  );
}
