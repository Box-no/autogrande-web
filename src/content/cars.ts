import raw from "@/content/cars.json";

export type SpecLine = {
  label: string;
  value: string;
};

export type Car = {
  slug: string;
  id: string;
  title: string;
  model: string;
  year: number | null;
  km: string;
  price: string;
  image: string;
  images: string[];
  highlights: SpecLine[];
  specs: SpecLine[];
  description: string[];
};

/** Snapshot of autogrande.no/biler, 05.11.2026. Refresh with scripts/scrape-cars.py. */
export const cars = raw as Car[];

const featuredIds = ["238139", "237686", "254716", "256924", "253838"] as const;

const driveLabels: Record<string, string> = {
  REARWHEELEDRIVE: "Bakhjulsdrift",
  FRONTWHEELEDRIVE: "Forhjulsdrift",
};

export function getCar(slug: string) {
  return cars.find((car) => car.slug === slug);
}

export function featuredStock() {
  return featuredIds.flatMap((id) => {
    const car = cars.find((item) => item.id === id);
    return car ? [car] : [];
  });
}

export function carImage(car: Car) {
  return car.image || car.images[0] || "";
}

export function specValue(label: string, value: string) {
  if (label === "Hjuldrift" && driveLabels[value]) return driveLabels[value];
  if (label === "Kilometer" && /^\d+$/.test(value)) {
    return `${new Intl.NumberFormat("nb-NO").format(Number(value))} km`;
  }
  if (label === "Totalpris" && !value.toLowerCase().startsWith("kr")) return `kr ${value}`;
  return value;
}
