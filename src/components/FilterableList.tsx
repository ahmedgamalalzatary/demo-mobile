"use client";

import { useMemo, useState } from "react";
import { Search, SearchX } from "lucide-react";
import type { Product } from "@/lib/data";
import { ProductRow } from "./ProductRow";

export function FilterableList({
  items,
  chips,
  placeholder,
  autoFocus = false,
}: {
  items: Product[];
  chips?: string[];
  placeholder: string;
  autoFocus?: boolean;
}) {
  const [q, setQ] = useState("");
  const [chip, setChip] = useState("الكل");

  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return items.filter(
      (p) =>
        (chip === "الكل" || p.tag === chip) &&
        (!needle || p.name.toLowerCase().includes(needle) || p.brand.toLowerCase().includes(needle) || p.description.includes(needle)),
    );
  }, [items, q, chip]);

  return (
    <>
      <div className="px-4">
        <label className="flex h-12 items-center gap-2 rounded-2xl border border-line bg-white px-4 shadow-soft focus-within:border-leaf">
          <Search className="size-[18px] shrink-0" strokeWidth={1.8} />
          <span className="sr-only">بحث</span>
          <input
            type="search"
            value={q}
            autoFocus={autoFocus}
            onChange={(e) => setQ(e.target.value)}
            placeholder={placeholder}
            className="h-full w-full bg-transparent text-[13.5px] outline-none placeholder:text-muted"
          />
        </label>
      </div>

      {chips && (
        <div role="tablist" aria-label="تصفية" className="no-scrollbar flex gap-2 overflow-x-auto px-4 pt-3 pb-1">
          {["الكل", ...chips].map((c) => (
            <button
              key={c}
              role="tab"
              aria-selected={chip === c}
              onClick={() => setChip(c)}
              className={`h-9 shrink-0 rounded-full px-4 text-[12.5px] font-medium transition-colors ${
                chip === c ? "bg-forest text-white" : "border border-line bg-white text-ink"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      )}

      <ul className="flex flex-col gap-3 px-4 pt-3 pb-4">
        {shown.map((p) => (
          <li key={p.id}>
            <ProductRow p={p} />
          </li>
        ))}
      </ul>

      {shown.length === 0 && (
        <div className="flex flex-col items-center px-8 pt-10 text-center">
          <SearchX className="size-10 text-sprout" strokeWidth={1.5} />
          <p className="mt-3 font-semibold">لا توجد نتائج</p>
          <p className="mt-1 text-[13px] text-muted">جرّب اسم منتج أو علامة تجارية أخرى، أو اختر &laquo;الكل&raquo;.</p>
        </div>
      )}
    </>
  );
}
