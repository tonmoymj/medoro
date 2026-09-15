import { useState } from "react";
import { useAdmin } from "@/context/AdminContext";
import type { Article } from "@/data";
import { Plus, Pencil, Trash2, BookOpen } from "lucide-react";

export default function ArticleManager() {
  const { articles, addArticle, updateArticle, deleteArticle } = useAdmin();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Article | null>(null);

  const [form, setForm] = useState<Article>({
    id: "",
    title: "",
    excerpt: "",
    category: "",
    date: "",
    readTime: "",
  });

  const openAdd = () => {
    setEditing(null);
    setForm({
      id: Date.now().toString(),
      title: "",
      excerpt: "",
      category: "মেডিসিন",
      date: new Date().toLocaleDateString("bn-BD"),
      readTime: "৫ মিনিট",
    });
    setShowForm(true);
  };

  const openEdit = (a: Article) => {
    setEditing(a);
    setForm(a);
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    if (editing) updateArticle(form);
    else addArticle(form);
    setShowForm(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-display text-xl text-ink">স্বাস্থ্যকথা আর্টিকেল সমূহ ({articles.length})</h2>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-gold text-ink px-4 py-2 text-sm font-medium hover:bg-gold/90 transition-colors"
        >
          <Plus className="h-4 w-4" /> নতুন আর্টিকেল যোগ
        </button>
      </div>

      <div className="space-y-4">
        {articles.map((a) => (
          <div key={a.id} className="bg-cardbg border border-line p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="font-mono text-[10px] uppercase text-gold bg-gold/10 px-2 py-0.5 border border-gold/20">{a.category}</span>
              <h3 className="font-display text-lg text-ink mt-1">{a.title}</h3>
              <p className="text-xs text-ink/60 mt-1 line-clamp-2">{a.excerpt}</p>
              <p className="text-[11px] font-mono text-ink/40 mt-2">{a.date} &middot; {a.readTime}</p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button onClick={() => openEdit(a)} className="text-xs text-pine border border-pine/30 px-3 py-1.5 hover:bg-pine/5">
                এডিট
              </button>
              <button onClick={() => deleteArticle(a.id)} className="text-xs text-red-500 border border-red-200 px-3 py-1.5 hover:bg-red-50">
                মুছুন
              </button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4">
          <div className="bg-cardbg border border-line w-full max-w-lg p-6">
            <h3 className="font-display text-xl text-ink mb-4">{editing ? "আর্টিকেল এডিট" : "নতুন আর্টিকেল পোস্ট"}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="font-mono text-xs text-ink/60 block mb-1">শিরোনাম *</label>
                <input
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="যেমন: ডায়াবেটিস নিয়ন্ত্রণে করণীয়"
                  className="w-full border border-line px-3 py-2 text-sm outline-none focus:border-pine"
                />
              </div>
              <div>
                <label className="font-mono text-xs text-ink/60 block mb-1">ক্যাটাগরি *</label>
                <input
                  required
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  placeholder="যেমন: শিশু রোগ"
                  className="w-full border border-line px-3 py-2 text-sm outline-none focus:border-pine"
                />
              </div>
              <div>
                <label className="font-mono text-xs text-ink/60 block mb-1">সংক্ষিপ্ত সারাংশ / কন্টেন্ট *</label>
                <textarea
                  rows={4}
                  required
                  value={form.excerpt}
                  onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                  placeholder="আর্টিকেলের বিস্তারিত অংশ লিখুন..."
                  className="w-full border border-line px-3 py-2 text-sm outline-none focus:border-pine resize-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-mono text-xs text-ink/60 block mb-1">তারিখ</label>
                  <input
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full border border-line px-3 py-2 text-sm outline-none focus:border-pine"
                  />
                </div>
                <div>
                  <label className="font-mono text-xs text-ink/60 block mb-1">পড়ার সময়</label>
                  <input
                    value={form.readTime}
                    onChange={(e) => setForm({ ...form, readTime: e.target.value })}
                    className="w-full border border-line px-3 py-2 text-sm outline-none focus:border-pine"
                  />
                </div>
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
                  পোস্ট প্রকাশ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
