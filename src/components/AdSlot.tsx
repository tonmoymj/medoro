import { useAdmin } from "@/context/AdminContext";

type Variant = "leaderboard" | "card" | "sidebar" | "strip";

const sizes: Record<Variant, string> = {
  leaderboard: "h-20 sm:h-24",
  card: "h-full min-h-[200px]",
  sidebar: "h-72",
  strip: "h-10",
};

export default function AdSlot({
  slotId,
  variant = "leaderboard",
  label,
}: {
  slotId?: string;
  variant?: Variant;
  label?: string;
}) {
  const { ads } = useAdmin();
  const slot = slotId ? ads.find((a) => a.id === slotId) : undefined;

  if (slot && slot.isOccupied) {
    return (
      <div className={`relative border border-pine/30 bg-pine/5 overflow-hidden group ${sizes[variant]}`}>
        <span className="absolute top-2 right-2 z-10 text-[9px] font-mono uppercase tracking-wide text-paper bg-pine px-1.5 py-0.5 shadow">
          স্পনসরড
        </span>
        {slot.linkUrl ? (
          <a href={slot.linkUrl} target="_blank" rel="noopener noreferrer" className="block h-full w-full">
            {slot.bannerImage ? (
              <img src={slot.bannerImage} alt={slot.sponsorName || "Ad"} className="h-full w-full object-cover" />
            ) : (
              <div className="h-full w-full p-4 flex flex-col justify-center items-center text-center">
                <p className="font-display text-lg text-pine font-bold">{slot.sponsorName}</p>
                <p className="text-xs font-mono text-ink/60 mt-1">{slot.labelText || label}</p>
              </div>
            )}
          </a>
        ) : slot.bannerImage ? (
          <img src={slot.bannerImage} alt={slot.sponsorName || "Ad"} className="h-full w-full object-cover" />
        ) : (
          <div className="h-full w-full p-4 flex flex-col justify-center items-center text-center">
            <p className="font-display text-lg text-pine font-bold">{slot.sponsorName}</p>
            <p className="text-xs font-mono text-ink/60 mt-1">{slot.labelText || label}</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={`relative border border-dashed border-gold/50 bg-gold/[0.06] flex items-center justify-center px-4 ${sizes[variant]}`}
    >
      <span className="absolute top-2 right-2 text-[9px] font-mono uppercase tracking-wide text-gold bg-paper px-1.5 py-0.5 border border-gold/40">
        বিজ্ঞাপন ফাঁকা
      </span>
      <p className="text-xs font-mono text-ink/40 text-center leading-relaxed">
        {slot?.labelText || label || "এই জায়গায় স্পনসরড বিজ্ঞাপন দেখানো হবে"}
      </p>
    </div>
  );
}
