"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingBag, Trash2, X } from "lucide-react";
import { getProduct } from "@/lib/data";
import { useCart } from "@/components/CartProvider";
import { ProductImage } from "@/components/ProductArt";
import { BottomNav, Price, QtyStepper, TopBar } from "@/components/ui";

const COUPON = "ROSHTA10";

export default function CartPage() {
  const { lines, subtotal, setQty, remove, clear } = useCart();
  const [code, setCode] = useState("");
  const [applied, setApplied] = useState(false);
  const [error, setError] = useState("");

  const discount = applied ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal - discount;

  if (lines.length === 0) {
    return (
      <main>
        <TopBar title="السلة" back={false} />
        <div className="flex flex-col items-center px-10 pt-24 text-center">
          <span className="grid size-20 place-items-center rounded-full bg-mint text-forest">
            <ShoppingBag className="size-9" strokeWidth={1.5} />
          </span>
          <p className="mt-5 text-[17px] font-semibold">سلتك فارغة</p>
          <p className="mt-1.5 text-[13.5px] text-muted">أضف الفيتامينات ومنتجات العناية التي تحتاجها وستظهر هنا.</p>
          <Link href="/home" className="mt-6 rounded-2xl bg-forest px-8 py-3.5 text-[14px] font-semibold text-white">
            تصفح المنتجات
          </Link>
        </div>
        <BottomNav />
      </main>
    );
  }

  return (
    <main className="pb-[172px]">
      <TopBar
        title="السلة"
        back={false}
        end={
          <button onClick={clear} className="flex items-center gap-1 text-[12px] whitespace-nowrap text-muted">
            <Trash2 className="size-4" /> مسح الكل
          </button>
        }
      />

      <ul className="flex flex-col gap-3 px-4">
        {lines.map((l) => {
          const p = getProduct(l.id)!;
          return (
            <li key={l.id} dir="ltr" className="relative flex gap-3 rounded-2xl border border-line bg-white p-2.5 shadow-soft">
              <Link href={`/product/${p.id}`} className="grid size-[84px] shrink-0 place-items-center rounded-xl bg-mist">
                <ProductImage product={p} className="h-[72px]" />
              </Link>
              <div className="flex min-w-0 flex-1 flex-col py-0.5 pe-6">
                <p className="truncate text-[13.5px] font-medium">{p.name}</p>
                <p className="text-[11.5px] text-muted">
                  {p.brand !== p.name.split(" ")[0] ? `${p.brand} - ` : ""}
                  {p.size}
                </p>
                <div className="mt-auto flex items-end justify-between">
                  <Price value={p.price * l.qty} className="text-[14px] text-forest" />
                  <div dir="rtl">
                    <QtyStepper size="sm" value={l.qty} onChange={(n) => setQty(l.id, n)} />
                  </div>
                </div>
              </div>
              <button aria-label={`حذف ${p.name}`} onClick={() => remove(l.id)} className="absolute top-2 right-2 grid size-7 place-items-center rounded-full text-muted active:bg-mint">
                <X className="size-4" />
              </button>
            </li>
          );
        })}
      </ul>

      <section className="px-4 pt-6">
        <h2 className="mb-2 text-[15px] font-semibold">كوبون خصم</h2>
        <form
          className="flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            if (code.trim().toUpperCase() === COUPON) {
              setApplied(true);
              setError("");
            } else {
              setApplied(false);
              setError(`الكود غير صحيح. جرّب ${COUPON} في هذا العرض التجريبي.`);
            }
          }}
        >
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="أدخل كود الخصم"
            aria-label="كود الخصم"
            className="h-12 flex-1 rounded-2xl border border-line bg-white px-4 text-[13.5px] outline-none focus:border-leaf"
          />
          <button className="h-12 rounded-2xl bg-forest px-6 text-[14px] font-semibold text-white">تطبيق</button>
        </form>
        {error && <p className="mt-2 text-[12px] text-sale">{error}</p>}
        {applied && <p className="mt-2 text-[12px] text-forest">تم تطبيق خصم 10% على طلبك.</p>}
      </section>

      <div className="fixed inset-x-0 bottom-[calc(64px+env(safe-area-inset-bottom))] z-30 mx-auto max-w-[440px] border-t border-line bg-white/95 px-4 pt-3 pb-3 backdrop-blur-md">
        <div className="mb-3 flex items-end justify-between">
          <span className="text-[14px] font-medium">إجمالي الطلب</span>
          <div className="text-end" dir="ltr">
            {discount > 0 && <s className="num block text-[12px] text-muted">EGP {subtotal.toLocaleString("en-US")}</s>}
            <Price value={total} className="text-[20px]" />
          </div>
        </div>
        <Link href="/checkout" className="flex h-[52px] items-center justify-center rounded-2xl bg-forest text-[15px] font-semibold text-white shadow-lift active:bg-forest-deep">
          إتمام الشراء
        </Link>
      </div>

      <BottomNav />
    </main>
  );
}
