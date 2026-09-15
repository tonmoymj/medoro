import { ArrowRight, Clock } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";

export default function Blog() {
  const { articles } = useAdmin();
  return (
    <div className="mx-auto max-w-4xl px-5 py-10">
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold mb-2">স্বাস্থ্য জার্নাল</p>
      <h1 className="font-display text-4xl text-ink mb-3">সহজ ভাষায় স্বাস্থ্যকথা</h1>
      <p className="text-ink/60 max-w-xl mb-10">
        স্থানীয় বিশেষজ্ঞ ডাক্তারদের পরামর্শ নিয়ে লেখা, যা আপনাকে সিদ্ধান্ত নিতে সাহায্য করবে — চিকিৎসকের পরামর্শের বিকল্প নয়।
      </p>

      <div className="divide-y divide-line border-t border-b border-line">
        {articles.map((a) => (
          <button
            key={a.id}
            className="w-full text-left py-7 px-3 -mx-3 hover:bg-pine/5 transition-colors flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-8"
          >
            <div className="flex-1">
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-gold mb-2">{a.category}</p>
              <h2 className="font-display text-2xl text-ink">{a.title}</h2>
              <p className="text-sm text-ink/60 mt-2 max-w-xl leading-relaxed">{a.excerpt}</p>
              <div className="mt-4 flex items-center gap-4 font-mono text-xs text-ink/40">
                <span>{a.date}</span>
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" strokeWidth={2} /> {a.readTime}</span>
              </div>
            </div>
            <ArrowRight className="hidden sm:block h-5 w-5 text-ink/30 shrink-0" strokeWidth={2} />
          </button>
        ))}
      </div>
    </div>
  );
}
