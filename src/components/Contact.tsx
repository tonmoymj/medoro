import { useState } from "react";
import { Mail, Phone, MapPin, Send, AlertCircle, CheckCircle2 } from "lucide-react";

type Errors = { name?: string; contact?: string; message?: string };

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [values, setValues] = useState({ name: "", contact: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});

  const validate = () => {
    const next: Errors = {};
    if (!values.name.trim()) next.name = "নাম দেওয়া আবশ্যক";
    if (!values.contact.trim()) next.contact = "ইমেইল বা মোবাইল নম্বর দিন";
    else if (!/^(01[3-9]\d{8}|[\w.+-]+@[\w-]+\.[a-z]{2,})$/i.test(values.contact.trim()))
      next.contact = "সঠিক মোবাইল নম্বর (01XXXXXXXXX) বা ইমেইল দিন";
    if (!values.message.trim()) next.message = "বার্তা লিখুন";
    else if (values.message.trim().length < 10) next.message = "অন্তত ১০ অক্ষরের বার্তা লিখুন";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const field = (key: keyof typeof values) => ({
    value: values[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((v) => ({ ...v, [key]: e.target.value }));
      if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
    },
  });

  return (
    <div className="mx-auto max-w-4xl px-5 py-10">
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold mb-2">যোগাযোগ</p>
      <h1 className="font-display text-4xl text-ink mb-10">আমাদের সাথে কথা বলুন</h1>

      <div className="grid sm:grid-cols-[1fr_1.3fr] gap-10">
        <div className="space-y-6">
          {[
            { icon: Phone, label: "ফোন", value: "০৯৬১২-৩৪৫৬৭৮" },
            { icon: Mail, label: "ইমেইল", value: "[email protected]" },
            { icon: MapPin, label: "অফিস", value: "শাহেব বাজার, রাজশাহী — ৬০০০" },
          ].map((c) => (
            <div key={c.label} className="flex gap-4">
              <c.icon className="h-5 w-5 text-gold shrink-0 mt-0.5" strokeWidth={1.75} />
              <div>
                <p className="font-mono text-[11px] uppercase tracking-wide text-ink/45">{c.label}</p>
                <p className="text-ink mt-0.5">{c.value}</p>
              </div>
            </div>
          ))}
          <div className="pt-4 border-t border-dashed border-line">
            <p className="text-sm text-ink/55 leading-relaxed">
              তথ্যে ভুল দেখলে বা আপনার চেম্বার তালিকাভুক্ত করতে চাইলে, নিচের ফর্মটি পূরণ করুন — আমরা ২৪ ঘণ্টার মধ্যে সাড়া দেব।
            </p>
          </div>
        </div>

        <div className="bg-cardbg border border-line p-6 sm:p-8">
          {sent ? (
            <p className="text-pine bg-pine/5 border border-pine/20 px-4 py-3 text-sm flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 shrink-0" strokeWidth={2} /> বার্তা পাঠানো হয়েছে। ধন্যবাদ, আমরা শীঘ্রই যোগাযোগ করব।
            </p>
          ) : (
            <form
              noValidate
              onSubmit={(e) => {
                e.preventDefault();
                if (validate()) setSent(true);
              }}
              className="space-y-4"
            >
              <div>
                <label className="font-mono text-xs text-ink/50 uppercase tracking-wide">নাম</label>
                <input
                  {...field("name")}
                  className={`w-full mt-1.5 border px-3 py-2.5 text-sm outline-none ${
                    errors.name ? "border-brick" : "border-line focus:border-pine"
                  }`}
                />
                {errors.name && (
                  <p className="text-brick text-xs mt-1.5 flex items-center gap-1"><AlertCircle className="h-3 w-3" strokeWidth={2} /> {errors.name}</p>
                )}
              </div>
              <div>
                <label className="font-mono text-xs text-ink/50 uppercase tracking-wide">ইমেইল বা মোবাইল</label>
                <input
                  {...field("contact")}
                  className={`w-full mt-1.5 border px-3 py-2.5 text-sm outline-none ${
                    errors.contact ? "border-brick" : "border-line focus:border-pine"
                  }`}
                />
                {errors.contact && (
                  <p className="text-brick text-xs mt-1.5 flex items-center gap-1"><AlertCircle className="h-3 w-3" strokeWidth={2} /> {errors.contact}</p>
                )}
              </div>
              <div>
                <label className="font-mono text-xs text-ink/50 uppercase tracking-wide">বার্তা</label>
                <textarea
                  {...field("message")}
                  rows={4}
                  className={`w-full mt-1.5 border px-3 py-2.5 text-sm outline-none resize-none ${
                    errors.message ? "border-brick" : "border-line focus:border-pine"
                  }`}
                />
                {errors.message && (
                  <p className="text-brick text-xs mt-1.5 flex items-center gap-1"><AlertCircle className="h-3 w-3" strokeWidth={2} /> {errors.message}</p>
                )}
              </div>
              <button type="submit" className="flex items-center justify-center gap-2 bg-pine text-paper px-5 py-3 font-medium hover:bg-pine-dark transition-colors w-full sm:w-auto">
                <Send className="h-4 w-4" strokeWidth={2} /> বার্তা পাঠান
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
