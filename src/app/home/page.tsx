import Link from "next/link";
import { Bell, ChevronDown, MapPin, Search } from "lucide-react";
import { categories, featuredSections, getProduct, products } from "@/lib/data";
import { discountPct } from "@/lib/format";
import { ProductArt, ProductImage } from "@/components/ProductArt";
import { CategoryIcon } from "@/components/CategoryIcon";
import { AddButton, BottomNav, Price, SectionHead } from "@/components/ui";

export default function HomePage() {
  const quick = ["cosmetics", "skincare", "vitamins", "haircare"].map((s) => categories.find((c) => c.slug === s)!);
  const offers = products.filter((p) => p.oldPrice);

  return (
    <main>
      {/* Header */}
      <header className="flex items-center justify-between px-4 pt-[calc(14px+env(safe-area-inset-top))] pb-3">
        <Link href="/branches" className="flex items-center gap-1.5 rounded-full py-1 text-[14px] font-semibold text-forest">
          <MapPin className="size-[18px] fill-forest text-white" strokeWidth={2} />
          فرع مدينة نصر
          <ChevronDown className="size-4" />
        </Link>
        <button aria-label="الإشعارات" className="relative grid size-10 place-items-center rounded-full text-ink active:bg-mint">
          <Bell className="size-[22px]" strokeWidth={1.7} />
          <span className="absolute top-2 right-2.5 size-2 rounded-full border-2 border-mist bg-sale" />
        </button>
      </header>

      <div className="px-4">
        <Link
          href="/search"
          className="flex h-12 items-center gap-2 rounded-2xl border border-line bg-white px-4 text-[13px] text-muted shadow-soft"
        >
          <Search className="size-[18px] text-ink" strokeWidth={1.8} />
          ابحث عن منتج، علامة تجارية أو أي كلمة...
        </Link>
      </div>

      {/* Hero offer */}
      <section className="px-4 pt-4">
        <Link
          href="/category/skincare"
          className="relative flex h-[164px] overflow-hidden rounded-3xl bg-[linear-gradient(115deg,#dcebcd_0%,#eef5e6_55%,#f8fbf4_100%)]"
        >
          <svg viewBox="0 0 200 200" className="absolute -bottom-10 left-16 w-40 text-leaf/25" aria-hidden>
            <path d="M100 190 C 60 140, 40 80, 100 10 C 160 80, 140 140, 100 190 Z" fill="currentColor" />
          </svg>
          <div className="relative z-10 flex flex-1 flex-col justify-center gap-1 ps-5">
            <h2 className="text-[19px] font-bold text-forest-deep">عناية ببشرتك</h2>
            <p className="text-[12.5px] text-ink/75">خصومات تصل إلى</p>
            <p className="num -mt-1 text-start text-[44px] leading-none font-bold text-forest">50%</p>
            <span className="mt-2 w-fit rounded-full bg-forest px-4 py-1.5 text-[12px] font-semibold text-white">تسوق الآن</span>
          </div>
          <div className="relative flex w-[46%] items-end justify-center pb-3">
            <ProductArt art={{ kind: "pump", body: "#f7efe9", accent: "#c98a6b", label: "" }} className="relative z-10 -me-4 h-[120px]" />
            <ProductArt art={{ kind: "dropper", body: "#f3e3d6", accent: "#b9785a", label: "" }} className="relative z-20 h-[92px]" />
            <ProductArt art={{ kind: "jar", body: "#fbf6f2", accent: "#d9a58a", label: "" }} className="relative z-30 -ms-3 h-[62px]" />
          </div>
        </Link>
      </section>

      {/* Quick categories */}
      <nav aria-label="الأقسام" className="grid grid-cols-4 gap-2 px-4 pt-5">
        {quick.map((c) => (
          <Link key={c.slug} href={`/category/${c.slug}`} className="flex flex-col items-center gap-2 text-center">
            <span className="grid size-[60px] place-items-center rounded-full border border-line bg-white text-forest shadow-soft">
              <CategoryIcon icon={c.icon} className="size-6" />
            </span>
            <span className="text-[11.5px] leading-tight font-medium">{c.name}</span>
          </Link>
        ))}
      </nav>

      {/* Featured sections */}
      <section className="px-4 pt-7">
        <SectionHead title="أقسام مميزة" href="/categories" />
        <div className="grid grid-cols-3 gap-2.5">
          {featuredSections.map((s) => {
            const tint = categories.find((c) => c.slug === s.slug)!.tint;
            return (
              <Link key={s.slug} href={`/category/${s.slug}`} className="group">
                <div className="flex h-[104px] items-end justify-center overflow-hidden rounded-2xl pb-2" style={{ background: tint }}>
                  {s.productIds.map((id, i) => {
                    const p = getProduct(id)!;
                    return <ProductArt key={id} art={p.art} className={`-mx-1.5 ${i === 1 ? "relative z-10 h-[80px]" : "h-[62px]"}`} />;
                  })}
                </div>
                <p className="mt-2 text-center text-[12.5px] font-medium">{s.title}</p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Offers */}
      <section className="pt-7">
        <div className="px-4">
          <SectionHead title="العروض الحالية" href="/category/skincare" />
        </div>
        <ul className="no-scrollbar flex snap-x gap-3 overflow-x-auto px-4 pb-2">
          {offers.map((p) => (
            <li key={p.id} className="w-[156px] shrink-0 snap-start">
              <Link href={`/product/${p.id}`} className="block rounded-2xl border border-line bg-white p-2.5 shadow-soft">
                <div className="relative flex h-[118px] items-center justify-center rounded-xl bg-mist">
                  <span className="absolute top-2 right-2 rounded-lg bg-sale px-2 py-1 text-[11px] leading-none font-semibold text-white">
                    خصم <span className="num">{discountPct(p.price, p.oldPrice)}%</span>
                  </span>
                  <ProductImage product={p} className="h-[96px]" />
                </div>
                <p className="mt-2 line-clamp-1 text-start text-[12.5px] font-medium" dir="ltr">
                  {p.name}
                </p>
                <div className="mt-1.5 flex items-center justify-between">
                  <div className="flex flex-col">
                    <Price value={p.price} className="text-[13.5px] text-forest" />
                    <s className="num text-[11px] text-muted">{p.oldPrice}</s>
                  </div>
                  <AddButton id={p.id} name={p.name} />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <BottomNav />
    </main>
  );
}
