import type { ReactNode } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Instagram, Facebook } from "lucide-react";
import { TopBar } from "@/components/top-bar";
import { ProductCard } from "@/components/product-card";
import { ProductVisual } from "@/components/product-visual";
import { PRODUCTS, CATEGORIES } from "@/lib/products";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ESSENCE — Wear Your Essence" },
      { name: "description", content: "Premium streetwear from ESNCE. Heavyweight hoodies, garment-dyed tees, and considered essentials." },
      { property: "og:title", content: "ESSENCE — Wear Your Essence" },
      { property: "og:description", content: "Premium streetwear from ESNCE." },
    ],
  }),
  component: Home,
});

function Home() {
  const featured = PRODUCTS.find((p) => p.isFeatured) ?? PRODUCTS[0];
  const newArrivals = PRODUCTS.filter((p) => p.isNew);
  const bestSellers = PRODUCTS.filter((p) => p.isBestSeller);

  return (
    <div className="mx-auto max-w-6xl px-5">
      <TopBar variant="search" />

      {/* Category chips — compact, horizontally scrollable */}
      <nav aria-label="Shop by category" className="-mx-5 mt-2 overflow-x-auto px-5 no-scrollbar">
        <ul className="flex items-center gap-2">
          <li>
            <Link
              to="/shop"
              search={{ category: "all" }}
              className="inline-flex h-9 items-center rounded-full bg-foreground px-4 text-xs font-semibold text-background"
            >
              All
            </Link>
          </li>
          {CATEGORIES.map((c) => (
            <li key={c.slug}>
              <Link
                to="/shop"
                search={{ category: c.slug }}
                className="inline-flex h-9 items-center whitespace-nowrap rounded-full border border-border bg-card px-4 text-xs font-medium text-foreground transition-colors hover:bg-foreground hover:text-background"
              >
                {c.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>


      {/* Hero featured + secondary */}
      <section className="mt-6 grid grid-cols-2 gap-3">
        <Link
          to="/product/$slug"
          params={{ slug: featured.slug }}
          className="group relative col-span-1 row-span-2 flex aspect-[3/5] flex-col justify-between overflow-hidden rounded-3xl border border-border bg-card p-4 text-card-foreground"
        >
          <ProductVisual swatch={featured.swatch} image={featured.image} alt={featured.name} className="absolute inset-0" rounded="none" />
          <div className="relative z-10 self-start rounded-full bg-background/85 px-3 py-1 text-[11px] font-medium backdrop-blur">
            Featured
          </div>
          <div className="relative z-10 space-y-3 text-background">
            <div>
              <h2 className="text-2xl font-bold leading-tight">{featured.name}</h2>
              <p className="text-xs opacity-80">${featured.price} / Available Size</p>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-background px-4 py-2 text-xs font-semibold text-foreground">
              Buy Now <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </Link>

        {bestSellers.slice(0, 2).map((p) => (
          <Link
            key={p.id}
            to="/product/$slug"
            params={{ slug: p.slug }}
            className="group relative flex aspect-square flex-col justify-between overflow-hidden rounded-3xl border border-border bg-card p-3"
          >
            <ProductVisual swatch={p.swatch} image={p.image} alt={p.name} className="absolute inset-0" rounded="none" />
            <div className="relative z-10 flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold">{p.name}</p>
                <p className="text-[10px] text-muted-foreground">Available Sizes</p>
              </div>
              <span className="grid h-7 w-7 place-items-center rounded-full bg-background/90 text-foreground">
                <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </Link>
        ))}
      </section>

      {/* New arrivals */}
      <SectionHeading title="New Arrivals" href="/shop" />
      <div className="-mx-5 flex gap-3 overflow-x-auto px-5 pb-2 no-scrollbar">
        {newArrivals.map((p) => (
          <ProductCard key={p.id} product={p} variant="wide" />
        ))}
      </div>

      {/* Best sellers */}
      <SectionHeading title="Best Sellers" href="/shop" />
      <div className="grid grid-cols-2 gap-3">
        {bestSellers.slice(0, 4).map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {/* You may like more */}
      <SectionHeading title="You may like more" href="/shop" />
      <div className="-mx-5 flex gap-3 overflow-x-auto px-5 pb-2 no-scrollbar">
        {PRODUCTS.slice(3, 8).map((p) => (
          <ProductCard key={p.id} product={p} variant="wide" />
        ))}
      </div>

      {/* Reviews */}
      <SectionHeading title="From the community" />
      <div className="grid gap-3 sm:grid-cols-3">
        {REVIEWS.map((r) => (
          <figure key={r.author} className="rounded-3xl border border-border bg-card p-5">
            <blockquote className="text-sm leading-relaxed">"{r.text}"</blockquote>
            <figcaption className="mt-4 text-xs text-muted-foreground">— {r.author}, {r.location}</figcaption>
          </figure>
        ))}
      </div>

      {/* Newsletter */}
      <section className="mt-10 overflow-hidden rounded-3xl bg-foreground p-8 text-background sm:p-12">
        <h3 className="text-2xl font-bold sm:text-3xl">Wear Your Essence.</h3>
        <p className="mt-2 max-w-md text-sm opacity-80">
          Join the list for early access to drops, restocks, and members-only releases.
        </p>
        <form
          className="mt-6 flex max-w-md flex-col gap-2 sm:flex-row"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            required
            placeholder="you@essence.com"
            className="h-12 flex-1 rounded-full bg-background/10 px-5 text-sm text-background placeholder:text-background/50 outline-none ring-1 ring-background/15 focus:ring-background/40"
          />
          <button className="h-12 rounded-full bg-background px-6 text-sm font-semibold text-foreground">
            Subscribe
          </button>
        </form>
      </section>

      {/* Instagram gallery */}
      <SectionHeading title="@esnce on instagram" />
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
        {PRODUCTS.slice(0, 6).map((p) => (
          <ProductVisual key={p.id} swatch={p.swatch} image={p.image} alt={p.name} className="aspect-square" rounded="xl" />
        ))}
      </div>

      <Footer />
    </div>
  );
}

function SectionHeading({ title, href }: { title: string; href?: string }) {
  return (
    <div className="mt-8 mb-4 flex items-center justify-between">
      <h2 className="text-base font-bold tracking-tight">{title}</h2>
      {href && (
        <Link
          to={href}
          className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          View all <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      )}
    </div>
  );
}

const REVIEWS = [
  { author: "Maya R.", location: "Brooklyn", text: "Heavyweight, drapes like the photos. Doesn't pill after washes." },
  { author: "Tomás L.", location: "Lisbon", text: "Boxy fit is exactly right. Shipped fast, packaging felt premium." },
  { author: "Anya K.", location: "Berlin", text: "The off-white tee is now my Monday uniform. Buying a second." },
];

// Update these URLs when ESNCE's official social accounts are live.
const SOCIALS: { label: string; href: string; icon: ReactNode }[] = [
  { label: "Instagram", href: "https://instagram.com/esnce", icon: <Instagram className="h-4 w-4" /> },
  { label: "TikTok", href: "https://tiktok.com/@esnce", icon: <TikTokIcon /> },
  { label: "Facebook", href: "https://facebook.com/esnce", icon: <Facebook className="h-4 w-4" /> },
  { label: "X", href: "https://x.com/esnce", icon: <XIcon /> },
  { label: "WhatsApp", href: "https://wa.me/0000000000", icon: <WhatsAppIcon /> },
];

function Footer() {
  return (
    <footer className="mt-16 border-t border-border pt-8 pb-6 text-xs text-muted-foreground">
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div>
          <p className="text-base font-black text-foreground">ESNCE</p>
          <p className="mt-1">Wear Your Essence.</p>
        </div>
        <div className="grid grid-cols-3 gap-x-10 gap-y-1">
          <a href="#">Shop</a>
          <a href="#">Lookbook</a>
          <a href="#">Stockists</a>
          <a href="#">Shipping</a>
          <a href="#">Returns</a>
          <a href="#">Contact</a>
        </div>
      </div>

      {/* Socials */}
      <ul className="mt-8 flex flex-wrap items-center justify-center gap-3">
        {SOCIALS.map((s) => (
          <li key={s.label}>
            <a
              href={s.href}
              aria-label={s.label}
              target="_blank"
              rel="noreferrer"
              className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-foreground hover:text-background"
            >
              {s.icon}
            </a>
          </li>
        ))}
      </ul>

      <p className="mt-6 text-center">© {new Date().getFullYear()} Essence Apparel Co.</p>
    </footer>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
      <path d="M16.5 3a5.5 5.5 0 0 0 4.5 4.5v3a8.5 8.5 0 0 1-4.5-1.3v6.3a6 6 0 1 1-6-6c.3 0 .7 0 1 .1v3.1a3 3 0 1 0 2 2.8V3h3z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
      <path d="M18.244 2H21l-6.49 7.41L22 22h-6.79l-4.74-6.2L4.96 22H2.2l6.95-7.94L2 2h6.91l4.29 5.66L18.24 2zm-1.19 18h1.86L7.07 4H5.1l11.95 16z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
      <path d="M20.5 3.5A10.5 10.5 0 0 0 3.6 16.3L2 22l5.9-1.5A10.5 10.5 0 1 0 20.5 3.5zM12 20.1a8.1 8.1 0 0 1-4.1-1.1l-.3-.2-3.5.9.9-3.4-.2-.3A8.1 8.1 0 1 1 12 20.1zm4.6-6c-.3-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.3-.7.8-.8 1-.2.2-.3.2-.5.1a6.6 6.6 0 0 1-3.3-2.9c-.2-.4.2-.4.6-1.2.1-.1 0-.3 0-.4l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3a2.7 2.7 0 0 0-.9 2c0 1.2.9 2.4 1 2.5.1.2 1.7 2.7 4.2 3.8 1.6.6 2.2.7 2.9.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3z" />
    </svg>
  );
}

