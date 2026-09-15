import { useState } from "react";
import { useAdmin } from "@/context/AdminContext";
import { LogIn, AlertCircle, Stethoscope } from "lucide-react";

export default function AdminLogin() {
  const { login } = useAdmin();
  const [email, setEmail]     = useState("");
  const [pass,  setPass]      = useState("");
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const ok = await login(email, pass);
    if (!ok) {
      setError("ইমেইল বা পাসওয়ার্ড সঠিক নয়। (Supabase Auth বা Local Fallback)");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-5">
      <div className="w-full max-w-sm">
        {/* logo */}
        <div className="flex items-center gap-2.5 mb-8">
          <div className="h-9 w-9 bg-pine flex items-center justify-center">
            <Stethoscope className="h-5 w-5 text-paper" strokeWidth={2} />
          </div>
          <div>
            <p className="font-display italic text-xl text-ink leading-none">Medoro</p>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-gold mt-0.5">Admin Panel</p>
          </div>
        </div>

        <div className="bg-white border border-line overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-pine to-gold" />
          <div className="p-7">
            <h1 className="font-display text-2xl text-ink mb-1">লগইন করুন</h1>
            <p className="text-sm text-ink/50 mb-7">অ্যাডমিন প্যানেলে প্রবেশ করতে আপনার credentials দিন।</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="font-mono text-[11px] uppercase tracking-wide text-ink/50">ইমেইল</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  className="w-full mt-1.5 border border-line px-3 py-2.5 text-sm outline-none focus:border-pine"
                />
              </div>
              <div>
                <label className="font-mono text-[11px] uppercase tracking-wide text-ink/50">পাসওয়ার্ড</label>
                <input
                  type="password"
                  required
                  value={pass}
                  onChange={e => setPass(e.target.value)}
                  placeholder="••••••••"
                  className="w-full mt-1.5 border border-line px-3 py-2.5 text-sm outline-none focus:border-pine"
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 px-3 py-2.5 text-sm">
                  <AlertCircle className="h-4 w-4 shrink-0" strokeWidth={2} />
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-pine text-paper py-3 font-medium text-sm hover:bg-pine/90 transition-colors disabled:opacity-60"
              >
                {loading ? (
                  <span className="font-mono text-xs tracking-wide">যাচাই করছি...</span>
                ) : (
                  <><LogIn className="h-4 w-4" strokeWidth={2} /> লগইন করুন</>
                )}
              </button>
            </form>
          </div>
        </div>

        <p className="text-center text-xs text-ink/35 font-mono mt-5">
          শুধুমাত্র অনুমোদিত ব্যক্তিরা প্রবেশ করতে পারবেন।
        </p>
      </div>
    </div>
  );
}
