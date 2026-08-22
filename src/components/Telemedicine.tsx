import { useState } from "react";
import { Video, Clock, CheckCircle2 } from "lucide-react";
import { teleDoctors, doctors } from "@/data";

export default function Telemedicine() {
  const [booked, setBooked] = useState<string | null>(null);

  return (
    <div className="mx-auto max-w-3xl px-5 py-10">
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold mb-2">দূর থেকে পরামর্শ</p>
      <h1 className="font-display text-4xl text-ink mb-3 flex items-center gap-3">
        <Video className="h-8 w-8 text-pine" strokeWidth={1.5} /> টেলিমেডিসিন
      </h1>
      <p className="text-ink/60 max-w-xl mb-8">বাসায় বসেই ভিডিও কলে ডাক্তারের পরামর্শ নিন — যাতায়াতের ঝামেলা ছাড়াই।</p>

      <div className="space-y-4">
        {teleDoctors.map((t) => {
          const d = doctors.find((x) => x.id === t.doctorId);
          if (!d) return null;
          const isBooked = booked === t.id;
          return (
            <div key={t.id} className="bg-white border border-line p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-gold mb-1">{d.specialty}</p>
                <h3 className="font-display text-xl text-ink">{d.name}</h3>
                <p className="text-xs text-ink/55 mt-1.5 flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" strokeWidth={2} /> পরবর্তী স্লট: {t.nextSlot}</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="font-mono text-sm text-ink">{t.fee}</span>
                {isBooked ? (
                  <span className="flex items-center gap-1.5 text-pine text-sm font-medium">
                    <CheckCircle2 className="h-4 w-4" strokeWidth={2} /> বুক হয়েছে
                  </span>
                ) : (
                  <button
                    onClick={() => setBooked(t.id)}
                    className="bg-gold text-ink px-4 py-2.5 text-sm font-medium hover:bg-gold-light transition-colors"
                  >
                    স্লট বুক করুন
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
