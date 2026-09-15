import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { doctors as seedDoctors, hospitals as seedHospitals } from "@/data";
import type { Doctor, Hospital } from "@/data";
import { supabase } from "@/lib/supabase";

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
  };
}

export function AdminProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
  const [doctors, setDoctors] = useState<Doctor[]>(seedDoctors);
  const [hospitals, setHospitals] = useState<Hospital[]>(seedHospitals);
  const [loading, setLoading] = useState(true);

  // Initial Auth Check & DB Fetch
  useEffect(() => {
    async function init() {
      try {
        // Check session
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user?.email) {
          setCurrentUser({ email: session.user.email, role: "superadmin" });
        }

        // Fetch doctors
        const { data: docData, error: docErr } = await supabase.from("doctors").select("*");
        if (!docErr && docData && docData.length > 0) {
          setDoctors(docData.map(mapDoctorFromDB));
        } else if (docErr) {
          console.warn("Could not fetch doctors from Supabase, fallback to local/seed", docErr);
        }

        // Fetch hospitals
        const { data: hospData, error: hospErr } = await supabase.from("hospitals").select("*");
        if (!hospErr && hospData && hospData.length > 0) {
          setHospitals(hospData.map(mapHospitalFromDB));
        } else if (hospErr) {
          console.warn("Could not fetch hospitals from Supabase, fallback to local/seed", hospErr);
        }
      } catch (err) {
        console.error("Supabase init error:", err);
      } finally {
        setLoading(false);
      }
    }

    init();

    // Listen to Auth state changes
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
        // Fallback check for local quick testing if user hasn't created auth user in Supabase yet
        if (email.trim() === "tonmoymbm@gmail.com" && pass === "medorotonmoy") {
          setCurrentUser({ email: email.trim(), role: "superadmin" });
          return true;
        }
        console.error("Login error:", error);
        return false;
      }

      setCurrentUser({ email: data.user.email!, role: "superadmin" });
      return true;
    } catch (err) {
      console.error("Login catch:", err);
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
    const { error } = await supabase.from("doctors").insert(dbPayload);
    if (error) console.error("Error adding doctor to Supabase:", error);
  };

  const updateDoctor = async (d: Doctor) => {
    setDoctors(prev => prev.map(x => x.id === d.id ? d : x));
    const dbPayload = mapDoctorToDB(d);
    const { error } = await supabase.from("doctors").update(dbPayload).eq("id", d.id);
    if (error) console.error("Error updating doctor in Supabase:", error);
  };

  const deleteDoctor = async (id: string) => {
    setDoctors(prev => prev.filter(x => x.id !== id));
    const { error } = await supabase.from("doctors").delete().eq("id", id);
    if (error) console.error("Error deleting doctor from Supabase:", error);
  };

  // Hospitals CRUD
  const addHospital = async (h: Hospital) => {
    setHospitals(prev => [h, ...prev]);
    const dbPayload = mapHospitalToDB(h);
    const { error } = await supabase.from("hospitals").insert(dbPayload);
    if (error) console.error("Error adding hospital to Supabase:", error);
  };

  const updateHospital = async (h: Hospital) => {
    setHospitals(prev => prev.map(x => x.id === h.id ? h : x));
    const dbPayload = mapHospitalToDB(h);
    const { error } = await supabase.from("hospitals").update(dbPayload).eq("id", h.id);
    if (error) console.error("Error updating hospital in Supabase:", error);
  };

  const deleteHospital = async (id: string) => {
    setHospitals(prev => prev.filter(x => x.id !== id));
    const { error } = await supabase.from("hospitals").delete().eq("id", id);
    if (error) console.error("Error deleting hospital from Supabase:", error);
  };

  return (
    <AdminContext.Provider value={{
      currentUser, login, logout, loading,
      doctors, addDoctor, updateDoctor, deleteDoctor,
      hospitals, addHospital, updateHospital, deleteHospital,
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
