import { Link, useRouterState } from "@tanstack/react-router";
import { Home, ShoppingBag, Heart, User } from "lucide-react";
import { useCart } from "@/lib/cart-store";

const items = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/shop", icon: ShoppingBag, label: "Shop" },
  { to: "/wishlist", icon: Heart, label: "Wishlist" },
  { to: "/account", icon: User, label: "Account" },
] as const;

export function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { totalItems } = useCart();

  return (
    <nav
      className="fixed bottom-3 left-1/2 z-40 -translate-x-1/2 sm:bottom-5"
      aria-label="Primary"
    >
      <div className="flex items-center gap-1 rounded-full border border-border bg-card/95 px-2 py-2 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.25)] backdrop-blur">
        {items.map(({ to, icon: Icon, label }) => {
          const active = to === "/" ? pathname === "/" : pathname.startsWith(to);
          return (
            <Link
              key={to}
              to={to}
              aria-label={label}
              className={`relative grid h-11 w-11 place-items-center rounded-full transition-colors ${
                active ? "bg-foreground text-background" : "text-foreground/70 hover:text-foreground"
              }`}
            >
              <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
              {to === "/shop" && totalItems > 0 && (
                <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-foreground px-1 text-[10px] font-semibold text-background ring-2 ring-card">
                  {totalItems}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
