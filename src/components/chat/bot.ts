import { branches, order, user } from "@/lib/data";

export type Msg = {
  id: string;
  from: "me" | "rx";
  kind: "text" | "image" | "product" | "order";
  text?: string;
  src?: string;
  productId?: string;
  time: string;
  status?: "sent" | "read";
};

export type Reply = Omit<Msg, "id" | "from" | "time">;

export const pharmacist = { name: "د. سارة أحمد", role: "صيدلانية", branch: branches[0].name };

export const quickReplies = ["تتبع طلبي", "أحتاج فيتامين للمناعة", "علاج لحبوب البشرة", "أريد صرف روشتة", "هل يوجد كود خصم؟"];

export const firstName = user.name.split(" ")[0];

export function now() {
  return new Date().toLocaleTimeString("ar-EG-u-nu-latn", { hour: "numeric", minute: "2-digit" });
}

const has = (t: string, ...words: string[]) => words.some((w) => t.includes(w));

/** Scripted pharmacist. Keyword-matched, good enough to feel alive in a demo. */
export function replyTo(input: string): Reply[] {
  const t = input.trim().toLowerCase();

  if (has(t, "طلب", "تتبع", "اوردر", "أوردر", order.id))
    return [
      { kind: "text", text: `طلبك رقم #${order.id} في الطريق إليك الآن، والمندوب على بعد حوالي 30 دقيقة.` },
      { kind: "order" },
    ];

  if (has(t, "فيتامين", "مناعة", "برد", "انفلونزا", "إنفلونزا"))
    return [
      { kind: "text", text: "لدعم المناعة أنصحك بفيتامين سي 1000 مجم، قرص واحد يوميًا بعد الأكل." },
      { kind: "product", productId: "solgar-vitc" },
      { kind: "text", text: "ولو عندك نقص فيتامين د، ممكن نضيف D3 بعد عمل تحليل بسيط." },
    ];

  if (has(t, "حبوب", "بشرة", "دهنية", "مسام", "حب الشباب"))
    return [
      { kind: "text", text: "للبشرة الدهنية والحبوب، ابدأ بغسول لطيف صباحًا ومساءً، وده من أكثر المنتجات طلبًا عندنا:" },
      { kind: "product", productId: "effaclar-gel" },
      { kind: "text", text: "ولو الحبوب ملتهبة أو مستمرة أكثر من شهر، الأفضل تستشير طبيب جلدية." },
    ];

  if (has(t, "شمس", "واقي", "spf"))
    return [{ kind: "text", text: "واقي الشمس ضروري حتى في الشتاء. ده مناسب للبشرة الحساسة:" }, { kind: "product", productId: "sunscreen-spf50" }];

  if (has(t, "طفل", "بيبي", "رضيع", "حفاض"))
    return [{ kind: "text", text: "لالتهاب الحفاض، كريم سودوكريم آمن من أول يوم:" }, { kind: "product", productId: "sudocrem" }];

  if (has(t, "روشتة", "روشته", "وصفة", "دواء", "علاج"))
    return [{ kind: "text", text: "أكيد! صوّر الروشتة وابعتها من زر الكاميرا تحت، وهراجعها وأبلغك بالمتوفر والسعر." }];

  if (has(t, "خصم", "كوبون", "كود", "عرض"))
    return [{ kind: "text", text: "استخدم الكود ROSHTA10 في السلة وهتاخد خصم 10% على طلبك الحالي." }];

  if (has(t, "متوفر", "فرع", "عنوان", "مكان"))
    return [
      {
        kind: "text",
        text: `أغلب المنتجات متوفرة في ${branches[0].name} (${branches[0].address}) ومفتوح ${branches[0].hours}. تقدر تشوف كل الفروع من صفحة الفروع.`,
      },
    ];

  if (has(t, "شكرا", "شكراً", "تسلم", "متشكر"))
    return [{ kind: "text", text: `العفو يا ${firstName}، أنا موجودة لو احتجت أي حاجة. ألف سلامة!` }];

  if (has(t, "سلام", "اهلا", "أهلا", "مرحبا", "هاي", "صباح", "مساء"))
    return [{ kind: "text", text: `أهلًا بيك يا ${firstName}! تحب أساعدك في إيه النهارده؟` }];

  return [
    { kind: "text", text: "تمام، فهمت. ممكن توضح لي أكثر؟ مثلًا: الأعراض، أو اسم المنتج اللي بتدور عليه." },
  ];
}

export function replyToImage(): Reply[] {
  return [
    { kind: "text", text: "استلمت الروشتة، ثواني وأراجعها..." },
    {
      kind: "text",
      text: "كل الأدوية المكتوبة متوفرة في فرع مدينة نصر، والإجمالي التقريبي EGP 385. تحب نوصلها لك على عنوان المنزل؟",
    },
  ];
}
