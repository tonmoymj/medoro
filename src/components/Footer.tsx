type View =
  | "home" | "doctors" | "doctor" | "hospitals" | "hospital"
  | "about" | "blog" | "contact" | "cities" | "admin" | "join"
  | "ambulance" | "bloodbank" | "oxygen" | "hotlines"
  | "bmi" | "symptom" | "medicines" | "indications" | "pharmacies" | "community"
  | "caregivers" | "physio" | "telemedicine" | "equipment" | "camps" | "notices" | "faq" | "jobs" | "reviews"
  | "notfound";

export default function Footer({ go }: { go: (v: View) => void }) {
  return (
    <footer className="border-t border-line bg-pine text-paper/80 mt-24">
      <div className="mx-auto max-w-6xl px-5 py-14 grid grid-cols-2 md:grid-cols-5 gap-8 text-sm">
        <div className="col-span-2 md:col-span-1">
          <button onClick={() => go("home")} className="font-display italic font-semibold text-2xl text-paper">
            Medoro
          </button>
          <p className="mt-3 text-paper/60 leading-relaxed">
            সঠিক ডাক্তার, সঠিক সময়ে। রাজশাহী থেকে শুরু, বাংলাদেশ জুড়ে পথচলা।
          </p>
        </div>
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-gold mb-3">ডিরেক্টরি</p>
          <ul className="space-y-2 text-paper/70">
            <li><button onClick={() => go("doctors")} className="hover:text-paper">বিশেষজ্ঞ ডাক্তার</button></li>
            <li><button onClick={() => go("hospitals")} className="hover:text-paper">হাসপাতাল ও ক্লিনিক</button></li>
            <li><button onClick={() => go("medicines")} className="hover:text-paper">ওষুধের তালিকা</button></li>
            <li><button onClick={() => go("cities")} className="hover:text-paper">বিভাগ অনুযায়ী খুঁজুন</button></li>
          </ul>
        </div>
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-gold mb-3">জরুরি ও টুলস</p>
          <ul className="space-y-2 text-paper/70">
            <li><button onClick={() => go("ambulance")} className="hover:text-paper">অ্যাম্বুলেন্স</button></li>
            <li><button onClick={() => go("bloodbank")} className="hover:text-paper">ব্লাড ব্যাংক</button></li>
            <li><button onClick={() => go("bmi")} className="hover:text-paper">BMI ক্যালকুলেটর</button></li>
            <li><button onClick={() => go("symptom")} className="hover:text-paper">সিম্পটম চেকার</button></li>
          </ul>
        </div>
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-gold mb-3">হোম কেয়ার</p>
          <ul className="space-y-2 text-paper/70">
            <li><button onClick={() => go("caregivers")} className="hover:text-paper">নার্স/কেয়ারগিভার</button></li>
            <li><button onClick={() => go("physio")} className="hover:text-paper">ফিজিওথেরাপি</button></li>
            <li><button onClick={() => go("telemedicine")} className="hover:text-paper">টেলিমেডিসিন</button></li>
            <li><button onClick={() => go("equipment")} className="hover:text-paper">ইকুইপমেন্ট ভাড়া</button></li>
          </ul>
        </div>
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-gold mb-3">Medoro</p>
          <ul className="space-y-2 text-paper/70">
            <li><button onClick={() => go("about")} className="hover:text-paper">আমাদের সম্পর্কে</button></li>
            <li><button onClick={() => go("blog")} className="hover:text-paper">স্বাস্থ্যকথা</button></li>
            <li><button onClick={() => go("community")} className="hover:text-paper">কমিউনিটি</button></li>
            <li><button onClick={() => go("camps")} className="hover:text-paper">ফ্রি ক্যাম্প</button></li>
            <li><button onClick={() => go("jobs")} className="hover:text-paper">নিয়োগ</button></li>
            <li><button onClick={() => go("faq")} className="hover:text-paper">শব্দকোষ</button></li>
            <li><button onClick={() => go("join")} className="hover:text-paper">ডাক্তারদের জন্য</button></li>
            <li><button onClick={() => go("contact")} className="hover:text-paper">যোগাযোগ</button></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-paper/10">
        <div className="mx-auto max-w-6xl px-5 py-4 flex flex-col sm:flex-row justify-between gap-2 text-xs text-paper/50 font-mono">
          <span>&copy; ২০২৬ Medoro. সর্বস্বত্ব সংরক্ষিত।</span>
          <span className="flex items-center gap-3">
            <button onClick={() => go("notices")} className="hover:text-paper">নোটিশ বোর্ড</button>
            <button onClick={() => go("hotlines")} className="hover:text-paper">জরুরি হটলাইন</button>
            <button onClick={() => go("admin")} className="hover:text-paper text-paper/40">অ্যাডমিন</button>
            <button onClick={() => go("notfound")} className="hover:text-paper text-paper/40">৪০৪ প্রিভিউ</button>
          </span>
        </div>
      </div>
    </footer>
  );
}
