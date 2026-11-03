import Image from "next/image";
import { Crown, Gift, Lock, TicketPercent } from "lucide-react";
import { rewards, user } from "@/lib/data";
import { BottomNav, TopBar } from "@/components/ui";

export default function LoyaltyPage() {
  const next = rewards.find((r) => r.points > user.points)!;
  const pct = Math.round((user.points / next.points) * 100);

  return (
    <main>
      <TopBar title="نقاط الولاء" />

      <section className="relative mx-4 overflow-hidden rounded-3xl bg-[linear-gradient(150deg,#3b7a36_0%,#22501f_100%)] p-5 text-white shadow-lift">
        <Image src="/logo-mark.png" alt="" width={435} height={485} className="pointer-events-none absolute -bottom-10 -left-8 w-40 opacity-[0.12] brightness-0 invert" />
        <div className="relative flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-full bg-white/15">
            <Crown className="size-[22px]" strokeWidth={1.7} />
          </span>
          <div>
            <p className="text-[13px] text-white/75">{user.name}</p>
            <p className="text-[12px] text-white/60">عضو فضي</p>
          </div>
        </div>
        <p className="relative mt-5 flex items-baseline gap-2">
          <span className="num text-[44px] leading-none font-bold">{user.points}</span>
          <span className="text-[16px] font-medium">نقطة</span>
        </p>
        <div className="relative mt-4 h-2 overflow-hidden rounded-full bg-white/20" role="progressbar" aria-valuenow={user.points} aria-valuemax={next.points} aria-label="التقدم نحو المكافأة التالية">
          <div className="h-full rounded-full bg-sprout" style={{ width: `${pct}%` }} />
        </div>
        <p className="relative mt-2.5 text-[12.5px] text-white/80">
          تحتاج <span className="num font-semibold text-white">{next.points - user.points}</span> نقطة إضافية للحصول على {next.title}
        </p>
      </section>

      <section className="px-4 pt-7">
        <h2 className="mb-3 text-[16px] font-semibold">مكافآت نقاط الولاء</h2>
        <ul className="flex flex-col gap-2.5">
          {rewards.map((r) => {
            const ready = user.points >= r.points;
            return (
              <li key={r.id} className="flex items-center gap-3 rounded-2xl border border-line bg-white p-4">
                <span className="grid size-10 place-items-center rounded-xl bg-mint text-forest">
                  {r.icon === "gift" ? <Gift className="size-5" strokeWidth={1.7} /> : <TicketPercent className="size-5" strokeWidth={1.7} />}
                </span>
                <span className="flex-1 text-[14px] font-medium">{r.title}</span>
                <span className="flex items-center gap-1.5 text-[12.5px] text-muted">
                  {!ready && <Lock className="size-3.5" />}
                  <span className="num font-semibold text-ink">{r.points}</span> نقطة
                </span>
              </li>
            );
          })}
        </ul>

        <div className="mt-5 flex items-center gap-3 rounded-2xl border border-dashed border-sprout bg-mint/60 p-4">
          <Gift className="size-6 shrink-0 text-forest" strokeWidth={1.6} />
          <p className="text-[12.5px] leading-6 text-ink/80">
            تحصل على نقطة عن كل <span className="num">10</span> جنيه تدفعها. كل عملية شراء تقرّبك من مكافأتك التالية.
          </p>
        </div>
      </section>

      <BottomNav />
    </main>
  );
}
