import { Phone, MapPin, Wind } from "lucide-react";
import { oxygenProviders } from "@/data";

export default function Oxygen() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-10">
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold mb-2">জরুরি সেবা</p>
      <h1 className="font-display text-4xl text-ink mb-3 flex items-center gap-3">
        <Wind className="h-8 w-8 text-pine" strokeWidth={1.5} /> অক্সিজেন সাপ্লাই
      </h1>
      <p className="text-ink/60 max-w-xl mb-8">সিলিন্ডার ভাড়া, রিফিল বা কনসেন্ট্রেটরের জন্য নিচের প্রতিষ্ঠানগুলোতে যোগাযোগ করুন।</p>

      <div className="divide-y divide-line border-t border-b border-line">
        {oxygenProviders.map((o) => (
          <div key={o.id} className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-display text-lg text-ink">{o.name}</h3>
              <p className="text-xs text-ink/50 mt-1.5 flex items-center gap-1.5"><MapPin className="h-3 w-3" strokeWidth={2} /> {o.area}</p>
              <p className="text-xs text-ink/45 mt-1">{o.service}</p>
            </div>
            <a href={`tel:${o.phone}`} className="flex items-center gap-2 bg-pine text-paper px-4 py-2.5 text-sm font-medium hover:bg-pine-dark transition-colors shrink-0 w-fit">
              <Phone className="h-4 w-4" strokeWidth={2} /> {o.phone}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
