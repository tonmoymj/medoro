import { useState } from "react";
import { Stethoscope, Building2, CheckCircle2 } from "lucide-react";

export default function JoinUs() {
  const [type, setType] = useState<"doctor" | "hospital">("doctor");
  const [sent, setSent] = useState(false);

  return (
    <div className="mx-auto max-w-3xl px-5 py-10">
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold mb-2">তালিকাভুক্তি</p>
      <h1 className="font-display text-4xl text-ink mb-3">Medoro-তে যুক্ত হোন</h1>
      <p className="text-ink/60 max-w-xl mb-8">
        তালিকাভুক্তি সম্পূর্ণ বিনামূল্যে। ফর্ম জমা দেওয়ার পর আমাদের টিম ২৪-৪৮ ঘণ্টার মধ্যে যোগাযোগ করে তথ্য যাচাই করবে।
      </p>

      <div className="flex gap-3 mb-8">
        <button
          onClick={() => setType("doctor")}
          className={`flex-1 flex items-center gap-3 border p-4 text-left transition-colors ${
            type === "doctor" ? "border-pine bg-pine/5" : "border-line bg-cardbg"
          }`}
        >
          <Stethoscope className={`h-5 w-5 ${type === "doctor" ? "text-pine" : "text-ink/40"}`} strokeWidth={1.75} />
          <div>
            <p className={`font-medium text-sm ${type === "doctor" ? "text-pine" : "text-ink"}`}>আমি একজন ডাক্তার</p>
            <p className="text-xs text-ink/45">চেম্বারের তথ্য তালিকাভুক্ত করতে চাই</p>
          </div>
        </button>
        <button
          onClick={() => setType("hospital")}
          className={`flex-1 flex items-center gap-3 border p-4 text-left transition-colors ${
            type === "hospital" ? "border-pine bg-pine/5" : "border-line bg-cardbg"
          }`}
        >
          <Building2 className={`h-5 w-5 ${type === "hospital" ? "text-pine" : "text-ink/40"}`} strokeWidth={1.75} />
          <div>
            <p className={`font-medium text-sm ${type === "hospital" ? "text-pine" : "text-ink"}`}>হাসপাতাল/ক্লিনিক</p>
            <p className="text-xs text-ink/45">প্রতিষ্ঠান তালিকাভুক্ত করতে চাই</p>
          </div>
        </button>
      </div>

      <div className="bg-cardbg border border-line p-6 sm:p-8">
        {sent ? (
          <div className="text-center py-8">
            <CheckCircle2 className="h-10 w-10 text-pine mx-auto mb-3" strokeWidth={1.5} />
            <p className="font-display text-xl text-ink">আবেদন গ্রহণ করা হয়েছে</p>
            <p className="text-sm text-ink/55 mt-2">আমাদের টিম শীঘ্রই আপনার সাথে যোগাযোগ করবে।</p>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="grid sm:grid-cols-2 gap-4"
          >
            <div>
              <label className="font-mono text-xs text-ink/50 uppercase tracking-wide">
                {type === "doctor" ? "ডাক্তারের পূর্ণ নাম" : "প্রতিষ্ঠানের নাম"}
              </label>
              <input required className="w-full mt-1.5 border border-line px-3 py-2.5 text-sm outline-none focus:border-pine" />
            </div>
            <div>
              <label className="font-mono text-xs text-ink/50 uppercase tracking-wide">মোবাইল নম্বর</label>
              <input required className="w-full mt-1.5 border border-line px-3 py-2.5 text-sm outline-none focus:border-pine" />
            </div>
            {type === "doctor" ? (
              <>
                <div>
                  <label className="font-mono text-xs text-ink/50 uppercase tracking-wide">বিএমডিসি রেজিস্ট্রেশন নম্বর</label>
                  <input required className="w-full mt-1.5 border border-line px-3 py-2.5 text-sm outline-none focus:border-pine" />
                </div>
                <div>
                  <label className="font-mono text-xs text-ink/50 uppercase tracking-wide">বিশেষত্ব</label>
                  <input required className="w-full mt-1.5 border border-line px-3 py-2.5 text-sm outline-none focus:border-pine" />
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="font-mono text-xs text-ink/50 uppercase tracking-wide">প্রতিষ্ঠানের ধরন</label>
                  <input placeholder="হাসপাতাল / ক্লিনিক / ডায়াগনস্টিক" required className="w-full mt-1.5 border border-line px-3 py-2.5 text-sm outline-none focus:border-pine" />
                </div>
                <div>
                  <label className="font-mono text-xs text-ink/50 uppercase tracking-wide">লাইসেন্স নম্বর</label>
                  <input required className="w-full mt-1.5 border border-line px-3 py-2.5 text-sm outline-none focus:border-pine" />
                </div>
              </>
            )}
            <div className="sm:col-span-2">
              <label className="font-mono text-xs text-ink/50 uppercase tracking-wide">ঠিকানা</label>
              <textarea required rows={3} className="w-full mt-1.5 border border-line px-3 py-2.5 text-sm outline-none focus:border-pine resize-none" />
            </div>
            <button type="submit" className="sm:col-span-2 bg-gold text-ink px-5 py-3 font-medium hover:bg-gold-light transition-colors">
              আবেদন জমা দিন
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
