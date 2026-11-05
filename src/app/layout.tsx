import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { MotionProvider } from "@/components/motion-provider";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { company } from "@/content/site";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://autogrande.no"),
  title: {
    default: "AutoGrande AS",
    template: "%s | AutoGrande",
  },
};

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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="nb-NO" className={`${jakarta.variable} antialiased`}>
      <body className="bg-paper font-sans text-ink">
        <MotionProvider>
          <a
            href="#innhold"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-60 focus:rounded-control focus:bg-surface focus:px-5 focus:py-3 focus:font-semibold focus:text-ink"
          >
            Hopp til innhold
          </a>
          <SiteHeader />
          <main id="innhold">{children}</main>
          <SiteFooter />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
          />
        </MotionProvider>
      </body>
    </html>
  );
}
