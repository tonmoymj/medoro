import { useState, useMemo, useEffect } from "react";
import { Search, MapPin, SlidersHorizontal, SearchX, Clock, Stethoscope, Star, CheckCircle2 } from "lucide-react";
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
        d.specialty.includes(query) ||
        d.degree.toLowerCase().includes(query.toLowerCase());
      const matchesSpecialty = !activeSpecialty || d.specialtyId === activeSpecialty;
      return matchesQuery && matchesSpecialty;
    });
  }, [query, activeSpecialty, doctors]);

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold mb-2 flex items-center gap-1.5">
            <Stethoscope className="h-3.5 w-3.5" /> সূচি &middot; ডাক্তার
          </p>
          <h1 className="font-display text-4xl text-ink">বিশেষজ্ঞ ডাক্তার খুঁজুন</h1>
        </div>
        <div className="font-mono text-xs text-ink/50 bg-white border border-line px-3.5 py-2 w-fit">
          মোট নিবন্ধিত ডাক্তার: <span className="text-pine font-bold num">{doctors.length}</span> জন
        </div>
      </div>

      <div className="bg-white border border-line p-2 mb-10 shadow-sm flex flex-col md:flex-row items-center gap-3">
        <div className="flex items-center gap-3 px-3 py-2 flex-1 w-full">
          <Search className="h-5 w-5 text-pine shrink-0" strokeWidth={2} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ডাক্তারের নাম, ডিগ্রি বা বিভাগ লিখে খুঁজুন..."
            className="w-full bg-transparent outline-none text-[15px] placeholder:text-ink/40"
          />
        </div>
        {query && (
          <button 
            onClick={() => setQuery("")}
            className="text-xs font-mono text-ink/40 hover:text-ink px-3 py-1"
          >
            মুছে ফেলুন
          </button>
        )}
      </div>

      <div className="grid md:grid-cols-[240px_1fr] gap-10">
        {/* filter sidebar */}
        <aside>
          <div className="bg-white border border-line p-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink/50 mb-3 flex items-center gap-2">
              <SlidersHorizontal className="h-3.5 w-3.5" strokeWidth={2} /> বিভাগ ফিল্টার
            </p>
            <ul className="border-t border-line divide-y divide-line/60">
              <li>
                <button
                  onClick={() => setActiveSpecialty(null)}
                  className={`w-full flex items-center justify-between py-2.5 text-left text-sm transition-colors ${
                    activeSpecialty === null ? "text-pine font-bold" : "text-ink/65 hover:text-ink"
                  }`}
                >
                  <span>সব বিভাগ</span>
                  <span className="font-mono text-xs bg-pine/10 text-pine px-2 py-0.5 rounded-full num">{doctors.length}</span>
                </button>
              </li>
              {specialties.map((s) => {
                const count = doctors.filter(d => d.specialtyId === s.id).length;
                return (
                  <li key={s.id}>
                    <button
                      onClick={() => setActiveSpecialty(s.id)}
                      className={`w-full flex items-center justify-between py-2.5 text-left text-sm transition-colors ${
                        activeSpecialty === s.id ? "text-pine font-bold" : "text-ink/65 hover:text-ink"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className="font-mono text-[10px] text-gold num">{s.no}</span>
                        {s.name}
                      </span>
                      <span className="font-mono text-xs text-ink/40 num">{count}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="mt-8">
            <AdSlot slotId="doctors-sidebar" variant="sidebar" label="ক্লিনিক/ডায়াগনস্টিক সেন্টারের সাইডবার বিজ্ঞাপন" />
          </div>
        </aside>

        {/* results */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <p className="text-xs font-mono text-ink/50 uppercase tracking-wider">
              {loading ? "খুঁজছি..." : `${filtered.length} জন ডাক্তার পাওয়া গেছে`}
            </p>
          </div>

          <div className="mb-6">
            <AdSlot slotId="doctors-card" variant="card" label="স্পনসরড হাসপাতাল/ক্লিনিক লিস্টিং — এই ফরম্যাটে ডাক্তার কার্ডের মতোই দেখাবে" />
          </div>

          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <DoctorCardSkeleton />
              <DoctorCardSkeleton />
              <DoctorCardSkeleton />
              <DoctorCardSkeleton />
              <DoctorCardSkeleton />
              <DoctorCardSkeleton />
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-16 text-center border border-dashed border-line bg-white">
              <SearchX className="h-10 w-10 text-ink/25" strokeWidth={1.5} />
              <p className="text-ink/70 font-medium text-base">কোনো ডাক্তার পাওয়া যায়নি</p>
              <p className="text-ink/45 text-xs max-w-xs">
                অন্য কোনো নাম বা বিভাগ দিয়ে খোঁজার চেষ্টা করুন।
              </p>
              <button
                onClick={() => { setQuery(""); setActiveSpecialty(null); }}
                className="text-xs font-mono bg-pine/10 text-pine px-4 py-2 hover:bg-pine hover:text-paper transition-colors mt-2"
              >
                সব ফিল্টার রিসেট করুন
              </button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((d) => {
                const initials = d.name.replace("ডা. ", "").charAt(0);
                return (
                  <div
                    key={d.id}
                    onClick={() => openDoctor(d.id)}
                    className="group relative bg-white border border-line hover:border-pine/50 hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer overflow-hidden"
                  >
                    {/* Top gradient accent */}
                    <div className="h-1.5 w-full bg-gradient-to-r from-pine via-gold to-pine" />

                    <div className="p-5 flex flex-col flex-1">
                      {/* Badge / Category */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="inline-block font-mono text-[10px] uppercase tracking-wider bg-gold/10 border border-gold/30 text-ink/80 px-2 py-0.5">
                          {d.specialty}
                        </span>
                        {d.featured && (
                          <span className="font-mono text-[9px] bg-pine text-paper px-1.5 py-0.5 flex items-center gap-1">
                            <Star className="h-2.5 w-2.5 fill-paper" /> ফিচার্ড
                          </span>
                        )}
                      </div>

                      {/* Avatar & Name - Vertical Centered / Large Layout */}
                      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-4 text-center sm:text-left">
                        <div className="relative h-20 w-20 shrink-0 border-2 border-pine/20 rounded-full overflow-hidden bg-pine/5 flex items-center justify-center font-display text-3xl text-pine shadow-inner group-hover:border-pine transition-colors">
                          {d.photo ? (
                            <img src={d.photo} alt={d.name} className="h-full w-full object-cover" />
                          ) : (
                            <span>{initials}</span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-display text-lg sm:text-xl text-ink group-hover:text-pine transition-colors leading-snug font-semibold">
                            {d.name}
                          </h3>
                          <p className="text-xs text-ink/65 mt-1 leading-normal font-mono">
                            {d.degree}
                          </p>
                        </div>
                      </div>

                      {/* Info grid */}
                      <div className="bg-paper/60 border border-line/60 p-3 space-y-1.5 mb-4 text-xs font-mono text-ink/70">
                        <div className="flex items-center gap-2">
                          <Clock className="h-3.5 w-3.5 text-gold shrink-0" strokeWidth={2} />
                          <span>অভিজ্ঞতা: <strong className="text-ink font-normal">{d.experience}</strong></span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-3.5 w-3.5 text-gold shrink-0" strokeWidth={2} />
                          <span className="truncate">{d.area}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-pine shrink-0" strokeWidth={2} />
                          <span>রেজি: {d.regNo}</span>
                        </div>
                      </div>

                      {/* Chambers & Fee info */}
                      <div className="mt-auto pt-3 border-t border-dashed border-line flex items-center justify-between text-xs font-mono">
                        <span className="text-ink/60">{d.chambers.length} টি চেম্বার</span>
                        {d.chambers[0] && (
                          <span className="text-pine font-bold">
                            ফি: {d.chambers[0].fee}
                          </span>
                        )}
                      </div>

                      {/* Hover Action Button */}
                      <div className="mt-4">
                        <span className="block w-full text-center bg-pine/5 group-hover:bg-pine group-hover:text-paper text-pine text-xs font-medium py-2.5 transition-all duration-200 border border-pine/20 group-hover:border-pine">
                          বিস্তারিত প্রোফাইল ও সিরিয়াল
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
