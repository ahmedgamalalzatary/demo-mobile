import Link from "next/link";
import type { Product } from "@/lib/data";
import { ProductImage } from "./ProductArt";
import { AddButton, Price, Rating } from "./ui";

/** Product names are Latin, so the row reads left-to-right like the mockup. */
export function ProductRow({ p }: { p: Product }) {
  return (
    <Link href={`/product/${p.id}`} dir="ltr" className="flex gap-3 rounded-2xl border border-line bg-white p-2.5 shadow-soft">
      <div className="grid size-[92px] shrink-0 place-items-center rounded-xl bg-mist">
        <ProductImage product={p} className="h-[80px]" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col py-0.5">
        <p className="truncate text-[13.5px] font-medium">{p.name}</p>
        <p className="text-[11.5px] text-muted">{p.size}</p>
        <div className="mt-1">
          <Rating value={p.rating} reviews={p.reviews} />
        </div>
        <div className="mt-auto flex items-end justify-between">
          <div className="flex items-baseline gap-2">
            <Price value={p.price} className="text-[14px]" />
            {p.oldPrice && <s className="num text-[11px] text-muted">{p.oldPrice}</s>}
          </div>
          <AddButton id={p.id} name={p.name} />
        </div>
      </div>
    </Link>
  );
}
