import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Button, SectionLabel } from "@/components/ui-kit";
import { BookingFlow, type BookingDetails } from "@/components/BookingFlow";
import { defaultRequirement, smartMatches, type Requirement, type SmartMatch } from "@/lib/data";

export const Route = createFileRoute("/post")({
  head: () => ({
    meta: [
      { title: "Post Requirement — Horizon Exchange" },
      {
        name: "description",
        content:
          "Post what you need and get logistics-aware smart matches ranked by price, distance, availability and shared transport.",
      },
      { property: "og:title", content: "Post Requirement — Horizon Exchange" },
      {
        property: "og:description",
        content:
          "Post what you need and get logistics-aware smart matches ranked by price, distance, availability and shared transport.",
      },
    ],
  }),
  component: PostRequirement,
});

type Step = "form" | "matching" | "matches" | "logistics";

function Field({
  label,
  value,
  onChange,
  prefix,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  prefix?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-medium uppercase tracking-wider text-ink-muted">{label}</span>
      <div className="mt-2 flex items-center rounded-xl border border-line bg-white px-3 shadow-sm focus-within:border-sky">
        {prefix && <span className="text-sm text-ink-muted">{prefix}</span>}
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent px-1 py-2.5 text-sm outline-none"
        />
      </div>
    </label>
  );
}

function PostRequirement() {
  const [req, setReq] = useState<Requirement>(defaultRequirement);
  const [step, setStep] = useState<Step>("form");
  const [selected, setSelected] = useState<SmartMatch | null>(null);
  const [sharedReserved, setSharedReserved] = useState(false);
  const [booking, setBooking] = useState<BookingDetails | null>(null);

  const set = (k: keyof Requirement) => (v: string) => setReq((r) => ({ ...r, [k]: v }));

  function findMatches() {
    setStep("matching");
    setSharedReserved(false);
    setSelected(null);
    setTimeout(() => setStep("matches"), 1500);
  }

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <SectionLabel>Smart Matching</SectionLabel>
          <h1 className="mt-2 font-serif text-4xl font-semibold">Post Requirement</h1>
          <p className="mt-2 text-sm text-ink-muted">
            We rank resource, price, distance, availability and transport together.
          </p>
        </div>
        {step !== "form" && (
          <Button variant="ghost" onClick={() => setStep("form")}>
            Edit requirement
          </Button>
        )}
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-5">
        <div className="rounded-2xl border border-line bg-white p-6 shadow-sm lg:col-span-2">
          {step === "form" ? (
            <div className="space-y-4">
              <Field label="Resource" value={req.resource} onChange={set("resource")} />
              <Field label="Quantity" value={req.quantity} onChange={set("quantity")} />
              <Field label="Location" value={req.location} onChange={set("location")} />
              <div className="grid grid-cols-2 gap-3">
                <Field label="Date" value={req.date} onChange={set("date")} />
                <Field label="Time" value={req.time} onChange={set("time")} />
              </div>
              <Field label="Budget" value={req.budget} onChange={set("budget")} prefix="₹" />
              <Button variant="sky" className="w-full py-3" onClick={findMatches}>
                Find Smart Matches
              </Button>
            </div>
          ) : (
            <div>
              <h2 className="font-serif text-2xl font-semibold">Your requirement</h2>
              <dl className="mt-5 space-y-3 text-sm">
                {[
                  ["Resource", req.resource],
                  ["Quantity", req.quantity],
                  ["Location", req.location],
                  ["Date · Time", `${req.date} · ${req.time}`],
                  ["Budget", `₹${Number(req.budget || 0).toLocaleString("en-IN")}`],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4">
                    <dt className="text-ink-muted">{k}</dt>
                    <dd className="text-right font-medium">{v}</dd>
                  </div>
                ))}
              </dl>
              {selected && (
                <div className="mt-6 rounded-xl bg-pine-soft p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-pine">
                      Top match · {selected.match}%
                    </span>
                    <span className="rounded-full bg-pine px-2 py-0.5 text-[11px] font-semibold text-white">
                      Selected
                    </span>
                  </div>
                  <p className="mt-2 font-serif text-lg font-semibold">{selected.provider}</p>
                  <p className="mt-1 text-sm text-ink-muted">
                    {selected.available} · {selected.price} · {selected.distance}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="lg:col-span-3">
          {step === "form" && (
            <div className="flex h-full min-h-64 items-center justify-center rounded-2xl border border-dashed border-line bg-white/60 p-8 text-center">
              <p className="max-w-sm text-sm text-ink-muted">
                Fill in what you need and we'll score every nearby provider on availability,
                quantity, price, distance and transport.
              </p>
            </div>
          )}

          {step === "matching" && (
            <div className="flex h-full min-h-64 flex-col items-center justify-center gap-3 rounded-2xl border border-line bg-white p-8 shadow-sm">
              <div className="size-8 animate-spin rounded-full border-2 border-mist border-t-sky" />
              <p className="text-sm font-medium">Scanning 24 providers near {req.location}…</p>
              <p className="text-xs text-ink-muted">Scoring price, distance and shared routes</p>
            </div>
          )}

          {step === "matches" && (
            <div className="space-y-4">
              {smartMatches.map((m, i) => (
                <div
                  key={m.id}
                  className={`fade-up rounded-2xl border bg-white p-6 shadow-sm ${
                    i === 0 ? "border-pine" : "border-line"
                  }`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                            i === 0 ? "bg-pine text-white" : "bg-mist text-ink-muted"
                          }`}
                        >
                          {m.match}% Match
                        </span>
                        {i === 0 && (
                          <span className="text-xs font-semibold uppercase tracking-wide text-pine">
                            Best overall
                          </span>
                        )}
                      </div>
                      <h3 className="mt-3 font-serif text-xl font-semibold">{m.provider}</h3>
                      <p className="mt-1 text-sm text-ink-muted">
                        {m.available} · {m.price} · {m.distance} · {m.timing}
                      </p>
                    </div>
                    <Button
                      variant={i === 0 ? "primary" : "ghost"}
                      onClick={() => {
                        setSelected(m);
                        setStep("logistics");
                      }}
                    >
                      View Logistics
                    </Button>
                  </div>

                  <div className="mt-5 grid gap-2 border-t border-line pt-4 sm:grid-cols-5">
                    {m.criteria.map((c) => (
                      <div key={c.label} className="rounded-lg bg-mist/60 p-2.5">
                        <p className="flex items-center gap-1 text-xs font-semibold">
                          <span className={c.ok ? "text-pine" : "text-amber"}>
                            {c.ok ? "✓" : "!"}
                          </span>
                          {c.label}
                        </p>
                        <p className="mt-1 text-[11px] leading-snug text-ink-muted">{c.note}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {step === "logistics" && selected && (
            <div className="fade-up relative overflow-hidden rounded-2xl border border-line bg-white p-6 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <SectionLabel>Logistics Optimization</SectionLabel>
                  <h2 className="mt-2 font-serif text-2xl font-semibold">How it gets there</h2>
                </div>
                <span className="rounded-full bg-pine-soft px-3 py-1 text-xs font-bold uppercase tracking-wide text-pine">
                  Logistics optimized
                </span>
              </div>

              <div className="mt-6 flex items-center gap-3">
                <div className="flex-1 rounded-xl border border-line bg-mist/60 p-3 text-center">
                  <p className="text-xs text-ink-muted">From</p>
                  <p className="mt-1 text-sm font-semibold">{selected.provider}</p>
                  <p className="text-xs text-ink-muted">{selected.area}</p>
                </div>
                <div className="flex flex-col items-center px-1">
                  <div className="h-px w-10 bg-line sm:w-16" />
                  <span className="mt-1 text-[11px] font-medium text-ink-muted">
                    {selected.distance.replace(" away", "")}
                  </span>
                </div>
                <div className="flex-1 rounded-xl bg-ink p-3 text-center text-white">
                  <p className="text-xs text-white/70">To</p>
                  <p className="mt-1 text-sm font-semibold">Event Venue</p>
                  <p className="text-xs text-white/70">{req.location}</p>
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div
                  className={`rounded-xl border border-line p-4 ${
                    sharedReserved ? "opacity-50" : "opacity-70"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold">Option A</span>
                    <span className="text-xs text-ink-muted">Dedicated</span>
                  </div>
                  <p className="mt-3 font-serif text-2xl font-semibold">₹8,000</p>
                  <p className="mt-1 text-xs text-ink-muted">Book a fresh vehicle for this run</p>
                </div>
                <div className="rounded-xl border-2 border-pine bg-pine-soft/60 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-pine">Option B · Shared</span>
                    <span className="rounded-full bg-pine px-2 py-0.5 text-[11px] font-bold text-white">
                      ₹6,500 saved
                    </span>
                  </div>
                  <p className="mt-3 font-serif text-2xl font-semibold text-pine">₹1,500</p>
                  <p className="mt-1 text-xs text-ink-muted">
                    Existing vehicle already travelling this route
                  </p>
                </div>
              </div>

              {sharedReserved ? (
                <div className="fade-up mt-6">
                  <div className="flex items-center gap-2 rounded-xl bg-pine-soft p-4 text-sm font-semibold text-pine">
                    <span>✓</span> Shared logistics reserved.
                  </div>
                  <Button
                    variant="primary"
                    className="mt-3 w-full py-3"
                    onClick={() =>
                      setBooking({
                        provider: selected.provider,
                        item: `${req.quantity} ${req.resource}`,
                        when: `${req.date} · ${req.time}`,
                        price: selected.price,
                        logistics: "Shared Transport",
                      })
                    }
                  >
                    Request Resource
                  </Button>
                </div>
              ) : (
                <Button
                  variant="pine"
                  className="mt-6 w-full py-3"
                  onClick={() => setSharedReserved(true)}
                >
                  Use Shared Transport
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      {booking && (
        <BookingFlow open={!!booking} onClose={() => setBooking(null)} details={booking} />
      )}
    </div>
  );
}
