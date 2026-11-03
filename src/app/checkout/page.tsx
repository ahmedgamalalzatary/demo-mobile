"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Banknote, Check, CreditCard, House, Store, Wallet } from "lucide-react";
import { getProduct, user } from "@/lib/data";
import { useCart } from "@/components/CartProvider";
import { Price, TopBar } from "@/components/ui";

const steps = ["العنوان", "الدفع", "المراجعة"];
const DELIVERY_FEE = 35;

export default function CheckoutPage() {
  const router = useRouter();
  const { lines, subtotal, clear } = useCart();
  const [step, setStep] = useState(1); // address is prefilled, so we open on payment like the mockup
  const [delivery, setDelivery] = useState<"home" | "pickup">("home");
  const [pay, setPay] = useState<"card" | "wallet" | "cod">("card");

  const fee = delivery === "home" ? DELIVERY_FEE : 0;
  const total = subtotal + fee;

  return (
    <main className="pb-32">
      <TopBar title="إتمام الطلب" />

      {/* Stepper — a real sequence, so it earns its markers */}
      <ol className="relative mx-8 mt-2 mb-6 flex justify-between">
        <span className="absolute inset-x-4 top-3 h-0.5 bg-line" aria-hidden />
        <span
          className="absolute top-3 right-4 h-0.5 bg-forest transition-all duration-500"
          style={{ width: `calc((100% - 2rem) * ${step / (steps.length - 1)})` }}
          aria-hidden
        />
        {steps.map((s, i) => (
          <li key={s} className="relative flex flex-col items-center gap-1.5" aria-current={i === step ? "step" : undefined}>
            <span
              className={`grid size-6 place-items-center rounded-full border-2 ${
                i < step ? "border-forest bg-forest text-white" : i === step ? "border-forest bg-white" : "border-line bg-white"
              }`}
            >
              {i < step ? <Check className="size-3.5" strokeWidth={3} /> : i === step && <span className="size-2.5 rounded-full bg-forest" />}
            </span>
            <span className={`text-[11.5px] ${i <= step ? "font-medium text-ink" : "text-muted"}`}>{s}</span>
          </li>
        ))}
      </ol>

      {step < 2 ? (
        <div className="flex flex-col gap-6 px-4">
          <Group title="طريقة التوصيل">
            <Option name="delivery" checked={delivery === "home"} onChange={() => setDelivery("home")} icon={<House />} title="توصيل للمنزل" sub="خلال 24 ساعة، رسوم التوصيل EGP 35" />
            <Option name="delivery" checked={delivery === "pickup"} onChange={() => setDelivery("pickup")} icon={<Store />} title="الاستلام من الفرع" sub="جاهز خلال ساعة من فرع مدينة نصر" />
          </Group>

          {delivery === "home" && (
            <Group title="عنوان التوصيل">
              <div className="flex items-start gap-3 rounded-2xl border-2 border-forest bg-white p-4">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border-2 border-forest">
                  <span className="size-2.5 rounded-full bg-forest" />
                </span>
                <div className="flex-1">
                  <p className="text-[14px] font-semibold">{user.address.title}</p>
                  <p className="mt-0.5 text-[12.5px] text-muted">{user.address.line}</p>
                </div>
                <button className="text-[12.5px] font-medium text-forest">تغيير العنوان</button>
              </div>
            </Group>
          )}

          <Group title="طريقة الدفع">
            <Option name="pay" checked={pay === "card"} onChange={() => setPay("card")} icon={<CreditCard />} title="بطاقة بنكية" sub="Visa، Mastercard، ميزة" />
            <Option name="pay" checked={pay === "wallet"} onChange={() => setPay("wallet")} icon={<Wallet />} title="محفظة إلكترونية" sub="فودافون كاش، إنستاباي" />
            <Option name="pay" checked={pay === "cod"} onChange={() => setPay("cod")} icon={<Banknote />} title="الدفع عند الاستلام" sub="نقدًا أو بالبطاقة عند التسليم" />
          </Group>
        </div>
      ) : (
        <div className="flex flex-col gap-4 px-4">
          <Group title="المنتجات">
            <ul className="divide-y divide-line rounded-2xl border border-line bg-white px-4">
              {lines.map((l) => {
                const p = getProduct(l.id)!;
                return (
                  <li key={l.id} dir="ltr" className="flex items-center justify-between py-3 text-[13px]">
                    <span className="truncate">
                      <span className="num text-muted">{l.qty}×</span> {p.name}
                    </span>
                    <Price value={p.price * l.qty} className="ms-3 shrink-0" />
                  </li>
                );
              })}
            </ul>
          </Group>
          <dl className="flex flex-col gap-2 rounded-2xl border border-line bg-white p-4 text-[13.5px]">
            <Row k="المجموع الفرعي" v={subtotal} />
            <Row k="التوصيل" v={fee} />
            <div className="my-1 h-px bg-line" />
            <Row k="الإجمالي" v={total} strong />
          </dl>
          <p className="text-[12.5px] text-muted">
            {delivery === "home" ? `يصل إلى ${user.address.title} — ${user.address.line}` : "استلام من فرع مدينة نصر"}، والدفع{" "}
            {pay === "card" ? "ببطاقة بنكية" : pay === "wallet" ? "بمحفظة إلكترونية" : "عند الاستلام"}
          </p>
        </div>
      )}

      <div className="fixed inset-x-0 bottom-0 z-30 mx-auto max-w-[440px] border-t border-line bg-white/95 px-4 pt-3 pb-[calc(12px+env(safe-area-inset-bottom))] backdrop-blur-md">
        <button
          disabled={lines.length === 0}
          onClick={() => {
            if (step < 2) return setStep(2);
            clear();
            router.push("/orders/10234");
          }}
          className="flex h-[52px] w-full items-center justify-between rounded-2xl bg-forest px-5 text-[15px] font-semibold text-white shadow-lift active:bg-forest-deep disabled:opacity-40"
        >
          <span>{step < 2 ? "متابعة الدفع" : "تأكيد الطلب"}</span>
          <Price value={total} className="text-[14px] font-medium text-white/85" />
        </button>
      </div>
    </main>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="flex flex-col gap-2.5">
      <legend className="mb-2.5 text-[15px] font-semibold">{title}</legend>
      {children}
    </fieldset>
  );
}

function Option({
  name,
  checked,
  onChange,
  icon,
  title,
  sub,
}: {
  name: string;
  checked: boolean;
  onChange: () => void;
  icon: React.ReactElement;
  title: string;
  sub: string;
}) {
  return (
    <label
      className={`flex cursor-pointer items-center gap-3 rounded-2xl border bg-white p-4 transition-colors has-focus-visible:outline-2 has-focus-visible:outline-leaf ${
        checked ? "border-forest ring-1 ring-forest" : "border-line"
      }`}
    >
      <input type="radio" name={name} checked={checked} onChange={onChange} className="sr-only" />
      <span className={`grid size-5 shrink-0 place-items-center rounded-full border-2 ${checked ? "border-forest" : "border-line"}`}>
        {checked && <span className="size-2.5 rounded-full bg-forest" />}
      </span>
      <span className="flex-1">
        <span className="block text-[14px] font-medium">{title}</span>
        <span className="block text-[12px] text-muted">{sub}</span>
      </span>
      <span className={`[&>svg]:size-5 [&>svg]:stroke-[1.7] ${checked ? "text-forest" : "text-muted"}`}>{icon}</span>
    </label>
  );
}

function Row({ k, v, strong }: { k: string; v: number; strong?: boolean }) {
  return (
    <div className="flex justify-between">
      <dt className={strong ? "font-semibold" : "text-muted"}>{k}</dt>
      <dd>{v === 0 ? <span className="text-forest">مجاني</span> : <Price value={v} className={strong ? "text-[16px]" : "font-medium"} />}</dd>
    </div>
  );
}
