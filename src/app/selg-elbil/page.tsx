import { PageFrame } from "@/components/page-frame";
import { SellEv } from "@/components/sections/sell-ev";
import { SellOptions } from "@/components/sections/sell-options";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Selg elbilen",
  "Få bud på elbilen din direkte fra AutoGrande. Ingen auksjon og ingen mellomledd. Innbytte og formidlingssalg også.",
  "/selg-elbil",
);

export default function SellEvPage() {
  return (
    <PageFrame>
      <SellEv headingLevel="h1" />
      <SellOptions />
    </PageFrame>
  );
}
