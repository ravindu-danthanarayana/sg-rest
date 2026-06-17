import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { menuItems } from "@/lib/menu-data";
import hero from "@/assets/hero.jpg";
import interior from "@/assets/interior.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import { Leaf, Sparkles, UtensilsCrossed, Quote } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sungreen Habarana — Luxury Jungle Restaurant" },
      { name: "description", content: "Nature-inspired fine dining in Habarana, Sri Lanka. Reserve your table at Sungreen." },
      { property: "og:title", content: "Sungreen Habarana Restaurant" },
      { property: "og:description", content: "Luxury jungle dining experience in Habarana." },
    ],
  }),
  component: Home,
});

const featured = menuItems.filter((m) => [5, 7, 10].includes(m.id));

const reasons = [
  { icon: Leaf, title: "Nature-Inspired", text: "Open-air dining wrapped in tropical canopy and lantern light." },
  { icon: UtensilsCrossed, title: "Authentic Ceylon Cuisine", text: "Time-honoured recipes plated with modern restraint." },
  { icon: Sparkles, title: "Resort Hospitality", text: "Attentive service tuned to the rhythm of the jungle." },
];

const testimonials = [
  { name: "Amara P.", text: "The most magical dinner of our trip. Candles, fireflies, and unforgettable curry." },
  { name: "Lukas M.", text: "Service was effortless and the watalappan was a revelation." },
  { name: "Priya S.", text: "It feels like a hidden retreat — every detail, considered." },
];

function Home() {
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative isolate flex min-h-screen items-center overflow-hidden">
        <img src={hero} alt="Sungreen Habarana terrace at dusk" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-deep/70 via-forest-deep/40 to-forest-deep/80" />
        <div className="container-narrow relative z-10 py-32 text-white">
          <p className="eyebrow animate-fade-up">Habarana · Sri Lanka</p>
          <h1 className="mt-6 heading-display text-5xl leading-[1.05] md:text-7xl lg:text-[5.5rem] max-w-3xl animate-fade-up">
            Dine beneath the<br />
            <span className="italic text-gold">whispering canopy.</span>
          </h1>
          <p className="mt-8 max-w-xl text-base text-white/85 md:text-lg animate-fade-up">
            A serene jungle restaurant at Sungreen Habarana — where Ceylon spice, slow service
            and lantern-lit nights become a memory you carry home.
          </p>
          <div className="mt-10 flex flex-wrap gap-4 animate-fade-up">
            <Link to="/reservation" className="rounded-full bg-gold px-7 py-3 text-sm font-medium text-forest-deep transition hover:bg-gold-soft">
              Reserve a Table
            </Link>
            <Link to="/menu" className="rounded-full border border-white/40 px-7 py-3 text-sm font-medium text-white transition hover:border-gold hover:text-gold">
              View the Menu
            </Link>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 text-xs tracking-[0.4em] text-white/60">
          SCROLL
        </div>
      </section>

      {/* WELCOME */}
      <section className="bg-background py-28">
        <div className="container-narrow grid items-center gap-16 md:grid-cols-2">
          <div>
            <p className="eyebrow">Welcome</p>
            <h2 className="mt-4 heading-display text-5xl">A sanctuary for the senses.</h2>
            <span className="gold-divider mt-6" />
            <p className="mt-6 text-muted-foreground leading-relaxed">
              Tucked within the lush wilderness of Habarana, our restaurant blends the soul of
              traditional Sri Lankan cooking with the calm of resort hospitality. Sourced from
              village farms, plated with quiet artistry — every meal here is a small ceremony.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Join us for sunrise hoppers, long afternoon thalis, or a candle-lit dinner
              beneath the stars.
            </p>
          </div>
          <div className="relative">
            <img src={interior} alt="Restaurant interior" loading="lazy" className="aspect-[5/6] w-full rounded-sm object-cover shadow-[var(--shadow-elegant)]" />
            <div className="absolute -bottom-6 -left-6 hidden h-32 w-32 border border-gold md:block" />
          </div>
        </div>
      </section>

      {/* FEATURED DISHES */}
      <section className="bg-secondary/60 py-28">
        <div className="container-narrow">
          <div className="flex flex-col items-center text-center">
            <p className="eyebrow">Signature plates</p>
            <h2 className="mt-4 heading-display text-5xl">Featured dishes</h2>
            <span className="gold-divider mt-6" />
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {featured.map((d) => (
              <article key={d.id} className="group overflow-hidden rounded-sm bg-card shadow-[var(--shadow-soft)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-elegant)]">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={d.image} alt={d.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="p-7">
                  <p className="eyebrow">{d.category}</p>
                  <h3 className="mt-3 heading-display text-2xl">{d.name}</h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{d.description}</p>
                  <p className="mt-5 text-gold">LKR {d.price.toLocaleString()}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link to="/menu" className="inline-flex items-center gap-3 text-sm tracking-wide text-forest-deep hover:text-gold">
              <span className="gold-divider" /> Explore the full menu
            </Link>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="bg-background py-28">
        <div className="container-narrow">
          <div className="text-center">
            <p className="eyebrow">Why Sungreen</p>
            <h2 className="mt-4 heading-display text-5xl">An experience, not just a meal.</h2>
          </div>
          <div className="mt-16 grid gap-10 md:grid-cols-3">
            {reasons.map((r) => (
              <div key={r.title} className="rounded-sm border border-border/70 bg-card p-10 text-center transition hover:border-gold">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-gold text-gold">
                  <r.icon size={22} />
                </div>
                <h3 className="mt-6 heading-display text-2xl">{r.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="bg-forest-deep py-28 text-white">
        <div className="container-narrow">
          <div className="flex items-end justify-between">
            <div>
              <p className="eyebrow">Moments</p>
              <h2 className="mt-4 heading-display text-5xl text-white">A glimpse of Sungreen.</h2>
            </div>
            <Link to="/about" className="hidden text-sm tracking-wide text-white/70 hover:text-gold md:block">View gallery →</Link>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            <img src={gallery1} alt="" loading="lazy" className="aspect-[4/5] w-full object-cover" />
            <img src={interior} alt="" loading="lazy" className="aspect-[4/5] w-full object-cover" />
            <img src={gallery2} alt="" loading="lazy" className="aspect-[4/5] w-full object-cover" />
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-background py-28">
        <div className="container-narrow">
          <div className="text-center">
            <p className="eyebrow">Guest reflections</p>
            <h2 className="mt-4 heading-display text-5xl">Whispers from our table.</h2>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.name} className="rounded-sm border border-border bg-card p-10">
                <Quote className="text-gold" size={28} />
                <blockquote className="mt-5 font-display text-xl leading-snug">"{t.text}"</blockquote>
                <figcaption className="mt-6 text-xs uppercase tracking-[0.3em] text-muted-foreground">— {t.name}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* RESERVATION CTA */}
      <section className="relative isolate overflow-hidden py-28 text-white">
        <img src={gallery3} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-forest-deep/85" />
        <div className="container-narrow relative z-10 text-center">
          <p className="eyebrow">Reserve</p>
          <h2 className="mt-4 heading-display text-5xl text-white md:text-6xl">Save your seat by the canopy.</h2>
          <p className="mx-auto mt-6 max-w-xl text-white/80">
            Tables are intimate and limited. Reserve ahead to secure your candle-lit corner.
          </p>
          <Link to="/reservation" className="mt-10 inline-flex rounded-full bg-gold px-8 py-3 text-sm font-medium text-forest-deep hover:bg-gold-soft">
            Book your table
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
