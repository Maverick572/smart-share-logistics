import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Button, Modal, SectionLabel } from "@/components/ui-kit";
import { BookingFlow, type BookingDetails } from "@/components/BookingFlow";
import { categories, listings, type Category, type Listing } from "@/lib/data";

export const Route = createFileRoute("/find")({
  head: () => ({
    meta: [
      { title: "Find Resources — Horizon Exchange" },
      {
        name: "description",
        content:
          "Browse nearby banquet chairs, kitchen capacity, AV kits and vehicles shared by Mumbai hospitality businesses.",
      },
      { property: "og:title", content: "Find Resources — Horizon Exchange" },
      {
        property: "og:description",
        content:
          "Browse nearby banquet chairs, kitchen capacity, AV kits and vehicles shared by Mumbai hospitality businesses.",
      },
    ],
  }),
  component: FindResources,
});

function FindResources() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category | "All">("All");
  const [selected, setSelected] = useState<Listing | null>(null);
  const [booking, setBooking] = useState<BookingDetails | null>(null);

  const results = useMemo(
    () =>
      listings.filter(
        (l) =>
          (category === "All" || l.category === category) &&
          (l.title + l.provider + l.area).toLowerCase().includes(query.toLowerCase()),
      ),
    [query, category],
  );

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <SectionLabel>Marketplace</SectionLabel>
          <h1 className="mt-2 font-serif text-4xl font-semibold">Find Resources</h1>
          <p className="mt-2 text-sm text-ink-muted">
            {results.length} listings within 10 km of Bandra.
          </p>
        </div>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search chairs, kitchens, hotels…"
          className="w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm shadow-sm outline-none transition placeholder:text-ink-muted focus:border-sky sm:w-72"
        />
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`rounded-lg border border-line px-3.5 py-2 text-sm font-medium transition ${
              category === c ? "bg-ink text-white" : "bg-white text-ink-muted hover:bg-mist"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((l) => (
          <article
            key={l.id}
            onClick={() => setSelected(l)}
            className="fade-up cursor-pointer overflow-hidden rounded-2xl border border-line bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="relative">
              <img
                src={l.image}
                alt={l.title}
                loading="lazy"
                width={800}
                height={512}
                className="aspect-[16/10] w-full object-cover"
              />
              <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-pine shadow-sm">
                {l.match}% Match
              </span>
            </div>
            <div className="p-5">
              <h3 className="font-serif text-lg font-semibold">{l.title}</h3>
              <p className="mt-1 text-sm text-ink-muted">
                {l.provider} · {l.area}
              </p>
              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="font-semibold">
                  {l.price}
                  <span className="font-normal text-ink-muted">{l.priceUnit}</span>
                </span>
                <span className="text-ink-muted">{l.distanceKm} km away</span>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-line pt-4">
                <span className="text-xs text-ink-muted">{l.availability}</span>
                <Button variant="small" onClick={() => setSelected(l)}>
                  View
                </Button>
              </div>
            </div>
          </article>
        ))}
        {results.length === 0 && (
          <p className="text-sm text-ink-muted">No listings match that search.</p>
        )}
      </div>

      <Modal open={!!selected} onClose={() => setSelected(null)}>
        {selected && (
          <div>
            <SectionLabel>{selected.category}</SectionLabel>
            <h3 className="mt-2 font-serif text-2xl font-semibold">{selected.title}</h3>
            <p className="mt-1 text-sm text-ink-muted">
              {selected.provider} · {selected.area}
            </p>
            <dl className="mt-5 space-y-3 text-sm">
              {[
                ["Quantity", selected.quantity],
                ["Price", `${selected.price}${selected.priceUnit}`],
                ["Availability", selected.availability],
                ["Distance", `${selected.distanceKm} km away`],
                ["Match score", `${selected.match}%`],
                ["Logistics option", selected.logistics],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-6">
                  <dt className="text-ink-muted">{k}</dt>
                  <dd className="text-right font-medium">{v}</dd>
                </div>
              ))}
            </dl>
            <Button
              variant="pine"
              className="mt-6 w-full py-3"
              onClick={() => {
                setBooking({
                  provider: selected.provider,
                  item: `${selected.quantity} · ${selected.title}`,
                  when: selected.availability.replace("Available ", ""),
                  price: `${selected.price}${selected.priceUnit}`,
                  logistics: selected.logistics,
                });
                setSelected(null);
              }}
            >
              Request Resource
            </Button>
          </div>
        )}
      </Modal>

      {booking && (
        <BookingFlow open={!!booking} onClose={() => setBooking(null)} details={booking} />
      )}
    </div>
  );
}
