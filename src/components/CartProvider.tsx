"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import { getProduct } from "@/lib/data";

type Line = { id: string; qty: number };

type CartCtx = {
  lines: Line[];
  count: number;
  subtotal: number;
  savings: number;
  add: (id: string, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  toast: string | null;
  notify: (msg: string) => void;
};

const Ctx = createContext<CartCtx | null>(null);

// Seeded so the demo opens with the cart from the mockup
const seed: Line[] = [
  { id: "effaclar-gel", qty: 1 },
  { id: "solgar-vitc", qty: 1 },
  { id: "sunscreen-spf50", qty: 1 },
];

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<Line[]>(seed);
  const [toast, setToast] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const notify = useCallback((msg: string) => {
    setToast(msg);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(null), 1800);
  }, []);

  const add = useCallback((id: string, qty = 1) => {
    setLines((ls) => {
      const hit = ls.find((l) => l.id === id);
      return hit ? ls.map((l) => (l.id === id ? { ...l, qty: l.qty + qty } : l)) : [...ls, { id, qty }];
    });
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setLines((ls) => (qty <= 0 ? ls.filter((l) => l.id !== id) : ls.map((l) => (l.id === id ? { ...l, qty } : l))));
  }, []);

  const remove = useCallback((id: string) => setLines((ls) => ls.filter((l) => l.id !== id)), []);
  const clear = useCallback(() => setLines([]), []);

  const value = useMemo(() => {
    let count = 0,
      subtotal = 0,
      savings = 0;
    for (const l of lines) {
      const p = getProduct(l.id);
      if (!p) continue;
      count += l.qty;
      subtotal += p.price * l.qty;
      if (p.oldPrice) savings += (p.oldPrice - p.price) * l.qty;
    }
    return { lines, count, subtotal, savings, add, setQty, remove, clear, toast, notify };
  }, [lines, add, setQty, remove, clear, toast, notify]);

  return (
    <Ctx.Provider value={value}>
      {children}
      {toast && (
        <div
          role="status"
          className="anim-toast fixed bottom-28 left-1/2 z-50 -translate-x-1/2 rounded-full bg-forest-deep px-4 py-2.5 text-[13px] font-medium whitespace-nowrap text-white shadow-lift"
        >
          {toast}
        </div>
      )}
    </Ctx.Provider>
  );
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used inside CartProvider");
  return c;
}
