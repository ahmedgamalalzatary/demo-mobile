"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { getProduct, order } from "@/lib/data";
import { ProductImage } from "@/components/ProductArt";
import { Price } from "@/components/ui";

export function OrderItems() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="mt-4 flex h-11 w-full items-center justify-center gap-1.5 rounded-xl border border-line text-[13px] font-medium text-forest"
      >
        {open ? "إخفاء المنتجات" : "عرض المنتجات"}
        <ChevronDown className={`size-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <ul className="mt-3 divide-y divide-line">
          {order.items.map((it) => {
            const p = getProduct(it.id)!;
            return (
              <li key={it.id} dir="ltr" className="flex items-center gap-3 py-2.5">
                <div className="grid size-12 place-items-center rounded-lg bg-mist">
                  <ProductImage product={p} className="h-10" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px]">{p.name}</p>
                  <p className="num text-[11.5px] text-muted">× {it.qty}</p>
                </div>
                <Price value={p.price * it.qty} className="text-[13px]" />
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
