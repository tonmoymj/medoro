import { useState } from "react";
import { HelpCircle, ChevronDown } from "lucide-react";
import { faqTerms } from "@/data";

export default function Faq() {
  const [open, setOpen] = useState<string | null>(faqTerms[0]?.id ?? null);

  return (
    <div className="mx-auto max-w-3xl px-5 py-10">
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold mb-2">সহায়িকা</p>
      <h1 className="font-display text-4xl text-ink mb-3 flex items-center gap-3">
        <HelpCircle className="h-8 w-8 text-pine" strokeWidth={1.5} /> শব্দকোষ ও প্রশ্নোত্তর
      </h1>
      <p className="text-ink/60 max-w-xl mb-8">চিকিৎসা সংক্রান্ত সাধারণ শব্দগুলো সহজ ভাষায় বুঝে নিন।</p>

      <div className="border-t border-line">
        {faqTerms.map((f) => (
          <div key={f.id} className="border-b border-line">
            <button
              onClick={() => setOpen(open === f.id ? null : f.id)}
              className="w-full flex items-center justify-between py-4 text-left"
            >
              <span className="font-display text-lg text-ink">{f.term}</span>
              <ChevronDown className={`h-4 w-4 text-ink/40 transition-transform ${open === f.id ? "rotate-180" : ""}`} strokeWidth={2} />
            </button>
            {open === f.id && <p className="text-sm text-ink/60 pb-4 leading-relaxed">{f.explanation}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
