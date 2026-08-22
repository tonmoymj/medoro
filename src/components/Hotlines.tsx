import { Phone } from "lucide-react";
import { hotlines } from "@/data";

export default function Hotlines() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-10">
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold mb-2">জরুরি সেবা</p>
      <h1 className="font-display text-4xl text-ink mb-8">জরুরি হটলাইন নম্বর</h1>

      <div className="grid sm:grid-cols-2 gap-4">
        {hotlines.map((h) => (
          <a
            key={h.id}
            href={`tel:${h.number}`}
            className="flex items-center justify-between bg-white border border-line p-5 hover:border-brick transition-colors"
          >
            <span className="text-ink font-medium">{h.name}</span>
            <span className="flex items-center gap-2 font-mono text-lg text-brick">
              <Phone className="h-4 w-4" strokeWidth={2} /> {h.number}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
