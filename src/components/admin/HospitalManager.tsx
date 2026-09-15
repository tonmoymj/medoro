import { useState } from "react";
import { Plus, Pencil, Trash2, Search, AlertTriangle } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";
import type { Hospital } from "@/data";
import HospitalForm from "@/components/admin/HospitalForm";

export default function HospitalManager() {
  const { hospitals, deleteHospital } = useAdmin();
  const [query, setQuery]             = useState("");
  const [showForm, setShowForm]       = useState(false);
  const [editing, setEditing]         = useState<Hospital | null>(null);
  const [confirmId, setConfirmId]     = useState<string | null>(null);

  const filtered = hospitals.filter(h =>
    query.trim() === "" ||
    h.name.toLowerCase().includes(query.toLowerCase()) ||
    h.type.toLowerCase().includes(query.toLowerCase()) ||
    h.area.toLowerCase().includes(query.toLowerCase())
  );

  const openAdd   = () => { setEditing(null);  setShowForm(true); };
  const openEdit  = (h: Hospital) => { setEditing(h); setShowForm(true); };
  const closeForm = () => { setShowForm(false); setEditing(null); };

  const doDelete = () => { if (confirmId) { deleteHospital(confirmId); setConfirmId(null); } };

  return (
    <div>
      {/* toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex items-center gap-2 border border-line px-3 py-2 flex-1">
          <Search className="h-4 w-4 text-ink/40 shrink-0" strokeWidth={2} />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="নাম, ধরন বা এলাকা দিয়ে খুঁজুন..."
            className="bg-transparent outline-none text-sm placeholder:text-ink/40 w-full"
          />
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-gold text-ink px-4 py-2 text-sm font-medium hover:bg-gold/90 transition-colors whitespace-nowrap"
        >
          <Plus className="h-4 w-4" strokeWidth={2} /> নতুন হাসপাতাল
        </button>
      </div>

      <p className="font-mono text-xs text-ink/40 mb-3">{filtered.length} টি হাসপাতাল</p>

      {/* table */}
      <div className="border border-line overflow-hidden">
        <div className="hidden sm:grid grid-cols-[1fr_130px_100px_80px_100px] gap-2 px-4 py-2.5 bg-paper border-b border-line font-mono text-[10px] uppercase tracking-wide text-ink/45">
          <span>নাম</span>
          <span>ধরন</span>
          <span>এলাকা</span>
          <span>ডাক্তার</span>
          <span className="text-right">অ্যাকশন</span>
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-sm text-ink/45 py-10">কোনো হাসপাতাল পাওয়া যায়নি।</p>
        )}

        {filtered.map(h => (
          <div
            key={h.id}
            className="grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_130px_100px_80px_100px] gap-2 px-4 py-3.5 border-b border-line last:border-b-0 items-center"
          >
            <div>
              <p className="font-medium text-sm text-ink">{h.name}</p>
              <p className="text-xs text-ink/50 font-mono mt-0.5">{h.phone}</p>
            </div>
            <span className="hidden sm:block text-xs text-ink/55 truncate">{h.type}</span>
            <span className="hidden sm:block text-xs text-ink/55 truncate">{h.area}</span>
            <span className="hidden sm:block text-xs font-mono text-ink/55 num">{h.doctorCount} জন</span>

            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => openEdit(h)}
                className="flex items-center gap-1 text-xs text-pine border border-pine/30 px-2.5 py-1.5 hover:bg-pine/5 transition-colors"
              >
                <Pencil className="h-3 w-3" strokeWidth={2} /> সম্পাদনা
              </button>
              <button
                onClick={() => setConfirmId(h.id)}
                className="flex items-center gap-1 text-xs text-red-500 border border-red-200 px-2.5 py-1.5 hover:bg-red-50 transition-colors"
              >
                <Trash2 className="h-3 w-3" strokeWidth={2} /> মুছুন
              </button>
            </div>
          </div>
        ))}
      </div>

      {showForm && <HospitalForm initial={editing} onClose={closeForm} />}

      {confirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 px-4">
          <div className="bg-cardbg border border-line w-full max-w-sm p-6">
            <div className="flex items-start gap-3 mb-5">
              <AlertTriangle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" strokeWidth={2} />
              <div>
                <p className="font-medium text-ink">হাসপাতাল মুছে ফেলবেন?</p>
                <p className="text-sm text-ink/55 mt-1">এই তথ্য স্থায়ীভাবে মুছে যাবে।</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setConfirmId(null)}
                className="flex-1 border border-line py-2 text-sm text-ink/60 hover:bg-line/30 transition-colors">
                বাতিল
              </button>
              <button onClick={doDelete}
                className="flex-1 bg-red-500 text-white py-2 text-sm font-medium hover:bg-red-600 transition-colors">
                হ্যাঁ, মুছুন
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
