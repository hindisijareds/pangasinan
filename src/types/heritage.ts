export type HeritageCategory =
  | "Nature"
  | "Built Heritage"
  | "Faith & Heritage"
  | "Civic Heritage"
  | "Coast";

export interface HeritageSite {
  id: string;
  slug: string;
  name: string;
  location: string;
  province: "Pangasinan";
  category: HeritageCategory;
  shortDescription: string;
  description: string;
  image: string | null;
  imageAlt: string;
  featured: boolean;
  highlights: string[];
}
