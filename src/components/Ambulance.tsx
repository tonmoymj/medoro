import { Phone, MapPin, Clock, Siren } from "lucide-react";
import { ambulances } from "@/data";

export default function Ambulance() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-10">
      <div className="bg-brick text-paper px-5 py-3 mb-8 flex items-center gap-3">
        <Siren className="h-5 w-5 shrink-0" strokeWidth={2} />
        <p className="text-sm">জরুরি প্রয়োজনে সরাসরি ফোন করুন — জাতীয় জরুরি সেবা: <span className="font-mono font-semibold">৯৯৯</span></p>
      </div>
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold mb-2">জরুরি সেবা</p>
      <h1 className="font-display text-4xl text-ink mb-8">অ্যাম্বুলেন্স সার্ভিস</h1>

      <div className="divide-y divide-line border-t border-b border-line">
        {ambulances.map((a) => (
          <div key={a.id} className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-display text-lg text-ink">{a.provider}</h3>
              <div className="flex flex-wrap gap-x-5 gap-y-1 mt-1.5 font-mono text-xs text-ink/55">
                <span>{a.type}</span>
                <span className="flex items-center gap-1"><MapPin className="h-3 w-3" strokeWidth={2} /> {a.area}</span>
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" strokeWidth={2} /> {a.available}</span>
              </div>
            </div>
            <a href={`tel:${a.phone}`} className="flex items-center gap-2 bg-pine text-paper px-4 py-2.5 text-sm font-medium hover:bg-pine-dark transition-colors shrink-0 w-fit">
              <Phone className="h-4 w-4" strokeWidth={2} /> {a.phone}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
