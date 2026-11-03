export const price = (n: number) => `EGP ${n.toLocaleString("en-US")}`;

export const discountPct = (price: number, oldPrice?: number) =>
  oldPrice ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;
