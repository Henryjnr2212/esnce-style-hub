import { Link } from "@tanstack/react-router";
import { Search, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-store";

type Props = {
  variant?: "search" | "brand";
  title?: string;
};

export function TopBar({ variant = "brand", title }: Props) {
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-30 bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
        <Link to="/" className="flex items-baseline gap-1.5">
          <span className="text-lg font-black tracking-tight">ESNCE</span>
          <span className="hidden text-[10px] font-medium uppercase tracking-[0.25em] text-muted-foreground sm:inline">
            Essence
          </span>
        </Link>

        {variant === "search" ? (
          <Link
            to="/shop"
            className="flex h-11 flex-1 max-w-xl items-center gap-3 rounded-full border border-border bg-card px-4 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <Search className="h-4 w-4" strokeWidth={1.75} />
            <span>Find your hoodie</span>
          </Link>
        ) : title ? (
          <h1 className="truncate text-sm font-semibold">{title}</h1>
        ) : (
          <div />
        )}

        <Link
          to="/cart"
          aria-label="Cart"
          className="relative grid h-11 w-11 place-items-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-foreground hover:text-background"
        >
          <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.75} />
          {totalItems > 0 && (
            <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-foreground px-1 text-[10px] font-semibold text-background ring-2 ring-background">
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
