import { useAdmin } from "@/context/AdminContext";
import { Users, Building2, MessageSquare, TrendingUp, ArrowRight } from "lucide-react";

type Tab = "dashboard" | "doctors" | "hospitals";

export default function AdminDashboard({ setTab }: { setTab: (t: Tab) => void }) {
  const { doctors, hospitals } = useAdmin();

  const stats = [
    { label: "মোট ডাক্তার",    value: doctors.length,   icon: Users,         color: "text-pine",  bg: "bg-pine/5",  border: "border-pine/15" },
    { label: "মোট হাসপাতাল",   value: hospitals.length, icon: Building2,     color: "text-gold",  bg: "bg-gold/5",  border: "border-gold/20" },
    { label: "নতুন রিকোয়েস্ট", value: 14,               icon: MessageSquare, color: "text-ink/60",bg: "bg-line/40", border: "border-line" },
  ];

  return (
    <div>
      {/* stats */}
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        {stats.map(({ label, value, icon: Icon, color, bg, border }) => (
          <div key={label} className={`${bg} border ${border} p-5`}>
            <Icon className={`h-5 w-5 ${color} mb-3`} strokeWidth={2} />
            <p className="font-mono text-3xl text-ink num">{value}</p>
            <p className="text-xs text-ink/50 mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* recent doctors */}
      <div className="mb-6 flex items-center justify-between">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-gold flex items-center gap-2">
          <TrendingUp className="h-3.5 w-3.5" strokeWidth={2} />
          সাম্প্রতিক ডাক্তার
        </p>
        <button
          onClick={() => setTab("doctors")}
          className="flex items-center gap-1 text-xs text-pine font-mono hover:underline"
        >
          সব দেখুন <ArrowRight className="h-3 w-3" strokeWidth={2} />
        </button>
      </div>

      <div className="border border-line overflow-hidden">
        <div className="grid grid-cols-[1fr_130px_90px_80px] gap-2 px-4 py-2.5 bg-paper border-b border-line font-mono text-[10px] uppercase tracking-wide text-ink/45">
          <span>নাম</span>
          <span>বিভাগ</span>
          <span>চেম্বার</span>
          <span>স্ট্যাটাস</span>
        </div>
        {doctors.slice(0, 8).map((d) => (
          <div
            key={d.id}
            className="grid grid-cols-[1fr_130px_90px_80px] gap-2 px-4 py-3 border-b border-line last:border-b-0 text-sm items-center"
          >
            <span className="text-ink font-medium truncate">{d.name}</span>
            <span className="text-ink/55 text-xs truncate">{d.specialty.split(" ")[0]}</span>
            <span className="text-ink/55 text-xs font-mono num">{d.chambers.length} টি</span>
            <span className="text-[10px] font-mono text-pine bg-pine/10 px-2 py-1 w-fit">সক্রিয়</span>
          </div>
        ))}
        {doctors.length === 0 && (
          <p className="text-center text-sm text-ink/45 py-8">কোনো ডাক্তার নেই।</p>
        )}
      </div>
    </div>
  );
}
