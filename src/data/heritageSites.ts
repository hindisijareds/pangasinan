import type { HeritageSite } from "@/types/heritage";

export const heritageSites: HeritageSite[] = [
  {
    id: "site-001",
    slug: "hundred-islands",
    name: "Hundred Islands",
    location: "Alaminos City",
    province: "Pangasinan",
    category: "Nature",
    shortDescription:
      "A celebrated island landscape in Lingayen Gulf, known for boat journeys and sea-framed views.",
    description:
      "Hundred Islands National Park gathers limestone islets across the waters off Alaminos City. It is a defining Pangasinan landscape for island exploration, swimming, and coastal discovery.",
    image: "/images/hundred-islands.webp",
    imageAlt:
      "Boats beside the tree-covered Romulo Island in Hundred Islands National Park",
    featured: true,
    highlights: ["Island landscape", "Lingayen Gulf", "Boat exploration"],
  },
  {
    id: "site-002",
    slug: "bolinao-lighthouse",
    name: "Bolinao Lighthouse",
    location: "Bolinao",
    province: "Pangasinan",
    category: "Built Heritage",
    shortDescription:
      "A coastal landmark rising above Cape Bolinao and the western edge of the province.",
    description:
      "Cape Bolinao Lighthouse is a historic navigation landmark in Bolinao. Its tall white tower and coastal setting make it one of western Pangasinan's most recognizable built-heritage sites.",
    image: "/images/bolinao-lighthouse.webp",
    imageAlt:
      "Cape Bolinao Lighthouse framed by trees along its uphill approach",
    featured: true,
    highlights: ["Coastal landmark", "Historic structure", "Bolinao views"],
  },
  {
    id: "site-003",
    slug: "balungao-hot-spring",
    name: "Balungao Hot Spring",
    location: "Balungao",
    province: "Pangasinan",
    category: "Nature",
    shortDescription:
      "A foothill recreation destination associated with warm spring pools and outdoor adventure.",
    description:
      "The Balungao hot spring area brings together warm-water recreation and a green foothill setting. Visitor facilities and conditions should be confirmed with the local tourism office before travel.",
    image: null,
    imageAlt: "",
    featured: true,
    highlights: ["Warm spring pools", "Foothill setting", "Outdoor recreation"],
  },
  {
    id: "site-004",
    slug: "manaoag-church",
    name: "Manaoag Church",
    location: "Manaoag",
    province: "Pangasinan",
    category: "Faith & Heritage",
    shortDescription:
      "A prominent pilgrimage church and enduring center of faith in eastern Pangasinan.",
    description:
      "The Minor Basilica of Our Lady of the Rosary of Manaoag is a well-known place of worship in the municipality of Manaoag. Its facade, devotional traditions, and active religious life draw pilgrims and visitors.",
    image: "/images/manaoag-church.webp",
    imageAlt: "Facade and bell tower of Manaoag Church beneath a cloudy sky",
    featured: false,
    highlights: ["Pilgrimage", "Church architecture", "Living tradition"],
  },
  {
    id: "site-005",
    slug: "pangasinan-provincial-capitol",
    name: "Provincial Capitol",
    location: "Lingayen",
    province: "Pangasinan",
    category: "Civic Heritage",
    shortDescription:
      "The province's civic landmark, set within the Capitol complex near Lingayen Gulf.",
    description:
      "The Pangasinan Provincial Capitol is the seat of the provincial government in Lingayen. Its formal architecture and landscaped setting make the complex an important part of the capital's identity.",
    image: "/images/provincial-capitol.webp",
    imageAlt:
      "Front facade of the Pangasinan Provincial Capitol under a blue sky",
    featured: false,
    highlights: ["Civic architecture", "Provincial capital", "Lingayen landmark"],
  },
  {
    id: "site-006",
    slug: "patar-beach",
    name: "Patar Beach",
    location: "Bolinao",
    province: "Pangasinan",
    category: "Coast",
    shortDescription:
      "A western Pangasinan shoreline known for open sea views and warm coastal light.",
    description:
      "Patar Beach lies along the coast of Bolinao. Its broad horizon and western orientation give visitors a spacious seaside setting, especially as the day moves toward sunset.",
    image: "/images/patar-beach.webp",
    imageAlt: "Sandy shoreline and blue water at Patar Beach in Bolinao",
    featured: false,
    highlights: ["Coastal scenery", "Open horizon", "Bolinao shoreline"],
  },
];

export const featuredSites = heritageSites.filter((site) => site.featured);
