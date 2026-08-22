import { useState, useMemo } from "react";
import { Search, Pill } from "lucide-react";
import { generics } from "@/data";
import AdSlot from "@/components/AdSlot";

export default function Medicines() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(
    () => generics.filter((g) => g.name.includes(query) || g.class.includes(query)),
    [query]
  );

  return (
    <div className="mx-auto max-w-4xl px-5 py-10">
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold mb-2">মেডিসিন ডিরেক্টরি</p>
      <h1 className="font-display text-4xl text-ink mb-3">জেনেরিক ওষুধের তালিকা</h1>
      <p className="text-ink/60 max-w-xl mb-8">জেনেরিক নাম, শ্রেণি ও ব্যবহার দেখুন — প্রতিটির সাথে কতগুলো ব্র্যান্ড পাওয়া যায় তাও উল্লেখ আছে।</p>

      <div className="bg-white border border-line flex items-center gap-3 px-4 py-3.5 mb-8 max-w-lg">
        <Search className="h-5 w-5 text-ink/40 shrink-0" strokeWidth={2} />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="জেনেরিক নাম বা শ্রেণি লিখুন..."
          className="w-full bg-transparent outline-none text-[15px] placeholder:text-ink/40"
        />
      </div>

      <div className="mb-8">
        <AdSlot variant="card" label="ফার্মাসিউটিক্যাল কোম্পানির ব্র্যান্ড স্পনসরশিপ — নির্দিষ্ট জেনেরিক ক্যাটাগরিতে টার্গেটেড" />
      </div>

      <div className="divide-y divide-line border-t border-b border-line">
        {filtered.map((g) => (
          <div key={g.id} className="py-5 flex items-start gap-4">
            <Pill className="h-5 w-5 text-gold shrink-0 mt-1" strokeWidth={1.75} />
            <div className="flex-1">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-display text-xl text-ink">{g.name}</h3>
                <span className="font-mono text-xs text-ink/45 num shrink-0">{g.brandCount} ব্র্যান্ড</span>
              </div>
              <p className="text-xs font-mono text-gold mt-1">{g.class}</p>
              <p className="text-sm text-ink/60 mt-1.5">{g.uses}</p>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-ink/50 text-sm py-10 text-center">কোনো ওষুধ পাওয়া যায়নি।</p>
        )}
      </div>
    </div>
  );
}
