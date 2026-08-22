import { Search, MapPin, ArrowRight, Stethoscope } from "lucide-react";
import { specialties, doctors, hospitals, cityStats } from "@/data";

type View = "home" | "doctors" | "doctor" | "hospitals" | "hospital" | "about" | "blog" | "contact" | "cities" | "admin" | "join";

export default function Home({
  go,
  openDoctor,
  openHospital,
}: {
  go: (v: View) => void;
  openDoctor: (id: string) => void;
  openHospital: (id: string) => void;
}) {
  const featured = doctors.filter((d) => d.featured);

  return (
    <div>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-5 pt-14 pb-16 grid md:grid-cols-[1.1fr_0.9fr] gap-12 items-start">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold mb-4">
            রাজশাহী বিভাগ &middot; খণ্ড ০১
          </p>
          <h1 className="font-display text-[44px] sm:text-[58px] leading-[1.05] text-ink">
            রাজশাহীর <em className="not-italic text-pine">প্রতিটি চেম্বার</em>,
            <br />
            এক জায়গায় লেখা আছে।
          </h1>
          <p className="mt-6 text-lg text-ink/70 max-w-md leading-relaxed">
            বিশেষজ্ঞ, চেম্বারের ঠিকানা, ভিজিটিং আওয়ার আর ফি — সব একসাথে,
            যেন পুরনো দিনের ডাক্তার-ডায়েরির মতোই নির্ভরযোগ্য।
          </p>

          {/* search slip */}
          <div className="mt-9 bg-white border border-line shadow-[4px_4px_0_0_#123832] max-w-lg">
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-line">
              <Search className="h-5 w-5 text-ink/40 shrink-0" strokeWidth={2} />
              <input
                readOnly
                onClick={() => go("doctors")}
                value=""
                placeholder="ডাক্তারের নাম বা স্পেশালিটি লিখুন..."
                className="w-full bg-transparent outline-none text-[15px] placeholder:text-ink/40 cursor-pointer"
              />
            </div>
            <button
              onClick={() => go("doctors")}
              className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-pine hover:bg-pine/5 transition-colors"
            >
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4" strokeWidth={2} /> রাজশাহীর মধ্যে খুঁজুন
              </span>
              <ArrowRight className="h-4 w-4" strokeWidth={2} />
            </button>
          </div>

          <div className="mt-8 flex gap-8 font-mono">
            <div>
              <p className="text-2xl text-pine num">{cityStats.doctors}+</p>
              <p className="text-[11px] uppercase tracking-wide text-ink/50">ডাক্তার</p>
            </div>
            <div>
              <p className="text-2xl text-pine num">{cityStats.hospitals}</p>
              <p className="text-[11px] uppercase tracking-wide text-ink/50">হাসপাতাল</p>
            </div>
            <div>
              <p className="text-2xl text-pine num">{cityStats.specialties}</p>
              <p className="text-[11px] uppercase tracking-wide text-ink/50">বিভাগ</p>
            </div>
          </div>
        </div>

        {/* specialty index - literal numbered directory */}
        <div className="border border-line bg-white">
          <div className="px-5 py-3 border-b border-line flex items-center justify-between">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink/50">বিভাগ অনুযায়ী সূচি</p>
            <Stethoscope className="h-4 w-4 text-ink/30" strokeWidth={2} />
          </div>
          <ul>
            {specialties.slice(0, 8).map((s, i) => (
              <li key={s.id}>
                <button
                  onClick={() => go("doctors")}
                  className={`w-full flex items-center justify-between px-5 py-3 text-left hover:bg-gold/10 transition-colors group ${
                    i !== 0 ? "border-t border-line" : ""
                  }`}
                >
                  <span className="flex items-center gap-4">
                    <span className="font-mono text-xs text-gold num">{s.no}</span>
                    <span className="text-[15px] text-ink group-hover:text-pine">{s.name}</span>
                  </span>
                  <span className="text-xs font-mono text-ink/40 num">{s.count} জন</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Featured doctors - prescription slip style */}
      <section className="mx-auto max-w-6xl px-5 py-14 border-t border-line">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold mb-2">এই সপ্তাহে বেশি খোঁজা হয়েছে</p>
            <h2 className="font-display text-3xl text-ink">পরিচিত বিশেষজ্ঞগণ</h2>
          </div>
          <button onClick={() => go("doctors")} className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-pine hover:gap-2.5 transition-all">
            সব ডাক্তার দেখুন <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((d) => (
            <button
              key={d.id}
              onClick={() => openDoctor(d.id)}
              className="text-left bg-white border border-line perf-top pt-5 hover:shadow-[4px_4px_0_0_#C68A2E] hover:-translate-y-0.5 transition-all"
            >
              <div className="px-5 pb-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-gold mb-2">{d.specialty}</p>
                <h3 className="font-display text-xl text-ink">{d.name}</h3>
                <p className="text-sm text-ink/60 mt-1">{d.degree}</p>
                <div className="mt-4 pt-4 border-t border-dashed border-line flex items-center justify-between text-xs font-mono text-ink/50">
                  <span>{d.experience} অভিজ্ঞতা</span>
                  <span className="flex items-center gap-1 text-ink/70">
                    <MapPin className="h-3 w-3" strokeWidth={2} /> {d.area.split(",")[0]}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Hospitals strip */}
      <section className="mx-auto max-w-6xl px-5 py-14 border-t border-line">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold mb-2">চেম্বার ও চিকিৎসা কেন্দ্র</p>
            <h2 className="font-display text-3xl text-ink">রাজশাহীর হাসপাতাল</h2>
          </div>
          <button onClick={() => go("hospitals")} className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-pine hover:gap-2.5 transition-all">
            সব হাসপাতাল দেখুন <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>
        <div className="divide-y divide-line border-t border-b border-line">
          {hospitals.map((h) => (
            <button
              key={h.id}
              onClick={() => openHospital(h.id)}
              className="w-full flex items-center justify-between gap-4 py-5 text-left hover:bg-pine/5 px-3 -mx-3 transition-colors"
            >
              <div>
                <h3 className="font-display text-lg text-ink">{h.name}</h3>
                <p className="text-sm text-ink/55 mt-0.5">{h.type} &middot; {h.area}</p>
              </div>
              <span className="hidden sm:flex items-center gap-1 text-xs font-mono text-ink/40 num shrink-0">
                {h.doctorCount} জন ডাক্তার <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* CTA strip for doctors/hospitals to join */}
      <section className="mx-auto max-w-6xl px-5 py-14 border-t border-line">
        <div className="bg-pine text-paper px-8 py-10 sm:px-12 sm:py-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold mb-2">আপনি কি একজন চিকিৎসক?</p>
            <h3 className="font-display text-2xl sm:text-3xl">আপনার চেম্বার তালিকাভুক্ত করুন, বিনামূল্যে।</h3>
          </div>
          <button onClick={() => go("join")} className="shrink-0 bg-gold text-ink px-6 py-3 font-medium hover:bg-gold-light transition-colors">
            তালিকাভুক্ত হোন
          </button>
        </div>
      </section>
    </div>
  );
}
