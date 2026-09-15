import { useState } from "react";
import { useAdmin } from "@/context/AdminContext";
import type { Generic } from "@/data";
import { Plus, Pencil, Trash2, Search, Pill } from "lucide-react";

export default function MedicineManager() {
  const { medicines, addMedicine, updateMedicine, deleteMedicine } = useAdmin();
  const [query, setQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Generic | null>(null);

  const [form, setForm] = useState<Generic>({
    id: "",
    name: "",
    class: "",
    brandCount: 1,
    uses: "",
  });

  const filtered = medicines.filter(
    (m) =>
      query.trim() === "" ||
      m.name.toLowerCase().includes(query.toLowerCase()) ||
      m.class.toLowerCase().includes(query.toLowerCase())
  );

  const openAdd = () => {
    setEditing(null);
    setForm({ id: Date.now().toString(), name: "", class: "", brandCount: 1, uses: "" });
    setShowForm(true);
  };

  const openEdit = (m: Generic) => {
    setEditing(m);
    setForm(m);
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    if (editing) updateMedicine(form);
    else addMedicine(form);
    setShowForm(false);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex items-center gap-2 border border-line px-3 py-2 flex-1 bg-cardbg">
          <Search className="h-4 w-4 text-ink/40 shrink-0" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ওষুধের নাম বা শ্রেণি দিয়ে খুঁজুন..."
            className="bg-transparent outline-none text-sm w-full"
          />
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-gold text-ink px-4 py-2 text-sm font-medium hover:bg-gold/90 transition-colors whitespace-nowrap"
        >
          <Plus className="h-4 w-4" /> নতুন ওষুধ যোগ
        </button>
      </div>

      <div className="border border-line bg-cardbg overflow-hidden">
        <div className="hidden sm:grid grid-cols-[1fr_150px_100px_120px] gap-2 px-4 py-2.5 bg-paper border-b border-line font-mono text-[10px] uppercase text-ink/45">
          <span>জেনেরিক নাম</span>
          <span>শ্রেণি</span>
          <span>ব্র্যান্ড সংখ্যা</span>
          <span className="text-right">অ্যাকশন</span>
        </div>

        {filtered.map((m) => (
          <div
            key={m.id}
            className="grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_150px_100px_120px] gap-2 px-4 py-3.5 border-b border-line last:border-b-0 items-center"
          >
            <div>
              <p className="font-medium text-sm text-ink flex items-center gap-2">
                <Pill className="h-4 w-4 text-gold shrink-0" /> {m.name}
              </p>
              <p className="text-xs text-ink/50 mt-0.5">{m.uses}</p>
            </div>
            <span className="hidden sm:block text-xs font-mono text-ink/60">{m.class}</span>
            <span className="hidden sm:block text-xs font-mono text-ink/60 num">{m.brandCount} টি</span>

            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => openEdit(m)}
                className="text-xs text-pine border border-pine/30 px-2.5 py-1 hover:bg-pine/5"
              >
                এডিট
              </button>
              <button
                onClick={() => deleteMedicine(m.id)}
                className="text-xs text-red-500 border border-red-200 px-2.5 py-1 hover:bg-red-50"
              >
                মুছুন
              </button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4">
          <div className="bg-cardbg border border-line w-full max-w-md p-6">
            <h3 className="font-display text-xl text-ink mb-4">{editing ? "ওষুধ এডিট" : "নতুন ওষুধ যোগ"}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="font-mono text-xs text-ink/60 block mb-1">জেনেরিক নাম *</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="যেমন: প্যারাসিটামল"
                  className="w-full border border-line px-3 py-2 text-sm outline-none focus:border-pine"
                />
              </div>
              <div>
                <label className="font-mono text-xs text-ink/60 block mb-1">শ্রেণি *</label>
                <input
                  required
                  value={form.class}
                  onChange={(e) => setForm({ ...form, class: e.target.value })}
                  placeholder="যেমন: ব্যথা ও জ্বরনাশক"
                  className="w-full border border-line px-3 py-2 text-sm outline-none focus:border-pine"
                />
              </div>
              <div>
                <label className="font-mono text-xs text-ink/60 block mb-1">ব্র্যান্ড সংখ্যা</label>
                <input
                  type="number"
                  value={form.brandCount}
                  onChange={(e) => setForm({ ...form, brandCount: Number(e.target.value) })}
                  className="w-full border border-line px-3 py-2 text-sm outline-none focus:border-pine"
                />
              </div>
              <div>
                <label className="font-mono text-xs text-ink/60 block mb-1">ব্যবহার / বিবরণ</label>
                <textarea
                  rows={2}
                  value={form.uses}
                  onChange={(e) => setForm({ ...form, uses: e.target.value })}
                  placeholder="ব্যবহারবিধি সংক্ষেপে লিখুন"
                  className="w-full border border-line px-3 py-2 text-sm outline-none focus:border-pine resize-none"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 border border-line py-2 text-sm text-ink/60"
                >
                  বাতিল
                </button>
                <button type="submit" className="flex-1 bg-pine text-paper py-2 text-sm font-medium">
                  সংরক্ষণ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
