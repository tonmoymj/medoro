import { Briefcase, MapPin, ArrowRight } from "lucide-react";
import { jobs } from "@/data";

export default function Jobs() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-10">
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold mb-2">ক্যারিয়ার</p>
      <h1 className="font-display text-4xl text-ink mb-3 flex items-center gap-3">
        <Briefcase className="h-8 w-8 text-pine" strokeWidth={1.5} /> নিয়োগ বিজ্ঞপ্তি
      </h1>
      <p className="text-ink/60 max-w-xl mb-8">রাজশাহীর হাসপাতাল ও ক্লিনিকগুলোর সাম্প্রতিক নিয়োগ বিজ্ঞপ্তি এখানে দেখুন।</p>

      <div className="divide-y divide-line border-t border-b border-line">
        {jobs.map((j) => (
          <button key={j.id} className="w-full text-left py-5 px-3 -mx-3 hover:bg-pine/5 transition-colors flex items-center justify-between gap-4">
            <div>
              <h3 className="font-display text-lg text-ink">{j.title}</h3>
              <p className="text-xs text-ink/55 mt-1">{j.hospital}</p>
              <div className="flex gap-4 mt-1.5 font-mono text-xs text-ink/45">
                <span>{j.type}</span>
                <span className="flex items-center gap-1"><MapPin className="h-3 w-3" strokeWidth={2} /> {j.area}</span>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-ink/30 shrink-0" strokeWidth={2} />
          </button>
        ))}
      </div>
    </div>
  );
}
