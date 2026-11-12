import { PageFrame } from "@/components/page-frame";
import { SellEv } from "@/components/sections/sell-ev";
import { SellFaq } from "@/components/sections/sell-faq";
import { SellOptions } from "@/components/sections/sell-options";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Selg bilen",
  "Vi tester bilen på eget verksted, tar bilder i egen fotohall og selger den for deg. Du får et tilbud og velger selv om du vil fortsette.",
  "/selg-elbil",
);

export default function SellEvPage() {
  return (
    <PageFrame>
      <SellEv headingLevel="h1" />
      <SellFaq />
      <SellOptions />
    </PageFrame>
  );
}
