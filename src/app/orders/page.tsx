import Link from "next/link";
import { ChevronLeft, Package, PackageCheck } from "lucide-react";
import { pastOrders } from "@/lib/data";
import { BottomNav, Price, TopBar } from "@/components/ui";

export default function OrdersPage() {
  return (
    <main>
      <TopBar title="طلباتي" back={false} />
      <ul className="flex flex-col gap-3 px-4 pt-1">
        {pastOrders.map((o) => (
          <li key={o.id}>
            <Link href={`/orders/${o.id}`} className="flex items-center gap-3 rounded-2xl border border-line bg-white p-4 shadow-soft">
              <span className={`grid size-11 shrink-0 place-items-center rounded-full ${o.active ? "bg-forest text-white" : "bg-mint text-forest"}`}>
                {o.active ? <Package className="size-5" strokeWidth={1.8} /> : <PackageCheck className="size-5" strokeWidth={1.8} />}
              </span>
              <div className="flex-1">
                <p className="text-[14px] font-semibold">
                  طلب <span className="num">#{o.id}</span>
                </p>
                <p className="mt-0.5 text-[12px] text-muted">
                  {o.date} - <span className="num">{o.items}</span> منتجات
                </p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${o.active ? "bg-mint text-forest" : "bg-mist text-muted"}`}>{o.status}</span>
                <Price value={o.total} className="text-[13px]" />
              </div>
              <ChevronLeft className="size-4 text-muted" />
            </Link>
          </li>
        ))}
      </ul>
      <BottomNav />
    </main>
  );
}
