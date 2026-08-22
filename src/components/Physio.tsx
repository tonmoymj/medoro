import { Phone, MapPin, Activity } from "lucide-react";
import { physioCenters } from "@/data";

export default function Physio() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-10">
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold mb-2">বিশেষায়িত সেবা</p>
      <h1 className="font-display text-4xl text-ink mb-3 flex items-center gap-3">
        <Activity className="h-8 w-8 text-pine" strokeWidth={1.5} /> ফিজিওথেরাপি সেন্টার
      </h1>
      <p className="text-ink/60 max-w-xl mb-8">ইনজুরি, স্ট্রোক পরবর্তী পুনর্বাসন বা দীর্ঘস্থায়ী ব্যথার জন্য ফিজিওথেরাপি সেন্টার খুঁজুন।</p>

      <div className="grid sm:grid-cols-2 gap-6">
        {physioCenters.map((p) => (
          <div key={p.id} className="bg-white border border-line p-6">
            <h3 className="font-display text-xl text-ink">{p.name}</h3>
            <p className="text-sm text-ink/55 mt-2 flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" strokeWidth={2} /> {p.area}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {p.services.map((s) => (
                <span key={s} className="text-[11px] font-mono bg-pine/5 text-pine px-2 py-1 border border-pine/15">{s}</span>
              ))}
            </div>
            <a href={`tel:${p.phone}`} className="mt-5 flex items-center gap-2 bg-pine text-paper px-4 py-2.5 text-sm font-medium hover:bg-pine-dark transition-colors w-fit">
              <Phone className="h-4 w-4" strokeWidth={2} /> {p.phone}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
