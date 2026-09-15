import { MapPin, Phone, ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";

export default function HospitalProfile({
  id,
  back,
  openDoctor,
}: {
  id: string;
  back: () => void;
  openDoctor: (id: string) => void;
}) {
  const { hospitals, doctors } = useAdmin();
  const hospital = hospitals.find((h) => h.id === id) ?? hospitals[0];
  const hospitalDoctors = doctors.filter((d) => d.chambers.some((c) => c.hospitalId === id));

  return (
    <div className="mx-auto max-w-4xl px-5 py-10">
      <button onClick={back} className="flex items-center gap-1.5 text-sm text-ink/55 hover:text-pine mb-8">
        <ArrowLeft className="h-4 w-4" strokeWidth={2} /> হাসপাতাল তালিকায় ফিরুন
      </button>

      <div className="bg-white border border-line overflow-hidden">
        {hospital.photo && (
          <div className="h-56 sm:h-72 w-full bg-pine/5 border-b border-line overflow-hidden">
            <img src={hospital.photo} alt={hospital.name} className="h-full w-full object-cover" />
          </div>
        )}
        <div className="p-6 sm:p-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-gold mb-2">{hospital.type}</p>
          <h1 className="font-display text-3xl sm:text-4xl text-ink">{hospital.name}</h1>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-ink/55">
            <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" strokeWidth={2} /> {hospital.address}</span>
            <span className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5" strokeWidth={2} /> {hospital.phone}</span>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {hospital.facilities.map((f) => (
              <span key={f} className="text-xs font-mono bg-pine/5 text-pine px-2.5 py-1.5 border border-pine/15 flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5" strokeWidth={2} /> {f}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold mb-4">এই হাসপাতালের ডাক্তারগণ</p>
        <div className="divide-y divide-line border-t border-b border-line">
          {hospitalDoctors.map((d) => {
            const chamber = d.chambers.find((c) => c.hospitalId === id)!;
            return (
              <button
                key={d.id}
                onClick={() => openDoctor(d.id)}
                className="w-full flex items-center justify-between gap-4 py-5 text-left hover:bg-pine/5 px-3 -mx-3 transition-colors"
              >
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-gold mb-1">{d.specialty}</p>
                  <h3 className="font-display text-lg text-ink">{d.name}</h3>
                  <p className="text-xs text-ink/50 font-mono mt-1">{chamber.days} &middot; {chamber.time}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-ink/30 shrink-0" strokeWidth={2} />
              </button>
            );
          })}
          {hospitalDoctors.length === 0 && (
            <p className="text-ink/50 text-sm py-8 text-center">এই মুহূর্তে কোনো ডাক্তারের তথ্য যুক্ত নেই।</p>
          )}
        </div>
      </div>
    </div>
  );
}
