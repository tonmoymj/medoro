import { useState } from "react";
import { MapPin, Clock, Wallet, ShieldCheck, Phone, ArrowLeft, Send, Star, Stethoscope, Building2, Calendar, Award, CheckCircle } from "lucide-react";
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
      <button 
        onClick={back} 
        className="inline-flex items-center gap-2 text-xs font-mono bg-cardbg border border-line px-3.5 py-2 text-ink/70 hover:text-pine hover:border-pine mb-8 transition-all shadow-sm"
      >
        <ArrowLeft className="h-4 w-4" strokeWidth={2} /> ডাক্তার তালিকায় ফিরুন
      </button>

      {/* ── main profile banner card ── */}
      <div className="bg-cardbg border border-line shadow-md overflow-hidden">
        {/* top hero accent */}
        <div className="h-2 w-full bg-gradient-to-r from-pine via-gold to-pine" />

        <div className="p-6 sm:p-10">
          <div className="flex flex-col md:flex-row md:items-start gap-8">
            {/* avatar */}
            <div className="relative mx-auto md:mx-0 shrink-0">
              <div className="h-44 w-44 sm:h-48 sm:w-48 border-4 border-white shadow-xl rounded-full overflow-hidden bg-pine/10 flex items-center justify-center font-display text-6xl text-pine ring-2 ring-pine/20">
                {doctor.photo ? (
                  <img src={doctor.photo} alt={doctor.name} className="h-full w-full object-cover object-top" />
                ) : (
                  <span>{initials}</span>
                )}
              </div>
              <span className="absolute bottom-2 right-2 bg-pine text-paper p-2 rounded-full border-2 border-white shadow-md">
                <CheckCircle className="h-5 w-5" />
              </span>
            </div>

            {/* info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-2">
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] bg-gold/10 border border-gold/30 text-ink px-3 py-0.5">
                  {doctor.specialty}
                </span>
                {doctor.featured && (
                  <span className="font-mono text-[10px] bg-pine text-paper px-2 py-0.5 flex items-center gap-1">
                    <Star className="h-3 w-3 fill-paper" /> ভেরিফাইড বিশেষজ্ঞ
                  </span>
                )}
              </div>

              <h1 className="font-display text-3xl sm:text-4xl text-ink leading-tight">{doctor.name}</h1>
              <p className="text-pine font-medium mt-1 text-sm sm:text-base leading-relaxed">{doctor.degree}</p>

              {/* quick meta badges */}
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="bg-paper border border-line p-2.5 rounded text-left flex items-center gap-2.5">
                  <Award className="h-4 w-4 text-gold shrink-0" />
                  <div>
                    <p className="font-mono text-[9px] uppercase text-ink/40">অভিজ্ঞতা</p>
                    <p className="font-mono text-xs font-semibold text-ink">{doctor.experience}</p>
                  </div>
                </div>

                <div className="bg-paper border border-line p-2.5 rounded text-left flex items-center gap-2.5">
                  <ShieldCheck className="h-4 w-4 text-pine shrink-0" />
                  <div>
                    <p className="font-mono text-[9px] uppercase text-ink/40">রেজিস্ট্রেশন</p>
                    <p className="font-mono text-xs font-semibold text-ink">{doctor.regNo}</p>
                  </div>
                </div>

                <div className="bg-paper border border-line p-2.5 rounded text-left flex items-center gap-2.5 col-span-2 sm:col-span-1">
                  <MapPin className="h-4 w-4 text-gold shrink-0" />
                  <div>
                    <p className="font-mono text-[9px] uppercase text-ink/40">কর্মস্থল/এলাকা</p>
                    <p className="font-mono text-xs font-semibold text-ink truncate">{doctor.area}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── chambers ── */}
      <div className="mt-10">
        <div className="flex items-center justify-between mb-4 border-b border-line pb-2">
          <p className="font-mono text-[12px] uppercase tracking-[0.16em] text-gold font-bold flex items-center gap-2">
            <Building2 className="h-4 w-4" strokeWidth={2} />
            চেম্বার ও ভিজিটিং সময়সূচি ({doctor.chambers.length} টি)
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {doctor.chambers.map((c, i) => (
            <div key={i} className="bg-cardbg border border-line shadow-sm hover:border-pine/40 transition-all overflow-hidden flex flex-col justify-between">
              <div className="p-6">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <button
                    onClick={() => openHospital(c.hospitalId)}
                    className="font-display text-xl text-pine hover:underline text-left leading-snug"
                  >
                    {c.hospitalName}
                  </button>
                  <span className="font-mono text-xs font-bold text-pine bg-pine/5 border border-pine/20 px-2.5 py-1 whitespace-nowrap">
                    ফি: {c.fee}
                  </span>
                </div>

                <p className="text-xs text-ink/50 flex items-center gap-1.5 mb-5">
                  <MapPin className="h-3.5 w-3.5 shrink-0 text-gold" strokeWidth={2} />
                  {allHospitals.find((h) => h.id === c.hospitalId)?.address || doctor.area}
                </p>

                <div className="space-y-2 bg-paper/70 p-3.5 border border-line/60 font-mono text-xs text-ink">
                  <div className="flex items-center justify-between">
                    <span className="text-ink/50 flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-gold" /> বার / দিন:
                    </span>
                    <span className="font-semibold">{c.days}</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-line/40 pt-2">
                    <span className="text-ink/50 flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-gold" /> সময়সূচি:
                    </span>
                    <span className="font-semibold">{c.time}</span>
                  </div>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2">
                <button 
                  onClick={() => {
                    const formElem = document.getElementById("serial-form");
                    formElem?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="w-full text-center bg-pine text-paper text-sm font-medium py-2.5 hover:bg-pine/90 transition-colors shadow-sm"
                >
                  অ্যাপয়েন্টমেন্ট বা সিরিয়াল নিন
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10">
        <AdSlot slotId="doctor-profile" variant="card" label="একই বিশেষত্বের ফার্মা ব্র্যান্ড বা ডায়াগনস্টিক সেন্টারের স্পনসরড বিজ্ঞাপন" />
      </div>

      {/* ── reviews ── */}
      {doctorReviews.length > 0 && (
        <div className="mt-10">
          <div className="flex items-center justify-between mb-4 border-b border-line pb-2">
            <p className="font-mono text-[12px] uppercase tracking-[0.16em] text-gold font-bold flex items-center gap-2">
              <Star className="h-4 w-4 fill-gold text-gold" strokeWidth={1.5} />
              রোগীদের রিভিউ ও অভিজ্ঞতা ({doctorReviews.length})
            </p>
            {avg !== null && (
              <span className="font-mono text-xs font-bold text-ink bg-gold/10 border border-gold/30 px-3 py-1">
                গড় রেটিং: {avg.toFixed(1)} / ৫
              </span>
            )}
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {doctorReviews.map((r) => (
              <div key={r.id} className="bg-cardbg border border-line p-5 shadow-sm">
                <div className="flex items-center justify-between mb-3">
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
                <p className="text-sm text-ink/75 leading-relaxed">{r.comment}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── call-back form ── */}
      <div id="serial-form" className="mt-10 bg-cardbg border border-line shadow-md overflow-hidden">
        <div className="h-1.5 w-full bg-gradient-to-r from-gold via-pine to-gold" />
        <div className="p-6 sm:p-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold mb-1">সিরিয়াল ও সিরিয়ালের সহায়তা</p>
          <h2 className="font-display text-2xl text-ink mb-6">অ্যাপয়েন্টমেন্ট এর জন্য কল-ব্যাক চান?</h2>
          {sent ? (
            <div className="text-pine bg-pine/5 border border-pine/20 p-5 text-center text-sm font-mono">
              ✓ ধন্যবাদ! আপনার তথ্য গ্রহণ করা হয়েছে। প্রতিনিধি শীঘ্রই আপনাকে কল করবেন।
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="grid sm:grid-cols-2 gap-5"
            >
              <div>
                <label className="font-mono text-xs text-ink/60 uppercase tracking-wide block mb-1">রোগীর নাম *</label>
                <input required placeholder="নাম লিখুন" className="w-full border border-line px-3.5 py-2.5 text-sm outline-none focus:border-pine bg-paper/30" />
              </div>
              <div>
                <label className="font-mono text-xs text-ink/60 uppercase tracking-wide block mb-1">মোবাইল নম্বর *</label>
                <input required placeholder="০১৭XXXXXXXX" className="w-full border border-line px-3.5 py-2.5 text-sm outline-none focus:border-pine bg-paper/30" />
              </div>
              <div className="sm:col-span-2">
                <label className="font-mono text-xs text-ink/60 uppercase tracking-wide block mb-1">সমস্যা বা বার্তা (ঐচ্ছিক)</label>
                <textarea rows={3} placeholder="আপনার শারীরিক সমস্যা সংক্ষেপে লিখুন..." className="w-full border border-line px-3.5 py-2.5 text-sm outline-none focus:border-pine bg-paper/30 resize-none" />
              </div>
              <button
                type="submit"
                className="sm:col-span-2 flex items-center justify-center gap-2 bg-pine text-paper px-6 py-3.5 font-medium hover:bg-pine/90 transition-all shadow-md"
              >
                <Send className="h-4 w-4" strokeWidth={2} /> কল-ব্যাক অনুরোধ নিশ্চিত করুন
              </button>
            </form>
          )}
        </div>
      </div>

      <p className="mt-6 text-xs text-ink/40 flex items-center justify-center gap-1.5 font-mono">
        <Phone className="h-3.5 w-3.5 text-gold" strokeWidth={2} /> সরাসরি সিরিয়াল বা তথ্যের জন্য হাসপাতাল বা চেম্বারে সরাসরি কথা বলুন।
      </p>
    </div>
  );
}
