import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Heart, Minus, Plus, Truck, RotateCcw, ShieldCheck } from "lucide-react";
import { TopBar } from "@/components/top-bar";
import { ProductCard } from "@/components/product-card";
import { ProductVisual } from "@/components/product-visual";
import { getProduct, PRODUCTS } from "@/lib/products";
import { useCart } from "@/lib/cart-store";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.product;
    return {
      meta: [
        { title: p ? `${p.name} — ESSENCE` : "Product — ESSENCE" },
        { name: "description", content: p?.description ?? "" },
        { property: "og:title", content: p ? `${p.name} — ESSENCE` : "Product" },
        { property: "og:description", content: p?.description ?? "" },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="grid min-h-[60vh] place-items-center px-5 text-center">
      <div>
        <p className="text-sm text-muted-foreground">Product not found</p>
        <Link to="/shop" className="mt-3 inline-block text-sm font-semibold underline">Back to shop</Link>
      </div>
    </div>
  ),
  errorComponent: () => (
    <div className="grid min-h-[60vh] place-items-center px-5 text-center text-sm text-muted-foreground">
      Couldn't load this product.
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const navigate = useNavigate();
  const { add } = useCart();
  const [tab, setTab] = useState<"about" | "closet" | "reviews">("about");
  const [size, setSize] = useState(product.sizes[Math.min(2, product.sizes.length - 1)]);
  const [color, setColor] = useState(product.colors[0]?.name ?? "Default");
  const [qty, setQty] = useState(1);
  const [imageIdx, setImageIdx] = useState(0);

  const related = PRODUCTS.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);

  // Build a small "gallery" by varying the swatch tone for visual interest.
  const gallery = [product.swatch, lighten(product.swatch, 0.08), darken(product.swatch, 0.12), lighten(product.swatch, 0.18)];

  const onAdd = () => {
    add({ productId: product.id, size, color, qty });
  };

  const onBuyNow = () => {
    add({ productId: product.id, size, color, qty });
    navigate({ to: "/cart" });
  };

  return (
    <div className="mx-auto max-w-6xl px-5">
      {/* Header */}
      <div className="sticky top-0 z-30 -mx-5 flex items-center justify-between bg-background/85 px-5 py-4 backdrop-blur">
        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center gap-1 text-sm font-medium"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        <h1 className="text-sm font-semibold">Products</h1>
        <Link to="/shop" className="text-xs font-medium text-muted-foreground">
          Change Product
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:items-start">
        {/* Gallery */}
        <section>
          <div className="relative">
            <ProductVisual swatch={gallery[imageIdx]} image={imageIdx === 0 ? product.image : undefined} alt={product.name} className="aspect-square w-full" rounded="3xl" />
            <button
              aria-label="Add to wishlist"
              className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-background/85 backdrop-blur"
            >
              <Heart className="h-4 w-4" strokeWidth={1.75} />
            </button>
          </div>
          <div className="mt-3 flex gap-2 overflow-x-auto no-scrollbar">
            {gallery.map((s, i) => (
              <button
                key={i}
                onClick={() => setImageIdx(i)}
                className={`shrink-0 rounded-2xl border p-1 ${
                  imageIdx === i ? "border-foreground" : "border-border"
                }`}
              >
                <ProductVisual swatch={s} image={i === 0 ? product.image : undefined} alt={product.name} className="h-16 w-16" rounded="xl" />
              </button>
            ))}
          </div>
        </section>

        {/* Details */}
        <section className="space-y-6 pt-1">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{product.category}</p>
            <h2 className="mt-1 text-3xl font-bold leading-tight">{product.name}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{product.tagline}</p>
            <p className="mt-3 text-2xl font-bold">${product.price}</p>
            <p className="text-xs text-emerald-700">
              {product.inventory > 0 ? `In stock — ${product.inventory} left` : "Out of stock"}
            </p>
          </div>

          {/* Sizes */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Size</p>
              <button className="text-xs underline">Size Chart</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s: string) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`min-w-11 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                    s === size
                      ? "border-foreground bg-foreground text-background"
                      : "border-border bg-card text-foreground hover:border-foreground"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Colours</p>
            <div className="flex flex-wrap items-center gap-3">
              {product.colors.map((c: { name: string; hex: string }) => (
                <button
                  key={c.name}
                  onClick={() => setColor(c.name)}
                  title={c.name}
                  className={`grid h-9 w-9 place-items-center rounded-full ring-offset-2 ring-offset-background transition-all ${
                    color === c.name ? "ring-2 ring-foreground" : "ring-1 ring-border"
                  }`}
                  style={{ background: c.hex }}
                >
                  <span className="sr-only">{c.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Qty */}
          <div className="flex items-center gap-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Quantity</p>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-2 py-1">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="grid h-7 w-7 place-items-center rounded-full hover:bg-muted">
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="w-6 text-center text-sm font-semibold">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="grid h-7 w-7 place-items-center rounded-full hover:bg-muted">
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex gap-3">
            <button
              onClick={onAdd}
              className="h-12 flex-1 rounded-full border border-border bg-card text-sm font-semibold transition-colors hover:border-foreground"
            >
              Add to Cart
            </button>
            <button
              onClick={onBuyNow}
              className="h-12 flex-1 rounded-full bg-foreground text-sm font-semibold text-background transition-opacity hover:opacity-90"
            >
              Buy Now
            </button>
          </div>

          {/* Trust row */}
          <div className="grid grid-cols-3 gap-3 rounded-2xl border border-border bg-card p-4 text-xs">
            <Trust icon={<Truck className="h-4 w-4" />} label="Free shipping over $120" />
            <Trust icon={<RotateCcw className="h-4 w-4" />} label="30-day returns" />
            <Trust icon={<ShieldCheck className="h-4 w-4" />} label="Secure checkout" />
          </div>

          {/* Tabs */}
          <div>
            <div className="flex border-b border-border">
              {(["closet", "about", "reviews"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`flex-1 py-3 text-sm font-medium capitalize transition-colors ${
                    tab === t ? "border-b-2 border-foreground text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="pt-4 text-sm leading-relaxed text-muted-foreground">
              {tab === "about" && <p>{product.description}</p>}
              {tab === "closet" && <p>Pair with the Studio Shorts or Field Tracksuit for a tonal look.</p>}
              {tab === "reviews" && (
                <ul className="space-y-3">
                  <li className="rounded-2xl border border-border bg-card p-4">
                    <p className="text-xs font-semibold text-foreground">★★★★★ — Maya R.</p>
                    <p className="mt-1">"Heavyweight and drapes beautifully. True to size."</p>
                  </li>
                  <li className="rounded-2xl border border-border bg-card p-4">
                    <p className="text-xs font-semibold text-foreground">★★★★☆ — Tomás L.</p>
                    <p className="mt-1">"Boxy fit is exactly right. Shipped fast."</p>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </section>
      </div>

      {/* Related */}
      <h3 className="mt-12 mb-4 text-base font-bold">Related Products</h3>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {related.map((p) => (
          <ProductCard key={p.id} product={p} variant="compact" />
        ))}
      </div>
    </div>
  );
}

function Trust({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5 text-center text-muted-foreground">
      {icon}
      <span className="text-[10px] leading-tight">{label}</span>
    </div>
  );
}

function lighten(hex: string, amount: number) {
  return mix(hex, "#ffffff", amount);
}
function darken(hex: string, amount: number) {
  return mix(hex, "#000000", amount);
}
function mix(a: string, b: string, t: number) {
  const pa = parse(a);
  const pb = parse(b);
  const r = Math.round(pa[0] + (pb[0] - pa[0]) * t);
  const g = Math.round(pa[1] + (pb[1] - pa[1]) * t);
  const bl = Math.round(pa[2] + (pb[2] - pa[2]) * t);
  return `#${[r, g, bl].map((v) => v.toString(16).padStart(2, "0")).join("")}`;
}
function parse(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}
