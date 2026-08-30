export type HeritageClass =
  | "Natural Heritage"
  | "Immovable Heritage"
  | "Intangible Heritage"
  | string;

export interface HeritageSite {
  id: string;
  slug: string;
  name: string;
  location: string;
  province: "Pangasinan";
  heritageClass: HeritageClass;
  heritageType: string;
  shortDescription: string;
  description: string;
  image: string | null;
  imageAlt: string;
  featured: boolean;
  highlights: string[];
  sourceUrl?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}
