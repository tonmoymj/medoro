import { useState } from "react";
import { useAdmin } from "@/context/AdminContext";
import {
  LayoutDashboard, Users, Building2, LogOut, Menu, X, Stethoscope, Pill, BookOpen, Info, Megaphone,
} from "lucide-react";
import AdminDashboard  from "@/components/admin/AdminDashboard";
import DoctorManager   from "@/components/admin/DoctorManager";
import HospitalManager from "@/components/admin/HospitalManager";
import MedicineManager from "@/components/admin/MedicineManager";
import ArticleManager  from "@/components/admin/ArticleManager";
import AboutManager    from "@/components/admin/AboutManager";
import AdManager       from "@/components/admin/AdManager";

type Tab = "dashboard" | "doctors" | "hospitals" | "medicines" | "articles" | "about" | "ads";

const NAV: { id: Tab; label: string; Icon: React.ElementType }[] = [
  { id: "dashboard",  label: "ড্যাশবোর্ড",  Icon: LayoutDashboard },
  { id: "doctors",    label: "ডাক্তার",       Icon: Users },
  { id: "hospitals",  label: "হাসপাতাল",      Icon: Building2 },
  { id: "medicines",  label: "মেডিসিন",      Icon: Pill },
  { id: "articles",   label: "স্বাস্থ্যকথা",   Icon: BookOpen },
  { id: "about",      label: "আমাদের সম্পর্কে", Icon: Info },
  { id: "ads",        label: "এড ও স্পনসরশিপ", Icon: Megaphone },
];

export default function AdminLayout() {
  const { currentUser, logout } = useAdmin();
  const [tab, setTab]           = useState<Tab>("dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);

  const initials = currentUser?.email.charAt(0).toUpperCase() ?? "A";

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold mb-2">অ্যাডমিন প্যানেল</p>
      <h1 className="font-display text-4xl text-ink mb-8">ড্যাশবোর্ড & কন্ট্রোল সেন্টার</h1>

      <div className="border border-line bg-cardbg overflow-hidden">
        {/* ── topbar ── */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-pine text-paper border-b border-pine/30">
          <div className="flex items-center gap-2.5">
            <Stethoscope className="h-4 w-4 text-paper/70" strokeWidth={2} />
            <span className="font-display italic text-lg">Medoro Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:block font-mono text-xs text-paper/60">{currentUser?.email}</span>
            <div className="h-7 w-7 rounded-full bg-gold text-ink flex items-center justify-center text-xs font-mono font-bold">
              {initials}
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-1.5 text-paper/70 hover:text-paper text-xs font-mono transition-colors"
              title="লগআউট"
            >
              <LogOut className="h-4 w-4" strokeWidth={2} />
              <span className="hidden sm:inline">লগআউট</span>
            </button>
            {/* mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(v => !v)}
              className="sm:hidden text-paper/70 hover:text-paper"
            >
              {mobileOpen ? <X className="h-5 w-5" strokeWidth={2} /> : <Menu className="h-5 w-5" strokeWidth={2} />}
            </button>
          </div>
        </div>

        <div className="grid sm:grid-cols-[220px_1fr]">
          {/* ── sidebar ── */}
          <aside className={`border-r border-line bg-paper/60 p-3 space-y-0.5 ${mobileOpen ? "block" : "hidden"} sm:block`}>
            {NAV.map(({ id, label, Icon }) => (
              <button
                key={id}
                onClick={() => { setTab(id); setMobileOpen(false); }}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-sm text-left transition-colors ${
                  tab === id
                    ? "bg-pine text-paper font-medium"
                    : "text-ink/60 hover:text-ink hover:bg-line/50"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" strokeWidth={2} />
                {label}
              </button>
            ))}
          </aside>

          {/* ── main content ── */}
          <main className="p-5 sm:p-7 min-h-[500px]">
            {tab === "dashboard"  && <AdminDashboard  setTab={(t) => setTab(t as Tab)} />}
            {tab === "doctors"    && <DoctorManager />}
            {tab === "hospitals"  && <HospitalManager />}
            {tab === "medicines"  && <MedicineManager />}
            {tab === "articles"   && <ArticleManager />}
            {tab === "about"      && <AboutManager />}
            {tab === "ads"        && <AdManager />}
          </main>
        </div>
      </div>
    </div>
  );
}
