// Mock catalog for Stage 1. Will be replaced by Lovable Cloud DB in Stage 2.

export type Product = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category:
    | "Hoodies"
    | "T-Shirts"
    | "Sweatshirts"
    | "Tracksuits"
    | "Jackets"
    | "Shorts"
    | "Accessories";
  price: number;
  sizes: string[];
  colors: { name: string; hex: string }[];
  /** Tint used behind the photo / as a fallback. */
  swatch: string;
  /** Realistic editorial placeholder photo (Unsplash). Swap for real ESNCE shots when uploaded. */
  image: string;
  inventory: number;
  isFeatured?: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
};

export const CATEGORIES = [
  { slug: "hoodies", label: "Hoodies" },
  { slug: "t-shirts", label: "T-Shirts" },
  { slug: "sweatshirts", label: "Sweatshirts" },
  { slug: "tracksuits", label: "Tracksuits" },
  { slug: "jackets", label: "Jackets" },
  { slug: "shorts", label: "Shorts" },
  { slug: "accessories", label: "Accessories" },
] as const;

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

const PALETTE = [
  { name: "Bone", hex: "#efece4" },
  { name: "Stone", hex: "#c9c5bd" },
  { name: "Charcoal", hex: "#3a3a3a" },
  { name: "Ink", hex: "#141414" },
];

const img = (id: string) => `/images/${id}.jpg`;

export const PRODUCTS: Product[] = [
  {
    id: "p-001",
    slug: "statue-print-hoodie",
    name: "Statue Print Hoodie",
    tagline: "Heavyweight 480gsm",
    description:
      "Boxy fit, double-lined hood, brushed interior. A studio-staple hoodie cut from heavyweight loop-back cotton.",
    category: "Hoodies",
    price: 90,
    sizes: SIZES,
    colors: PALETTE.slice(2),
    swatch: "#2b2b2b",
    image: img("photo-1556821840-3a63f95609a7"),
    inventory: 24,
    isFeatured: true,
    isBestSeller: true,
  },
  {
    id: "p-002",
    slug: "ombre-pullover",
    name: "Ombre Pullover",
    tagline: "Garment dyed",
    description: "A garment-dyed pullover with relaxed shoulder line and ribbed cuffs.",
    category: "Sweatshirts",
    price: 110,
    sizes: SIZES,
    colors: PALETTE,
    swatch: "#dcd8cf",
    image: img("photo-1620799140408-edc6dcb6d633"),
    inventory: 18,
    isNew: true,
  },
  {
    id: "p-003",
    slug: "essential-overshirt",
    name: "Essential Overshirt",
    tagline: "Cotton twill",
    description: "Mid-weight cotton twill overshirt with horn buttons.",
    category: "Jackets",
    price: 145,
    sizes: SIZES,
    colors: PALETTE,
    swatch: "#9b9892",
    image: img("photo-1542272604-787c3835535d"),
    inventory: 12,
    isFeatured: true,
  },
  {
    id: "p-004",
    slug: "iconic-pullover",
    name: "Iconic Pullover",
    tagline: "Boxy fit",
    description: "Our archival pullover, reissued in a heavier loopback knit.",
    category: "Sweatshirts",
    price: 95,
    sizes: SIZES,
    colors: PALETTE,
    swatch: "#6a6a6a",
    image: img("photo-1503341504253-dff4815485f1"),
    inventory: 30,
    isBestSeller: true,
  },
  {
    id: "p-005",
    slug: "vibe-pullover",
    name: "Vibe Pullover",
    tagline: "Loop-back fleece",
    description: "Soft loop-back fleece with a clean crew neck.",
    category: "Sweatshirts",
    price: 85,
    sizes: SIZES,
    colors: PALETTE,
    swatch: "#e6e2d9",
    image: img("photo-1618354691373-d851c5c3a990"),
    inventory: 20,
    isNew: true,
  },
  {
    id: "p-006",
    slug: "core-tee",
    name: "Core Tee",
    tagline: "Heavyweight 240gsm",
    description: "Boxy, heavyweight cotton tee with a rib-knit collar.",
    category: "T-Shirts",
    price: 45,
    sizes: SIZES,
    colors: PALETTE,
    swatch: "#f1ede4",
    image: img("photo-1521572163474-6864f9cf17ab"),
    inventory: 60,
    isBestSeller: true,
  },
  {
    id: "p-007",
    slug: "field-tracksuit",
    name: "Field Tracksuit",
    tagline: "Two-piece set",
    description: "A relaxed two-piece tracksuit in brushed cotton.",
    category: "Tracksuits",
    price: 195,
    sizes: SIZES,
    colors: PALETTE.slice(1, 3),
    swatch: "#4a4a4a",
    image: img("photo-1593030761757-71fae45fa0e7"),
    inventory: 10,
    isFeatured: true,
  },
  {
    id: "p-008",
    slug: "studio-shorts",
    name: "Studio Shorts",
    tagline: "5-inch inseam",
    description: "Lightweight studio shorts with a draw cord.",
    category: "Shorts",
    price: 60,
    sizes: SIZES,
    colors: PALETTE,
    swatch: "#bcb7ad",
    image: img("photo-1591195853828-11db59a44f6b"),
    inventory: 40,
    isNew: true,
  },
  {
    id: "p-009",
    slug: "esnce-cap",
    name: "ESNCE Cap",
    tagline: "Unstructured",
    description: "Unstructured cotton cap with an embroidered wordmark.",
    category: "Accessories",
    price: 35,
    sizes: ["One Size"],
    colors: PALETTE,
    swatch: "#1a1a1a",
    image: img("photo-1588850561407-ed78c282e89b"),
    inventory: 80,
  },
  {
    id: "p-010",
    slug: "club-tee-09",
    name: "Club Tee 09",
    tagline: "Vintage football jersey",
    description:
      "Vintage-inspired club tee with numbered graphic and contrast collar. Soft-hand cotton with a relaxed drop shoulder.",
    category: "T-Shirts",
    price: 55,
    sizes: SIZES,
    colors: PALETTE,
    swatch: "#d8d3c7",
    image: img("photo-1583743814966-8936f5b7be1a"),
    inventory: 35,
    isNew: true,
    isBestSeller: true,
  },
  {
    id: "p-011",
    slug: "mesh-club-tee",
    name: "Mesh Club Tee",
    tagline: "Breathable mesh",
    description: "Oversized mesh club tee with embroidered crest and ribbed V-neck.",
    category: "T-Shirts",
    price: 65,
    sizes: SIZES,
    colors: PALETTE.slice(1),
    swatch: "#7a7468",
    image: img("photo-1622445275576-721325763afe"),
    inventory: 25,
    isNew: true,
  },
  {
    id: "p-012",
    slug: "fashion-tee-earth",
    name: "Fashion Tee — Earth",
    tagline: "Premium embroidered",
    description: "Oversized street-fashion tee in earth tones with chest embroidery.",
    category: "T-Shirts",
    price: 60,
    sizes: SIZES,
    colors: PALETTE,
    swatch: "#a59478",
    image: img("photo-1581655353564-df123a1eb820"),
    inventory: 40,
    isBestSeller: true,
  },
];

export function getProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function filterProducts(opts: {
  category?: string;
  query?: string;
  size?: string;
  color?: string;
  maxPrice?: number;
}) {
  return PRODUCTS.filter((p) => {
    if (
      opts.category &&
      opts.category !== "all" &&
      p.category.toLowerCase() !== opts.category.toLowerCase()
    )
      return false;
    if (
      opts.query &&
      !`${p.name} ${p.tagline} ${p.category}`.toLowerCase().includes(opts.query.toLowerCase())
    )
      return false;
    if (opts.size && !p.sizes.includes(opts.size)) return false;
    if (opts.color && !p.colors.find((c) => c.name === opts.color)) return false;
    if (opts.maxPrice && p.price > opts.maxPrice) return false;
    return true;
  });
}
