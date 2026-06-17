import { Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import type { Product } from "@/lib/products";
import { ProductVisual } from "./product-visual";

type Props = {
  product: Product;
  /** Tall = pinterest-style large card; wide = horizontal scroll card */
  variant?: "tall" | "wide" | "compact";
};

export function ProductCard({ product, variant = "tall" }: Props) {
  if (variant === "wide") {
    return (
      <Link
        to="/product/$slug"
        params={{ slug: product.slug }}
        className="group flex w-[220px] shrink-0 flex-col gap-3 rounded-3xl border border-border bg-card p-3 transition-shadow hover:shadow-[0_20px_40px_-25px_rgba(0,0,0,0.3)]"
      >
        <ProductVisual swatch={product.swatch} image={product.image} alt={product.name} className="aspect-square" />
        <div className="flex items-start justify-between gap-2 px-1 pb-1">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{product.name}</p>
            <p className="text-xs text-muted-foreground">{product.tagline}</p>
          </div>
          <span className="shrink-0 text-sm font-semibold">${product.price}</span>
        </div>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link
        to="/product/$slug"
        params={{ slug: product.slug }}
        className="group flex flex-col gap-2"
      >
        <ProductVisual swatch={product.swatch} image={product.image} alt={product.name} className="aspect-[4/5]" rounded="2xl" />
        <div className="flex items-start justify-between gap-2 px-1">
          <p className="truncate text-sm font-medium">{product.name}</p>
          <span className="shrink-0 text-sm font-semibold">${product.price}</span>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to="/product/$slug"
      params={{ slug: product.slug }}
      className="group flex flex-col gap-3 rounded-3xl border border-border bg-card p-3 transition-shadow hover:shadow-[0_24px_50px_-30px_rgba(0,0,0,0.35)]"
    >
      <div className="relative">
        <ProductVisual swatch={product.swatch} image={product.image} alt={product.name} className="aspect-[4/5]" />
        <span className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-background/90 text-foreground shadow-sm">
          <Plus className="h-4 w-4" strokeWidth={2} />
        </span>
      </div>
      <div className="space-y-2 px-1 pb-1">
        <div>
          <p className="truncate text-[15px] font-semibold leading-tight">{product.name}</p>
          <p className="text-xs text-muted-foreground">Available Sizes</p>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold">${product.price}</span>
          <span className="rounded-full bg-foreground px-3 py-1 text-[11px] font-medium text-background">
            Buy Now
          </span>
        </div>
      </div>
    </Link>
  );
}
