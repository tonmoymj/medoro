import { Search, Phone, Siren, Droplet, Wind, Calculator, Stethoscope, MessageCircleQuestion, PhoneCall, ClipboardList, Store, HeartHandshake, Activity, Video, PackageSearch, HandHeart, Megaphone, HelpCircle, Briefcase, Star } from "lucide-react";

type View =
  | "home" | "doctors" | "doctor" | "hospitals" | "hospital"
  | "about" | "blog" | "contact" | "cities" | "admin" | "join"
  | "ambulance" | "bloodbank" | "oxygen" | "hotlines"
  | "bmi" | "symptom" | "medicines" | "indications" | "pharmacies" | "community"
  | "caregivers" | "physio" | "telemedicine" | "equipment" | "camps" | "notices" | "faq" | "jobs" | "reviews";

export default function Nav({ view, go }: { view: View; go: (v: View) => void }) {
  const links: { label: string; v: View }[] = [
    { label: "ডাক্তার", v: "doctors" },
    { label: "হাসপাতাল", v: "hospitals" },
    { label: "মেডিসিন", v: "medicines" },
    { label: "স্বাস্থ্যকথা", v: "blog" },
    { label: "আমাদের সম্পর্কে", v: "about" },
  ];

  const utilityLinks: { label: string; v: View; icon: any }[] = [
    { label: "অ্যাম্বুলেন্স", v: "ambulance", icon: Siren },
    { label: "ব্লাড ব্যাংক", v: "bloodbank", icon: Droplet },
    { label: "অক্সিজেন", v: "oxygen", icon: Wind },
    { label: "হটলাইন", v: "hotlines", icon: PhoneCall },
    { label: "BMI ক্যালকুলেটর", v: "bmi", icon: Calculator },
    { label: "সিম্পটম চেকার", v: "symptom", icon: Stethoscope },
    { label: "রোগ নির্দেশিকা", v: "indications", icon: ClipboardList },
    { label: "২৪ঘণ্টা ফার্মেসি", v: "pharmacies", icon: Store },
    { label: "কমিউনিটি Q&A", v: "community", icon: MessageCircleQuestion },
    { label: "নার্স/কেয়ারগিভার", v: "caregivers", icon: HeartHandshake },
    { label: "ফিজিওথেরাপি", v: "physio", icon: Activity },
    { label: "টেলিমেডিসিন", v: "telemedicine", icon: Video },
    { label: "ইকুইপমেন্ট ভাড়া", v: "equipment", icon: PackageSearch },
    { label: "ফ্রি ক্যাম্প", v: "camps", icon: HandHeart },
    { label: "নোটিশ বোর্ড", v: "notices", icon: Megaphone },
    { label: "শব্দকোষ", v: "faq", icon: HelpCircle },
    { label: "নিয়োগ", v: "jobs", icon: Briefcase },
    { label: "রিভিউ", v: "reviews", icon: Star },
  ];

  const activeGroup =
    view === "doctor" ? "doctors" : view === "hospital" ? "hospitals" : view;

  return (
    <header className="sticky top-0 z-30 bg-paper/95 backdrop-blur border-b border-line">
      <div className="bg-pine text-paper/90 text-[11px] font-mono tracking-wide">
        <div className="mx-auto max-w-6xl px-5 py-1.5 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Phone className="h-3 w-3" strokeWidth={2.5} />
            জরুরি সহায়তা: ১৬২৬৩
          </span>
          <span className="hidden sm:flex items-center gap-1">
            <button onClick={() => go("cities")} className="hover:text-gold underline underline-offset-2">রাজশাহী সংস্করণ</button>
            &middot; দেশব্যাপী শীঘ্রই
          </span>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-5 py-4 flex items-center justify-between gap-6">
        <button onClick={() => go("home")} className="flex items-baseline gap-2 group">
          <span className="font-display italic font-semibold text-[28px] leading-none text-pine tracking-tight">
            Medoro
          </span>
          <span className="hidden md:inline text-[11px] font-mono uppercase tracking-[0.14em] text-ink/50">
            স্বাস্থ্য নির্দেশিকা
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-8 font-body text-[15px] font-medium">
          {links.map((l) => (
            <button
              key={l.v}
              onClick={() => go(l.v)}
              className={`pb-1 border-b-2 transition-colors ${
                activeGroup === l.v ? "border-gold text-ink" : "border-transparent text-ink/60 hover:text-ink"
              }`}
            >
              {l.label}
            </button>
          ))}
        </nav>

        <button
          onClick={() => go("doctors")}
          className="flex items-center gap-2 bg-pine text-paper px-4 py-2 text-sm font-medium hover:bg-pine-dark transition-colors"
        >
          <Search className="h-4 w-4" strokeWidth={2.5} />
          <span className="hidden sm:inline">ডাক্তার খুঁজুন</span>
        </button>
      </div>

      {/* utility strip: emergency + tools + community + more */}
      <div className="border-t border-line bg-white overflow-x-auto">
        <div className="mx-auto max-w-6xl px-5 flex items-center gap-1 py-1.5 min-w-max">
          {utilityLinks.map((u) => (
            <button
              key={u.v}
              onClick={() => go(u.v)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono whitespace-nowrap transition-colors ${
                view === u.v ? "bg-pine text-paper" : "text-ink/55 hover:bg-pine/5 hover:text-pine"
              }`}
            >
              <u.icon className="h-3.5 w-3.5" strokeWidth={2} /> {u.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
