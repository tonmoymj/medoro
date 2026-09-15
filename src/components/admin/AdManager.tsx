import { useState, useRef } from "react";
import { useAdmin, type AdSlotData } from "@/context/AdminContext";
import { Megaphone, CheckCircle2, XCircle, Camera, Link, Building, Edit3, Trash2 } from "lucide-react";

export default function AdManager() {
  const { ads, updateAdSlot } = useAdmin();
  const [editingAd, setEditingAd] = useState<AdSlotData | null>(null);
  const [photoError, setPhotoError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const occupiedCount = ads.filter((a) => a.isOccupied).length;
  const vacantCount = ads.length - occupiedCount;

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhotoError("");
    const file = e.target.files?.[0];
    if (!file || !editingAd) return;
    if (file.size > 5 * 1024 * 1024) {
      setPhotoError("ছবির আকার ৫ MB-এর বেশি হওয়া যাবে না।");
      return;
    }

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `ads/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

      const { data: uploadData, error: uploadErr } = await (await import("@/lib/supabase")).supabase
        .storage
        .from("doctor-photos")
        .upload(fileName, file);

      if (!uploadErr && uploadData) {
        const { data: urlData } = (await import("@/lib/supabase")).supabase
          .storage
          .from("doctor-photos")
          .getPublicUrl(fileName);

        if (urlData?.publicUrl) {
          setEditingAd((prev) => (prev ? { ...prev, bannerImage: urlData.publicUrl } : null));
          return;
        }
      }
    } catch (err) {
      console.warn("Storage upload fallback:", err);
    }

    const reader = new FileReader();
    reader.onload = (ev) => {
      setEditingAd((prev) => (prev ? { ...prev, bannerImage: ev.target?.result as string } : null));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (editingAd) {
      updateAdSlot(editingAd);
      setEditingAd(null);
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 bg-paper p-4 border border-line">
        <div>
          <h2 className="font-display text-xl text-ink">বিজ্ঞাপন স্পট ও স্পনসরশিপ ড্যাশবোর্ড</h2>
          <p className="text-xs text-ink/60 font-mono mt-1">ওয়েবসাইটের কোথায় বিজ্ঞাপন ফাঁকা আছে বা বুক করা আছে তা ম্যানেজ করুন</p>
        </div>
        <div className="flex gap-3 font-mono text-xs">
          <span className="bg-red-50 text-red-600 border border-red-200 px-3 py-1.5 flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-red-500" />
            বুকড / ফুল: <strong className="font-bold">{occupiedCount}</strong> টি
          </span>
          <span className="bg-pine/10 text-pine border border-pine/20 px-3 py-1.5 flex items-center gap-1.5">
            <XCircle className="h-4 w-4 text-pine" />
            ফাঁকা / ফাঁকা স্পট: <strong className="font-bold">{vacantCount}</strong> টি
          </span>
        </div>
      </div>

      {/* Ad Slots List Grid */}
      <div className="grid md:grid-cols-2 gap-5">
        {ads.map((ad) => (
          <div key={ad.id} className="bg-cardbg border border-line p-5 flex flex-col justify-between shadow-sm relative overflow-hidden">
            <div className={`h-1.5 w-full absolute top-0 left-0 ${ad.isOccupied ? "bg-red-500" : "bg-emerald-500"}`} />

            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="font-mono text-[11px] text-gold uppercase tracking-wider">{ad.location}</span>
                <span className={`font-mono text-[10px] px-2 py-0.5 border ${
                  ad.isOccupied 
                    ? "bg-red-50 text-red-600 border-red-200 font-bold" 
                    : "bg-emerald-50 text-emerald-700 border-emerald-200 font-bold"
                }`}>
                  {ad.isOccupied ? "● ফুল (বুকড)" : "○ ফাঁকা (Available)"}
                </span>
              </div>

              <h3 className="font-display text-lg text-ink mb-1">{ad.placementName}</h3>

              {ad.isOccupied ? (
                <div className="mt-3 bg-paper p-3 border border-line/70 text-xs font-mono space-y-1.5">
                  <p className="flex items-center gap-1.5 text-pine font-semibold">
                    <Building className="h-3.5 w-3.5" /> স্পনসর: {ad.sponsorName || "অনির্ধারিত স্পনসর"}
                  </p>
                  {ad.linkUrl && (
                    <p className="flex items-center gap-1.5 text-ink/60 truncate">
                      <Link className="h-3.5 w-3.5" /> লিংক: {ad.linkUrl}
                    </p>
                  )}
                  {ad.bannerImage && (
                    <div className="mt-2 h-16 w-full overflow-hidden border border-line">
                      <img src={ad.bannerImage} alt="Banner" className="h-full w-full object-cover" />
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-xs text-ink/40 font-mono italic mt-2">
                  "বিজ্ঞাপন স্পটটি ফাঁকা রয়েছে। নতুন স্পনসর যুক্ত করতে এডিট করুন।"
                </p>
              )}
            </div>

            <div className="mt-5 pt-3 border-t border-line flex items-center justify-between">
              <button
                onClick={() => setEditingAd(ad)}
                className="flex items-center gap-1.5 text-xs font-mono text-pine border border-pine/30 px-3 py-1.5 hover:bg-pine/5 transition-colors"
              >
                <Edit3 className="h-3.5 w-3.5" /> অ্যাড স্পট কনফিগার / এডিট
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingAd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4">
          <div className="bg-cardbg border border-line w-full max-w-lg p-6 overflow-y-auto max-h-[90vh]">
            <div className="flex items-center justify-between border-b border-line pb-3 mb-4">
              <h3 className="font-display text-xl text-ink">এড স্পট কনফিগারেশন</h3>
              <button onClick={() => setEditingAd(null)} className="text-ink/50 hover:text-ink">✕</button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="font-mono text-xs text-ink/60 uppercase block mb-1">প্লেসমেন্ট নাম</label>
                <input disabled value={editingAd.placementName} className="w-full bg-paper border border-line px-3 py-2 text-sm text-ink/60" />
              </div>

              <div className="flex items-center gap-3 bg-paper p-3 border border-line">
                <input
                  type="checkbox"
                  id="isOccupied"
                  checked={editingAd.isOccupied}
                  onChange={(e) => setEditingAd({ ...editingAd, isOccupied: e.target.checked })}
                  className="h-4 w-4 accent-pine cursor-pointer"
                />
                <label htmlFor="isOccupied" className="font-mono text-xs text-ink cursor-pointer font-bold">
                  এই এড স্পটটি বুকড / ফুল (Occupied) হিসাবে দেখান
                </label>
              </div>

              {editingAd.isOccupied && (
                <>
                  <div>
                    <label className="font-mono text-xs text-ink/60 uppercase block mb-1">স্পনসর কোম্পানির নাম *</label>
                    <input
                      value={editingAd.sponsorName || ""}
                      onChange={(e) => setEditingAd({ ...editingAd, sponsorName: e.target.value })}
                      placeholder="যেমন: স্কয়ার ফার্মাসিউটিক্যালস"
                      className="w-full border border-line px-3 py-2 text-sm outline-none focus:border-pine"
                    />
                  </div>

                  <div>
                    <label className="font-mono text-xs text-ink/60 uppercase block mb-1">ল্যান্ডিং পেজ বা প্রমোশনাল লিংক (URL)</label>
                    <input
                      value={editingAd.linkUrl || ""}
                      onChange={(e) => setEditingAd({ ...editingAd, linkUrl: e.target.value })}
                      placeholder="https://example.com/promo"
                      className="w-full border border-line px-3 py-2 text-sm outline-none focus:border-pine"
                    />
                  </div>

                  <div>
                    <label className="font-mono text-xs text-ink/60 uppercase block mb-1">বিজ্ঞাপন ব্যানার ইমেজ (Banner Image)</label>
                    <div className="flex items-center gap-4">
                      {editingAd.bannerImage && (
                        <div className="h-16 w-24 shrink-0 border border-line overflow-hidden">
                          <img src={editingAd.bannerImage} alt="Banner" className="h-full w-full object-cover" />
                        </div>
                      )}
                      <div>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handlePhotoUpload}
                        />
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="flex items-center gap-1.5 border border-line px-3 py-1.5 text-xs text-ink/70 hover:border-pine"
                        >
                          <Camera className="h-3.5 w-3.5" /> ছবি আপলোড করুন
                        </button>
                        {editingAd.bannerImage && (
                          <button
                            type="button"
                            onClick={() => setEditingAd({ ...editingAd, bannerImage: undefined })}
                            className="text-xs text-red-500 hover:underline mt-1 block"
                          >
                            ছবি মুছুন
                          </button>
                        )}
                      </div>
                    </div>
                    {photoError && <p className="text-xs text-red-500 mt-1">{photoError}</p>}
                  </div>
                </>
              )}

              <div>
                <label className="font-mono text-xs text-ink/60 uppercase block mb-1">প্লেসহোল্ডার টেক্সট (ফাঁকা থাকাকালীন বার বার্তা)</label>
                <input
                  value={editingAd.labelText || ""}
                  onChange={(e) => setEditingAd({ ...editingAd, labelText: e.target.value })}
                  placeholder="যেমন: ডায়াগনস্টিক সেন্টারের স্পনসরড বিজ্ঞাপন"
                  className="w-full border border-line px-3 py-2 text-sm outline-none focus:border-pine"
                />
              </div>

              <div className="flex gap-3 pt-4 border-t border-line">
                <button
                  onClick={() => setEditingAd(null)}
                  className="flex-1 border border-line py-2 text-sm text-ink/60 hover:bg-paper"
                >
                  বাতিল
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 bg-pine text-paper py-2 text-sm font-medium hover:bg-pine/90"
                >
                  সংরক্ষণ করুন
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
