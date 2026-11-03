export type ArtKind = "tube" | "jar" | "dropper" | "bottle" | "pills" | "pump";

export type Product = {
  id: string;
  name: string;
  brand: string;
  size: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  category: CategorySlug;
  tag: string; // sub-filter on the category screen
  description: string;
  ingredients: string;
  usage: string;
  /** Drop a file in /public/products and set e.g. "/products/effaclar.png" */
  image?: string;
  art: { kind: ArtKind; body: string; accent: string; label?: string };
};

export type CategorySlug = "cosmetics" | "skincare" | "vitamins" | "haircare" | "body" | "baby";

export const categories: {
  slug: CategorySlug;
  name: string;
  icon: "face" | "pill" | "drop" | "hair" | "body" | "baby";
  tint: string;
}[] = [
  { slug: "cosmetics", name: "كوزمتكس", icon: "face", tint: "#eaf2e3" },
  { slug: "skincare", name: "عناية بالبشرة", icon: "drop", tint: "#f6ece6" },
  { slug: "vitamins", name: "فيتامينات ومكملات", icon: "pill", tint: "#fbf1dc" },
  { slug: "haircare", name: "عناية بالشعر", icon: "hair", tint: "#e6eef3" },
  { slug: "body", name: "عناية بالجسم", icon: "body", tint: "#f1ebf4" },
  { slug: "baby", name: "الأم والطفل", icon: "baby", tint: "#e8f3ef" },
];

export const products: Product[] = [
  {
    id: "effaclar-gel",
    name: "La Roche-Posay Effaclar Gel",
    brand: "La Roche-Posay",
    size: "200ml",
    price: 480,
    oldPrice: 600,
    rating: 4.8,
    reviews: 120,
    category: "cosmetics",
    tag: "بشرة",
    description:
      "غسول لطيف للبشرة الدهنية والمختلطة، ينظف المسام بعمق ويقلل الزيوت الزائدة دون أن يسبب جفافًا.",
    ingredients: "ماء حراري من La Roche-Posay، زنك PCA، خالٍ من الصابون والبارابين.",
    usage: "يُستخدم صباحًا ومساءً على بشرة مبللة، يُدلك بلطف ثم يُشطف بالماء الفاتر.",
    art: { kind: "tube", body: "#2f7fc9", accent: "#ffffff", label: "LRP" },
  },
  {
    id: "cerave-cream",
    name: "CeraVe Moisturizing Cream",
    brand: "CeraVe",
    size: "454g",
    price: 620,
    rating: 4.7,
    reviews: 98,
    category: "cosmetics",
    tag: "عناية بالجسم",
    description: "كريم مرطب غني بالسيراميدات يعيد بناء حاجز البشرة ويرطبها لمدة 24 ساعة.",
    ingredients: "3 سيراميدات أساسية، حمض الهيالورونيك، تقنية MVE للإطلاق التدريجي.",
    usage: "يوضع على الوجه والجسم مرتين يوميًا أو حسب الحاجة.",
    art: { kind: "jar", body: "#f4f7fb", accent: "#2b6cb0", label: "CeraVe" },
  },
  {
    id: "vichy-89",
    name: "Vichy Mineral 89",
    brand: "Vichy",
    size: "50ml",
    price: 550,
    rating: 4.6,
    reviews: 75,
    category: "cosmetics",
    tag: "بشرة",
    description: "معزز يومي للبشرة بتركيز 89% من مياه فيشي البركانية لتقوية البشرة وترطيبها.",
    ingredients: "مياه فيشي البركانية، حمض الهيالورونيك الطبيعي.",
    usage: "قطرتان صباحًا قبل الكريم المرطب على بشرة نظيفة.",
    art: { kind: "dropper", body: "#dfe9f2", accent: "#1f3f78", label: "V" },
  },
  {
    id: "garnier-micellar",
    name: "Garnier Micellar Water",
    brand: "Garnier",
    size: "400ml",
    price: 290,
    oldPrice: 340,
    rating: 4.5,
    reviews: 63,
    category: "cosmetics",
    tag: "مكياج",
    description: "ماء ميسيلار لإزالة المكياج وتنظيف البشرة في خطوة واحدة دون شطف.",
    ingredients: "جزيئات الميسيلار، جلسرين، خالٍ من العطور والكحول.",
    usage: "يوضع على قطنة ويُمرر على الوجه والعينين دون فرك.",
    art: { kind: "bottle", body: "#f3d4e1", accent: "#d6407c", label: "G" },
  },
  {
    id: "bioderma-sensibio",
    name: "Bioderma Sensibio H2O",
    brand: "Bioderma",
    size: "250ml",
    price: 410,
    rating: 4.7,
    reviews: 142,
    category: "cosmetics",
    tag: "مكياج",
    description: "منظف ومزيل مكياج للبشرة الحساسة، يهدئ ويحافظ على توازن البشرة الطبيعي.",
    ingredients: "إسترات أحماض دهنية، مستخلص الخيار، خالٍ من العطور.",
    usage: "يُستخدم صباحًا ومساءً بقطنة على الوجه والعينين.",
    art: { kind: "bottle", body: "#f7f2f4", accent: "#e8869d", label: "B" },
  },
  {
    id: "sunscreen-spf50",
    name: "Sunscreen SPF 50",
    brand: "La Roche-Posay",
    size: "50ml",
    price: 450,
    rating: 4.8,
    reviews: 210,
    category: "skincare",
    tag: "بشرة",
    description: "واقي شمس خفيف بحماية عالية جدًا من الأشعة فوق البنفسجية، مناسب للبشرة الحساسة.",
    ingredients: "فلاتر Mexoryl XL و SX، ماء حراري، مضاد للأكسدة.",
    usage: "يوضع بكمية كافية قبل التعرض للشمس بـ 15 دقيقة، ويُجدد كل ساعتين.",
    art: { kind: "tube", body: "#fbf6ec", accent: "#f08a24", label: "SPF50" },
  },
  {
    id: "ordinary-niacinamide",
    name: "The Ordinary Niacinamide 10%",
    brand: "The Ordinary",
    size: "30ml",
    price: 380,
    oldPrice: 520,
    rating: 4.6,
    reviews: 188,
    category: "skincare",
    tag: "بشرة",
    description: "سيروم لتقليل ظهور المسام وتوحيد لون البشرة والتحكم في الإفرازات الدهنية.",
    ingredients: "نياسيناميد 10%، زنك 1%.",
    usage: "بضع قطرات صباحًا ومساءً قبل الكريمات الأثقل.",
    art: { kind: "dropper", body: "#f2efe8", accent: "#2b2b2b", label: "TO" },
  },
  {
    id: "solgar-vitc",
    name: "Vitamin C 1000mg",
    brand: "Solgar",
    size: "60 Tablets",
    price: 320,
    rating: 4.9,
    reviews: 301,
    category: "vitamins",
    tag: "مناعة",
    description: "فيتامين سي عالي التركيز لدعم المناعة وصحة الجلد، مع إطلاق ممتد طوال اليوم.",
    ingredients: "حمض الأسكوربيك 1000 مجم، روز هيب، بيوفلافونويدات.",
    usage: "قرص واحد يوميًا مع الطعام أو حسب إرشادات الطبيب.",
    art: { kind: "pills", body: "#7a3b12", accent: "#d4b25a", label: "C" },
  },
  {
    id: "omega-3",
    name: "Omega-3 Fish Oil",
    brand: "Nature's Bounty",
    size: "100 Softgels",
    price: 540,
    oldPrice: 760,
    rating: 4.7,
    reviews: 156,
    category: "vitamins",
    tag: "قلب",
    description: "زيت سمك نقي غني بـ EPA و DHA لدعم صحة القلب والمخ والمفاصل.",
    ingredients: "زيت سمك مركز 1200 مجم، EPA 360 مجم، DHA 240 مجم.",
    usage: "كبسولة واحدة مرتين يوميًا مع الوجبات.",
    art: { kind: "pills", body: "#e9a33b", accent: "#1f4f7a", label: "Ω3" },
  },
  {
    id: "vitamin-d3",
    name: "Vitamin D3 5000 IU",
    brand: "Now Foods",
    size: "120 Softgels",
    price: 360,
    rating: 4.8,
    reviews: 97,
    category: "vitamins",
    tag: "عظام",
    description: "فيتامين د3 لدعم صحة العظام والأسنان والمناعة.",
    ingredients: "كولي كالسيفيرول 125 ميكروجرام، زيت زيتون بكر.",
    usage: "كبسولة واحدة يوميًا مع وجبة تحتوي على دهون.",
    art: { kind: "pills", body: "#f5f1e6", accent: "#2f6a2e", label: "D3" },
  },
  {
    id: "biotin",
    name: "Biotin 10000mcg",
    brand: "Natrol",
    size: "100 Tablets",
    price: 295,
    rating: 4.4,
    reviews: 84,
    category: "haircare",
    tag: "شعر",
    description: "بيوتين لدعم نمو الشعر وتقوية الأظافر وصحة البشرة.",
    ingredients: "بيوتين 10000 ميكروجرام، كالسيوم.",
    usage: "قرص واحد يوميًا مع الماء.",
    art: { kind: "pills", body: "#efe4f5", accent: "#7a3f9d", label: "B7" },
  },
  {
    id: "hair-oil",
    name: "Argan Repair Hair Oil",
    brand: "Vatika",
    size: "100ml",
    price: 210,
    oldPrice: 280,
    rating: 4.3,
    reviews: 52,
    category: "haircare",
    tag: "شعر",
    description: "زيت أرجان مغذٍّ للشعر الجاف والتالف، يمنح لمعانًا ونعومة دون إثقال.",
    ingredients: "زيت الأرجان، فيتامين E، زيت جوز الهند.",
    usage: "يوزع على أطراف الشعر الرطب أو الجاف حسب الحاجة.",
    art: { kind: "pump", body: "#3f2a14", accent: "#c9a14a", label: "A" },
  },
  {
    id: "body-lotion",
    name: "Eucerin UreaRepair Lotion",
    brand: "Eucerin",
    size: "250ml",
    price: 460,
    rating: 4.6,
    reviews: 71,
    category: "body",
    tag: "عناية بالجسم",
    description: "لوشن للجسم الجاف جدًا بنسبة 5% يوريا، يرطب ويخفف الخشونة.",
    ingredients: "يوريا 5%، لاكتات، سيراميد 3.",
    usage: "يوضع على الجسم مرة أو مرتين يوميًا.",
    art: { kind: "pump", body: "#f5f7fa", accent: "#c3112f", label: "E" },
  },
  {
    id: "mustela-hydra-bebe",
    name: "Mustela Hydra Bébé Body Lotion",
    brand: "Mustela",
    size: "300ml",
    price: 520,
    oldPrice: 610,
    rating: 4.8,
    reviews: 134,
    category: "baby",
    tag: "عناية بالجسم",
    description: "لوشن مرطب يومي لبشرة الأطفال الرقيقة منذ الولادة، يمتص سريعًا ويترك البشرة ناعمة.",
    ingredients: "مستخلص الأفوكادو، زبدة الشيا، خالٍ من البارابين.",
    usage: "يوضع على جسم الطفل بعد الاستحمام مع تدليك خفيف.",
    art: { kind: "pump", body: "#e6f2fb", accent: "#1f6fb5", label: "M" },
  },
  {
    id: "sudocrem",
    name: "Sudocrem Antiseptic Cream",
    brand: "Sudocrem",
    size: "125g",
    price: 240,
    rating: 4.9,
    reviews: 220,
    category: "baby",
    tag: "حفاضات",
    description: "كريم لطيف لحماية بشرة الطفل من التهابات الحفاض وتهدئة الاحمرار.",
    ingredients: "أكسيد الزنك، لانولين، بنزيل بنزوات.",
    usage: "طبقة رقيقة عند كل تغيير للحفاض على بشرة نظيفة وجافة.",
    art: { kind: "jar", body: "#eef3f7", accent: "#5b8fb9", label: "Sudo" },
  },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);
export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);

export const featuredSections: { slug: CategorySlug; title: string; productIds: string[] }[] = [
  { slug: "vitamins", title: "فيتامينات", productIds: ["solgar-vitc", "omega-3", "vitamin-d3"] },
  { slug: "skincare", title: "عناية بالبشرة", productIds: ["ordinary-niacinamide", "sunscreen-spf50", "vichy-89"] },
  { slug: "haircare", title: "عناية بالشعر", productIds: ["hair-oil", "biotin", "garnier-micellar"] },
];

export type Branch = {
  id: string;
  name: string;
  address: string;
  distanceKm: number;
  hours: string;
  open: boolean;
  pin: { x: number; y: number };
};

export const branches: Branch[] = [
  {
    id: "nasr-city",
    name: "فرع مدينة نصر",
    address: "شارع عباس العقاد - مدينة نصر",
    distanceKm: 1.2,
    hours: "24 ساعة",
    open: true,
    pin: { x: 72, y: 66 },
  },
  {
    id: "fifth-settlement",
    name: "فرع التجمع الخامس",
    address: "التسعين الشمالي - بوينت 90 مول",
    distanceKm: 5.8,
    hours: "9 ص - 2 ص",
    open: true,
    pin: { x: 40, y: 36 },
  },
  {
    id: "mohandessin",
    name: "فرع المهندسين",
    address: "شارع جامعة الدول العربية",
    distanceKm: 8.6,
    hours: "9 ص - 1 ص",
    open: true,
    pin: { x: 14, y: 70 },
  },
];

export const user = {
  name: "أحمد محمد",
  phone: "01012345678",
  points: 250,
  address: { title: "المنزل", line: "مدينة نصر، شارع مكرم عبيد، القاهرة" },
};

export const rewards = [
  { id: "r50", title: "خصم 50 جنيه", points: 500, icon: "ticket" as const },
  { id: "r100", title: "خصم 100 جنيه", points: 1000, icon: "ticket" as const },
  { id: "free", title: "منتج مجاني", points: 1500, icon: "gift" as const },
];

export const order = {
  id: "10234",
  date: "3 نوفمبر 2026",
  time: "11:30 ص",
  total: 1250,
  items: [
    { id: "effaclar-gel", qty: 1 },
    { id: "solgar-vitc", qty: 1 },
    { id: "sunscreen-spf50", qty: 1 },
  ],
  steps: [
    { title: "تم تأكيد الطلب", time: "11:30 ص", done: true },
    { title: "جاري تجهيز الطلب", time: "12:15 م", done: true },
    { title: "تم شحن الطلب", time: "2:10 م", done: true },
    { title: "قيد التوصيل", time: "3:45 م", done: true, current: true },
    { title: "تم التسليم", time: "", done: false },
  ],
};

export const pastOrders = [
  { id: "10234", date: "3 نوفمبر 2026", total: 1250, status: "قيد التوصيل", active: true, items: 3 },
  { id: "10198", date: "21 أكتوبر 2026", total: 860, status: "تم التسليم", active: false, items: 2 },
  { id: "10142", date: "2 أكتوبر 2026", total: 1475, status: "تم التسليم", active: false, items: 4 },
];
