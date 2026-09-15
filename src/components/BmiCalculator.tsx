import { useState, useMemo } from "react";
import { Calculator } from "lucide-react";

export default function BmiCalculator() {
  const [height, setHeight] = useState("165");
  const [weight, setWeight] = useState("60");

  const { bmi, category, color } = useMemo(() => {
    const h = parseFloat(height) / 100;
    const w = parseFloat(weight);
    if (!h || !w) return { bmi: 0, category: "-", color: "text-ink/40" };
    const b = w / (h * h);
    let category = "স্বাভাবিক";
    let color = "text-pine";
    if (b < 18.5) { category = "কম ওজন"; color = "text-gold"; }
    else if (b >= 25 && b < 30) { category = "অতিরিক্ত ওজন"; color = "text-gold"; }
    else if (b >= 30) { category = "স্থূল"; color = "text-brick"; }
    return { bmi: b, category, color };
  }, [height, weight]);

  return (
    <div className="mx-auto max-w-2xl px-5 py-10">
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold mb-2">হেলথ টুল</p>
      <h1 className="font-display text-4xl text-ink mb-3 flex items-center gap-3">
        <Calculator className="h-8 w-8 text-pine" strokeWidth={1.5} /> BMI ক্যালকুলেটর
      </h1>
      <p className="text-ink/60 mb-8">উচ্চতা ও ওজন দিয়ে আপনার বডি মাস ইনডেক্স জেনে নিন।</p>

      <div className="bg-cardbg border border-line p-6 sm:p-8">
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="font-mono text-xs text-ink/50 uppercase tracking-wide">উচ্চতা (সেন্টিমিটার)</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full mt-1.5 border border-line px-3 py-2.5 text-sm outline-none focus:border-pine font-mono"
            />
          </div>
          <div>
            <label className="font-mono text-xs text-ink/50 uppercase tracking-wide">ওজন (কেজি)</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full mt-1.5 border border-line px-3 py-2.5 text-sm outline-none focus:border-pine font-mono"
            />
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-dashed border-line text-center">
          <p className="font-mono text-5xl text-ink num">{bmi ? bmi.toFixed(1) : "-"}</p>
          <p className={`mt-2 font-medium ${color}`}>{category}</p>
        </div>

        <div className="mt-6 grid grid-cols-4 gap-1 text-center font-mono text-[10px]">
          <div className="py-2 bg-gold/15 text-gold">{"< ১৮.৫"}<br/>কম</div>
          <div className="py-2 bg-pine/15 text-pine">১৮.৫-২৪.৯<br/>স্বাভাবিক</div>
          <div className="py-2 bg-gold/15 text-gold">২৫-২৯.৯<br/>বেশি</div>
          <div className="py-2 bg-brick/15 text-brick">{"৩০+"}<br/>স্থূল</div>
        </div>
      </div>

      <p className="mt-6 text-xs text-ink/40">
        এটি শুধুমাত্র একটি সাধারণ ধারণা দেয়। সঠিক স্বাস্থ্য মূল্যায়নের জন্য ডাক্তারের পরামর্শ নিন।
      </p>
    </div>
  );
}
