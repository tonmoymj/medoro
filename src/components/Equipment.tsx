import { Phone, PackageSearch } from "lucide-react";
import { equipment } from "@/data";

export default function Equipment() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-10">
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold mb-2">হোম কেয়ার</p>
      <h1 className="font-display text-4xl text-ink mb-3 flex items-center gap-3">
        <PackageSearch className="h-8 w-8 text-pine" strokeWidth={1.5} /> মেডিকেল ইকুইপমেন্ট ভাড়া
      </h1>
      <p className="text-ink/60 max-w-xl mb-8">হুইলচেয়ার, অক্সিজেন কনসেন্ট্রেটর, হাসপাতাল বেড — বাসায় প্রয়োজনীয় সরঞ্জাম ভাড়া নিন।</p>

      <div className="grid sm:grid-cols-2 gap-4">
        {equipment.map((e) => (
          <div key={e.id} className="bg-white border border-line p-5 flex items-center justify-between gap-4">
            <div>
              <h3 className="font-display text-lg text-ink">{e.name}</h3>
              <p className="text-xs text-ink/50 mt-1">{e.provider}</p>
              <p className="font-mono text-xs text-pine mt-2">{e.rate} &middot; জামানত {e.deposit}</p>
            </div>
            <a href={`tel:${e.phone}`} className="flex items-center gap-1.5 bg-pine text-paper px-3 py-2 text-xs font-medium hover:bg-pine-dark transition-colors shrink-0">
              <Phone className="h-3.5 w-3.5" strokeWidth={2} /> কল
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
