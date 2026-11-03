"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Camera, Check, CheckCheck, ChevronRight, Package, SendHorizontal, ShieldPlus } from "lucide-react";
import { getProduct, order } from "@/lib/data";
import { ProductImage } from "@/components/ProductArt";
import { AddButton, Price } from "@/components/ui";
import { firstName, now, pharmacist, quickReplies, replyTo, replyToImage, type Msg, type Reply } from "@/components/chat/bot";

// Survives client-side navigation so the conversation is still there when you come back
let saved: Msg[] | undefined;
let seq = 0;
const uid = () => `m${seq++}`;

const seed = (): Msg[] => [
  {
    id: uid(),
    from: "rx",
    kind: "text",
    text: `أهلًا ${firstName}، أنا ${pharmacist.name}، ${pharmacist.role} في ${pharmacist.branch}. اسألني عن أي دواء أو منتج، أو ابعت صورة الروشتة.`,
    // Clock reads aren't allowed during prerender; real times are stamped when messages are sent
    time: "الآن",
  },
];

export default function ChatPage() {
  const router = useRouter();
  const [msgs, setMsgs] = useState<Msg[]>(() => saved ?? seed());
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const end = useRef<HTMLDivElement>(null);
  const file = useRef<HTMLInputElement>(null);

  useEffect(() => {
    saved = msgs;
    end.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [msgs, typing]);

  useEffect(() => {
    const t = timers.current;
    return () => t.forEach(clearTimeout);
  }, []);

  const later = (fn: () => void, ms: number) => timers.current.push(setTimeout(fn, ms));

  /** Plays the scripted replies one after another, with a typing pause before each. */
  function respond(replies: Reply[]) {
    let at = 700;
    later(() => setMsgs((m) => m.map((x) => (x.from === "me" ? { ...x, status: "read" } : x))), 500);
    replies.forEach((r, i) => {
      const typingFor = Math.min(2200, 700 + (r.text?.length ?? 20) * 18);
      later(() => setTyping(true), at);
      at += typingFor;
      later(() => {
        setMsgs((m) => [...m, { ...r, id: uid(), from: "rx", time: now() }]);
        if (i === replies.length - 1) setTyping(false);
      }, at);
      at += 350;
    });
  }

  function send(text: string) {
    const clean = text.trim();
    if (!clean) return;
    setMsgs((m) => [...m, { id: uid(), from: "me", kind: "text", text: clean, time: now(), status: "sent" }]);
    setDraft("");
    respond(replyTo(clean));
  }

  function sendImage(f: File) {
    const src = URL.createObjectURL(f);
    setMsgs((m) => [...m, { id: uid(), from: "me", kind: "image", src, time: now(), status: "sent" }]);
    respond(replyToImage());
  }

  const asked = msgs.some((m) => m.from === "me");

  return (
    <main className="flex h-dvh flex-col bg-mist">
      {/* Header */}
      <header className="z-20 flex items-center gap-2 border-b border-line bg-white px-2 pt-[calc(8px+env(safe-area-inset-top))] pb-2">
        <button
          aria-label="رجوع"
          onClick={() => (history.length > 1 ? router.back() : router.push("/home"))}
          className="grid size-10 place-items-center rounded-full active:bg-mint"
        >
          <ChevronRight className="size-6" />
        </button>
        <span className="relative">
          <span className="grid size-10 place-items-center rounded-full bg-[linear-gradient(160deg,#6a9b45,#22501f)] text-[15px] font-semibold text-white">س</span>
          <span className="absolute -bottom-0.5 -left-0.5 size-3 rounded-full border-2 border-white bg-[#3fbf5a]" />
        </span>
        <div className="flex-1">
          <p className="text-[14.5px] font-semibold">{pharmacist.name}</p>
          <p className={`text-[11.5px] ${typing ? "text-leaf" : "text-muted"}`} aria-live="polite">
            {typing ? "تكتب الآن..." : `${pharmacist.role}، متصلة الآن`}
          </p>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-3 pt-3 pb-2" role="log" aria-label="المحادثة">
        <div className="mb-3 flex justify-center">
          <span className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-[11px] text-muted shadow-soft">
            <ShieldPlus className="size-3.5 text-forest" />
            محادثة مع صيدلي مرخّص. للطوارئ اتصل بـ <span className="num">123</span>
          </span>
        </div>

        <ul className="flex flex-col gap-1.5">
          {msgs.map((m, i) => {
            const mine = m.from === "me";
            const grouped = msgs[i + 1]?.from === m.from;
            return (
              <li key={m.id} className={`flex ${mine ? "justify-end" : "justify-start"} ${grouped ? "" : "mb-1.5"}`}>
                <Bubble m={m} mine={mine} />
              </li>
            );
          })}
          {typing && (
            <li className="flex justify-start">
              <span className="flex items-center gap-1 rounded-2xl rounded-tr-md bg-white px-4 py-3.5 shadow-soft" aria-label="تكتب الآن">
                {[0, 1, 2].map((d) => (
                  <span key={d} className="size-1.5 animate-bounce rounded-full bg-muted" style={{ animationDelay: `${d * 140}ms` }} />
                ))}
              </span>
            </li>
          )}
        </ul>
        <div ref={end} />
      </div>

      {/* Quick replies until the user starts talking */}
      {!asked && (
        <div className="no-scrollbar flex gap-2 overflow-x-auto px-3 pb-2">
          {quickReplies.map((q) => (
            <button key={q} onClick={() => send(q)} className="h-9 shrink-0 rounded-full border border-forest/30 bg-white px-3.5 text-[12.5px] font-medium text-forest active:bg-mint">
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Composer */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(draft);
        }}
        className="flex items-end gap-2 border-t border-line bg-white px-3 pt-2.5 pb-[calc(10px+env(safe-area-inset-bottom))]"
      >
        <input
          ref={file}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) sendImage(f);
            e.target.value = "";
          }}
        />
        <button type="button" aria-label="إرسال صورة الروشتة" onClick={() => file.current?.click()} className="grid size-11 shrink-0 place-items-center rounded-full text-forest active:bg-mint">
          <Camera className="size-[22px]" strokeWidth={1.7} />
        </button>
        <label className="flex min-h-11 flex-1 items-center rounded-3xl bg-mist px-4">
          <span className="sr-only">اكتب رسالتك</span>
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="اكتب رسالتك..."
            className="w-full bg-transparent text-[14px] outline-none placeholder:text-muted"
          />
        </label>
        <button
          aria-label="إرسال"
          disabled={!draft.trim()}
          className="grid size-11 shrink-0 place-items-center rounded-full bg-forest text-white transition active:scale-90 disabled:bg-sprout"
        >
          <SendHorizontal className="size-5 -scale-x-100" />
        </button>
      </form>
    </main>
  );
}

function Bubble({ m, mine }: { m: Msg; mine: boolean }) {
  const shape = mine ? "rounded-2xl rounded-tl-md bg-forest text-white" : "rounded-2xl rounded-tr-md bg-white text-ink shadow-soft";
  const meta = (
    <span className={`mt-1 flex items-center justify-end gap-1 text-[10.5px] ${mine ? "text-white/70" : "text-muted"}`}>
      <span>{m.time}</span>
      {mine && (m.status === "read" ? <CheckCheck className="size-3.5 text-sprout" /> : <Check className="size-3.5" />)}
    </span>
  );

  if (m.kind === "image")
    return (
      <div className={`max-w-[70%] overflow-hidden p-1 ${shape}`}>
        {/* eslint-disable-next-line @next/next/no-img-element -- local object URL from the camera/file picker */}
        <img src={m.src} alt="صورة الروشتة" className="max-h-64 rounded-xl object-cover" />
        <div className="px-2 pb-0.5">{meta}</div>
      </div>
    );

  if (m.kind === "product" && m.productId) {
    const p = getProduct(m.productId)!;
    return (
      <Link href={`/product/${p.id}`} dir="ltr" className="flex w-[78%] gap-3 rounded-2xl border border-line bg-white p-2.5 shadow-soft">
        <div className="grid size-16 shrink-0 place-items-center rounded-xl bg-mist">
          <ProductImage product={p} className="h-14" />
        </div>
        <div className="flex min-w-0 flex-1 flex-col">
          <p className="truncate text-[13px] font-medium">{p.name}</p>
          <p className="text-[11px] text-muted">{p.size}</p>
          <div className="mt-auto flex items-center justify-between">
            <Price value={p.price} className="text-[13px] text-forest" />
            <AddButton id={p.id} name={p.name} />
          </div>
        </div>
      </Link>
    );
  }

  if (m.kind === "order")
    return (
      <Link href={`/orders/${order.id}`} className="flex w-[78%] items-center gap-3 rounded-2xl border border-line bg-white p-3 shadow-soft">
        <span className="grid size-10 place-items-center rounded-full bg-forest text-white">
          <Package className="size-5" strokeWidth={1.8} />
        </span>
        <div className="flex-1">
          <p className="text-[13px] font-semibold">
            طلب <span className="num">#{order.id}</span>
          </p>
          <p className="text-[11.5px] text-muted">قيد التوصيل</p>
        </div>
        <span className="text-[12px] font-medium text-forest">تتبع الطلب</span>
      </Link>
    );

  return (
    <div className={`max-w-[80%] px-3.5 pt-2 pb-1.5 ${shape}`}>
      <p className="text-[14px] leading-6 whitespace-pre-wrap">{m.text}</p>
      {meta}
    </div>
  );
}
