import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ShieldCheck, Lock } from "lucide-react";
import { TopBar } from "@/components/top-bar";
import { useCart } from "@/lib/cart-store";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — ESSENCE" }] }),
  component: Checkout,
});

function Checkout() {
  const { resolved, subtotal, clear } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState<"ship" | "pay" | "review">("ship");
  const [placed, setPlaced] = useState(false);
  const shipping = subtotal >= 120 || subtotal === 0 ? 0 : 12;
  const total = subtotal + shipping;

  if (placed) {
    return (
      <div className="mx-auto max-w-md px-5">
        <TopBar variant="brand" title="Order Confirmed" />
        <div className="mt-10 rounded-3xl border border-border bg-card p-8 text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-foreground text-background">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h1 className="mt-4 text-xl font-bold">Thanks for your order</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            A confirmation will be emailed shortly. (Demo — no payment was charged.)
          </p>
          <button
            onClick={() => {
              clear();
              navigate({ to: "/" });
            }}
            className="mt-6 h-11 w-full rounded-full bg-foreground text-sm font-semibold text-background"
          >
            Back to home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-5">
      <TopBar variant="brand" title="Checkout" />

      {/* Stepper */}
      <ol className="mt-2 flex items-center gap-2 text-xs">
        {(["ship", "pay", "review"] as const).map((s, i) => (
          <li key={s} className="flex items-center gap-2">
            <span
              className={`grid h-6 w-6 place-items-center rounded-full text-[10px] font-bold ${
                step === s ? "bg-foreground text-background" : "border border-border text-muted-foreground"
              }`}
            >
              {i + 1}
            </span>
            <span className={step === s ? "font-semibold" : "text-muted-foreground"}>
              {s === "ship" ? "Shipping" : s === "pay" ? "Payment" : "Review"}
            </span>
            {i < 2 && <span className="mx-1 text-muted-foreground">—</span>}
          </li>
        ))}
      </ol>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (step === "ship") setStep("pay");
            else if (step === "pay") setStep("review");
            else setPlaced(true);
          }}
          className="space-y-5"
        >
          {step === "ship" && (
            <Card title="Shipping address">
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Full name" required />
                <Field label="Email" type="email" required />
                <Field label="Address" className="sm:col-span-2" required />
                <Field label="City" required />
                <Field label="Postal code" required />
                <Field label="Country" defaultValue="United States" required />
                <Field label="Phone" type="tel" />
              </div>
            </Card>
          )}

          {step === "pay" && (
            <Card title="Payment">
              <div className="grid gap-3">
                <Field label="Card number" placeholder="4242 4242 4242 4242" required />
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Expiry" placeholder="MM / YY" required />
                  <Field label="CVC" placeholder="123" required />
                </div>
                <Field label="Name on card" required />
              </div>
              <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                <Lock className="h-3 w-3" /> Demo only — Stripe wires up in Stage 2.
              </p>
            </Card>
          )}

          {step === "review" && (
            <Card title="Review">
              <ul className="space-y-2 text-sm">
                {resolved.map(({ item, product }) => (
                  <li key={`${item.productId}-${item.size}-${item.color}`} className="flex justify-between">
                    <span>
                      {product.name} · {item.size} · {item.color} × {item.qty}
                    </span>
                    <span>${(product.price * item.qty).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}

          <div className="flex gap-3">
            {step !== "ship" && (
              <button
                type="button"
                onClick={() => setStep(step === "review" ? "pay" : "ship")}
                className="h-12 flex-1 rounded-full border border-border bg-card text-sm font-semibold"
              >
                Back
              </button>
            )}
            <button
              type="submit"
              className="h-12 flex-1 rounded-full bg-foreground text-sm font-semibold text-background"
            >
              {step === "review" ? "Place order" : "Continue"}
            </button>
          </div>
        </form>

        <aside className="rounded-3xl border border-border bg-card p-5 h-fit">
          <h3 className="text-sm font-semibold">Order summary</h3>
          <div className="mt-3 space-y-1.5 text-sm">
            <Row label={`Subtotal (${resolved.length} item${resolved.length === 1 ? "" : "s"})`} value={`$${subtotal.toFixed(2)}`} />
            <Row label="Shipping" value={shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`} />
            <div className="my-2 border-t border-border" />
            <Row label="Total" value={`$${total.toFixed(2)}`} strong />
          </div>
        </aside>
      </div>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-3xl border border-border bg-card p-5">
      <h3 className="mb-4 text-sm font-semibold">{title}</h3>
      {children}
    </section>
  );
}

function Field({
  label,
  className = "",
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <input
        {...props}
        className="h-11 w-full rounded-2xl border border-border bg-background px-4 text-sm outline-none focus:border-foreground"
      />
    </label>
  );
}

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className={`flex justify-between ${strong ? "text-base font-bold" : "text-muted-foreground"}`}>
      <span>{label}</span>
      <span className={strong ? "" : "text-foreground"}>{value}</span>
    </div>
  );
}
