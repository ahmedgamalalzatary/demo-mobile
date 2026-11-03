"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Sprig } from "@/components/Leaves";

export default function Splash() {
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/home");
    const t = setTimeout(() => router.replace("/home"), 2600);
    return () => clearTimeout(t);
  }, [router]);

  return (
    <main
      onClick={() => router.replace("/home")}
      className="relative flex min-h-dvh cursor-pointer flex-col items-center justify-center overflow-hidden bg-[radial-gradient(120%_80%_at_50%_45%,#ffffff_0%,#f1f6ec_60%,#e3eed8_100%)]"
    >
      <Sprig className="anim-sway pointer-events-none absolute -top-6 -left-10 w-56 origin-top-left" />
      <Sprig flip className="anim-sway pointer-events-none absolute -right-14 -bottom-16 w-52 origin-bottom-right" />

      <div className="anim-rise flex flex-col items-center">
        <Image src="/logo-lockup.png" alt="روشتة صيدليات" width={470} height={670} priority className="h-auto w-44" />
        <p className="mt-8 text-[22px] font-light tracking-wide text-forest-deep">صحتك تهمنا</p>
      </div>

      <div className="absolute bottom-[calc(56px+env(safe-area-inset-bottom))] h-[3px] w-24 overflow-hidden rounded-full bg-forest/15">
        <div className="anim-load h-full w-full rounded-full bg-forest" />
      </div>
    </main>
  );
}
