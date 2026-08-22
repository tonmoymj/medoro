import { MapPin, CheckCircle2, Clock } from "lucide-react";
import { cities } from "@/data";

export default function Cities({ go }: { go: (v: "doctors") => void }) {
  return (
    <div className="mx-auto max-w-4xl px-5 py-10">
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold mb-2">বিভাগ নির্বাচন করুন</p>
      <h1 className="font-display text-4xl text-ink mb-3">Medoro কোথায় সক্রিয়?</h1>
      <p className="text-ink/60 max-w-xl mb-10">
        আমরা রাজশাহী থেকে শুরু করে ধাপে ধাপে দেশের প্রতিটি বিভাগে ছড়িয়ে দিচ্ছি — নিচে বর্তমান অবস্থা দেখুন।
      </p>

      <div className="grid sm:grid-cols-2 gap-4">
        {cities.map((c) => (
          <button
            key={c.id}
            disabled={c.status !== "live"}
            onClick={() => c.status === "live" && go("doctors")}
            className={`text-left border p-5 flex items-center justify-between gap-4 transition-all ${
              c.status === "live"
                ? "border-pine bg-white hover:shadow-[4px_4px_0_0_#C68A2E] cursor-pointer"
                : "border-line bg-white/50 opacity-60 cursor-default"
            }`}
          >
            <div>
              <h3 className="font-display text-xl text-ink flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gold" strokeWidth={2} /> {c.name}
              </h3>
              <p className="text-xs text-ink/45 mt-1">{c.division}</p>
              {c.status === "live" && (
                <p className="font-mono text-xs text-pine mt-2 num">{c.doctors}+ ডাক্তার তালিকাভুক্ত</p>
              )}
            </div>
            {c.status === "live" ? (
              <span className="flex items-center gap-1.5 text-xs font-mono text-pine bg-pine/10 px-2.5 py-1.5 shrink-0">
                <CheckCircle2 className="h-3.5 w-3.5" strokeWidth={2} /> সক্রিয়
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-xs font-mono text-ink/40 bg-ink/5 px-2.5 py-1.5 shrink-0">
                <Clock className="h-3.5 w-3.5" strokeWidth={2} /> শীঘ্রই
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="mt-10 border border-dashed border-line p-6 text-sm text-ink/55">
        আপনার এলাকায় Medoro দ্রুত আনতে চান? আমাদের{" "}
        <span className="text-pine font-medium">যোগাযোগ পেজ</span> থেকে জানান — স্থানীয় ফিল্ড পার্টনার হিসেবে যুক্ত হওয়ারও সুযোগ আছে।
      </div>
    </div>
  );
}
