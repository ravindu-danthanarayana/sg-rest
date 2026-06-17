import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/site/Layout";
import { toast } from "sonner";
import { z } from "zod";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Sungreen Habarana" },
      { name: "description", content: "Get in touch with Sungreen Habarana restaurant." },
      { property: "og:title", content: "Contact — Sungreen Habarana" },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  message: z.string().trim().min(5).max(1000),
});

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }
    setSubmitting(true);
    try {
      const apiBase = import.meta.env.VITE_API_BASE_URL ?? "";
      if (apiBase) {
        await fetch(`${apiBase}/api/contact`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(parsed.data),
        });
      }
      toast.success("Message sent. We'll be in touch soon.");
      setForm({ name: "", email: "", message: "" });
    } catch {
      toast.error("Could not send message. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const field = "w-full rounded-sm border border-border bg-card px-4 py-3 text-sm outline-none focus:border-gold";
  const label = "block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2";

  return (
    <SiteLayout>
      <section className="relative bg-forest-deep pt-40 pb-24 text-white">
        <div className="container-narrow text-center">
          <p className="eyebrow">Contact</p>
          <h1 className="mt-4 heading-display text-6xl text-white md:text-7xl">Say hello.</h1>
        </div>
      </section>

      <section className="bg-background py-24">
        <div className="container-narrow grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="heading-display text-4xl">Visit us in Habarana</h2>
            <span className="gold-divider mt-4" />
            <ul className="mt-8 space-y-5 text-sm">
              <li className="flex gap-4"><MapPin className="text-gold mt-0.5" size={18} /><span>Sungreen Habarana,<br />Habarana 50150, Sri Lanka</span></li>
              <li className="flex gap-4"><Phone className="text-gold mt-0.5" size={18} />+94 66 227 0000</li>
              <li className="flex gap-4"><Mail className="text-gold mt-0.5" size={18} />dine@sungreenhabarana.com</li>
              <li className="flex gap-4"><Clock className="text-gold mt-0.5" size={18} />Daily · 7:00 – 22:30</li>
            </ul>

            <div className="mt-10 aspect-video w-full overflow-hidden rounded-sm border border-border">
              <iframe
                title="Map"
                src="https://www.google.com/maps?q=Habarana,Sri+Lanka&output=embed"
                className="h-full w-full"
                loading="lazy"
              />
            </div>
          </div>

          <form onSubmit={onSubmit} className="rounded-sm border border-border bg-card p-8 md:p-10">
            <h2 className="heading-display text-3xl">Send a message</h2>
            <span className="gold-divider mt-4" />
            <div className="mt-8 space-y-5">
              <div>
                <label className={label}>Name</label>
                <input className={field} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div>
                <label className={label}>Email</label>
                <input type="email" className={field} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </div>
              <div>
                <label className={label}>Message</label>
                <textarea rows={6} className={field} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
              </div>
            </div>
            <button disabled={submitting} className="mt-8 w-full rounded-full bg-forest-deep px-6 py-3.5 text-sm tracking-wide text-white transition hover:bg-forest disabled:opacity-60">
              {submitting ? "Sending…" : "Send Message"}
            </button>
          </form>
        </div>
      </section>
    </SiteLayout>
  );
}
