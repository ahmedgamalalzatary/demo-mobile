import Link from "next/link";
import { categories, products } from "@/lib/data";
import { ProductArt } from "@/components/ProductArt";
import { CategoryIcon } from "@/components/CategoryIcon";
import { BottomNav, TopBar } from "@/components/ui";

function countLabel(n: number) {
  if (n === 1) return "منتج واحد";
  if (n === 2) return "منتجان";
  if (n >= 3 && n <= 10) return `${n} منتجات`;
  return `${n} منتج`;
}

export default function CategoriesPage() {
  return (
    <main>
      <TopBar title="الأقسام" back={false} />
      <ul className="grid grid-cols-2 gap-3 px-4 pt-1">
        {categories.map((c) => {
          const sample = products.find((p) => p.category === c.slug) ?? products[0];
          const count = products.filter((p) => p.category === c.slug).length;
          return (
            <li key={c.slug}>
              <Link href={`/category/${c.slug}`} className="relative flex h-[132px] flex-col justify-between overflow-hidden rounded-2xl p-3.5" style={{ background: c.tint }}>
                <span className="grid size-9 place-items-center rounded-full bg-white/80 text-forest">
                  <CategoryIcon icon={c.icon} className="size-[18px]" />
                </span>
                <div className="relative z-10 pe-14">
                  <p className="text-[14px] leading-snug font-semibold">{c.name}</p>
                  <p className="text-[11.5px] text-muted">{countLabel(count)}</p>
                </div>
                <ProductArt art={sample.art} className="absolute -bottom-1 left-1 h-[84px] opacity-95" />
              </Link>
            </li>
          );
        })}
      </ul>
      <BottomNav />
    </main>
  );
}
