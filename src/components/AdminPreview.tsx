import { LayoutDashboard, Users, Building2, MessageSquare, Plus, Search, Bell } from "lucide-react";
import { doctors, hospitals } from "@/data";

export default function AdminPreview() {
  const stats = [
    { label: "মোট ডাক্তার", value: doctors.length * 26, icon: Users },
    { label: "মোট হাসপাতাল", value: hospitals.length * 6, icon: Building2 },
    { label: "নতুন রিকোয়েস্ট", value: 14, icon: MessageSquare },
  ];

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold mb-2">অ্যাডমিন প্যানেল &middot; প্রিভিউ</p>
      <h1 className="font-display text-4xl text-ink mb-2">ড্যাশবোর্ড</h1>
      <p className="text-ink/55 mb-10 max-w-xl">
        এটি অ্যাডমিন প্যানেলের একটা নমুনা ডিজাইন — যেখান থেকে ডেটা এন্ট্রি টিম ডাক্তার-হাসপাতালের তথ্য পরিচালনা করবে।
      </p>

      <div className="border border-line bg-cardbg">
        {/* admin topbar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-line bg-pine text-paper">
          <span className="flex items-center gap-2 font-display italic text-lg">
            <LayoutDashboard className="h-4 w-4" strokeWidth={2} /> Medoro Admin
          </span>
          <div className="flex items-center gap-4">
            <Bell className="h-4 w-4 text-paper/70" strokeWidth={2} />
            <span className="h-7 w-7 rounded-full bg-gold text-ink flex items-center justify-center text-xs font-mono">এ</span>
          </div>
        </div>

        <div className="grid sm:grid-cols-[200px_1fr]">
          {/* sidebar */}
          <div className="border-r border-line p-4 space-y-1 hidden sm:block">
            {["ড্যাশবোর্ড", "ডাক্তার", "হাসপাতাল", "রিকোয়েস্ট", "আর্টিকেল", "সেটিংস"].map((item, i) => (
              <div
                key={item}
                className={`px-3 py-2 text-sm ${i === 0 ? "bg-pine/10 text-pine font-medium" : "text-ink/55"}`}
              >
                {item}
              </div>
            ))}
          </div>

          {/* main panel */}
          <div className="p-6">
            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              {stats.map((s) => (
                <div key={s.label} className="border border-line p-4">
                  <s.icon className="h-4 w-4 text-gold" strokeWidth={2} />
                  <p className="font-mono text-2xl text-ink mt-3 num">{s.value}</p>
                  <p className="text-xs text-ink/50 mt-1">{s.label}</p>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 border border-line px-3 py-2 flex-1 max-w-xs">
                <Search className="h-3.5 w-3.5 text-ink/40" strokeWidth={2} />
                <input placeholder="ডাক্তার খুঁজুন..." disabled className="bg-transparent outline-none text-xs placeholder:text-ink/40 w-full" />
              </div>
              <button className="flex items-center gap-1.5 bg-gold text-ink px-3 py-2 text-xs font-medium">
                <Plus className="h-3.5 w-3.5" strokeWidth={2} /> নতুন ডাক্তার
              </button>
            </div>

            <div className="border border-line">
              <div className="grid grid-cols-[1fr_120px_100px_80px] gap-2 px-4 py-2.5 bg-paper border-b border-line font-mono text-[10px] uppercase tracking-wide text-ink/45">
                <span>নাম</span>
                <span>বিভাগ</span>
                <span>চেম্বার</span>
                <span>স্ট্যাটাস</span>
              </div>
              {doctors.slice(0, 5).map((d) => (
                <div key={d.id} className="grid grid-cols-[1fr_120px_100px_80px] gap-2 px-4 py-3 border-b border-line last:border-b-0 text-sm items-center">
                  <span className="text-ink">{d.name}</span>
                  <span className="text-ink/55 text-xs">{d.specialty.split(" ")[0]}</span>
                  <span className="text-ink/55 text-xs font-mono num">{d.chambers.length} টি</span>
                  <span className="text-[10px] font-mono text-pine bg-pine/10 px-2 py-1 w-fit">সক্রিয়</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
