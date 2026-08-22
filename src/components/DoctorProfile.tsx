import { useState } from "react";
import { MapPin, Clock, Wallet, ShieldCheck, Phone, ArrowLeft, Send, Star } from "lucide-react";
import { doctors, hospitals, reviews } from "@/data";
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
  const doctor = doctors.find((d) => d.id === id) ?? doctors[0];
  const [sent, setSent] = useState(false);

  return (
    <div className="mx-auto max-w-4xl px-5 py-10">
      <button onClick={back} className="flex items-center gap-1.5 text-sm text-ink/55 hover:text-pine mb-8">
        <ArrowLeft className="h-4 w-4" strokeWidth={2} /> ডাক্তার তালিকায় ফিরুন
      </button>

      {/* profile header slip */}
      <div className="bg-white border border-line perf-top pt-7">
        <div className="px-6 sm:px-8 pb-8 sm:flex sm:items-start sm:justify-between gap-8">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-gold mb-2">{doctor.specialty}</p>
            <h1 className="font-display text-3xl sm:text-4xl text-ink">{doctor.name}</h1>
            <p className="text-ink/65 mt-2">{doctor.degree}</p>
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-ink/55">
              <span className="flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5" strokeWidth={2} /> {doctor.regNo}</span>
              <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" strokeWidth={2} /> {doctor.experience} অভিজ্ঞতা</span>
              <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" strokeWidth={2} /> {doctor.area}</span>
            </div>
          </div>
          <div className="mt-6 sm:mt-0 h-24 w-24 shrink-0 bg-pine/10 border border-pine/20 flex items-center justify-center font-display text-3xl text-pine">
            {doctor.name.replace("ডা. ", "").charAt(0)}
          </div>
        </div>
      </div>

      {/* chambers */}
      <div className="mt-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold mb-4">চেম্বারের তথ্য</p>
        <div className="space-y-4">
          {doctor.chambers.map((c, i) => (
            <div key={i} className="border border-line bg-white p-6 grid sm:grid-cols-[1fr_auto] gap-6">
              <div>
                <button
                  onClick={() => openHospital(c.hospitalId)}
                  className="font-display text-xl text-pine hover:underline"
                >
                  {c.hospitalName}
                </button>
                <p className="text-sm text-ink/55 mt-1 flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" strokeWidth={2} />
                  {hospitals.find((h) => h.id === c.hospitalId)?.address}
                </p>
                <div className="mt-4 grid grid-cols-2 gap-4 font-mono text-xs">
                  <div>
                    <p className="text-ink/40 uppercase tracking-wide mb-1">ভিজিটিং দিন</p>
                    <p className="text-ink">{c.days}</p>
                  </div>
                  <div>
                    <p className="text-ink/40 uppercase tracking-wide mb-1">সময়</p>
                    <p className="text-ink">{c.time}</p>
                  </div>
                </div>
              </div>
              <div className="sm:border-l sm:border-dashed sm:border-line sm:pl-6 flex sm:flex-col justify-between items-center sm:items-end gap-3">
                <span className="flex items-center gap-1.5 font-mono text-sm text-ink">
                  <Wallet className="h-4 w-4 text-gold" strokeWidth={2} /> {c.fee}
                </span>
                <button className="bg-pine text-paper px-4 py-2 text-sm font-medium hover:bg-pine-dark transition-colors whitespace-nowrap">
                  অ্যাপয়েন্টমেন্ট চান
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10">
        <AdSlot variant="card" label="একই বিশেষত্বের ফার্মা ব্র্যান্ড বা ডায়াগনস্টিক সেন্টারের স্পনসরড বিজ্ঞাপন" />
      </div>

      {/* reviews */}
      {(() => {
        const doctorReviews = reviews.filter((r) => r.doctorId === doctor.id);
        if (doctorReviews.length === 0) return null;
        const avg = doctorReviews.reduce((s, r) => s + r.rating, 0) / doctorReviews.length;
        return (
          <div className="mt-10">
            <div className="flex items-center justify-between mb-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold">রোগীদের মতামত</p>
              <span className="flex items-center gap-1.5 font-mono text-sm text-ink">
                <Star className="h-4 w-4 fill-gold text-gold" strokeWidth={1.5} /> {avg.toFixed(1)} ({doctorReviews.length} রিভিউ)
              </span>
            </div>
            <div className="space-y-3">
              {doctorReviews.map((r) => (
                <div key={r.id} className="bg-white border border-line p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`h-3.5 w-3.5 ${i < r.rating ? "fill-gold text-gold" : "text-line"}`} strokeWidth={1.5} />
                      ))}
                    </div>
                    <span className="text-xs font-mono text-ink/40">{r.time}</span>
                  </div>
                  <p className="text-sm text-ink/65 mt-2">{r.comment}</p>
                </div>
              ))}
            </div>
          </div>
        );
      })()}

      {/* appointment request form */}
      <div className="mt-10 border border-line bg-white p-6 sm:p-8">
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
            <button type="submit" className="sm:col-span-2 flex items-center justify-center gap-2 bg-gold text-ink px-5 py-3 font-medium hover:bg-gold-light transition-colors">
              <Send className="h-4 w-4" strokeWidth={2} /> অনুরোধ পাঠান
            </button>
          </form>
        )}
      </div>

      <p className="mt-6 text-xs text-ink/40 flex items-center gap-1.5">
        <Phone className="h-3.5 w-3.5" strokeWidth={2} /> সরাসরি সিরিয়াল নিতে চেম্বারে ফোন করুন।
      </p>
    </div>
  );
}
