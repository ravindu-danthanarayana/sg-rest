import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import chef from "@/assets/chef.jpg";
import interior from "@/assets/interior.jpg";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import hero from "@/assets/hero.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Sungreen Habarana" },
      { name: "description", content: "The story, chef, and dining experience behind Sungreen Habarana." },
      { property: "og:title", content: "About — Sungreen Habarana" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteLayout>
      <section className="relative bg-forest-deep pt-40 pb-24 text-white">
        <div className="container-narrow text-center">
          <p className="eyebrow">Our story</p>
          <h1 className="mt-4 heading-display text-6xl text-white md:text-7xl">Born of the jungle.</h1>
        </div>
      </section>

      <section className="bg-background py-28">
        <div className="container-narrow grid gap-16 md:grid-cols-2 md:items-center">
          <img src={interior} alt="" loading="lazy" className="aspect-[5/6] w-full rounded-sm object-cover shadow-[var(--shadow-elegant)]" />
          <div>
            <p className="eyebrow">The restaurant</p>
            <h2 className="mt-4 heading-display text-5xl">A quiet retreat in Habarana.</h2>
            <span className="gold-divider mt-6" />
            <p className="mt-6 text-muted-foreground leading-relaxed">
              Sungreen Habarana began as a love letter to the village — its rice paddies, its
              ancient tanks, its forest. Our restaurant carries that spirit forward, pairing
              traditional Sri Lankan cuisine with the calm of a true jungle retreat.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              We grow what we can, source the rest from neighbouring farmers, and let the
              wilderness set the tempo of every evening service.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-secondary/60 py-28">
        <div className="container-narrow grid gap-16 md:grid-cols-2 md:items-center">
          <div className="order-2 md:order-1">
            <p className="eyebrow">The chef</p>
            <h2 className="mt-4 heading-display text-5xl">Chef Anuradha Perera.</h2>
            <span className="gold-divider mt-6" />
            <p className="mt-6 text-muted-foreground leading-relaxed">
              Trained in Colombo and refined across kitchens in Singapore and Lyon, Chef Anuradha
              returned home to honour the food of her grandmother — slow-cooked curries, charred
              coconut sambols, kithul caramels — reimagined with the precision of fine dining.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Her tasting menus change with the seasons and the harvest of the surrounding farms.
            </p>
          </div>
          <img src={chef} alt="Chef plating a dish" loading="lazy" className="order-1 aspect-[4/5] w-full rounded-sm object-cover shadow-[var(--shadow-elegant)] md:order-2" />
        </div>
      </section>

      <section className="bg-background py-28">
        <div className="container-narrow text-center">
          <p className="eyebrow">Dining experience</p>
          <h2 className="mt-4 heading-display text-5xl">Three ways to dine.</h2>
        </div>
        <div className="container-narrow mt-16 grid gap-8 md:grid-cols-3">
          {[
            { title: "Canopy Terrace", text: "Open-air tables wrapped in trees and lantern light." },
            { title: "Garden Pavilion", text: "Intimate seating beside the lily pond and herb garden." },
            { title: "Chef's Table", text: "A six-seat counter with a tasting menu by Chef Anuradha." },
          ].map((c) => (
            <div key={c.title} className="rounded-sm border border-border bg-card p-10 text-center transition hover:border-gold">
              <h3 className="heading-display text-2xl">{c.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{c.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-forest-deep py-28 text-white">
        <div className="container-narrow">
          <div className="text-center">
            <p className="eyebrow">Gallery</p>
            <h2 className="mt-4 heading-display text-5xl text-white">Moments at Sungreen.</h2>
          </div>
          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {[hero, g1, g2, g3, interior, chef].map((src, i) => (
              <img key={i} src={src} alt="" loading="lazy" className="aspect-square w-full object-cover" />
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
