import { ShieldCheck, MapPin, Users, BookOpen } from "lucide-react";

export default function About() {
  const points = [
    {
      icon: ShieldCheck,
      title: "যাচাইকৃত তথ্য",
      body: "প্রতিটি ডাক্তার ও হাসপাতালের তথ্য আমাদের ফিল্ড টিম সরাসরি যোগাযোগ করে যাচাই করে, তারপর তালিকাভুক্ত করে।",
    },
    {
      icon: MapPin,
      title: "রাজশাহী থেকে শুরু",
      body: "আমরা একটি এলাকায় গভীরভাবে কাজ করে শুরু করছি, যাতে তথ্যের নির্ভরযোগ্যতা বজায় থাকে — তারপর ধাপে ধাপে অন্য বিভাগে ছড়িয়ে যাব।",
    },
    {
      icon: Users,
      title: "সবার জন্য বিনামূল্যে",
      body: "রোগী হিসেবে ডাক্তার খোঁজা, চেম্বারের তথ্য দেখা — এই প্ল্যাটফর্মে সবসময় সম্পূর্ণ বিনামূল্যে থাকবে।",
    },
    {
      icon: BookOpen,
      title: "স্বাস্থ্য শিক্ষা",
      body: "ডাক্তারদের পরামর্শ নিয়ে সহজ ভাষায় স্বাস্থ্য বিষয়ক লেখা প্রকাশ করি, যাতে মানুষ প্রাথমিক সিদ্ধান্ত নিজেই নিতে পারে।",
    },
  ];

  return (
    <div className="mx-auto max-w-4xl px-5 py-10">
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold mb-2">আমাদের কথা</p>
      <h1 className="font-display text-4xl sm:text-5xl text-ink leading-tight mb-6">
        একটা সহজ প্রশ্ন থেকে <br className="hidden sm:block" />
        <em className="not-italic text-pine">Medoro</em>-র শুরু।
      </h1>
      <p className="text-lg text-ink/70 leading-relaxed max-w-2xl">
        "কোন ডাক্তার কখন বসেন, কোথায় বসেন" — এই সাধারণ প্রশ্নের উত্তর খুঁজতে
        আমাদের অনেককেই আত্মীয়-স্বজনকে ফোন করতে হয়, ফেসবুক গ্রুপে পোস্ট দিতে হয়।
        Medoro বানানো হয়েছে এই ঝামেলা দূর করতে — নির্ভরযোগ্য, হালনাগাদ তথ্য
        এক জায়গায়।
      </p>

      <div className="mt-12 grid sm:grid-cols-2 gap-6">
        {points.map((p) => (
          <div key={p.title} className="bg-white border border-line p-6">
            <p.icon className="h-6 w-6 text-gold" strokeWidth={1.75} />
            <h3 className="font-display text-xl text-ink mt-4">{p.title}</h3>
            <p className="text-sm text-ink/60 mt-2 leading-relaxed">{p.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-14 border-t border-line pt-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold mb-4">আমাদের যাত্রা</p>
        <div className="space-y-0">
          {[
            { year: "২০২৬", label: "রাজশাহী বিভাগে যাত্রা শুরু" },
            { year: "২০২৭ (লক্ষ্য)", label: "রংপুর ও খুলনা বিভাগে সম্প্রসারণ" },
            { year: "২০২৮ (লক্ষ্য)", label: "দেশব্যাপী সব জেলায় উপস্থিতি" },
          ].map((t, i) => (
            <div key={t.year} className={`flex gap-6 py-4 ${i !== 0 ? "border-t border-dashed border-line" : ""}`}>
              <span className="font-mono text-sm text-pine w-32 shrink-0">{t.year}</span>
              <span className="text-ink/75">{t.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
