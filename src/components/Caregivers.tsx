import { Phone, MapPin, Clock, HeartHandshake } from "lucide-react";
import { caregivers } from "@/data";

export default function Caregivers() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-10">
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold mb-2">হোম কেয়ার</p>
      <h1 className="font-display text-4xl text-ink mb-3 flex items-center gap-3">
        <HeartHandshake className="h-8 w-8 text-pine" strokeWidth={1.5} /> নার্স ও কেয়ারগিভার
      </h1>
      <p className="text-ink/60 max-w-xl mb-8">বাসায় রোগীর সেবার জন্য প্রশিক্ষিত নার্স বা কেয়ারগিভার ভাড়া নিন।</p>

      <div className="divide-y divide-line border-t border-b border-line">
        {caregivers.map((c) => (
          <div key={c.id} className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-display text-lg text-ink">{c.name}</h3>
              <p className="text-xs font-mono text-gold mt-1">{c.type}</p>
              <div className="flex flex-wrap gap-x-5 gap-y-1 mt-1.5 font-mono text-xs text-ink/55">
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" strokeWidth={2} /> {c.experience}</span>
                <span className="flex items-center gap-1"><MapPin className="h-3 w-3" strokeWidth={2} /> {c.area}</span>
                <span className="text-pine">{c.rate}</span>
              </div>
            </div>
            <a href={`tel:${c.phone}`} className="flex items-center gap-2 bg-pine text-paper px-4 py-2.5 text-sm font-medium hover:bg-pine-dark transition-colors shrink-0 w-fit">
              <Phone className="h-4 w-4" strokeWidth={2} /> {c.phone}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
