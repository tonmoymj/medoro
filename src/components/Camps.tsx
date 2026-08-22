import { CalendarDays, MapPin, HandHeart } from "lucide-react";
import { camps } from "@/data";

export default function Camps() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-10">
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold mb-2">কমিউনিটি সেবা</p>
      <h1 className="font-display text-4xl text-ink mb-3 flex items-center gap-3">
        <HandHeart className="h-8 w-8 text-pine" strokeWidth={1.5} /> ফ্রি চিকিৎসা ক্যাম্প
      </h1>
      <p className="text-ink/60 max-w-xl mb-8">বিভিন্ন সংগঠনের আয়োজিত বিনামূল্যে স্বাস্থ্যসেবা ক্যাম্প ও কর্মসূচি।</p>

      <div className="space-y-4">
        {camps.map((c) => (
          <div key={c.id} className="bg-white border border-line perf-top pt-5">
            <div className="px-6 pb-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-gold mb-1.5">{c.org}</p>
              <h3 className="font-display text-xl text-ink">{c.title}</h3>
              <p className="text-sm text-ink/60 mt-2">{c.note}</p>
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 font-mono text-xs text-ink/50">
                <span className="flex items-center gap-1.5"><CalendarDays className="h-3.5 w-3.5" strokeWidth={2} /> {c.date}</span>
                <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" strokeWidth={2} /> {c.area}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
