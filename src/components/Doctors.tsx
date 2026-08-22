import { useState, useMemo, useEffect } from "react";
import { Search, MapPin, ArrowRight, SlidersHorizontal, SearchX } from "lucide-react";
import { specialties, doctors } from "@/data";
import AdSlot from "@/components/AdSlot";
import { DoctorCardSkeleton } from "@/components/Skeleton";

export default function Doctors({ openDoctor }: { openDoctor: (id: string) => void }) {
  const [query, setQuery] = useState("");
  const [activeSpecialty, setActiveSpecialty] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 550);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(() => {
    return doctors.filter((d) => {
      const matchesQuery =
        query.trim() === "" ||
        d.name.toLowerCase().includes(query.toLowerCase()) ||
        d.specialty.includes(query);
      const matchesSpecialty = !activeSpecialty || d.specialtyId === activeSpecialty;
      return matchesQuery && matchesSpecialty;
    });
  }, [query, activeSpecialty]);

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold mb-2">সূচি &middot; ডাক্তার</p>
      <h1 className="font-display text-4xl text-ink mb-8">বিশেষজ্ঞ ডাক্তার খুঁজুন</h1>

      <div className="bg-white border border-line flex items-center gap-3 px-4 py-3.5 mb-10 max-w-2xl">
        <Search className="h-5 w-5 text-ink/40 shrink-0" strokeWidth={2} />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="নাম বা বিভাগ লিখে খুঁজুন..."
          className="w-full bg-transparent outline-none text-[15px] placeholder:text-ink/40"
        />
      </div>

      <div className="grid md:grid-cols-[240px_1fr] gap-10">
        {/* filter sidebar */}
        <aside>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink/50 mb-3 flex items-center gap-2">
            <SlidersHorizontal className="h-3.5 w-3.5" strokeWidth={2} /> বিভাগ
          </p>
          <ul className="border-t border-line">
            <li>
              <button
                onClick={() => setActiveSpecialty(null)}
                className={`w-full flex items-center justify-between py-2.5 border-b border-line text-left text-sm ${
                  activeSpecialty === null ? "text-pine font-medium" : "text-ink/65 hover:text-ink"
                }`}
              >
                সব বিভাগ
              </button>
            </li>
            {specialties.map((s) => (
              <li key={s.id}>
                <button
                  onClick={() => setActiveSpecialty(s.id)}
                  className={`w-full flex items-center justify-between py-2.5 border-b border-line text-left text-sm ${
                    activeSpecialty === s.id ? "text-pine font-medium" : "text-ink/65 hover:text-ink"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <span className="font-mono text-[10px] text-gold num">{s.no}</span>
                    {s.name}
                  </span>
                  <span className="font-mono text-xs text-ink/35 num">{s.count}</span>
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <AdSlot variant="sidebar" label="ক্লিনিক/ডায়াগনস্টিক সেন্টারের সাইডবার বিজ্ঞাপন" />
          </div>
        </aside>

        {/* results */}
        <div>
          <p className="text-sm text-ink/50 mb-5 font-mono">
            {loading ? "খুঁজছি..." : `${filtered.length} জন ডাক্তার পাওয়া গেছে`}
          </p>
          <div className="space-y-5">
            <AdSlot variant="card" label="স্পনসরড হাসপাতাল/ক্লিনিক লিস্টিং — এই ফরম্যাটে ডাক্তার কার্ডের মতোই দেখাবে" />
            {loading ? (
              <>
                <DoctorCardSkeleton />
                <DoctorCardSkeleton />
                <DoctorCardSkeleton />
              </>
            ) : (
              <>
                {filtered.map((d) => (
              <button
                key={d.id}
                onClick={() => openDoctor(d.id)}
                className="w-full text-left bg-white border border-line perf-top pt-5 hover:shadow-[4px_4px_0_0_#C68A2E] transition-all"
              >
                <div className="px-5 pb-5 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
                  <div className="flex-1">
                    <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-gold mb-1.5">{d.specialty}</p>
                    <h3 className="font-display text-xl text-ink">{d.name}</h3>
                    <p className="text-sm text-ink/60 mt-1">{d.degree}</p>
                    <p className="text-xs text-ink/45 mt-2 flex items-center gap-1">
                      <MapPin className="h-3 w-3" strokeWidth={2} /> {d.area}
                    </p>
                  </div>
                  <div className="sm:text-right sm:border-l sm:border-dashed sm:border-line sm:pl-6 shrink-0">
                    <p className="font-mono text-xs text-ink/50">{d.experience} অভিজ্ঞতা</p>
                    <p className="font-mono text-xs text-ink/50 mt-1">{d.chambers.length} টি চেম্বার</p>
                    <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-pine">
                      বিস্তারিত <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
                    </span>
                  </div>
                </div>
              </button>
                ))}
                {filtered.length === 0 && (
                  <div className="flex flex-col items-center gap-3 py-14 text-center border border-dashed border-line">
                    <SearchX className="h-8 w-8 text-ink/25" strokeWidth={1.5} />
                    <p className="text-ink/55 text-sm max-w-xs">
                      কোনো ডাক্তার পাওয়া যায়নি। অন্য নাম বা বিভাগ দিয়ে চেষ্টা করুন।
                    </p>
                    <button
                      onClick={() => { setQuery(""); setActiveSpecialty(null); }}
                      className="text-xs font-mono text-pine underline underline-offset-2 mt-1"
                    >
                      সব ফিল্টার রিসেট করুন
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
