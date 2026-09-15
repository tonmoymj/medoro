import { Star, MessageSquareText } from "lucide-react";
import { reviews, doctors } from "@/data";

export default function Reviews() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-10">
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold mb-2">রোগীদের মতামত</p>
      <h1 className="font-display text-4xl text-ink mb-8 flex items-center gap-3">
        <MessageSquareText className="h-8 w-8 text-pine" strokeWidth={1.5} /> রিভিউ
      </h1>

      <div className="space-y-4">
        {reviews.map((r) => {
          const d = doctors.find((x) => x.id === r.doctorId);
          return (
            <div key={r.id} className="bg-cardbg border border-line p-5">
              <div className="flex items-center justify-between">
                <p className="font-display text-lg text-ink">{d?.name}</p>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < r.rating ? "fill-gold text-gold" : "text-line"}`} strokeWidth={1.5} />
                  ))}
                </div>
              </div>
              <p className="text-sm text-ink/65 mt-2">{r.comment}</p>
              <p className="text-xs text-ink/40 font-mono mt-2">{r.name} &middot; {r.time}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
