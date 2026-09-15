import { useState, useEffect } from "react";
import { MapPin, Phone, ArrowRight, BedDouble } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";
import AdSlot from "@/components/AdSlot";
import { SkeletonLine } from "@/components/Skeleton";

function HospitalCardSkeleton() {
  return (
    <div className="bg-white border border-line p-6 animate-pulse">
      <SkeletonLine className="h-3 w-24 mb-3" />
      <SkeletonLine className="h-6 w-52 mb-3" />
      <SkeletonLine className="h-4 w-64 mb-2" />
      <SkeletonLine className="h-4 w-40 mb-4" />
      <div className="flex gap-2 mb-4">
        <SkeletonLine className="h-6 w-20" />
        <SkeletonLine className="h-6 w-24" />
      </div>
      <SkeletonLine className="h-4 w-full" />
    </div>
  );
}

export default function Hospitals({ openHospital }: { openHospital: (id: string) => void }) {
  const { hospitals } = useAdmin();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold mb-2">সূচি &middot; হাসপাতাল ও ক্লিনিক</p>
      <h1 className="font-display text-4xl text-ink mb-10">রাজশাহীর চিকিৎসা কেন্দ্র</h1>

      <div className="mb-8">
        <AdSlot variant="card" label="ডায়াগনস্টিক সেন্টার/হাসপাতালের স্পনসরড ফিচার্ড লিস্টিং" />
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        {loading ? (
          <>
            <HospitalCardSkeleton />
            <HospitalCardSkeleton />
            <HospitalCardSkeleton />
            <HospitalCardSkeleton />
          </>
        ) : (
          hospitals.map((h) => (
            <button
              key={h.id}
              onClick={() => openHospital(h.id)}
              className="text-left bg-white border border-line hover:shadow-[4px_4px_0_0_#123832] transition-all"
            >
              <div className="p-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-gold mb-2">{h.type}</p>
                <h3 className="font-display text-2xl text-ink">{h.name}</h3>
                <p className="text-sm text-ink/60 mt-2 flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" strokeWidth={2} /> {h.address}
                </p>
                <p className="text-sm text-ink/60 mt-1.5 flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5" strokeWidth={2} /> {h.phone}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {h.facilities.slice(0, 3).map((f) => (
                    <span key={f} className="text-[11px] font-mono bg-pine/5 text-pine px-2 py-1 border border-pine/15">
                      {f}
                    </span>
                  ))}
                </div>
                <div className="mt-5 pt-4 border-t border-dashed border-line flex items-center justify-between">
                  <span className="font-mono text-xs text-ink/50 num flex items-center gap-1.5">
                    {h.beds && <><BedDouble className="h-3.5 w-3.5" strokeWidth={2} /> {h.beds} শয্যা &middot; </>}
                    {h.doctorCount} জন ডাক্তার
                  </span>
                  <span className="flex items-center gap-1 text-sm font-medium text-pine">
                    বিস্তারিত <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
                  </span>
                </div>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
