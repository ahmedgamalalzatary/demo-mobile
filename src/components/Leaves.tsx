/** Soft botanical sprig used on the splash, echoing the logo's leaf. */
export function Sprig({ className = "", flip = false }: { className?: string; flip?: boolean }) {
  const leaves = [
    { x: 60, y: 40, r: -40, s: 1 },
    { x: 92, y: 70, r: 35, s: 0.95 },
    { x: 70, y: 100, r: -50, s: 1.1 },
    { x: 108, y: 128, r: 30, s: 1 },
    { x: 82, y: 160, r: -45, s: 1.15 },
    { x: 120, y: 192, r: 28, s: 1.05 },
    { x: 96, y: 222, r: -42, s: 0.9 },
  ];
  return (
    <svg viewBox="0 0 200 280" className={className} style={flip ? { transform: "scale(-1,-1)" } : undefined} aria-hidden>
      <path d="M40 10 C 70 80, 90 150, 150 270" stroke="#8fb36f" strokeWidth="2.2" fill="none" opacity="0.7" />
      {leaves.map((l, i) => (
        <g key={i} transform={`translate(${l.x} ${l.y}) rotate(${l.r}) scale(${l.s})`}>
          <path d="M0 0 C 14 -16, 44 -16, 58 0 C 44 16, 14 16, 0 0 Z" fill={i % 2 ? "#a9c98a" : "#8bb56a"} opacity={0.55 + (i % 3) * 0.12} />
          <path d="M2 0 H 54" stroke="#ffffff" strokeWidth="1" opacity="0.5" />
        </g>
      ))}
    </svg>
  );
}
