"use client";

const ITEMS = [
  "DETOFUN HOLIDAYS",
  "✦",
  "ABEOKUTA EXPERIENCE",
  "✦",
  "LAGOS ADVENTURES",
  "✦",
  "NIGERIA HIDDEN GEMS",
  "✦",
  "CURATED JOURNEYS",
  "✦",
];

// Doubled for seamless loop
const TRACK = [...ITEMS, ...ITEMS];

export default function MarqueeTicker() {
  return (
    <div
      className="w-full overflow-hidden py-5 border-y border-[#C8A96A]/20"
      style={{ backgroundColor: "#2C1A0B" }}
      aria-hidden
    >
      <div
        className="flex items-center gap-10 whitespace-nowrap"
        style={{
          animation: "marquee-scroll 28s linear infinite",
          width: "max-content",
        }}
      >
        {TRACK.map((item, i) => (
          <span
            key={i}
            className="text-sm sm:text-base font-bold tracking-[0.22em] uppercase flex-shrink-0"
            style={{
              color: item === "✦" ? "#C8A96A" : "#C8A96A",
              fontFamily: "var(--font-playfair, serif)",
              opacity: item === "✦" ? 0.55 : 1,
            }}
          >
            {item}
          </span>
        ))}
      </div>

      <style>{`
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="marquee-scroll"] { animation: none; }
        }
      `}</style>
    </div>
  );
}
