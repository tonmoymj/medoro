import { ShieldCheck, MapPin, Users, BookOpen } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";

const iconMap: Record<string, any> = {
  ShieldCheck,
  MapPin,
  Users,
  BookOpen,
};

export default function About() {
  const { aboutInfo } = useAdmin();

  return (
    <div className="mx-auto max-w-4xl px-5 py-10">
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold mb-2">আমাদের কথা</p>
      <h1 className="font-display text-4xl sm:text-5xl text-ink leading-tight mb-6">
        {aboutInfo.headline}
      </h1>
      <p className="text-lg text-ink/70 leading-relaxed max-w-2xl whitespace-pre-line">
        {aboutInfo.description}
      </p>

      <div className="mt-12 grid sm:grid-cols-2 gap-6">
        {aboutInfo.points.map((p, idx) => {
          const IconComp = iconMap[p.iconName] || ShieldCheck;
          return (
            <div key={idx} className="bg-white border border-line p-6">
              <IconComp className="h-6 w-6 text-gold" strokeWidth={1.75} />
              <h3 className="font-display text-xl text-ink mt-4">{p.title}</h3>
              <p className="text-sm text-ink/60 mt-2 leading-relaxed">{p.body}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-14 border-t border-line pt-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold mb-4">আমাদের যাত্রা</p>
        <div className="space-y-0">
          {[
            { year: "২০২৬", label: "রাজশাহী বিভাগে যাত্রা শুরু" },
            { year: "২০২৭ (লক্ষ্য)", label: "রংপুর ও খুলনা বিভাগে সম্প্রসারণ" },
            { year: "২০২৮ (লক্ষ্য)", label: "দেশব্যাপী সব জেলায় উপস্থিতি" },
          ].map((t, i) => (
            <div key={t.year} className={`flex gap-6 py-4 ${i !== 0 ? "border-t border-dashed border-line" : ""}`}>
              <span className="font-mono text-sm text-pine w-32 shrink-0">{t.year}</span>
              <span className="text-ink/75">{t.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
