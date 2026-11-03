import { notFound } from "next/navigation";
import { Check, Truck } from "lucide-react";
import { order, pastOrders } from "@/lib/data";
import { Price, TopBar } from "@/components/ui";
import { OrderItems } from "./items";

export function generateStaticParams() {
  return pastOrders.map((o) => ({ id: o.id }));
}

export default async function OrderPage({ params }: PageProps<"/orders/[id]">) {
  const { id } = await params;
  const summary = pastOrders.find((o) => o.id === id);
  if (!summary) notFound();

  // Only the live order has a timeline in the demo; past ones show as delivered
  const steps = summary.active ? order.steps : order.steps.map((s) => ({ ...s, done: true, current: false, time: s.time || "5:20 م" }));
  const current = steps.find((s) => "current" in s && s.current);

  return (
    <main className="pb-10">
      <TopBar title="تفاصيل الطلب" />

      <section className="mx-4 rounded-2xl border border-line bg-white p-4">
        <div className="flex items-center justify-between">
          <p className="num text-[18px] font-semibold">#{summary.id}</p>
          <span className={`rounded-full px-3 py-1 text-[12px] font-medium ${summary.active ? "bg-forest text-white" : "bg-mint text-forest"}`}>{summary.status}</span>
        </div>
        <p className="mt-1 text-[12.5px] text-muted">
          {summary.date} - {order.time}
        </p>
        {current && (
          <div className="mt-4 flex items-center gap-3 rounded-xl bg-mint p-3">
            <Truck className="size-5 text-forest" strokeWidth={1.8} />
            <p className="text-[13px]">المندوب في الطريق إليك، الوصول المتوقع خلال 30 دقيقة.</p>
          </div>
        )}
      </section>

      <ol className="mx-4 mt-4 rounded-2xl border border-line bg-white px-5 py-5">
        {steps.map((s, i) => {
          const last = i === steps.length - 1;
          const isCurrent = "current" in s && s.current;
          return (
            <li key={s.title} className="relative flex gap-4 pb-6 last:pb-0">
              {!last && <span className={`absolute top-6 right-[11px] bottom-0 w-0.5 ${steps[i + 1].done ? "bg-forest" : "bg-line"}`} aria-hidden />}
              <span
                className={`relative z-10 grid size-6 shrink-0 place-items-center rounded-full ${
                  s.done ? "bg-forest text-white" : "border-2 border-line bg-white"
                } ${isCurrent ? "ring-4 ring-forest/20" : ""}`}
              >
                {s.done && <Check className="size-3.5" strokeWidth={3} />}
              </span>
              <div className="-mt-0.5">
                <p className={`text-[14px] ${s.done ? "font-medium" : "text-muted"}`}>{s.title}</p>
                {s.time && <p className="mt-0.5 text-[12px] text-muted">{s.time}</p>}
              </div>
            </li>
          );
        })}
      </ol>

      <section className="mx-4 mt-4 rounded-2xl border border-line bg-white p-4">
        <div className="flex items-center justify-between">
          <span className="text-[14px] font-medium">إجمالي الطلب</span>
          <Price value={summary.total} className="text-[18px]" />
        </div>
        <OrderItems />
      </section>
    </main>
  );
}
