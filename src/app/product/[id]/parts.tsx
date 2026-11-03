"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, ChevronDown, ChevronRight, Heart } from "lucide-react";
import { useCart } from "@/components/CartProvider";
import { QtyStepper } from "@/components/ui";

export function FavButton({ name }: { name: string }) {
  const router = useRouter();
  const [fav, setFav] = useState(false);
  return (
    <div className="absolute inset-x-0 top-[env(safe-area-inset-top)] z-10 flex items-center justify-between px-3 pt-2">
      <button
        aria-label="رجوع"
        onClick={() => (history.length > 1 ? router.back() : router.push("/home"))}
        className="grid size-10 place-items-center rounded-full bg-white/70 backdrop-blur active:bg-mint"
      >
        <ChevronRight className="size-6" />
      </button>
      <button
        aria-label={fav ? `إزالة ${name} من المفضلة` : `إضافة ${name} إلى المفضلة`}
        aria-pressed={fav}
        onClick={() => setFav((f) => !f)}
        className="grid size-10 place-items-center rounded-full bg-white/70 backdrop-blur active:bg-mint"
      >
        <Heart className={`size-[22px] transition ${fav ? "scale-110 fill-sale text-sale" : "text-ink"}`} strokeWidth={1.8} />
      </button>
    </div>
  );
}

export function ProductBuy({ id }: { id: string }) {
  const { add, notify } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  return (
    <div className="mt-6 flex flex-col gap-3">
      <div className="self-start">
        <QtyStepper value={qty} onChange={(n) => setQty(Math.max(1, n))} />
      </div>
      <button
        onClick={() => {
          add(id, qty);
          setAdded(true);
          notify(`أضيف ${qty} إلى السلة`);
          setTimeout(() => setAdded(false), 1600);
        }}
        className="flex h-[52px] items-center justify-center gap-2 rounded-2xl bg-forest text-[15px] font-semibold text-white shadow-lift transition active:scale-[0.98] active:bg-forest-deep"
      >
        {added ? (
          <>
            <Check className="size-5" /> أضيف إلى السلة
          </>
        ) : (
          "أضف إلى السلة"
        )}
      </button>
    </div>
  );
}

export function Details({ sections }: { sections: { title: string; body: string }[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="mt-5 divide-y divide-line border-t border-line">
      {sections.map((s, i) => (
        <div key={s.title}>
          <button
            aria-expanded={open === i}
            onClick={() => setOpen(open === i ? null : i)}
            className="flex h-14 w-full items-center justify-between text-[14.5px] font-medium"
          >
            {s.title}
            <ChevronDown className={`size-5 text-muted transition-transform ${open === i ? "rotate-180" : ""}`} />
          </button>
          <div className={`grid transition-[grid-template-rows] duration-300 ${open === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
            <p className="overflow-hidden text-[13.5px] leading-7 text-ink/75">
              <span className="block pb-4">{s.body}</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
