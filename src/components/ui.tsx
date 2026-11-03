"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronRight, Home, LayoutGrid, Minus, Plus, ReceiptText, ShoppingBag, Star, UserRound } from "lucide-react";
import { useCart } from "./CartProvider";
import { price } from "@/lib/format";

/* ---------- Top bar: back chevron sits on the right in RTL ---------- */
export function TopBar({ title, end, back = true }: { title: string; end?: React.ReactNode; back?: boolean }) {
  const router = useRouter();
  return (
    <header className="sticky top-0 z-30 grid h-14 grid-cols-[44px_1fr_44px] items-center bg-mist/90 px-3 backdrop-blur-md">
      {back ? (
        <button
          aria-label="رجوع"
          onClick={() => (history.length > 1 ? router.back() : router.push("/home"))}
          className="grid size-10 place-items-center rounded-full text-ink active:bg-mint"
        >
          <ChevronRight className="size-6" strokeWidth={2} />
        </button>
      ) : (
        <span />
      )}
      <h1 className="text-center text-[17px] font-semibold">{title}</h1>
      <div className="flex justify-end">{end}</div>
    </header>
  );
}

/* ---------- Bottom tab bar ---------- */
const tabs = [
  { href: "/home", label: "الرئيسية", Icon: Home, match: ["/home", "/search"] },
  { href: "/categories", label: "الأقسام", Icon: LayoutGrid, match: ["/categories", "/category", "/product"] },
  { href: "/cart", label: "السلة", Icon: ShoppingBag, match: ["/cart", "/checkout"] },
  { href: "/orders", label: "الطلبات", Icon: ReceiptText, match: ["/orders"] },
  { href: "/account", label: "حسابي", Icon: UserRound, match: ["/account", "/loyalty", "/branches"] },
];

export function BottomNav() {
  const path = usePathname();
  const { count } = useCart();
  return (
    <>
      <div className="h-[84px]" aria-hidden />
      <nav
        aria-label="التنقل الرئيسي"
        className="fixed inset-x-0 bottom-0 z-40 mx-auto max-w-[440px] border-t border-line bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md"
      >
        <ul className="grid grid-cols-5">
          {tabs.map(({ href, label, Icon, match }) => {
            const active = match.some((m) => path.startsWith(m));
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`relative flex h-16 flex-col items-center justify-center gap-1 text-[11px] ${active ? "font-semibold text-forest" : "text-muted"}`}
                >
                  {active && <span className="absolute top-0 h-[3px] w-8 rounded-b-full bg-forest" />}
                  <span className="relative">
                    <Icon className="size-[22px]" strokeWidth={active ? 2.2 : 1.7} fill={active ? "currentColor" : "none"} fillOpacity={active ? 0.14 : 0} />
                    {href === "/cart" && count > 0 && (
                      <span className="num absolute -top-1.5 -right-2 grid min-w-4 place-items-center rounded-full bg-sale px-1 text-[10px] leading-4 font-semibold text-white">
                        {count}
                      </span>
                    )}
                  </span>
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}

/* ---------- Small pieces ---------- */
export function Price({ value, className = "" }: { value: number; className?: string }) {
  return <span className={`num font-semibold ${className}`}>{price(value)}</span>;
}

export function Rating({ value, reviews }: { value: number; reviews: number }) {
  return (
    <span className="num inline-flex items-center gap-1 text-[12px] text-muted">
      <Star className="size-3.5 fill-star text-star" />
      <span className="font-medium text-ink">{value}</span>
      <span>({reviews})</span>
    </span>
  );
}

export function QtyStepper({ value, onChange, size = "md" }: { value: number; onChange: (n: number) => void; size?: "sm" | "md" }) {
  const s = size === "sm" ? "size-7" : "size-10";
  return (
    <div className="inline-flex items-center rounded-full border border-line bg-white">
      <button aria-label="زيادة الكمية" onClick={() => onChange(value + 1)} className={`${s} grid place-items-center rounded-full text-forest active:bg-mint`}>
        <Plus className="size-4" />
      </button>
      <span className="num min-w-7 text-center text-[14px] font-semibold" aria-live="polite">
        {value}
      </span>
      <button aria-label="تقليل الكمية" onClick={() => onChange(value - 1)} className={`${s} grid place-items-center rounded-full text-muted active:bg-mint`}>
        <Minus className="size-4" />
      </button>
    </div>
  );
}

export function AddButton({ id, name }: { id: string; name: string }) {
  const { add, notify } = useCart();
  return (
    <button
      aria-label={`أضف ${name} إلى السلة`}
      onClick={(e) => {
        e.preventDefault();
        add(id);
        notify("أضيف إلى السلة");
      }}
      className="grid size-8 place-items-center rounded-full bg-forest text-white shadow-soft transition active:scale-90"
    >
      <Plus className="size-4.5" strokeWidth={2.5} />
    </button>
  );
}

export function SectionHead({ title, href }: { title: string; href?: string }) {
  return (
    <div className="mb-3 flex items-baseline justify-between">
      <h2 className="text-[16px] font-semibold">{title}</h2>
      {href && (
        <Link href={href} className="text-[12.5px] font-medium text-forest">
          عرض الكل
        </Link>
      )}
    </div>
  );
}
