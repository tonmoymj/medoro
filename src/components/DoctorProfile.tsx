import { useState } from "react";
import { MapPin, Clock, Wallet, ShieldCheck, Phone, ArrowLeft, Send, Star, Stethoscope, Building2 } from "lucide-react";
import { hospitals as seedHospitals, reviews } from "@/data";
import { useAdmin } from "@/context/AdminContext";
import AdSlot from "@/components/AdSlot";

export default function DoctorProfile({
  id,
  back,
  openHospital,
}: {
  id: string;
  back: () => void;
  openHospital: (id: string) => void;
}) {
  const { doctors, hospitals: ctxHospitals } = useAdmin();
  const allHospitals = ctxHospitals.length ? ctxHospitals : seedHospitals;
  const doctor = doctors.find((d) => d.id === id) ?? doctors[0];
  const [sent, setSent] = useState(false);
  const doctorReviews = reviews.filter((r) => r.doctorId === doctor.id);
  const avg = doctorReviews.length
    ? doctorReviews.reduce((s, r) => s + r.rating, 0) / doctorReviews.length
    : null;
  const initials = doctor.name.replace("ডা. ", "").charAt(0);

  return (
    <div className="mx-auto max-w-4xl px-5 py-10">
      <button onClick={back} className="flex items-center gap-1.5 text-sm text-ink/55 hover:text-pine mb-8 transition-colors">
        <ArrowLeft className="h-4 w-4" strokeWidth={2} /> ডাক্তার তালিকায় ফিরুন
      </button>

      {/* ── profile card ── */}
      <div className="bg-white border border-line overflow-hidden">
        {/* top accent bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-pine/60 to-gold/60" />

        <div className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-start gap-6">
            {/* avatar */}
            <div className="h-24 w-24 shrink-0 border border-pine/20 overflow-hidden bg-pine/10 flex items-center justify-center font-display text-4xl text-pine">
              {doctor.photo
                ? <img src={doctor.photo} alt={doctor.name} className="h-full w-full object-cover" />
                : initials
              }
            </div>

            {/* info */}
            <div className="flex-1">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-gold mb-1.5">
                {doctor.specialty}
              </p>
              <h1 className="font-display text-3xl sm:text-4xl text-ink">{doctor.name}</h1>
              <p className="text-ink/60 mt-2 leading-relaxed">{doctor.degree}</p>

              {/* badges row */}
              <div className="mt-5 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-1.5 bg-pine/5 border border-pine/15 font-mono text-xs text-pine px-3 py-1.5">
                  <ShieldCheck className="h-3.5 w-3.5" strokeWidth={2} />
                  {doctor.regNo}
                </span>
                <span className="inline-flex items-center gap-1.5 bg-gold/5 border border-gold/20 font-mono text-xs text-ink/70 px-3 py-1.5">
                  <Clock className="h-3.5 w-3.5 text-gold" strokeWidth={2} />
                  {doctor.experience} অভিজ্ঞতা
                </span>
                <span className="inline-flex items-center gap-1.5 bg-line/40 border border-line font-mono text-xs text-ink/70 px-3 py-1.5">
                  <MapPin className="h-3.5 w-3.5 text-gold" strokeWidth={2} />
                  {doctor.area}
                </span>
                <span className="inline-flex items-center gap-1.5 bg-line/40 border border-line font-mono text-xs text-ink/70 px-3 py-1.5">
                  <Stethoscope className="h-3.5 w-3.5 text-gold" strokeWidth={2} />
                  {doctor.chambers.length} টি চেম্বার
                </span>
                {avg !== null && (
                  <span className="inline-flex items-center gap-1.5 bg-gold/5 border border-gold/20 font-mono text-xs text-ink/70 px-3 py-1.5">
                    <Star className="h-3.5 w-3.5 fill-gold text-gold" strokeWidth={1.5} />
                    {avg.toFixed(1)} ({doctorReviews.length} রিভিউ)
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── chambers ── */}
      <div className="mt-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold mb-4 flex items-center gap-2">
          <Building2 className="h-3.5 w-3.5" strokeWidth={2} />
          চেম্বারের তথ্য
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          {doctor.chambers.map((c, i) => (
            <div key={i} className="bg-white border border-line overflow-hidden">
              {/* mini accent */}
              <div className="h-0.5 w-full bg-gradient-to-r from-pine/40 to-gold/40" />
              <div className="p-5">
                <button
                  onClick={() => openHospital(c.hospitalId)}
                  className="font-display text-lg text-pine hover:underline text-left leading-snug"
                >
                  {c.hospitalName}
                </button>
                <p className="text-xs text-ink/50 mt-1.5 flex items-center gap-1.5">
                  <MapPin className="h-3 w-3 shrink-0" strokeWidth={2} />
                  {allHospitals.find((h) => h.id === c.hospitalId)?.address}
                </p>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="bg-line/30 px-3 py-2.5">
                    <p className="font-mono text-[10px] text-ink/40 uppercase tracking-wide mb-1">ভিজিটিং দিন</p>
                    <p className="font-mono text-xs text-ink">{c.days}</p>
                  </div>
                  <div className="bg-line/30 px-3 py-2.5">
                    <p className="font-mono text-[10px] text-ink/40 uppercase tracking-wide mb-1">সময়</p>
                    <p className="font-mono text-xs text-ink">{c.time}</p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <span className="flex items-center gap-1.5 font-mono text-sm text-ink font-medium">
                    <Wallet className="h-4 w-4 text-gold" strokeWidth={2} />
                    {c.fee}
                  </span>
                  <button className="bg-pine text-paper px-4 py-2 text-xs font-medium hover:bg-pine/90 transition-colors whitespace-nowrap">
                    অ্যাপয়েন্টমেন্ট চান
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <AdSlot variant="card" label="একই বিশেষত্বের ফার্মা ব্র্যান্ড বা ডায়াগনস্টিক সেন্টারের স্পনসরড বিজ্ঞাপন" />
      </div>

      {/* ── reviews ── */}
      {doctorReviews.length > 0 && (
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold flex items-center gap-2">
              <Star className="h-3.5 w-3.5 fill-gold" strokeWidth={1.5} />
              রোগীদের মতামত
            </p>
            {avg !== null && (
              <span className="font-mono text-sm text-ink bg-gold/10 border border-gold/20 px-3 py-1">
                {avg.toFixed(1)} / ৫
              </span>
            )}
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {doctorReviews.map((r) => (
              <div key={r.id} className="bg-white border border-line p-5">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3.5 w-3.5 ${i < r.rating ? "fill-gold text-gold" : "text-line"}`}
                        strokeWidth={1.5}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-mono text-ink/40">{r.time}</span>
                </div>
                <p className="text-sm text-ink/65 leading-relaxed">{r.comment}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── call-back form ── */}
      <div className="mt-8 bg-white border border-line overflow-hidden">
        <div className="h-1 w-full bg-gradient-to-r from-gold/50 to-pine/50" />
        <div className="p-6 sm:p-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold mb-2">যোগাযোগের অনুরোধ</p>
          <h2 className="font-display text-2xl text-ink mb-6">কল-ব্যাক চান?</h2>
          {sent ? (
            <p className="text-pine bg-pine/5 border border-pine/20 px-4 py-3 text-sm">
              ধন্যবাদ! আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।
            </p>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="grid sm:grid-cols-2 gap-4"
            >
              <div>
                <label className="font-mono text-xs text-ink/50 uppercase tracking-wide">আপনার নাম</label>
                <input required className="w-full mt-1.5 border border-line px-3 py-2.5 text-sm outline-none focus:border-pine" />
              </div>
              <div>
                <label className="font-mono text-xs text-ink/50 uppercase tracking-wide">মোবাইল নম্বর</label>
                <input required className="w-full mt-1.5 border border-line px-3 py-2.5 text-sm outline-none focus:border-pine" />
              </div>
              <div className="sm:col-span-2">
                <label className="font-mono text-xs text-ink/50 uppercase tracking-wide">বার্তা (ঐচ্ছিক)</label>
                <textarea rows={3} className="w-full mt-1.5 border border-line px-3 py-2.5 text-sm outline-none focus:border-pine resize-none" />
              </div>
              <button
                type="submit"
                className="sm:col-span-2 flex items-center justify-center gap-2 bg-gold text-ink px-5 py-3 font-medium hover:bg-gold/90 transition-colors"
              >
                <Send className="h-4 w-4" strokeWidth={2} /> অনুরোধ পাঠান
              </button>
            </form>
          )}
        </div>
      </div>

      <p className="mt-6 text-xs text-ink/40 flex items-center gap-1.5">
        <Phone className="h-3.5 w-3.5" strokeWidth={2} /> সরাসরি সিরিয়াল নিতে চেম্বারে ফোন করুন।
      </p>
    </div>
  );
}
