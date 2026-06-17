import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/site/Layout";
import { toast } from "sonner";
import { z } from "zod";
import gallery from "@/assets/gallery-1.jpg";

export const Route = createFileRoute("/reservation")({
  head: () => ({
    meta: [
      { title: "Reservations — Sungreen Habarana" },
      { name: "description", content: "Reserve your table at Sungreen Habarana restaurant." },
      { property: "og:title", content: "Reservations — Sungreen Habarana" },
    ],
  }),
  component: ReservationPage,
});

const schema = z.object({
  customer_name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().min(7, "Invalid phone").max(20),
  reservation_date: z.string().min(1, "Date required"),
  reservation_time: z.string().min(1, "Time required"),
  guests: z.coerce.number().int().min(1).max(20),
  special_request: z.string().max(500).optional(),
});

const initial = {
  customer_name: "", email: "", phone: "",
  reservation_date: "", reservation_time: "", guests: 2, special_request: "",
};

function ReservationPage() {
  const [form, setForm] = useState(initial);
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
        await fetch(`${apiBase}/api/reservations`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(parsed.data),
        });
      }
      toast.success("Reservation request received. We'll confirm shortly.");
      setForm(initial);
    } catch {
      toast.error("Could not send reservation. Please try again or call us.");
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
          <p className="eyebrow">Reservations</p>
          <h1 className="mt-4 heading-display text-6xl text-white md:text-7xl">Reserve a table.</h1>
          <p className="mx-auto mt-6 max-w-xl text-white/75">
            Please book at least 24 hours in advance. We'll confirm your table by email.
          </p>
        </div>
      </section>

      <section className="bg-background py-24">
        <div className="container-narrow grid gap-12 md:grid-cols-[1fr_1.2fr] md:gap-16">
          <div>
            <img src={gallery} alt="" loading="lazy" className="aspect-[4/5] w-full rounded-sm object-cover shadow-[var(--shadow-elegant)]" />
            <div className="mt-8 rounded-sm border border-border bg-card p-6 text-sm text-muted-foreground">
              <p className="eyebrow">Hours</p>
              <p className="mt-3">Breakfast · 7:00 – 10:30</p>
              <p>Lunch · 12:00 – 15:00</p>
              <p>Dinner · 18:30 – 22:30</p>
            </div>
          </div>

          <form onSubmit={onSubmit} className="rounded-sm border border-border bg-card p-8 md:p-10">
            <h2 className="heading-display text-3xl">Booking details</h2>
            <span className="gold-divider mt-4" />

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className={label}>Full name</label>
                <input className={field} value={form.customer_name} onChange={(e) => setForm({ ...form, customer_name: e.target.value })} />
              </div>
              <div>
                <label className={label}>Email</label>
                <input type="email" className={field} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </div>
              <div>
                <label className={label}>Phone</label>
                <input className={field} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              </div>
              <div>
                <label className={label}>Date</label>
                <input type="date" className={field} value={form.reservation_date} onChange={(e) => setForm({ ...form, reservation_date: e.target.value })} />
              </div>
              <div>
                <label className={label}>Time</label>
                <input type="time" className={field} value={form.reservation_time} onChange={(e) => setForm({ ...form, reservation_time: e.target.value })} />
              </div>
              <div className="md:col-span-2">
                <label className={label}>Guests</label>
                <input type="number" min={1} max={20} className={field} value={form.guests} onChange={(e) => setForm({ ...form, guests: Number(e.target.value) })} />
              </div>
              <div className="md:col-span-2">
                <label className={label}>Special requests</label>
                <textarea rows={4} className={field} value={form.special_request} onChange={(e) => setForm({ ...form, special_request: e.target.value })} placeholder="Dietary preferences, celebrations, seating preferences…" />
              </div>
            </div>

            <button disabled={submitting} className="mt-8 w-full rounded-full bg-forest-deep px-6 py-3.5 text-sm tracking-wide text-white transition hover:bg-forest disabled:opacity-60">
              {submitting ? "Sending…" : "Request Reservation"}
            </button>
          </form>
        </div>
      </section>
    </SiteLayout>
  );
}
