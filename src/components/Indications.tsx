import { indications, generics } from "@/data";
import { ClipboardList } from "lucide-react";

export default function Indications() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-10">
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold mb-2">মেডিসিন ডিরেক্টরি</p>
      <h1 className="font-display text-4xl text-ink mb-3 flex items-center gap-3">
        <ClipboardList className="h-8 w-8 text-pine" strokeWidth={1.5} /> রোগ অনুযায়ী নির্দেশিকা
      </h1>
      <p className="text-ink/60 max-w-xl mb-8">সাধারণ সমস্যাগুলোর জন্য কোন বিশেষজ্ঞ ও কোন ধরনের ওষুধ ব্যবহৃত হয় তার প্রাথমিক ধারণা।</p>

      <div className="divide-y divide-line border-t border-b border-line">
        {indications.map((ind) => (
          <div key={ind.id} className="py-5">
            <h3 className="font-display text-xl text-ink">{ind.name}</h3>
            <p className="text-xs font-mono text-gold mt-1">সংশ্লিষ্ট বিশেষজ্ঞ: {ind.specialty}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {ind.genericIds.map((gid) => {
                const g = generics.find((x) => x.id === gid);
                if (!g) return null;
                return (
                  <span key={gid} className="text-xs font-mono bg-pine/5 text-pine px-2.5 py-1.5 border border-pine/15">
                    {g.name}
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-6 text-xs text-ink/40">
        এই তথ্য শুধুমাত্র সাধারণ ধারণার জন্য — কোনো ওষুধ ডাক্তারের পরামর্শ ছাড়া গ্রহণ করবেন না।
      </p>
    </div>
  );
}
