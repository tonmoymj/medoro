import { useState } from "react";
import { Stethoscope, ArrowRight, AlertCircle } from "lucide-react";
import { specialties } from "@/data";

const symptomMap: Record<string, { specialtyId: string; note: string }> = {
  "জ্বর": { specialtyId: "medicine", note: "৩ দিনের বেশি জ্বর থাকলে দ্রুত ডাক্তার দেখান" },
  "মাথাব্যথা": { specialtyId: "medicine", note: "ঘন ঘন তীব্র মাথাব্যথা হলে নিউরোলজিস্ট দেখাতে পারেন" },
  "বুকে ব্যথা": { specialtyId: "hridrog", note: "বুকে ব্যথা হলে দেরি না করে দ্রুত চিকিৎসা নিন" },
  "পেটে ব্যথা": { specialtyId: "medicine", note: "দীর্ঘস্থায়ী হলে গ্যাস্ট্রোএন্টেরোলজিস্ট দেখান" },
  "চর্মরোগ/চুলকানি": { specialtyId: "chormo", note: "চর্ম বিশেষজ্ঞের পরামর্শ নিন" },
  "দাঁতে ব্যথা": { specialtyId: "danto", note: "দ্রুত ডেন্টিস্ট দেখানো ভালো" },
  "চোখে সমস্যা": { specialtyId: "chokh", note: "চক্ষু বিশেষজ্ঞের সাথে কথা বলুন" },
  "শিশুর জ্বর/সর্দি": { specialtyId: "shishu", note: "শিশু বিশেষজ্ঞের পরামর্শ নিন" },
};

export default function SymptomChecker({ go }: { go: (v: "doctors") => void }) {
  const [selected, setSelected] = useState<string | null>(null);
  const result = selected ? symptomMap[selected] : null;
  const specialty = result ? specialties.find((s) => s.id === result.specialtyId) : null;

  return (
    <div className="mx-auto max-w-2xl px-5 py-10">
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold mb-2">হেলথ টুল</p>
      <h1 className="font-display text-4xl text-ink mb-3 flex items-center gap-3">
        <Stethoscope className="h-8 w-8 text-pine" strokeWidth={1.5} /> সিম্পটম চেকার
      </h1>
      <p className="text-ink/60 mb-8">আপনার প্রধান সমস্যা বেছে নিন — কোন বিশেষজ্ঞ দেখাবেন তার প্রাথমিক ধারণা পাবেন।</p>

      <div className="grid sm:grid-cols-2 gap-3">
        {Object.keys(symptomMap).map((s) => (
          <button
            key={s}
            onClick={() => setSelected(s)}
            className={`text-left border p-4 transition-colors ${
              selected === s ? "border-pine bg-pine/5 text-pine font-medium" : "border-line bg-cardbg text-ink/75 hover:border-pine/40"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {result && specialty && (
        <div className="mt-8 bg-cardbg border border-line perf-top pt-5">
          <div className="px-6 pb-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-gold mb-2">প্রাথমিক পরামর্শ</p>
            <p className="text-ink flex items-start gap-2 text-sm">
              <AlertCircle className="h-4 w-4 text-brick shrink-0 mt-0.5" strokeWidth={2} /> {result.note}
            </p>
            <button
              onClick={() => go("doctors")}
              className="mt-5 flex items-center gap-2 bg-pine text-paper px-4 py-2.5 text-sm font-medium hover:bg-pine-dark transition-colors"
            >
              {specialty.name} বিশেষজ্ঞ দেখুন <ArrowRight className="h-4 w-4" strokeWidth={2} />
            </button>
          </div>
        </div>
      )}

      <p className="mt-6 text-xs text-ink/40">
        এই টুল কোনো রোগ নির্ণয় করে না — শুধু কোন বিশেষজ্ঞের কাছে যাওয়া উচিত তার প্রাথমিক দিকনির্দেশনা দেয়। সমস্যা গুরুতর মনে হলে দ্রুত ডাক্তারের শরণাপন্ন হোন।
      </p>
    </div>
  );
}
