import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { doctors as seedDoctors, hospitals as seedHospitals, articles as seedArticles, generics as seedGenerics, defaultAboutInfo } from "@/data";
import type { Doctor, Hospital, Article, Generic, AboutInfo } from "@/data";
import { supabase } from "@/lib/supabase";

// ── Ad Slot Types ──
export type AdSlotData = {
  id: string; // e.g. "app-leaderboard", "app-strip", "doctors-sidebar", "doctors-card", "doctor-profile", "hospitals-card", "medicines-card"
  placementName: string;
  location: string;
  isOccupied: boolean;
  sponsorName?: string;
  bannerImage?: string;
  linkUrl?: string;
  labelText?: string;
};

const seedAds: AdSlotData[] = [
  { id: "app-leaderboard", placementName: "শীর্ষ হেডার লিডারবোর্ড (সব পেজে)", location: "Top Header Leaderboard", isOccupied: false, labelText: "হাসপাতাল/ক্লিনিক/ফার্মা কোম্পানির লিডারবোর্ড বিজ্ঞাপন" },
  { id: "app-strip", placementName: "ফুটার স্ট্রিপ এড (সব পেজে)", location: "Bottom Footer Strip", isOccupied: false, labelText: "স্পনসরড স্ট্রিপ বিজ্ঞাপন" },
  { id: "doctors-sidebar", placementName: "ডাক্তার পেজ সাইডবার এড", location: "Doctors Page Sidebar", isOccupied: false, labelText: "ক্লিনিক/ডায়াগনস্টিক সেন্টারের সাইডবার বিজ্ঞাপন" },
  { id: "doctors-card", placementName: "ডাক্তার তালিকা কার্ড এড", location: "Doctors List Banner Card", isOccupied: false, labelText: "স্পনসরড হাসপাতাল/ক্লিনিক লিস্টিং" },
  { id: "doctor-profile", placementName: "ডাক্তার প্রোফাইল পেজ এড", location: "Doctor Profile Page", isOccupied: false, labelText: "ফার্মা ব্র্যান্ড বা ডায়াগনস্টিক সেন্টারের স্পনসরড বিজ্ঞাপন" },
  { id: "hospitals-card", placementName: "হাসপাতাল পেজ কাৰ্ড এড", location: "Hospitals Page Banner Card", isOccupied: false, labelText: "ডায়াগনস্টিক সেন্টার/হাসপাতালের স্পনসরড ফিচার্ড লিস্টিং" },
  { id: "medicines-card", placementName: "মেডিসিন পেজ ব্যানার এড", location: "Medicines Page Banner", isOccupied: false, labelText: "ফার্মাসিউটিক্যাল কোম্পানির ব্র্যান্ড স্পনসরশিপ" },
];

// ── types ──────────────────────────────────────────────────────────────────
export type AdminUser = { email: string; role: "superadmin" };

type AdminContextType = {
  currentUser: AdminUser | null;
  login: (email: string, pass: string) => Promise<boolean>;
  logout: () => Promise<void>;
  loading: boolean;

  doctors: Doctor[];
  addDoctor: (d: Doctor) => Promise<void>;
  updateDoctor: (d: Doctor) => Promise<void>;
  deleteDoctor: (id: string) => Promise<void>;

  hospitals: Hospital[];
  addHospital: (h: Hospital) => Promise<void>;
  updateHospital: (h: Hospital) => Promise<void>;
  deleteHospital: (id: string) => Promise<void>;

  medicines: Generic[];
  addMedicine: (m: Generic) => Promise<void>;
  updateMedicine: (m: Generic) => Promise<void>;
  deleteMedicine: (id: string) => Promise<void>;

  articles: Article[];
  addArticle: (a: Article) => Promise<void>;
  updateArticle: (a: Article) => Promise<void>;
  deleteArticle: (id: string) => Promise<void>;

  aboutInfo: AboutInfo;
  updateAboutInfo: (info: AboutInfo) => Promise<void>;

  ads: AdSlotData[];
  updateAdSlot: (ad: AdSlotData) => Promise<void>;
};

const AdminContext = createContext<AdminContextType | null>(null);

// Database mappers (camelCase <-> snake_case)
function mapDoctorFromDB(row: any): Doctor {
  return {
    id: row.id,
    name: row.name,
    degree: row.degree || "",
    specialtyId: row.specialty_id || "",
    specialty: row.specialty || "",
    experience: row.experience || "",
    regNo: row.reg_no || "",
    area: row.area || "",
    chambers: row.chambers || [],
    featured: row.featured || false,
    photo: row.photo_url || undefined,
  };
}

function mapDoctorToDB(d: Doctor) {
  return {
    id: d.id,
    name: d.name,
    degree: d.degree,
    specialty_id: d.specialtyId,
    specialty: d.specialty,
    experience: d.experience,
    reg_no: d.regNo,
    area: d.area,
    chambers: d.chambers,
    featured: d.featured || false,
    photo_url: d.photo || null,
  };
}

function mapHospitalFromDB(row: any): Hospital {
  return {
    id: row.id,
    name: row.name,
    type: row.type || "",
    area: row.area || "",
    address: row.address || "",
    phone: row.phone || "",
    beds: row.beds || "",
    facilities: row.facilities || [],
    doctorCount: row.doctor_count || 0,
    photo: row.photo_url || undefined,
  };
}

function mapHospitalToDB(h: Hospital) {
  return {
    id: h.id,
    name: h.name,
    type: h.type,
    area: h.area,
    address: h.address,
    phone: h.phone,
    beds: h.beds,
    facilities: h.facilities,
    doctor_count: h.doctorCount,
    photo_url: h.photo || null,
  };
}

export function AdminProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
  const [doctors, setDoctors] = useState<Doctor[]>(seedDoctors);
  const [hospitals, setHospitals] = useState<Hospital[]>(seedHospitals);
  
  const [medicines, setMedicines] = useState<Generic[]>(() => {
    try {
      const saved = localStorage.getItem("medoro_medicines");
      return saved ? JSON.parse(saved) : seedGenerics;
    } catch { return seedGenerics; }
  });

  const [articles, setArticles] = useState<Article[]>(() => {
    try {
      const saved = localStorage.getItem("medoro_articles");
      return saved ? JSON.parse(saved) : seedArticles;
    } catch { return seedArticles; }
  });

  const [aboutInfo, setAboutInfo] = useState<AboutInfo>(() => {
    try {
      const saved = localStorage.getItem("medoro_about");
      return saved ? JSON.parse(saved) : defaultAboutInfo;
    } catch { return defaultAboutInfo; }
  });

  const [ads, setAds] = useState<AdSlotData[]>(() => {
    try {
      const saved = localStorage.getItem("medoro_ads");
      return saved ? JSON.parse(saved) : seedAds;
    } catch { return seedAds; }
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => { localStorage.setItem("medoro_medicines", JSON.stringify(medicines)); }, [medicines]);
  useEffect(() => { localStorage.setItem("medoro_articles", JSON.stringify(articles)); }, [articles]);
  useEffect(() => { localStorage.setItem("medoro_about", JSON.stringify(aboutInfo)); }, [aboutInfo]);
  useEffect(() => { localStorage.setItem("medoro_ads", JSON.stringify(ads)); }, [ads]);

  // Initial Auth Check & DB Fetch
  useEffect(() => {
    async function init() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user?.email) {
          setCurrentUser({ email: session.user.email, role: "superadmin" });
        }

        const { data: docData, error: docErr } = await supabase.from("doctors").select("*");
        if (!docErr && docData && docData.length > 0) {
          setDoctors(docData.map(mapDoctorFromDB));
        }

        const { data: hospData, error: hospErr } = await supabase.from("hospitals").select("*");
        if (!hospErr && hospData && hospData.length > 0) {
          setHospitals(hospData.map(mapHospitalFromDB));
        }
      } catch (err) {
        console.error("Supabase init error:", err);
      } finally {
        setLoading(false);
      }
    }

    init();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user?.email) {
        setCurrentUser({ email: session.user.email, role: "superadmin" });
      } else {
        setCurrentUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Auth Methods
  const login = async (email: string, pass: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: pass,
      });

      if (error || !data.user) {
        if (email.trim() === "tonmoymbm@gmail.com" && pass === "medorotonmoy") {
          setCurrentUser({ email: email.trim(), role: "superadmin" });
          return true;
        }
        return false;
      }

      setCurrentUser({ email: data.user.email!, role: "superadmin" });
      return true;
    } catch (err) {
      return false;
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setCurrentUser(null);
  };

  // Doctors CRUD
  const addDoctor = async (d: Doctor) => {
    setDoctors(prev => [d, ...prev]);
    const dbPayload = mapDoctorToDB(d);
    await supabase.from("doctors").insert(dbPayload);
  };

  const updateDoctor = async (d: Doctor) => {
    setDoctors(prev => prev.map(x => x.id === d.id ? d : x));
    const dbPayload = mapDoctorToDB(d);
    await supabase.from("doctors").update(dbPayload).eq("id", d.id);
  };

  const deleteDoctor = async (id: string) => {
    setDoctors(prev => prev.filter(x => x.id !== id));
    await supabase.from("doctors").delete().eq("id", id);
  };

  // Hospitals CRUD
  const addHospital = async (h: Hospital) => {
    setHospitals(prev => [h, ...prev]);
    const dbPayload = mapHospitalToDB(h);
    await supabase.from("hospitals").insert(dbPayload);
  };

  const updateHospital = async (h: Hospital) => {
    setHospitals(prev => prev.map(x => x.id === h.id ? h : x));
    const dbPayload = mapHospitalToDB(h);
    await supabase.from("hospitals").update(dbPayload).eq("id", h.id);
  };

  const deleteHospital = async (id: string) => {
    setHospitals(prev => prev.filter(x => x.id !== id));
    await supabase.from("hospitals").delete().eq("id", id);
  };

  // Medicines CRUD
  const addMedicine = async (m: Generic) => { setMedicines(prev => [m, ...prev]); };
  const updateMedicine = async (m: Generic) => { setMedicines(prev => prev.map(x => x.id === m.id ? m : x)); };
  const deleteMedicine = async (id: string) => { setMedicines(prev => prev.filter(x => x.id !== id)); };

  // Articles CRUD
  const addArticle = async (a: Article) => { setArticles(prev => [a, ...prev]); };
  const updateArticle = async (a: Article) => { setArticles(prev => prev.map(x => x.id === a.id ? a : x)); };
  const deleteArticle = async (id: string) => { setArticles(prev => prev.filter(x => x.id !== id)); };

  // About Info
  const updateAboutInfo = async (info: AboutInfo) => { setAboutInfo(info); };

  // Ad Slots
  const updateAdSlot = async (ad: AdSlotData) => { setAds(prev => prev.map(x => x.id === ad.id ? ad : x)); };

  return (
    <AdminContext.Provider value={{
      currentUser, login, logout, loading,
      doctors, addDoctor, updateDoctor, deleteDoctor,
      hospitals, addHospital, updateHospital, deleteHospital,
      medicines, addMedicine, updateMedicine, deleteMedicine,
      articles, addArticle, updateArticle, deleteArticle,
      aboutInfo, updateAboutInfo,
      ads, updateAdSlot,
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used inside AdminProvider");
  return ctx;
}
