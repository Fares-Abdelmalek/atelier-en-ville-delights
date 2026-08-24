import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { menuItems, type MenuItem } from "./menu";

export type OrderMode = "emporter" | "sur-place";

export type CartLine = { id: string; qty: number };

type CartContextValue = {
  lines: CartLine[];
  mode: OrderMode;
  setMode: (mode: OrderMode) => void;
  add: (id: string) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  detailed: { item: MenuItem; qty: number }[];
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "atelier-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [mode, setMode] = useState<OrderMode>("emporter");

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as { lines?: CartLine[]; mode?: OrderMode };
      if (Array.isArray(parsed.lines)) {
        setLines(parsed.lines.filter((l) => typeof l?.id === "string" && Number.isFinite(l?.qty) && l.qty > 0));
      }
      if (parsed.mode === "emporter" || parsed.mode === "sur-place") setMode(parsed.mode);
    } catch {
      /* ignore corrupted storage */
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ lines, mode }));
    } catch {
      /* storage unavailable */
    }
  }, [lines, mode]);

  const value = useMemo<CartContextValue>(() => {
    const detailed = lines
      .map((line) => {
        const item = menuItems.find((m) => m.id === line.id);
        return item ? { item, qty: line.qty } : null;
      })
      .filter((v): v is { item: MenuItem; qty: number } => v !== null);

    return {
      lines,
      mode,
      setMode,
      add: (id) =>
        setLines((prev) => {
          const existing = prev.find((l) => l.id === id);
          if (existing) return prev.map((l) => (l.id === id ? { ...l, qty: Math.min(l.qty + 1, 20) } : l));
          return [...prev, { id, qty: 1 }];
        }),
      remove: (id) => setLines((prev) => prev.filter((l) => l.id !== id)),
      setQty: (id, qty) =>
        setLines((prev) =>
          qty <= 0
            ? prev.filter((l) => l.id !== id)
            : prev.map((l) => (l.id === id ? { ...l, qty: Math.min(qty, 20) } : l)),
        ),
      clear: () => setLines([]),
      count: detailed.reduce((sum, l) => sum + l.qty, 0),
      subtotal: detailed.reduce((sum, l) => sum + l.item.price * l.qty, 0),
      detailed,
    };
  }, [lines, mode]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
