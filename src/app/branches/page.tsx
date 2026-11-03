"use client";

import { useState } from "react";
import { Clock, MapPin, Navigation } from "lucide-react";
import { branches } from "@/lib/data";
import { BottomNav, TopBar } from "@/components/ui";

export default function BranchesPage() {
  const [sel, setSel] = useState(branches[0].id);
  const active = branches.find((b) => b.id === sel)!;

  return (
    <main>
      <TopBar title="الفروع" />

      <section className="relative mx-4 h-[230px] overflow-hidden rounded-3xl border border-line bg-[#eef1ea]">
        <CityMap />
        {branches.map((b) => (
          <button
            key={b.id}
            aria-label={b.name}
            aria-pressed={b.id === sel}
            onClick={() => setSel(b.id)}
            className="absolute -translate-x-1/2 -translate-y-full transition-transform"
            style={{ left: `${b.pin.x}%`, top: `${b.pin.y}%` }}
          >
            <MapPin className={`drop-shadow ${b.id === sel ? "size-10 fill-forest text-white" : "size-7 fill-leaf text-white"}`} strokeWidth={1.5} />
          </button>
        ))}
        {/* the user's location */}
        <span className="absolute size-3.5 rounded-full border-2 border-white bg-[#2f7fc9] shadow ring-6 ring-[#2f7fc9]/20" style={{ left: "64%", top: "78%" }} aria-hidden />

        <div className="absolute top-3 right-3 max-w-[60%] rounded-2xl bg-forest-deep/95 px-3.5 py-2.5 text-white shadow-lift">
          <p className="text-[11px] text-white/70">{active.id === branches[0].id ? "أقرب فرع لك" : "الفرع المختار"}</p>
          <p className="text-[13px] font-semibold">{active.name}</p>
          <p className="text-[11.5px] text-white/80">
            <span className="num">{active.distanceKm}</span> كم
          </p>
        </div>
      </section>

      <ul className="flex flex-col gap-3 px-4 pt-4">
        {branches.map((b, i) => (
          <li key={b.id}>
            <button
              onClick={() => setSel(b.id)}
              className={`flex w-full gap-3 rounded-2xl border bg-white p-3 text-start shadow-soft transition-colors ${b.id === sel ? "border-forest ring-1 ring-forest" : "border-line"}`}
            >
              <Storefront variant={i} />
              <div className="flex min-w-0 flex-1 flex-col">
                <p className="flex items-center gap-1.5 text-[14px] font-semibold">
                  <MapPin className="size-4 text-forest" />
                  {b.name}
                </p>
                <p className="mt-0.5 truncate text-[12px] text-muted">{b.address}</p>
                <div className="mt-auto flex items-center justify-between pt-2 text-[12px]">
                  <span className="flex items-center gap-2">
                    <span className="rounded-full bg-mint px-2 py-0.5 font-medium text-forest">مفتوح</span>
                    <span className="flex items-center gap-1 text-muted">
                      <Clock className="size-3.5" /> {b.hours}
                    </span>
                  </span>
                  <span className="flex items-center gap-1 font-semibold">
                    <Navigation className="size-3.5 text-forest" />
                    <span className="num">{b.distanceKm}</span> كم
                  </span>
                </div>
              </div>
            </button>
          </li>
        ))}
      </ul>

      <BottomNav />
    </main>
  );
}

function CityMap() {
  return (
    <svg viewBox="0 0 400 230" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full" aria-hidden>
      <rect width="400" height="230" fill="#eef1ea" />
      {/* parks */}
      <rect x="230" y="20" width="70" height="44" rx="8" fill="#dcead0" />
      <rect x="20" y="150" width="60" height="50" rx="8" fill="#dcead0" />
      <circle cx="330" cy="190" r="24" fill="#dcead0" />
      {/* river */}
      <path d="M-10 120 C 40 100, 50 60, 30 -10" stroke="#cfe0ec" strokeWidth="18" fill="none" />
      {/* blocks */}
      <g fill="#e4e8df">
        {Array.from({ length: 6 }).map((_, r) =>
          Array.from({ length: 8 }).map((_, c) => <rect key={`${r}-${c}`} x={70 + c * 42} y={8 + r * 38} width="30" height="26" rx="3" />),
        )}
      </g>
      {/* roads */}
      <g stroke="#ffffff" strokeLinecap="round" fill="none">
        <path d="M0 80 L400 140" strokeWidth="9" />
        <path d="M160 0 L240 230" strokeWidth="9" />
        <path d="M0 190 C 120 170, 260 200, 400 60" strokeWidth="7" />
        <path d="M60 0 L110 230" strokeWidth="4" />
        <path d="M300 0 L340 230" strokeWidth="4" />
        <path d="M0 30 L400 20" strokeWidth="4" />
      </g>
      <path d="M0 80 L400 140" stroke="#f3d79a" strokeWidth="2" />
    </svg>
  );
}

function Storefront({ variant }: { variant: number }) {
  const sky = ["#e3eef4", "#efe9e0", "#e8efe3"][variant % 3];
  const wall = ["#d9d4cb", "#c9c2b6", "#dcd8cf"][variant % 3];
  return (
    <svg viewBox="0 0 80 80" className="size-[76px] shrink-0 overflow-hidden rounded-xl" aria-hidden>
      <rect width="80" height="80" fill={sky} />
      <rect x="10" y={18 + variant * 3} width="60" height={62 - variant * 3} fill={wall} />
      {[0, 1, 2].map((r) => [0, 1, 2, 3].map((c) => <rect key={`${r}${c}`} x={15 + c * 13} y={24 + variant * 3 + r * 10} width="8" height="6" fill="#9fb3c4" opacity="0.7" />))}
      <rect x="10" y="56" width="60" height="7" fill="#2f6a2e" />
      <rect x="14" y="63" width="52" height="17" fill="#cfe0ec" />
      <rect x="35" y="63" width="10" height="17" fill="#7a8a7a" />
      <path d="M38 58.5 h4 M40 56.5 v4" stroke="#fff" strokeWidth="1.2" />
    </svg>
  );
}
