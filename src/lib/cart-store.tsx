import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { PRODUCTS, type Product } from "./products";

export type CartItem = {
  productId: string;
  size: string;
  color: string;
  qty: number;
};

type CartContextValue = {
  items: CartItem[];
  add: (item: CartItem) => void;
  updateQty: (productId: string, size: string, color: string, qty: number) => void;
  remove: (productId: string, size: string, color: string) => void;
  clear: () => void;
  totalItems: number;
  subtotal: number;
  resolved: { item: CartItem; product: Product }[];
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "esnce_cart_v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
      if (raw) setItems(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  }, [items]);

  const value = useMemo<CartContextValue>(() => {
    const resolved = items
      .map((item) => {
        const product = PRODUCTS.find((p) => p.id === item.productId);
        return product ? { item, product } : null;
      })
      .filter((x): x is { item: CartItem; product: Product } => !!x);

    return {
      items,
      add: (next) =>
        setItems((prev) => {
          const idx = prev.findIndex(
            (i) => i.productId === next.productId && i.size === next.size && i.color === next.color,
          );
          if (idx >= 0) {
            const copy = [...prev];
            copy[idx] = { ...copy[idx], qty: copy[idx].qty + next.qty };
            return copy;
          }
          return [...prev, next];
        }),
      updateQty: (productId, size, color, qty) =>
        setItems((prev) =>
          prev
            .map((i) =>
              i.productId === productId && i.size === size && i.color === color ? { ...i, qty } : i,
            )
            .filter((i) => i.qty > 0),
        ),
      remove: (productId, size, color) =>
        setItems((prev) =>
          prev.filter((i) => !(i.productId === productId && i.size === size && i.color === color)),
        ),
      clear: () => setItems([]),
      totalItems: resolved.reduce((s, r) => s + r.item.qty, 0),
      subtotal: resolved.reduce((s, r) => s + r.item.qty * r.product.price, 0),
      resolved,
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
