import Link from "next/link";
import { Bell, ChevronLeft, CircleHelp, Gift, Heart, Info, LogOut, MapPin, ReceiptText, Settings, Store, UserRound } from "lucide-react";
import { user } from "@/lib/data";
import { BottomNav } from "@/components/ui";

const menu = [
  { href: "/orders", label: "طلباتي", Icon: ReceiptText },
  { href: "/account", label: "عناويني", Icon: MapPin },
  { href: "/loyalty", label: "نقاط الولاء", Icon: Gift, badge: `${user.points} نقطة` },
  { href: "/branches", label: "فروعنا", Icon: Store },
  { href: "/account", label: "المفضلة", Icon: Heart },
  { href: "/account", label: "الإشعارات", Icon: Bell },
  { href: "/chat", label: "الدعم والمساعدة", Icon: CircleHelp, badge: "تحدث مع صيدلي" },
  { href: "/account", label: "عن روشتة صيدليات", Icon: Info },
];

export default function AccountPage() {
  return (
    <main>
      <header className="relative flex flex-col items-center px-4 pt-[calc(20px+env(safe-area-inset-top))] pb-6">
        <button aria-label="الإعدادات" className="absolute top-[calc(12px+env(safe-area-inset-top))] left-3 grid size-10 place-items-center rounded-full active:bg-mint">
          <Settings className="size-[22px]" strokeWidth={1.7} />
        </button>
        <span className="grid size-[84px] place-items-center rounded-full bg-[linear-gradient(160deg,#6a9b45,#22501f)] text-white ring-4 ring-white">
          <UserRound className="size-11" strokeWidth={1.5} />
        </span>
        <h1 className="mt-3 text-[18px] font-semibold">{user.name}</h1>
        <p className="num mt-0.5 text-[13.5px] text-muted">{user.phone}</p>
      </header>

      <ul className="mx-4 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-white">
        {menu.map(({ href, label, Icon, badge }) => (
          <li key={label}>
            <Link href={href} className="flex h-[54px] items-center gap-3 px-4 active:bg-mist">
              <Icon className="size-5 text-forest" strokeWidth={1.7} />
              <span className="flex-1 text-[14px]">{label}</span>
              {badge && <span className="rounded-full bg-mint px-2.5 py-0.5 text-[12px] font-semibold text-forest">{badge}</span>}
              <ChevronLeft className="size-4 text-muted" />
            </Link>
          </li>
        ))}
      </ul>

      <Link href="/" className="mx-auto mt-6 flex w-fit items-center gap-2 rounded-full px-4 py-2 text-[14px] font-medium text-sale active:bg-sale/10">
        <LogOut className="size-[18px] -scale-x-100" />
        تسجيل الخروج
      </Link>

      <BottomNav />
    </main>
  );
}
