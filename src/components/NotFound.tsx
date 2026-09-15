import { FileQuestion, Home, Search } from "lucide-react";

type View = "home" | "doctors";

export default function NotFound({ go }: { go: (v: View) => void }) {
  return (
    <div className="mx-auto max-w-lg px-5 py-24 text-center">
      <div className="mx-auto h-20 w-20 border border-line bg-cardbg flex items-center justify-center mb-6">
        <FileQuestion className="h-9 w-9 text-gold" strokeWidth={1.5} />
      </div>
      <p className="font-mono text-6xl text-ink/15 mb-2 num">৪০৪</p>
      <h1 className="font-display text-3xl text-ink mb-3">পেজটি খুঁজে পাওয়া যায়নি</h1>
      <p className="text-ink/55 mb-8">
        আপনি যে পেজটি খুঁজছেন সেটি হয়তো সরিয়ে ফেলা হয়েছে, অথবা লিংকটি সঠিক নয়।
      </p>
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={() => go("home")}
          className="flex items-center gap-2 bg-pine text-paper px-5 py-2.5 text-sm font-medium hover:bg-pine-dark transition-colors"
        >
          <Home className="h-4 w-4" strokeWidth={2} /> হোমপেজে ফিরুন
        </button>
        <button
          onClick={() => go("doctors")}
          className="flex items-center gap-2 border border-line bg-cardbg px-5 py-2.5 text-sm font-medium text-ink hover:border-pine transition-colors"
        >
          <Search className="h-4 w-4" strokeWidth={2} /> ডাক্তার খুঁজুন
        </button>
      </div>
    </div>
  );
}
