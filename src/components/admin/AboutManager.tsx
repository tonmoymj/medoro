import { useState } from "react";
import { useAdmin } from "@/context/AdminContext";
import type { AboutInfo } from "@/data";
import { Info, Save, Plus, Trash2 } from "lucide-react";

export default function AboutManager() {
  const { aboutInfo, updateAboutInfo } = useAdmin();
  const [info, setInfo] = useState<AboutInfo>(aboutInfo);
  const [savedMsg, setSavedMsg] = useState(false);

  const handlePointChange = (idx: number, field: "title" | "body", val: string) => {
    const updated = [...info.points];
    updated[idx] = { ...updated[idx], [field]: val };
    setInfo({ ...info, points: updated });
  };

  const addPoint = () => {
    setInfo({
      ...info,
      points: [...info.points, { iconName: "ShieldCheck", title: "নতুন সেবা", body: "বিবরণ লিখুন" }],
    });
  };

  const removePoint = (idx: number) => {
    setInfo({ ...info, points: info.points.filter((_, i) => i !== idx) });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateAboutInfo(info);
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 2500);
  };

  return (
    <div className="bg-cardbg border border-line p-6 max-w-3xl">
      <div className="flex items-center justify-between border-b border-line pb-4 mb-6">
        <div>
          <h2 className="font-display text-2xl text-ink">আমাদের সম্পর্কে (About Us) কনফিগারেশন</h2>
          <p className="text-xs font-mono text-ink/50 mt-1">আমাদের সম্পর্কে পেজের হেডলাইন ও পয়েন্ট ম্যানেজ করুন</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="font-mono text-xs text-ink/60 uppercase block mb-1">প্রধান শিরোনাম (Headline) *</label>
          <input
            required
            value={info.headline}
            onChange={(e) => setInfo({ ...info, headline: e.target.value })}
            className="w-full border border-line px-3.5 py-2.5 text-sm outline-none focus:border-pine"
          />
        </div>

        <div>
          <label className="font-mono text-xs text-ink/60 uppercase block mb-1">মূল বিবরণ (Description) *</label>
          <textarea
            rows={3}
            required
            value={info.description}
            onChange={(e) => setInfo({ ...info, description: e.target.value })}
            className="w-full border border-line px-3.5 py-2.5 text-sm outline-none focus:border-pine resize-none"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="font-mono text-xs uppercase text-gold font-bold">আমাদের বৈশিষ্ট্য/পয়েন্টসমূহ ({info.points.length})</p>
            <button
              type="button"
              onClick={addPoint}
              className="text-xs font-mono bg-gold/10 text-ink border border-gold/30 px-3 py-1 flex items-center gap-1 hover:bg-gold/20"
            >
              <Plus className="h-3.5 w-3.5" /> নতুন পয়েন্ট
            </button>
          </div>

          <div className="space-y-4">
            {info.points.map((pt, i) => (
              <div key={i} className="bg-paper p-4 border border-line/70 relative">
                <button
                  type="button"
                  onClick={() => removePoint(i)}
                  className="absolute top-3 right-3 text-red-400 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
                <div className="space-y-3 pr-8">
                  <div>
                    <label className="font-mono text-[10px] uppercase text-ink/50 block mb-1">পয়েন্ট শিরোনাম</label>
                    <input
                      value={pt.title}
                      onChange={(e) => handlePointChange(i, "title", e.target.value)}
                      className="w-full border border-line px-3 py-1.5 text-sm bg-cardbg outline-none focus:border-pine"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-[10px] uppercase text-ink/50 block mb-1">পয়েন্ট বিবরণ</label>
                    <textarea
                      rows={2}
                      value={pt.body}
                      onChange={(e) => handlePointChange(i, "body", e.target.value)}
                      className="w-full border border-line px-3 py-1.5 text-sm bg-cardbg outline-none focus:border-pine resize-none"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {savedMsg && (
          <p className="text-sm font-mono text-pine bg-pine/10 border border-pine/30 px-4 py-2">
            ✓ সফলভাবে আমাদের সম্পর্কে পেজের তথ্য আপডেট করা হয়েছে!
          </p>
        )}

        <button
          type="submit"
          className="flex items-center gap-2 bg-pine text-paper px-6 py-3 font-medium text-sm hover:bg-pine/90 transition-colors shadow-md"
        >
          <Save className="h-4 w-4" /> সেভ করুন
        </button>
      </form>
    </div>
  );
}
