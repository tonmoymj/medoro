import { useState } from "react";
import { MessageCircleQuestion, Send } from "lucide-react";
import { questions } from "@/data";

export default function Community() {
  const [sent, setSent] = useState(false);

  return (
    <div className="mx-auto max-w-3xl px-5 py-10">
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold mb-2">কমিউনিটি</p>
      <h1 className="font-display text-4xl text-ink mb-3">প্রশ্ন করুন, উত্তর পান</h1>
      <p className="text-ink/60 max-w-xl mb-8">সাধারণ স্বাস্থ্য বিষয়ক প্রশ্ন করুন — আমাদের নেটওয়ার্কের ডাক্তারগণ উত্তর দেওয়ার চেষ্টা করবেন। এটি জরুরি বা গুরুতর সমস্যার বিকল্প নয়।</p>

      <form
        onSubmit={(e) => { e.preventDefault(); setSent(true); }}
        className="bg-cardbg border border-line p-5 mb-10 flex gap-3"
      >
        {sent ? (
          <p className="text-pine text-sm">প্রশ্ন জমা হয়েছে, ধন্যবাদ!</p>
        ) : (
          <>
            <input
              required
              placeholder="আপনার প্রশ্ন লিখুন..."
              className="flex-1 outline-none text-sm placeholder:text-ink/40"
            />
            <button type="submit" className="flex items-center gap-1.5 bg-gold text-ink px-4 py-2 text-sm font-medium shrink-0">
              <Send className="h-3.5 w-3.5" strokeWidth={2} /> জিজ্ঞাসা করুন
            </button>
          </>
        )}
      </form>

      <div className="divide-y divide-line border-t border-b border-line">
        {questions.map((q) => (
          <button key={q.id} className="w-full text-left py-5 hover:bg-pine/5 px-3 -mx-3 transition-colors flex items-start gap-3">
            <MessageCircleQuestion className="h-5 w-5 text-gold shrink-0 mt-0.5" strokeWidth={1.75} />
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-gold mb-1">{q.category}</p>
              <h3 className="text-ink text-[15px]">{q.question}</h3>
              <p className="text-xs text-ink/45 mt-1.5 font-mono">{q.time} &middot; {q.answers} টি উত্তর</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
