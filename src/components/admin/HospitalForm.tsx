import { useState, useEffect } from "react";
import { X, Plus, Trash2 } from "lucide-react";
import type { Hospital } from "@/data";
import { useAdmin } from "@/context/AdminContext";

function emptyHospital(): Hospital {
  return {
    id: Date.now().toString(),
    name: "",
    type: "",
    area: "",
    address: "",
    phone: "",
    beds: "",
    facilities: [""],
    doctorCount: 0,
  };
}

type Props = {
  initial?: Hospital | null;
  onClose: () => void;
};

export default function HospitalForm({ initial, onClose }: Props) {
  const { addHospital, updateHospital } = useAdmin();
  const isEdit = !!initial;
  const [form, setForm] = useState<Hospital>(() => initial ?? emptyHospital());
  const [facilityInput, setFacilityInput] = useState("");
  const [errors, setErrors] = useState<Partial<Record<keyof Hospital, string>>>({});

  useEffect(() => {
    if (initial) setForm(initial);
  }, [initial]);

  const set = (k: keyof Hospital, v: unknown) => {
    setForm(f => ({ ...f, [k]: v }));
    setErrors(e => ({ ...e, [k]: "" }));
  };

  const addFacility = () => {
    const f = facilityInput.trim();
    if (!f) return;
    setForm(prev => ({ ...prev, facilities: [...prev.facilities, f] }));
    setFacilityInput("");
  };

  const removeFacility = (i: number) =>
    setForm(prev => ({ ...prev, facilities: prev.facilities.filter((_, idx) => idx !== i) }));

  const validate = (): boolean => {
    const e: typeof errors = {};
    if (!form.name.trim())    e.name    = "নাম আবশ্যক";
    if (!form.type.trim())    e.type    = "ধরন আবশ্যক";
    if (!form.area.trim())    e.area    = "এলাকা আবশ্যক";
    if (!form.address.trim()) e.address = "ঠিকানা আবশ্যক";
    if (!form.phone.trim())   e.phone   = "ফোন আবশ্যক";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    // clean up empty facilities
    const clean = { ...form, facilities: form.facilities.filter(f => f.trim() !== "") };
    if (isEdit) updateHospital(clean); else addHospital(clean);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-ink/40 overflow-y-auto py-10 px-4">
      <div className="w-full max-w-xl bg-white border border-line">
        <div className="flex items-center justify-between px-6 py-4 border-b border-line bg-pine text-paper">
          <h2 className="font-display text-xl">{isEdit ? "হাসপাতাল সম্পাদনা" : "নতুন হাসপাতাল যোগ"}</h2>
          <button onClick={onClose}><X className="h-5 w-5" strokeWidth={2} /></button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="হাসপাতালের নাম *" error={errors.name}>
              <input value={form.name} onChange={e => set("name", e.target.value)}
                className={inp(errors.name)} placeholder="হাসপাতালের নাম" />
            </Field>
            <Field label="ধরন *" error={errors.type}>
              <select value={form.type} onChange={e => set("type", e.target.value)} className={inp(errors.type)}>
                <option value="">— বেছে নিন —</option>
                {["সরকারি হাসপাতাল", "বেসরকারি হাসপাতাল", "ক্লিনিক", "ডায়াগনস্টিক সেন্টার", "ডায়াগনস্টিক ও কনসালটেশন"].map(t =>
                  <option key={t} value={t}>{t}</option>
                )}
              </select>
            </Field>
            <Field label="এলাকা *" error={errors.area}>
              <input value={form.area} onChange={e => set("area", e.target.value)}
                className={inp(errors.area)} placeholder="শাহেব বাজার, রাজশাহী" />
            </Field>
            <Field label="ফোন *" error={errors.phone}>
              <input value={form.phone} onChange={e => set("phone", e.target.value)}
                className={inp(errors.phone)} placeholder="০৭২১-XXXXXXX" />
            </Field>
            <Field label="ঠিকানা *" error={errors.address}>
              <input value={form.address} onChange={e => set("address", e.target.value)}
                className={inp(errors.address)} placeholder="পূর্ণ ঠিকানা" />
            </Field>
            <Field label="শয্যা সংখ্যা">
              <input value={form.beds ?? ""} onChange={e => set("beds", e.target.value)}
                className={inp()} placeholder="যেমন: ২০০+" />
            </Field>
            <Field label="ডাক্তার সংখ্যা">
              <input type="number" value={form.doctorCount} onChange={e => set("doctorCount", Number(e.target.value))}
                className={inp()} placeholder="০" />
            </Field>
          </div>

          {/* facilities */}
          <div>
            <p className="font-mono text-[11px] uppercase tracking-wide text-gold mb-2">সুবিধাসমূহ</p>
            <div className="flex gap-2 mb-3">
              <input
                value={facilityInput}
                onChange={e => setFacilityInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addFacility())}
                className={inp()}
                placeholder="যেমন: আইসিইউ"
              />
              <button type="button" onClick={addFacility}
                className="bg-gold text-ink px-3 py-2 text-sm font-medium hover:bg-gold/90">
                <Plus className="h-4 w-4" strokeWidth={2} />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {form.facilities.filter(f => f.trim()).map((f, i) => (
                <span key={i} className="flex items-center gap-1.5 bg-pine/5 border border-pine/15 text-pine text-xs font-mono px-2.5 py-1">
                  {f}
                  <button type="button" onClick={() => removeFacility(i)}>
                    <X className="h-3 w-3" strokeWidth={2} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 border border-line py-2.5 text-sm text-ink/60 hover:bg-line/30 transition-colors">
              বাতিল
            </button>
            <button type="submit"
              className="flex-1 bg-pine text-paper py-2.5 text-sm font-medium hover:bg-pine/90 transition-colors">
              {isEdit ? "আপডেট করুন" : "সংরক্ষণ করুন"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="font-mono text-[11px] uppercase tracking-wide text-ink/50">{label}</label>
      <div className="mt-1.5">{children}</div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
function inp(err?: string) {
  return `w-full border ${err ? "border-red-400" : "border-line"} px-3 py-2.5 text-sm outline-none focus:border-pine bg-white`;
}
