import { Phone, MapPin, Clock } from "lucide-react";
import { pharmacies24 } from "@/data";

export default function Pharmacies() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-10">
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold mb-2">মেডিসিন ডিরেক্টরি</p>
      <h1 className="font-display text-4xl text-ink mb-3">২৪ ঘণ্টা খোলা ফার্মেসি</h1>
      <p className="text-ink/60 max-w-xl mb-8">রাতে বা জরুরি প্রয়োজনে কাছাকাছি খোলা ফার্মেসি খুঁজে নিন।</p>

      <div className="divide-y divide-line border-t border-b border-line">
        {pharmacies24.map((p) => (
          <div key={p.id} className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-display text-lg text-ink">{p.name}</h3>
              <div className="flex flex-wrap gap-x-5 gap-y-1 mt-1.5 font-mono text-xs text-ink/55">
                <span className="flex items-center gap-1"><MapPin className="h-3 w-3" strokeWidth={2} /> {p.area}</span>
                <span className="flex items-center gap-1 text-pine"><Clock className="h-3 w-3" strokeWidth={2} /> {p.hours}</span>
              </div>
            </div>
            <a href={`tel:${p.phone}`} className="flex items-center gap-2 bg-pine text-paper px-4 py-2.5 text-sm font-medium hover:bg-pine-dark transition-colors shrink-0 w-fit">
              <Phone className="h-4 w-4" strokeWidth={2} /> {p.phone}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
