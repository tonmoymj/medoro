import { Megaphone, AlertTriangle, Info } from "lucide-react";
import { notices } from "@/data";

export default function Notices() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-10">
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold mb-2">সতর্কতা ও ঘোষণা</p>
      <h1 className="font-display text-4xl text-ink mb-8 flex items-center gap-3">
        <Megaphone className="h-8 w-8 text-pine" strokeWidth={1.5} /> স্বাস্থ্য নোটিশ বোর্ড
      </h1>

      <div className="space-y-4">
        {notices.map((n) => (
          <div
            key={n.id}
            className={`border p-5 flex items-start gap-4 ${
              n.severity === "alert" ? "border-brick bg-brick/5" : "border-line bg-cardbg"
            }`}
          >
            {n.severity === "alert" ? (
              <AlertTriangle className="h-5 w-5 text-brick shrink-0 mt-0.5" strokeWidth={2} />
            ) : (
              <Info className="h-5 w-5 text-pine shrink-0 mt-0.5" strokeWidth={2} />
            )}
            <div>
              <div className="flex items-center gap-3">
                <h3 className={`font-display text-lg ${n.severity === "alert" ? "text-brick" : "text-ink"}`}>{n.title}</h3>
                <span className="font-mono text-[10px] text-ink/40">{n.date}</span>
              </div>
              <p className="text-sm text-ink/65 mt-1.5">{n.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
