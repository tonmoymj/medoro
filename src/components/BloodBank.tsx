import { Phone, MapPin, Droplet } from "lucide-react";
import { bloodBanks } from "@/data";

const groups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export default function BloodBank() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-10">
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold mb-2">জরুরি সেবা</p>
      <h1 className="font-display text-4xl text-ink mb-3">ব্লাড ব্যাংক</h1>
      <p className="text-ink/60 max-w-xl mb-8">রক্তের প্রয়োজনে সরাসরি ব্লাড ব্যাংকে যোগাযোগ করুন, অথবা নির্দিষ্ট গ্রুপ দিয়ে খুঁজুন।</p>

      <div className="flex flex-wrap gap-2 mb-10">
        {groups.map((g) => (
          <button key={g} className="border border-line bg-white px-4 py-2 text-sm font-mono hover:border-brick hover:text-brick transition-colors flex items-center gap-1.5">
            <Droplet className="h-3.5 w-3.5" strokeWidth={2} /> {g}
          </button>
        ))}
      </div>

      <div className="divide-y divide-line border-t border-b border-line">
        {bloodBanks.map((b) => (
          <div key={b.id} className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-display text-lg text-ink">{b.name}</h3>
              <p className="text-xs text-ink/50 mt-1.5 flex items-center gap-1.5"><MapPin className="h-3 w-3" strokeWidth={2} /> {b.area}</p>
              <p className="text-xs text-ink/45 mt-1">{b.note}</p>
            </div>
            <a href={`tel:${b.phone}`} className="flex items-center gap-2 bg-brick text-paper px-4 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity shrink-0 w-fit">
              <Phone className="h-4 w-4" strokeWidth={2} /> {b.phone}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
