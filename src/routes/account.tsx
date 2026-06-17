import { createFileRoute, Link } from "@tanstack/react-router";
import { Package, Heart, Settings, LogIn } from "lucide-react";
import { TopBar } from "@/components/top-bar";

export const Route = createFileRoute("/account")({
  head: () => ({ meta: [{ title: "Account — ESSENCE" }] }),
  component: Account,
});

function Account() {
  return (
    <div className="mx-auto max-w-md px-5">
      <TopBar variant="brand" title="Account" />
      <div className="mt-2 rounded-3xl border border-border bg-card p-6 text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-foreground text-background">
          <LogIn className="h-5 w-5" />
        </div>
        <h1 className="mt-4 text-lg font-bold">Sign in to ESNCE</h1>
        <p className="mt-1 text-xs text-muted-foreground">
          Track orders, manage your wishlist, and check out faster.
        </p>
        <button
          disabled
          className="mt-5 h-11 w-full rounded-full bg-foreground text-sm font-semibold text-background opacity-60"
        >
          Sign in (Stage 2)
        </button>
        <p className="mt-2 text-[11px] text-muted-foreground">
          Authentication ships in the next stage with Lovable Cloud.
        </p>
      </div>

      <ul className="mt-6 space-y-2">
        {[
          { icon: Package, label: "Orders", to: "/account" },
          { icon: Heart, label: "Wishlist", to: "/wishlist" },
          { icon: Settings, label: "Profile & preferences", to: "/account" },
        ].map(({ icon: Icon, label, to }) => (
          <li key={label}>
            <Link
              to={to}
              className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 text-sm font-medium transition-colors hover:bg-muted"
            >
              <Icon className="h-4 w-4" strokeWidth={1.75} />
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
