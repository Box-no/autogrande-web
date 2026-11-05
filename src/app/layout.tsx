import type { Metadata } from "next";
import { Instrument_Serif, Inter_Tight } from "next/font/google";
import { MotionProvider } from "@/components/motion-provider";
import "./globals.css";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://autogrande.no"),
  title: {
    default: "AutoGrande AS",
    template: "%s | AutoGrande",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="nb-NO" className={`${interTight.variable} ${instrumentSerif.variable} antialiased`}>
      <body className="bg-ink font-sans text-bone">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
