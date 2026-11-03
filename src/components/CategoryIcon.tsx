import { Baby, Droplets, Pill, Sparkles, Bath, Wind } from "lucide-react";

const map = { face: Sparkles, pill: Pill, drop: Droplets, hair: Wind, body: Bath, baby: Baby };

export function CategoryIcon({ icon, className }: { icon: keyof typeof map; className?: string }) {
  const I = map[icon];
  return <I className={className} strokeWidth={1.6} />;
}
