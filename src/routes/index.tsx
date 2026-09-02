import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Bar, Button, SectionLabel } from "@/components/ui-kit";
import { utilization } from "@/lib/data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — Horizon Exchange" },
      {
        name: "description",
        content:
          "Track idle hospitality resources, utilization and recoverable revenue for The Grand Horizon Hotel, Mumbai.",
      },
      { property: "og:title", content: "Dashboard — Horizon Exchange" },
      {
        property: "og:description",
        content:
          "Track idle hospitality resources, utilization and recoverable revenue for The Grand Horizon Hotel, Mumbai.",
      },
    ],
  }),
  component: Dashboard,
});

const kpis = [
  { label: "Available Resources", value: "24", note: "4 new this week", dot: "bg-pine", tone: "text-pine" },
  { label: "Active Requests", value: "7", note: "3 awaiting response", dot: "bg-amber", tone: "text-ink-muted" },
  { label: "Upcoming Bookings", value: "12", note: "Next: Sept 11", dot: "bg-sky", tone: "text-ink-muted" },
];

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <SectionLabel>Dashboard</SectionLabel>
          <h1 className="mt-2 font-serif text-4xl font-semibold leading-tight">
            Good morning, Horizon
          </h1>
          <p className="mt-2 text-sm text-ink-muted">
            Here's how your resources are performing this week.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="ghost" onClick={() => navigate({ to: "/find" })}>
            Find Resources
          </Button>
          <Button variant="primary" onClick={() => navigate({ to: "/post" })}>
            Post Requirement
          </Button>
        </div>
      </div>

      <section className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {kpis.map((k) => (
          <div key={k.label} className="fade-up rounded-2xl border border-line bg-white p-5 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wider text-ink-muted">{k.label}</p>
            <p className="mt-3 font-serif text-4xl font-semibold">{k.value}</p>
            <p className={`mt-2 flex items-center gap-1 text-xs font-medium ${k.tone}`}>
              <span className={`inline-block size-1.5 rounded-full ${k.dot}`} /> {k.note}
            </p>
          </div>
        ))}
        <div className="fade-up rounded-2xl border border-line bg-white p-5 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wider text-ink-muted">
            Potential Idle Revenue
          </p>
          <p className="mt-3 font-serif text-4xl font-semibold">
            ₹42,000<span className="text-lg text-ink-muted">/mo</span>
          </p>
          <p className="mt-2 flex items-center gap-1 text-xs font-medium text-amber">
            <span className="inline-block size-1.5 rounded-full bg-amber" /> from idle AV equipment
          </p>
        </div>
      </section>

      <section className="mt-4 grid gap-4 lg:grid-cols-5">
        <div className="rounded-2xl border border-line bg-white p-6 shadow-sm lg:col-span-3">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-xl font-semibold">Resource Utilization</h2>
            <span className="text-xs text-ink-muted">This month</span>
          </div>
          <div className="mt-6 space-y-5">
            {utilization.map((u) => (
              <div key={u.label}>
                <div className="flex justify-between text-sm">
                  <span className={u.tone === "amber" ? "font-medium text-amber" : "font-medium"}>
                    {u.label}
                  </span>
                  <span className={u.tone === "amber" ? "font-semibold text-amber" : "text-ink-muted"}>
                    {u.value}%
                  </span>
                </div>
                <Bar value={u.value} tone={u.tone} />
              </div>
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-amber/20 bg-gradient-to-br from-amber-soft to-white p-6 shadow-sm lg:col-span-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber/15 px-3 py-1 text-xs font-semibold text-amber">
            Opportunity
          </span>
          <h3 className="mt-4 font-serif text-2xl font-semibold leading-snug">
            AV Equipment is idle 76% of the time.
          </h3>
          <p className="mt-2 text-sm text-ink-muted">
            Rental demand in your zone is rising. Listing it could unlock real revenue.
          </p>
          <div className="mt-5 flex items-end gap-2">
            <p className="font-serif text-4xl font-semibold text-amber">₹42,000</p>
            <p className="pb-1 text-sm text-ink-muted">/ month potential</p>
          </div>
          <Button variant="amber" className="mt-6 w-full py-3" onClick={() => navigate({ to: "/find" })}>
            List for rental
          </Button>
        </div>
      </section>
    </div>
  );
}
