import type { Metadata } from "next";
import { company } from "@/content/site";

export function pageMetadata(title: string, description: string, path: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      locale: "nb_NO",
      type: "website",
      siteName: company.name,
      url: path,
    },
  };
}
