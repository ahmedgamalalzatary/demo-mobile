import Image from "next/image";
import type { Product } from "@/lib/data";

/**
 * Drawn packshots so the demo looks finished before real photos exist.
 * Set `image` on a product in lib/data.ts to swap in a real photo.
 */
export function ProductImage({ product, className = "", priority = false }: { product: Product; className?: string; priority?: boolean }) {
  if (product.image) {
    return (
      <div className={`relative ${className}`}>
        <Image src={product.image} alt={product.name} fill sizes="(max-width: 440px) 50vw, 220px" className="object-contain" priority={priority} />
      </div>
    );
  }
  return <ProductArt art={product.art} className={className} title={product.name} />;
}

export function ProductArt({ art, className = "", title }: { art: Product["art"]; className?: string; title?: string }) {
  const { kind, body, accent, label } = art;
  const light = isLight(body);

  return (
    <svg viewBox="0 0 80 120" className={className} role="img" aria-label={title}>
      {/* ground shadow */}
      <ellipse cx="40" cy="114" rx={kind === "jar" ? 30 : 20} ry="3.5" fill="#1d2a1a" opacity="0.12" />

      {kind === "tube" && (
        <g>
          <path d="M18 10 h44 l-2 6 L52 86 H28 L20 16 Z" fill={body} stroke="#00000014" />
          <rect x="16" y="6" width="48" height="6" rx="1.5" fill={shade(body, -0.12)} />
          <rect x="27" y="86" width="26" height="26" rx="3" fill={light ? accent : "#f5f7f9"} />
          <rect x="30" y="30" width="20" height="30" rx="2" fill={light ? accent : "#ffffff"} opacity={light ? 0.9 : 0.92} />
          <Label x={40} y={48} text={label} color={light ? "#fff" : body} size={label && label.length > 3 ? 5.5 : 7} />
          <rect x="24" y="16" width="5" height="64" rx="2.5" fill="#fff" opacity="0.22" />
        </g>
      )}

      {kind === "jar" && (
        <g>
          <rect x="10" y="44" width="60" height="68" rx="8" fill={body} stroke="#00000014" />
          <rect x="12" y="32" width="56" height="16" rx="4" fill={shade(body, -0.08)} />
          <rect x="10" y="62" width="60" height="26" fill={accent} opacity="0.9" />
          <Label x={40} y={79} text={label} color="#fff" size={8} />
          <rect x="15" y="50" width="5" height="56" rx="2.5" fill="#fff" opacity="0.45" />
        </g>
      )}

      {kind === "dropper" && (
        <g>
          <ellipse cx="40" cy="14" rx="7" ry="9" fill={accent} />
          <rect x="31" y="20" width="18" height="16" rx="2" fill={shade(accent, 0.15)} />
          <rect x="22" y="36" width="36" height="76" rx="8" fill={body} stroke="#00000014" />
          <rect x="27" y="60" width="26" height="34" rx="2" fill="#fff" opacity="0.92" />
          <Label x={40} y={81} text={label} color={accent} size={label && label.length > 1 ? 8 : 12} />
          <rect x="26" y="42" width="4" height="64" rx="2" fill="#fff" opacity="0.4" />
        </g>
      )}

      {kind === "bottle" && (
        <g>
          <rect x="30" y="8" width="20" height="14" rx="3" fill={accent} />
          <path d="M26 22 h28 l6 10 v74 a6 6 0 0 1 -6 6 H26 a6 6 0 0 1 -6 -6 V32 Z" fill={body} stroke="#00000014" />
          <rect x="24" y="56" width="32" height="34" rx="3" fill="#fff" opacity="0.9" />
          <Label x={40} y={78} text={label} color={accent} size={12} />
          <rect x="24" y="34" width="4" height="70" rx="2" fill="#fff" opacity="0.4" />
        </g>
      )}

      {kind === "pills" && (
        <g>
          <rect x="18" y="20" width="44" height="16" rx="3" fill={light ? "#2b2b2b" : "#1b1b1b"} />
          <rect x="18" y="20" width="44" height="3" fill="#ffffff" opacity="0.12" />
          <rect x="14" y="36" width="52" height="76" rx="9" fill={body} stroke="#00000014" />
          <rect x="14" y="56" width="52" height="36" fill={light ? accent : "#f8f2df"} opacity="0.95" />
          <rect x="14" y="56" width="52" height="5" fill={accent} opacity={light ? 0.6 : 1} />
          <Label x={40} y={80} text={label} color={light ? "#fff" : body} size={11} />
          <rect x="19" y="42" width="4" height="64" rx="2" fill="#fff" opacity="0.25" />
        </g>
      )}

      {kind === "pump" && (
        <g>
          <path d="M40 4 h14 v5 h-14 Z" fill={light ? "#3a3a3a" : accent} />
          <rect x="36" y="4" width="8" height="20" fill={light ? "#3a3a3a" : accent} />
          <rect x="30" y="22" width="20" height="12" rx="2" fill={light ? "#3a3a3a" : accent} />
          <rect x="18" y="34" width="44" height="78" rx="10" fill={body} stroke="#00000014" />
          <rect x="24" y="58" width="32" height="34" rx="3" fill={light ? accent : "#f6efdf"} opacity="0.95" />
          <Label x={40} y={80} text={label} color={light ? "#fff" : body} size={12} />
          <rect x="22" y="40" width="4" height="66" rx="2" fill="#fff" opacity={light ? 0.5 : 0.18} />
        </g>
      )}
    </svg>
  );
}

function Label({ x, y, text, color, size }: { x: number; y: number; text?: string; color: string; size: number }) {
  if (!text) return null;
  return (
    <text x={x} y={y} textAnchor="middle" fontSize={size} fontWeight={700} fill={color} fontFamily="system-ui, sans-serif" style={{ direction: "ltr" }}>
      {text}
    </text>
  );
}

function hex(c: string) {
  const n = parseInt(c.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
function isLight(c: string) {
  const [r, g, b] = hex(c);
  return 0.299 * r + 0.587 * g + 0.114 * b > 170;
}
function shade(c: string, amt: number) {
  const [r, g, b] = hex(c).map((v) => Math.max(0, Math.min(255, Math.round(v + 255 * amt))));
  return `rgb(${r} ${g} ${b})`;
}
