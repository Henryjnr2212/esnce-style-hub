import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Search, X } from "lucide-react";
import { z } from "zod";
import { TopBar } from "@/components/top-bar";
import { ProductCard } from "@/components/product-card";
import { CATEGORIES, filterProducts, PRODUCTS } from "@/lib/products";

const searchSchema = z.object({
  category: z.string().optional(),
  q: z.string().optional(),
});

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — ESSENCE" },
      { name: "description", content: "Browse the full ESNCE collection: hoodies, tees, sweatshirts, tracksuits and more." },
      { property: "og:title", content: "Shop — ESSENCE" },
    ],
  }),
  validateSearch: searchSchema,
  component: Shop,
});

const ALL_SIZES = Array.from(new Set(PRODUCTS.flatMap((p) => p.sizes)));
const ALL_COLORS = Array.from(
  new Map(PRODUCTS.flatMap((p) => p.colors).map((c) => [c.name, c])).values(),
);

function Shop() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();

  const [query, setQuery] = useState(search.q ?? "");
  const [size, setSize] = useState<string | undefined>();
  const [color, setColor] = useState<string | undefined>();
  const [maxPrice, setMaxPrice] = useState<number>(200);
  const [sort, setSort] = useState<"new" | "price-asc" | "price-desc">("new");

  const category = search.category ?? "all";

  const products = useMemo(() => {
    let list = filterProducts({
      category: category === "all" ? undefined : CATEGORIES.find((c) => c.slug === category)?.label,
      query,
      size,
      color,
      maxPrice,
    });
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [category, query, size, color, maxPrice, sort]);

  return (
    <div className="mx-auto max-w-6xl px-5">
      <TopBar variant="brand" title="Shop" />

      {/* Search */}
      <div className="mt-2 flex h-12 items-center gap-3 rounded-full border border-border bg-card px-4">
        <Search className="h-4 w-4 text-muted-foreground" strokeWidth={1.75} />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Find your hoodie"
          className="h-full flex-1 bg-transparent text-sm outline-none"
        />
      </div>

      {/* Category pills */}
      <div className="-mx-5 mt-4 overflow-x-auto px-5 no-scrollbar">
        <div className="flex gap-2">
          {[{ slug: "all", label: "All" }, ...CATEGORIES].map((c) => {
            const active = category === c.slug;
            return (
              <button
                key={c.slug}
                onClick={() => navigate({ search: (prev: z.infer<typeof searchSchema>) => ({ ...prev, category: c.slug === "all" ? undefined : c.slug }) })}
                className={`shrink-0 rounded-full border px-4 py-2 text-xs font-medium transition-colors ${
                  active
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-card text-foreground/80 hover:text-foreground"
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter dropdowns */}
      <div className="mt-4 flex flex-wrap gap-2">
        <FilterDropdown
          label="Size"
          value={size}
          onClear={() => setSize(undefined)}
        >
          <div className="flex flex-wrap gap-1.5">
            {ALL_SIZES.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s === size ? undefined : s)}
                className={`pill ${size === s ? "pill-active" : ""}`}
              >
                {s}
              </button>
            ))}
          </div>
        </FilterDropdown>

        <FilterDropdown
          label="Colour"
          value={color}
          onClear={() => setColor(undefined)}
        >
          <div className="flex flex-wrap gap-1.5">
            {ALL_COLORS.map((c) => (
              <button
                key={c.name}
                onClick={() => setColor(c.name === color ? undefined : c.name)}
                className={`flex items-center gap-1.5 pill ${color === c.name ? "pill-active" : ""}`}
              >
                <span className="h-3 w-3 rounded-full ring-1 ring-border" style={{ background: c.hex }} />
                {c.name}
              </button>
            ))}
          </div>
        </FilterDropdown>

        <FilterDropdown
          label="Max"
          value={maxPrice < 250 ? `$${maxPrice}` : undefined}
          onClear={() => setMaxPrice(250)}
        >
          <div className="w-56">
            <div className="mb-2 flex justify-between text-[11px] text-muted-foreground">
              <span>$30</span>
              <span className="font-semibold text-foreground">${maxPrice}</span>
              <span>$250</span>
            </div>
            <input
              type="range"
              min={30}
              max={250}
              step={5}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-foreground"
            />
          </div>
        </FilterDropdown>

        <FilterDropdown
          label="Sort"
          value={sort !== "new" ? (sort === "price-asc" ? "Low → High" : "High → Low") : undefined}
          onClear={() => setSort("new")}
        >
          <div className="flex flex-col">
            {([
              ["new", "Newest"],
              ["price-asc", "Price: Low to High"],
              ["price-desc", "Price: High to Low"],
            ] as const).map(([v, l]) => (
              <button
                key={v}
                onClick={() => setSort(v)}
                className={`rounded-lg px-3 py-2 text-left text-xs ${
                  sort === v ? "bg-foreground text-background" : "hover:bg-muted"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </FilterDropdown>
      </div>

      {/* Results */}
      <p className="mt-6 text-xs text-muted-foreground">{products.length} products</p>
      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
      {products.length === 0 && (
        <div className="mt-12 rounded-3xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
          No products match these filters.
        </div>
      )}

      <style>{`
        .pill {
          display: inline-flex; align-items: center;
          padding: 0.35rem 0.75rem;
          border-radius: 9999px;
          border: 1px solid var(--color-border);
          background: var(--color-card);
          font-size: 0.7rem;
          font-weight: 500;
          color: var(--color-foreground);
        }
        .pill-active { background: var(--color-foreground); color: var(--color-background); border-color: var(--color-foreground); }
      `}</style>
    </div>
  );
}

function FilterDropdown({
  label,
  value,
  onClear,
  children,
}: {
  label: string;
  value?: string;
  onClear: () => void;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  const active = !!value;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className={`inline-flex h-9 items-center gap-1.5 rounded-full border px-3.5 text-xs font-medium transition-colors ${
          active
            ? "border-foreground bg-foreground text-background"
            : "border-border bg-card text-foreground hover:border-foreground"
        }`}
      >
        <span>{label}</span>
        {value && <span className="opacity-80">· {value}</span>}
        {active ? (
          <span
            onClick={(e) => {
              e.stopPropagation();
              onClear();
            }}
            className="ml-0.5 grid h-4 w-4 cursor-pointer place-items-center rounded-full hover:bg-background/20"
            aria-label={`Clear ${label}`}
          >
            <X className="h-3 w-3" />
          </span>
        ) : (
          <ChevronDown className="h-3.5 w-3.5" />
        )}
      </button>
      {open && (
        <div className="absolute left-0 top-[calc(100%+6px)] z-40 min-w-[14rem] rounded-2xl border border-border bg-popover p-3 shadow-lg">
          {children}
        </div>
      )}
    </div>
  );
}
