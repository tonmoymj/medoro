import { createContext, useContext, useState, ReactNode } from "react";

type Lang = "bn" | "en";

// Translation dictionary — every visible UI string keyed in Bengali
const translations: Record<string, Record<Lang, string>> = {
  // ── Top bar ──
  "জরুরি সহায়তা: ১৬২৬৩": { bn: "জরুরি সহায়তা: ১৬২৬৩", en: "Emergency Helpline: 16263" },
  "রাজশাহী সংস্করণ": { bn: "রাজশাহী সংস্করণ", en: "Rajshahi Edition" },
  "দেশব্যাপী শীঘ্রই": { bn: "দেশব্যাপী শীঘ্রই", en: "Nationwide Soon" },
  "স্বাস্থ্য নির্দেশিকা": { bn: "স্বাস্থ্য নির্দেশিকা", en: "Health Directory" },

  // ── Main nav links ──
  "ডাক্তার": { bn: "ডাক্তার", en: "Doctors" },
  "হাসপাতাল": { bn: "হাসপাতাল", en: "Hospitals" },
  "মেডিসিন": { bn: "মেডিসিন", en: "Medicine" },
  "স্বাস্থ্যকথা": { bn: "স্বাস্থ্যকথা", en: "Health Blog" },
  "আমাদের সম্পর্কে": { bn: "আমাদের সম্পর্কে", en: "About Us" },
  "ডাক্তার খুঁজুন": { bn: "ডাক্তার খুঁজুন", en: "Find Doctor" },
  "মেনু সমুহ": { bn: "মেনু সমুহ", en: "Menu" },

  // ── Utility strip links ──
  "অ্যাম্বুলেন্স": { bn: "অ্যাম্বুলেন্স", en: "Ambulance" },
  "ব্লাড ব্যাংক": { bn: "ব্লাড ব্যাংক", en: "Blood Bank" },
  "অক্সিজেন": { bn: "অক্সিজেন", en: "Oxygen" },
  "হটলাইন": { bn: "হটলাইন", en: "Hotline" },
  "BMI ক্যালকুলেটর": { bn: "BMI ক্যালকুলেটর", en: "BMI Calculator" },
  "সিম্পটম চেকার": { bn: "সিম্পটম চেকার", en: "Symptom Checker" },
  "রোগ নির্দেশিকা": { bn: "রোগ নির্দেশিকা", en: "Disease Guide" },
  "২৪ঘণ্টা ফার্মেসি": { bn: "২৪ঘণ্টা ফার্মেসি", en: "24hr Pharmacy" },
  "কমিউনিটি Q&A": { bn: "কমিউনিটি Q&A", en: "Community Q&A" },
  "নার্স/কেয়ারগিভার": { bn: "নার্স/কেয়ারগিভার", en: "Nurse/Caregiver" },
  "ফিজিওথেরাপি": { bn: "ফিজিওথেরাপি", en: "Physiotherapy" },
  "টেলিমেডিসিন": { bn: "টেলিমেডিসিন", en: "Telemedicine" },
  "ইকুইপমেন্ট ভাড়া": { bn: "ইকুইপমেন্ট ভাড়া", en: "Equipment Rental" },
  "ফ্রি ক্যাম্প": { bn: "ফ্রি ক্যাম্প", en: "Free Camp" },
  "নোটিশ বোর্ড": { bn: "নোটিশ বোর্ড", en: "Notice Board" },
  "শব্দকোষ": { bn: "শব্দকোষ", en: "Glossary / FAQ" },
  "নিয়োগ": { bn: "নিয়োগ", en: "Jobs" },
  "রিভিউ": { bn: "রিভিউ", en: "Reviews" },

  // ── Home page ──
  "রাজশাহী বিভাগ · খণ্ড ০১": { bn: "রাজশাহী বিভাগ · খণ্ড ০১", en: "Rajshahi Division · Vol. 01" },
  "রাজশাহীর": { bn: "রাজশাহীর", en: "Every" },
  "প্রতিটি চেম্বার": { bn: "প্রতিটি চেম্বার", en: "Chamber in Rajshahi" },
  "এক জায়গায় লেখা আছে।": { bn: "এক জায়গায় লেখা আছে।", en: "listed in one place." },
  "বিশেষজ্ঞ, চেম্বারের ঠিকানা, ভিজিটিং আওয়ার আর ফি — সব একসাথে, যেন পুরনো দিনের ডাক্তার-ডায়েরির মতোই নির্ভরযোগ্য।": {
    bn: "বিশেষজ্ঞ, চেম্বারের ঠিকানা, ভিজিটিং আওয়ার আর ফি — সব একসাথে, যেন পুরনো দিনের ডাক্তার-ডায়েরির মতোই নির্ভরযোগ্য।",
    en: "Specialists, chamber addresses, visiting hours and fees — all together, as reliable as your old doctor diary."
  },
  "ডাক্তারের নাম বা স্পেশালিটি লিখুন...": { bn: "ডাক্তারের নাম বা স্পেশালিটি লিখুন...", en: "Type doctor name or specialty..." },
  "রাজশাহীর মধ্যে খুঁজুন": { bn: "রাজশাহীর মধ্যে খুঁজুন", en: "Search in Rajshahi" },
  "বিভাগ": { bn: "বিভাগ", en: "Specialties" },
  "বিভাগ অনুযায়ী সূচি": { bn: "বিভাগ অনুযায়ী সূচি", en: "Index by Specialty" },
  "জন": { bn: "জন", en: "doctors" },
  "এই সপ্তাহে বেশি খোঁজা হয়েছে": { bn: "এই সপ্তাহে বেশি খোঁজা হয়েছে", en: "Most Searched This Week" },
  "পরিচিত বিশেষজ্ঞগণ": { bn: "পরিচিত বিশেষজ্ঞগণ", en: "Featured Specialists" },
  "সব ডাক্তার দেখুন": { bn: "সব ডাক্তার দেখুন", en: "View All Doctors" },
  "অভিজ্ঞতা": { bn: "অভিজ্ঞতা", en: "experience" },
  "চেম্বার ও চিকিৎসা কেন্দ্র": { bn: "চেম্বার ও চিকিৎসা কেন্দ্র", en: "Chambers & Medical Centers" },
  "রাজশাহীর হাসপাতাল": { bn: "রাজশাহীর হাসপাতাল", en: "Hospitals in Rajshahi" },
  "সব হাসপাতাল দেখুন": { bn: "সব হাসপাতাল দেখুন", en: "View All Hospitals" },
  "জন ডাক্তার": { bn: "জন ডাক্তার", en: "doctors" },
  "আপনি কি একজন চিকিৎসক?": { bn: "আপনি কি একজন চিকিৎসক?", en: "Are you a doctor?" },
  "আপনার চেম্বার তালিকাভুক্ত করুন, বিনামূল্যে।": { bn: "আপনার চেম্বার তালিকাভুক্ত করুন, বিনামূল্যে।", en: "List your chamber for free." },
  "তালিকাভুক্ত হোন": { bn: "তালিকাভুক্ত হোন", en: "Register Now" },

  // ── Footer ──
  "সঠিক ডাক্তার, সঠিক সময়ে। রাজশাহী থেকে শুরু, বাংলাদেশ জুড়ে পথচলা।": {
    bn: "সঠিক ডাক্তার, সঠিক সময়ে। রাজশাহী থেকে শুরু, বাংলাদেশ জুড়ে পথচলা।",
    en: "The right doctor, at the right time. Starting from Rajshahi, across Bangladesh."
  },
  "ডিরেক্টরি": { bn: "ডিরেক্টরি", en: "Directory" },
  "বিশেষজ্ঞ ডাক্তার": { bn: "বিশেষজ্ঞ ডাক্তার", en: "Specialist Doctors" },
  "হাসপাতাল ও ক্লিনিক": { bn: "হাসপাতাল ও ক্লিনিক", en: "Hospitals & Clinics" },
  "ওষুধের তালিকা": { bn: "ওষুধের তালিকা", en: "Medicine List" },
  "বিভাগ অনুযায়ী খুঁজুন": { bn: "বিভাগ অনুযায়ী খুঁজুন", en: "Search by Division" },
  "জরুরি ও টুলস": { bn: "জরুরি ও টুলস", en: "Emergency & Tools" },
  "হোম কেয়ার": { bn: "হোম কেয়ার", en: "Home Care" },
  "কমিউনিটি": { bn: "কমিউনিটি", en: "Community" },
  "ডাক্তারদের জন্য": { bn: "ডাক্তারদের জন্য", en: "For Doctors" },
  "যোগাযোগ": { bn: "যোগাযোগ", en: "Contact" },
  "সর্বস্বত্ব সংরক্ষিত।": { bn: "সর্বস্বত্ব সংরক্ষিত।", en: "All rights reserved." },
  "জরুরি হটলাইন": { bn: "জরুরি হটলাইন", en: "Emergency Hotline" },
  "অ্যাডমিন": { bn: "অ্যাডমিন", en: "Admin" },
  "৪০৪ প্রিভিউ": { bn: "৪০৪ প্রিভিউ", en: "404 Preview" },

  // ── Doctors page ──
  "ডাক্তার খুঁজুন — রাজশাহী": { bn: "ডাক্তার খুঁজুন — রাজশাহী", en: "Find Doctors — Rajshahi" },
  "সকল বিভাগ": { bn: "সকল বিভাগ", en: "All Specialties" },
  "ভিজিট": { bn: "ভিজিট", en: "Visit" },
  "চেম্বার": { bn: "চেম্বার", en: "Chamber" },
  "বিস্তারিত দেখুন": { bn: "বিস্তারিত দেখুন", en: "View Details" },

  // ── Hospitals page ──
  "হাসপাতাল খুঁজুন — রাজশাহী": { bn: "হাসপাতাল খুঁজুন — রাজশাহী", en: "Find Hospitals — Rajshahi" },
  "চিকিৎসা কেন্দ্র ও ক্লিনিক ডিরেক্টরি": { bn: "চিকিৎসা কেন্দ্র ও ক্লিনিক ডিরেক্টরি", en: "Medical Centers & Clinics Directory" },

  // ── Doctor profile ──
  "ফিরে যান": { bn: "ফিরে যান", en: "Go Back" },
};

interface LanguageContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "bn",
  setLang: () => {},
  t: (k) => k,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    return (localStorage.getItem("lang") as Lang) || "bn";
  });

  const changeLang = (l: Lang) => {
    setLang(l);
    localStorage.setItem("lang", l);
  };

  const t = (key: string): string => {
    const entry = translations[key];
    if (entry) return entry[lang];
    return key; // fallback: return the key itself (Bengali text)
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang: changeLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
