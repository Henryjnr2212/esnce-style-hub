import { createFileRoute, Link } from "@tanstack/react-router";
import { TopBar } from "@/components/top-bar";
import { ProductCard } from "@/components/product-card";
import { PRODUCTS } from "@/lib/products";

export const Route = createFileRoute("/wishlist")({
  head: () => ({ meta: [{ title: "Wishlist — ESSENCE" }] }),
  component: Wishlist,
});

function Wishlist() {
  // Placeholder: shows a curated subset until accounts/DB are wired in Stage 2.
  const items = PRODUCTS.filter((p) => p.isFeatured || p.isBestSeller).slice(0, 4);
  return (
    <div className="mx-auto max-w-4xl px-5">
      <TopBar variant="brand" title="Wishlist" />
      <h1 className="mt-2 text-2xl font-bold">Saved for later</h1>
      <p className="mt-1 text-xs text-muted-foreground">
        Sign in to keep your wishlist across devices — coming in Stage 2.
      </p>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
      <Link
        to="/shop"
        className="mt-8 inline-block rounded-full bg-foreground px-6 py-2.5 text-sm font-semibold text-background"
      >
        Discover more
      </Link>
    </div>
  );
}
