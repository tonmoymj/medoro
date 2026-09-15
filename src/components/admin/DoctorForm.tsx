import { useState, useEffect, useRef } from "react";
import { X, Plus, Trash2, Camera, UserCircle2 } from "lucide-react";
import { specialties, hospitals as seedHospitals } from "@/data";
import type { Doctor, Chamber } from "@/data";
import { useAdmin } from "@/context/AdminContext";

const EMPTY_CHAMBER: Chamber = {
  hospitalId: "",
  hospitalName: "",
  days: "",
  time: "",
  fee: "",
};

function emptyDoctor(): Doctor {
  return {
    id: Date.now().toString(),
    name: "",
    degree: "",
    specialtyId: "",
    specialty: "",
    experience: "",
    regNo: "",
    area: "",
    chambers: [{ ...EMPTY_CHAMBER }],
  };
}

type Props = {
  initial?: Doctor | null;
  onClose: () => void;
};

export default function DoctorForm({ initial, onClose }: Props) {
  const { hospitals, addDoctor, updateDoctor } = useAdmin();
  const allHospitals = hospitals.length ? hospitals : seedHospitals;
  const isEdit = !!initial;

  const [form, setForm] = useState<Doctor>(() => initial ?? emptyDoctor());
  const [errors, setErrors] = useState<Partial<Record<keyof Doctor, string>>>({});
  const [photoError, setPhotoError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // sync specialty label when specialtyId changes
  useEffect(() => {
    const sp = specialties.find(s => s.id === form.specialtyId);
    if (sp) setForm(f => ({ ...f, specialty: sp.name + " বিশেষজ্ঞ" }));
  }, [form.specialtyId]);

  const set = (k: keyof Doctor, v: unknown) => {
    setForm(f => ({ ...f, [k]: v }));
    setErrors(e => ({ ...e, [k]: "" }));
  };

  const setChamber = (i: number, k: keyof Chamber, v: string) => {
    const chambers = form.chambers.map((c, idx) => idx === i ? { ...c, [k]: v } : c);
    if (k === "hospitalId") {
      const h = allHospitals.find(h => h.id === v);
      if (h) chambers[i].hospitalName = h.name;
    }
    setForm(f => ({ ...f, chambers }));
  };

  const addChamber    = () => setForm(f => ({ ...f, chambers: [...f.chambers, { ...EMPTY_CHAMBER }] }));
  const removeChamber = (i: number) => setForm(f => ({ ...f, chambers: f.chambers.filter((_, idx) => idx !== i) }));

  // ── photo upload ──
  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhotoError("");
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setPhotoError("ছবির আকার ৫ MB-এর বেশি হওয়া যাবে না।");
      return;
    }
    if (!file.type.startsWith("image/")) {
      setPhotoError("শুধুমাত্র ছবি ফাইল (JPG, PNG, WEBP) আপলোড করুন।");
      return;
    }

    try {
      // Try uploading to Supabase Storage bucket 'doctor-photos'
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `doctors/${fileName}`;

      const { data: uploadData, error: uploadErr } = await (await import("@/lib/supabase")).supabase
        .storage
        .from("doctor-photos")
        .upload(filePath, file);

      if (!uploadErr && uploadData) {
        const { data: urlData } = (await import("@/lib/supabase")).supabase
          .storage
          .from("doctor-photos")
          .getPublicUrl(filePath);

        if (urlData?.publicUrl) {
          set("photo", urlData.publicUrl);
          return;
        }
      }
    } catch (err) {
      console.warn("Storage bucket upload skipped, fallback to Data URL:", err);
    }

    // Fallback to Base64 Data URL if bucket isn't set up yet
    const reader = new FileReader();
    reader.onload = (ev) => {
      set("photo", ev.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const removePhoto = () => {
    set("photo", undefined);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const validate = (): boolean => {
    const e: typeof errors = {};
    if (!form.name.trim())        e.name       = "নাম আবশ্যক";
    if (!form.degree.trim())      e.degree     = "ডিগ্রি আবশ্যক";
    if (!form.specialtyId)        e.specialtyId = "বিভাগ বেছে নিন";
    if (!form.experience.trim())  e.experience = "অভিজ্ঞতা আবশ্যক";
    if (!form.regNo.trim())       e.regNo      = "BMDC নং আবশ্যক";
    if (!form.area.trim())        e.area       = "এলাকা আবশ্যক";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    if (isEdit) updateDoctor(form); else addDoctor(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-ink/40 overflow-y-auto py-10 px-4">
      <div className="w-full max-w-2xl bg-white border border-line">
        {/* header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-line bg-pine text-paper">
          <h2 className="font-display text-xl">{isEdit ? "ডাক্তার সম্পাদনা" : "নতুন ডাক্তার যোগ"}</h2>
          <button onClick={onClose}><X className="h-5 w-5" strokeWidth={2} /></button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">

          {/* ── photo upload ── */}
          <div>
            <p className="font-mono text-[11px] uppercase tracking-wide text-gold mb-3">প্রোফাইল ছবি</p>
            <div className="flex items-center gap-5">
              {/* preview */}
              <div className="h-20 w-20 shrink-0 border border-line overflow-hidden bg-pine/5 flex items-center justify-center">
                {form.photo ? (
                  <img src={form.photo} alt="preview" className="h-full w-full object-cover" />
                ) : (
                  <UserCircle2 className="h-10 w-10 text-ink/20" strokeWidth={1.5} />
                )}
              </div>
              {/* controls */}
              <div className="flex flex-col gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoChange}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 border border-line px-3 py-2 text-sm text-ink/70 hover:border-pine hover:text-pine transition-colors"
                >
                  <Camera className="h-4 w-4" strokeWidth={2} />
                  {form.photo ? "ছবি পরিবর্তন করুন" : "ছবি আপলোড করুন"}
                </button>
                {form.photo && (
                  <button
                    type="button"
                    onClick={removePhoto}
                    className="flex items-center gap-2 text-xs text-red-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="h-3.5 w-3.5" strokeWidth={2} /> ছবি সরান
                  </button>
                )}
                <p className="text-[11px] text-ink/40 font-mono">JPG, PNG, WEBP · সর্বোচ্চ ২ MB</p>
                {photoError && <p className="text-xs text-red-500">{photoError}</p>}
              </div>
            </div>
          </div>

          {/* basic info */}
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="ডাক্তারের নাম *" error={errors.name}>
              <input value={form.name} onChange={e => set("name", e.target.value)}
                className={input(errors.name)} placeholder="ডা. নাম লিখুন" />
            </Field>
            <Field label="ডিগ্রি *" error={errors.degree}>
              <input value={form.degree} onChange={e => set("degree", e.target.value)}
                className={input(errors.degree)} placeholder="এমবিবিএস, এফসিপিএস..." />
            </Field>
            <Field label="বিভাগ *" error={errors.specialtyId}>
              <select value={form.specialtyId} onChange={e => set("specialtyId", e.target.value)}
                className={input(errors.specialtyId)}>
                <option value="">— বেছে নিন —</option>
                {specialties.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </Field>
            <Field label="অভিজ্ঞতা *" error={errors.experience}>
              <input value={form.experience} onChange={e => set("experience", e.target.value)}
                className={input(errors.experience)} placeholder="যেমন: ১৫ বছর" />
            </Field>
            <Field label="BMDC নং *" error={errors.regNo}>
              <input value={form.regNo} onChange={e => set("regNo", e.target.value)}
                className={input(errors.regNo)} placeholder="BMDC-A-XXXXX" />
            </Field>
            <Field label="এলাকা *" error={errors.area}>
              <input value={form.area} onChange={e => set("area", e.target.value)}
                className={input(errors.area)} placeholder="শাহেব বাজার, রাজশাহী" />
            </Field>
          </div>

          {/* chambers */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="font-mono text-[11px] uppercase tracking-wide text-gold">চেম্বার তথ্য</p>
              <button type="button" onClick={addChamber}
                className="flex items-center gap-1 text-xs text-pine font-mono hover:underline">
                <Plus className="h-3.5 w-3.5" strokeWidth={2} /> চেম্বার যোগ
              </button>
            </div>
            {form.chambers.map((c, i) => (
              <div key={i} className="border border-line p-4 mb-3 relative">
                <div className="absolute top-3 right-3">
                  {form.chambers.length > 1 && (
                    <button type="button" onClick={() => removeChamber(i)}
                      className="text-red-400 hover:text-red-600">
                      <Trash2 className="h-4 w-4" strokeWidth={2} />
                    </button>
                  )}
                </div>
                <p className="font-mono text-[10px] text-ink/40 mb-3">চেম্বার {i + 1}</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <Field label="হাসপাতাল">
                    <select value={c.hospitalId} onChange={e => setChamber(i, "hospitalId", e.target.value)}
                      className={input()}>
                      <option value="">— হাসপাতাল বেছে নিন —</option>
                      {allHospitals.map(h => <option key={h.id} value={h.id}>{h.name}</option>)}
                    </select>
                  </Field>
                  <Field label="ভিজিট ফি">
                    <input value={c.fee} onChange={e => setChamber(i, "fee", e.target.value)}
                      className={input()} placeholder="৳ ৫০০" />
                  </Field>
                  <Field label="ভিজিটিং দিন">
                    <input value={c.days} onChange={e => setChamber(i, "days", e.target.value)}
                      className={input()} placeholder="শনি, সোম, বুধ" />
                  </Field>
                  <Field label="সময়">
                    <input value={c.time} onChange={e => setChamber(i, "time", e.target.value)}
                      className={input()} placeholder="বিকাল ৫টা - রাত ৯টা" />
                  </Field>
                </div>
              </div>
            ))}
          </div>

          {/* actions */}
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

// helpers
function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="font-mono text-[11px] uppercase tracking-wide text-ink/50">{label}</label>
      <div className="mt-1.5">{children}</div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
function input(err?: string) {
  return `w-full border ${err ? "border-red-400" : "border-line"} px-3 py-2.5 text-sm outline-none focus:border-pine bg-white`;
}
