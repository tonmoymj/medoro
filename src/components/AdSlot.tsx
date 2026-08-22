type Variant = "leaderboard" | "card" | "sidebar" | "strip";

const sizes: Record<Variant, string> = {
  leaderboard: "h-20 sm:h-24",
  card: "h-full min-h-[220px]",
  sidebar: "h-72",
  strip: "h-10",
};

export default function AdSlot({
  variant = "leaderboard",
  label,
}: {
  variant?: Variant;
  label?: string;
}) {
  return (
    <div
      className={`relative border border-dashed border-gold/50 bg-gold/[0.06] flex items-center justify-center px-4 ${sizes[variant]}`}
    >
      <span className="absolute top-2 right-2 text-[9px] font-mono uppercase tracking-wide text-gold bg-paper px-1.5 py-0.5 border border-gold/40">
        বিজ্ঞাপন
      </span>
      <p className="text-xs font-mono text-ink/35 text-center leading-relaxed">
        {label ?? "এই জায়গায় স্পনসরড বিজ্ঞাপন দেখানো হবে"}
      </p>
    </div>
  );
}
