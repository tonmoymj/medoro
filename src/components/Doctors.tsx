import { useState, useMemo, useEffect } from "react";
import { Search, MapPin, SlidersHorizontal, SearchX, Clock, Stethoscope } from "lucide-react";
import { specialties } from "@/data";
import { useAdmin } from "@/context/AdminContext";
import AdSlot from "@/components/AdSlot";
import { DoctorCardSkeleton } from "@/components/Skeleton";

export default function Doctors({ openDoctor }: { openDoctor: (id: string) => void }) {
  const { doctors } = useAdmin();
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

          <div className="mb-5">
            <AdSlot variant="card" label="স্পনসরড হাসপাতাল/ক্লিনিক লিস্টিং — এই ফরম্যাটে ডাক্তার কার্ডের মতোই দেখাবে" />
          </div>

          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <DoctorCardSkeleton />
              <DoctorCardSkeleton />
              <DoctorCardSkeleton />
              <DoctorCardSkeleton />
              <DoctorCardSkeleton />
              <DoctorCardSkeleton />
            </div>
          ) : filtered.length === 0 ? (
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
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((d) => {
                const initials = d.name.replace("ডা. ", "").charAt(0);
                return (
                  <button
                    key={d.id}
                    onClick={() => openDoctor(d.id)}
                    className="group w-full text-left bg-white border border-line hover:border-pine/40 hover:shadow-[4px_4px_0_0_#C68A2E] transition-all duration-200 flex flex-col"
                  >
                    {/* card top accent */}
                    <div className="h-1 w-full bg-gradient-to-r from-pine/60 to-gold/60" />

                    <div className="p-5 flex flex-col flex-1">
                      {/* avatar + specialty */}
                      <div className="flex items-start gap-4 mb-4">
                        <div className="h-14 w-14 shrink-0 border border-pine/20 overflow-hidden bg-pine/10 flex items-center justify-center font-display text-2xl text-pine">
                          {d.photo
                            ? <img src={d.photo} alt={d.name} className="h-full w-full object-cover" />
                            : initials
                          }
                        </div>
                        <div className="flex-1 min-w-0 pt-0.5">
                          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-gold mb-1 truncate">
                            {d.specialty}
                          </p>
                          <h3 className="font-display text-[17px] text-ink leading-snug line-clamp-2">
                            {d.name}
                          </h3>
                        </div>
                      </div>

                      {/* degree */}
                      <p className="text-xs text-ink/55 leading-relaxed mb-4 line-clamp-2">
                        {d.degree}
                      </p>

                      {/* divider */}
                      <div className="border-t border-dashed border-line mb-4" />

                      {/* meta */}
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        <div className="flex items-center gap-1.5 text-[11px] font-mono text-ink/55">
                          <Clock className="h-3 w-3 shrink-0 text-gold" strokeWidth={2} />
                          <span>{d.experience}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[11px] font-mono text-ink/55">
                          <Stethoscope className="h-3 w-3 shrink-0 text-gold" strokeWidth={2} />
                          <span>{d.chambers.length} চেম্বার</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[11px] font-mono text-ink/55 col-span-2">
                          <MapPin className="h-3 w-3 shrink-0 text-gold" strokeWidth={2} />
                          <span className="truncate">{d.area}</span>
                        </div>
                      </div>

                      {/* fee badge from first chamber */}
                      {d.chambers[0] && (
                        <div className="mb-4">
                          <span className="inline-flex items-center gap-1 bg-pine/5 border border-pine/15 text-pine font-mono text-[11px] px-2.5 py-1">
                            ভিজিট: {d.chambers[0].fee}
                          </span>
                        </div>
                      )}

                      {/* cta */}
                      <div className="mt-auto">
                        <span className="block w-full text-center bg-pine text-paper text-sm font-medium py-2.5 group-hover:bg-pine/90 transition-colors">
                          প্রোফাইল দেখুন
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
