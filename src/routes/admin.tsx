import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteLayout } from "@/components/site/Layout";
import { menuItems as seedItems, type MenuItem } from "@/lib/menu-data";
import { toast } from "sonner";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — Sungreen Habarana" }, { name: "robots", content: "noindex" }] }),
  component: AdminPage,
});

const TOKEN_KEY = "sungreen_admin_token";

function AdminPage() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    setToken(typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null);
  }, []);

  if (!token) return <Login onLogin={(t) => { localStorage.setItem(TOKEN_KEY, t); setToken(t); }} />;
  return <Dashboard onLogout={() => { localStorage.removeItem(TOKEN_KEY); setToken(null); }} />;
}

function Login({ onLogin }: { onLogin: (t: string) => void }) {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const apiBase = import.meta.env.VITE_API_BASE_URL ?? "";
      if (apiBase) {
        const res = await fetch(`${apiBase}/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });
        if (!res.ok) throw new Error("Invalid credentials");
        const data = await res.json();
        onLogin(data.token);
      } else {
        // Demo fallback when backend isn't running
        if (password.length < 4) throw new Error("Enter a password (demo mode)");
        onLogin("demo-token");
      }
      toast.success("Welcome back, Chef.");
    } catch (err: any) {
      toast.error(err.message ?? "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <SiteLayout>
      <section className="flex min-h-screen items-center bg-forest-deep py-32">
        <form onSubmit={submit} className="container-narrow mx-auto w-full max-w-md rounded-sm bg-card p-10 shadow-[var(--shadow-elegant)]">
          <p className="eyebrow">Sungreen · Admin</p>
          <h1 className="mt-3 heading-display text-4xl">Sign in</h1>
          <span className="gold-divider mt-4" />
          <div className="mt-8 space-y-5">
            <div>
              <label className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">Username</label>
              <input className="w-full rounded-sm border border-border bg-background px-4 py-3 text-sm outline-none focus:border-gold" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">Password</label>
              <input type="password" className="w-full rounded-sm border border-border bg-background px-4 py-3 text-sm outline-none focus:border-gold" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
          </div>
          <button disabled={loading} className="mt-8 w-full rounded-full bg-forest-deep px-6 py-3 text-sm tracking-wide text-white hover:bg-forest disabled:opacity-60">
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </section>
    </SiteLayout>
  );
}

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [tab, setTab] = useState<"overview" | "menu" | "reservations" | "messages">("overview");
  const [items, setItems] = useState<MenuItem[]>(seedItems);

  function remove(id: number) { setItems((arr) => arr.filter((x) => x.id !== id)); toast.success("Item removed"); }

  return (
    <SiteLayout>
      <section className="bg-background pt-32 pb-20">
        <div className="container-narrow">
          <div className="flex items-center justify-between">
            <div>
              <p className="eyebrow">Admin dashboard</p>
              <h1 className="mt-3 heading-display text-4xl">Welcome back.</h1>
            </div>
            <button onClick={onLogout} className="rounded-full border border-border px-5 py-2 text-sm hover:border-gold hover:text-gold">Sign out</button>
          </div>

          <div className="mt-8 flex flex-wrap gap-2 border-b border-border">
            {(["overview", "menu", "reservations", "messages"] as const).map((t) => (
              <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 text-sm capitalize ${tab === t ? "border-b-2 border-gold text-forest-deep" : "text-muted-foreground hover:text-foreground"}`}>
                {t}
              </button>
            ))}
          </div>

          <div className="mt-10">
            {tab === "overview" && (
              <div className="grid gap-6 md:grid-cols-3">
                {[
                  { label: "Menu items", value: items.length },
                  { label: "Reservations (today)", value: 12 },
                  { label: "Unread messages", value: 4 },
                ].map((s) => (
                  <div key={s.label} className="rounded-sm border border-border bg-card p-8">
                    <p className="eyebrow">{s.label}</p>
                    <p className="mt-4 heading-display text-5xl">{s.value}</p>
                  </div>
                ))}
              </div>
            )}

            {tab === "menu" && (
              <div className="overflow-x-auto rounded-sm border border-border">
                <table className="w-full text-sm">
                  <thead className="bg-secondary/60 text-left text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    <tr><th className="p-4">Name</th><th className="p-4">Category</th><th className="p-4">Price</th><th className="p-4 text-right">Actions</th></tr>
                  </thead>
                  <tbody>
                    {items.map((i) => (
                      <tr key={i.id} className="border-t border-border">
                        <td className="p-4">{i.name}</td>
                        <td className="p-4">{i.category}</td>
                        <td className="p-4">LKR {i.price.toLocaleString()}</td>
                        <td className="p-4 text-right">
                          <button onClick={() => remove(i.id)} className="text-destructive hover:underline">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {tab === "reservations" && (
              <div className="rounded-sm border border-border bg-card p-10 text-center text-muted-foreground">
                Reservations will appear here once the Ballerina backend is connected.
              </div>
            )}

            {tab === "messages" && (
              <div className="rounded-sm border border-border bg-card p-10 text-center text-muted-foreground">
                Contact messages will appear here once the Ballerina backend is connected.
              </div>
            )}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
