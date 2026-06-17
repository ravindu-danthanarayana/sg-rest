import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteLayout } from "@/components/site/Layout";
import { categories, menuItems, type Category } from "@/lib/menu-data";
import { Search } from "lucide-react";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu — Sungreen Habarana" },
      { name: "description", content: "Explore breakfast, lunch, dinner, desserts and beverages at Sungreen Habarana." },
      { property: "og:title", content: "Menu — Sungreen Habarana" },
    ],
  }),
  component: MenuPage,
});

function MenuPage() {
  const [active, setActive] = useState<Category | "All">("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return menuItems.filter((m) => {
      const matchCat = active === "All" || m.category === active;
      const q = query.trim().toLowerCase();
      const matchQ = !q || m.name.toLowerCase().includes(q) || m.description.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }, [active, query]);

  return (
    <SiteLayout>
      <section className="relative bg-forest-deep pt-40 pb-24 text-white">
        <div className="container-narrow text-center">
          <p className="eyebrow">Our menu</p>
          <h1 className="mt-4 heading-display text-6xl text-white md:text-7xl">A taste of the wild.</h1>
          <p className="mx-auto mt-6 max-w-2xl text-white/75">
            Crafted by our chefs using produce from village farms and the surrounding gardens.
          </p>
        </div>
      </section>

      <section className="sticky top-20 z-30 border-b border-border bg-background/95 backdrop-blur">
        <div className="container-narrow flex flex-col gap-4 py-5 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            {(["All", ...categories] as const).map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`rounded-full border px-4 py-1.5 text-xs uppercase tracking-[0.18em] transition ${
                  active === c
                    ? "border-forest-deep bg-forest-deep text-white"
                    : "border-border text-foreground/70 hover:border-gold hover:text-gold"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="relative md:w-72">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search dishes…"
              className="w-full rounded-full border border-border bg-card py-2.5 pl-11 pr-4 text-sm outline-none focus:border-gold"
            />
          </div>
        </div>
      </section>

      <section className="bg-background py-20">
        <div className="container-narrow">
          {filtered.length === 0 ? (
            <p className="py-20 text-center text-muted-foreground">No dishes match your search.</p>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((d) => (
                <article key={d.id} className="group overflow-hidden rounded-sm bg-card shadow-[var(--shadow-soft)] transition hover:-translate-y-1 hover:shadow-[var(--shadow-elegant)]">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={d.image} alt={d.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <p className="eyebrow">{d.category}</p>
                      <p className="text-gold">LKR {d.price.toLocaleString()}</p>
                    </div>
                    <h3 className="mt-3 heading-display text-2xl">{d.name}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{d.description}</p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
