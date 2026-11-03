import { notFound } from "next/navigation";
import { MapPin, Truck } from "lucide-react";
import { getProduct, products } from "@/lib/data";
import { discountPct } from "@/lib/format";
import { ProductImage } from "@/components/ProductArt";
import { Price, Rating } from "@/components/ui";
import { FavButton, ProductBuy, Details } from "./parts";

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export default async function ProductPage({ params }: PageProps<"/product/[id]">) {
  const { id } = await params;
  const p = getProduct(id);
  if (!p) notFound();
  const pct = discountPct(p.price, p.oldPrice);

  return (
    <main className="pb-10">
      <section className="relative bg-[radial-gradient(70%_60%_at_50%_55%,#ffffff_0%,#eef4e8_100%)] pt-[env(safe-area-inset-top)]">
        <FavButton name={p.name} />
        <div className="flex h-[300px] items-center justify-center pt-8">
          <ProductImage product={p} className="h-[230px] w-[200px] drop-shadow-[0_18px_20px_rgb(34_80_31/0.18)]" priority />
        </div>
      </section>

      <section className="-mt-5 rounded-t-[28px] bg-mist px-5 pt-6">
        <div dir="ltr">
          <h1 className="text-[20px] font-semibold">{p.name}</h1>
          <p className="mt-0.5 text-[13px] text-muted">
            {p.brand}, {p.size}
          </p>
          <div className="mt-2">
            <Rating value={p.rating} reviews={p.reviews} />
          </div>
        </div>

        <div className="mt-4 flex items-end justify-between" dir="ltr">
          <div>
            {p.oldPrice && <s className="num block text-[13px] text-muted">EGP {p.oldPrice}</s>}
            <Price value={p.price} className="text-[26px] text-forest" />
          </div>
          {pct > 0 && (
            <span dir="rtl" className="mb-1.5 rounded-full bg-forest px-3 py-1 text-[12px] font-semibold text-white">
              خصم <span className="num">{pct}%</span>
            </span>
          )}
        </div>

        <p className="mt-4 text-[14px] leading-7 text-ink/80">{p.description}</p>

        <ul className="mt-4 flex flex-col gap-2 text-[13px]">
          <li className="flex items-center gap-2">
            <MapPin className="size-4 text-forest" />
            متوفر في جميع الفروع
          </li>
          <li className="flex items-center gap-2">
            <Truck className="size-4 text-forest" />
            توصيل خلال 24 ساعة داخل القاهرة
          </li>
        </ul>

        <ProductBuy id={p.id} />

        <Details
          sections={[
            { title: "تفاصيل المنتج", body: p.description },
            { title: "المكونات", body: p.ingredients },
            { title: "طريقة الاستخدام", body: p.usage },
          ]}
        />
      </section>
    </main>
  );
}
