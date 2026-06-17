import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Minus, Plus, Trash2, Tag, ArrowLeft, X } from "lucide-react";
import { TopBar } from "@/components/top-bar";
import { ProductVisual } from "@/components/product-visual";
import { useCart } from "@/lib/cart-store";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Cart — ESSENCE" }] }),
  component: CartPage,
});


const COUPONS: Record<string, number> = {
  ESNCE10: 0.1,
  WELCOME: 0.15,
};

function CartPage() {
  const { resolved, subtotal, updateQty, remove, totalItems } = useCart();
  const [coupon, setCoupon] = useState("");
  const [applied, setApplied] = useState<{ code: string; pct: number } | null>(null);

  const discount = applied ? subtotal * applied.pct : 0;
  const shipping = subtotal === 0 ? 0 : subtotal - discount >= 120 ? 0 : 12;
  const total = Math.max(0, subtotal - discount + shipping);

  return (
    <div className="mx-auto max-w-3xl px-5">
      <TopBar variant="brand" title="Cart" />

      {/* Continue shopping / close */}
      <div className="mt-2 flex items-center justify-between">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Continue shopping
        </button>
        <Link
          to="/"
          aria-label="Close cart"
          className="grid h-8 w-8 place-items-center rounded-full border border-border bg-card text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </Link>
      </div>

      <h1 className="mt-4 text-2xl font-bold">Your Bag</h1>
      <p className="text-xs text-muted-foreground">
        {totalItems} item{totalItems === 1 ? "" : "s"} · saved while you browse
      </p>


      {resolved.length === 0 ? (
        <div className="mt-10 rounded-3xl border border-dashed border-border p-10 text-center">
          <p className="text-sm text-muted-foreground">Your bag is empty.</p>
          <Link to="/shop" className="mt-4 inline-block rounded-full bg-foreground px-6 py-2.5 text-sm font-semibold text-background">
            Browse the collection
          </Link>
        </div>
      ) : (
        <>
          <ul className="mt-5 space-y-3">
            {resolved.map(({ item, product }) => (
              <li
                key={`${item.productId}-${item.size}-${item.color}`}
                className="flex gap-3 rounded-3xl border border-border bg-card p-3"
              >
                <ProductVisual swatch={product.swatch} image={product.image} alt={product.name} className="h-24 w-24 shrink-0" rounded="2xl" />
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <Link to="/product/$slug" params={{ slug: product.slug }} className="truncate text-sm font-semibold">
                        {product.name}
                      </Link>
                      <p className="text-xs text-muted-foreground">
                        Size {item.size} · {item.color}
                      </p>
                    </div>
                    <button
                      onClick={() => remove(item.productId, item.size, item.color)}
                      className="grid h-8 w-8 place-items-center rounded-full text-muted-foreground hover:text-foreground"
                      aria-label="Remove"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-2">
                    <div className="inline-flex items-center gap-1 rounded-full border border-border px-2 py-1">
                      <button
                        onClick={() => updateQty(item.productId, item.size, item.color, item.qty - 1)}
                        className="grid h-7 w-7 place-items-center rounded-full hover:bg-muted"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-5 text-center text-xs font-semibold">{item.qty}</span>
                      <button
                        onClick={() => updateQty(item.productId, item.size, item.color, item.qty + 1)}
                        className="grid h-7 w-7 place-items-center rounded-full hover:bg-muted"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <span className="text-sm font-semibold">${product.price * item.qty}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/* Coupon */}
          <div className="mt-6 rounded-3xl border border-border bg-card p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Promo code</p>
            <div className="mt-2 flex gap-2">
              <div className="flex h-11 flex-1 items-center gap-2 rounded-full border border-border bg-background px-4">
                <Tag className="h-4 w-4 text-muted-foreground" />
                <input
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value.toUpperCase())}
                  placeholder="ESNCE10"
                  className="h-full flex-1 bg-transparent text-sm outline-none"
                />
              </div>
              <button
                onClick={() => {
                  const pct = COUPONS[coupon];
                  if (pct) setApplied({ code: coupon, pct });
                  else setApplied(null);
                }}
                className="h-11 rounded-full bg-foreground px-5 text-sm font-semibold text-background"
              >
                Apply
              </button>
            </div>
            {applied && (
              <p className="mt-2 text-xs text-emerald-700">
                {applied.code} applied — {applied.pct * 100}% off
              </p>
            )}
            {!applied && coupon && !COUPONS[coupon] && (
              <p className="mt-2 text-xs text-destructive">Code not recognised. Try ESNCE10.</p>
            )}
          </div>

          {/* Summary */}
          <div className="mt-6 rounded-3xl border border-border bg-card p-5">
            <Row label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
            {discount > 0 && <Row label="Discount" value={`- $${discount.toFixed(2)}`} />}
            <Row label="Shipping" value={shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`} />
            <div className="my-3 border-t border-border" />
            <Row label="Total" value={`$${total.toFixed(2)}`} strong />
            <Link
              to="/checkout"
              className="mt-5 grid h-12 place-items-center rounded-full bg-foreground text-sm font-semibold text-background"
            >
              Secure Checkout
            </Link>
            <Link to="/shop" className="mt-3 block text-center text-xs text-muted-foreground underline">
              Continue shopping
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className={`flex justify-between py-1 text-sm ${strong ? "text-base font-bold" : ""}`}>
      <span className={strong ? "" : "text-muted-foreground"}>{label}</span>
      <span>{value}</span>
    </div>
  );
}
