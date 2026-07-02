import Link from "next/link";
import { MetricCard } from "@/components/metric-card";
import { SearchForm } from "@/components/search-form";
import { integrationStatus } from "@/lib/env";

const pillars = [
  "Customer complaints",
  "Reddit-style pain points",
  "Bad software reviews",
  "Repetitive outsourced tasks",
  "Competitor gaps",
];

const pricingTiers = [
  {
    name: "Scout",
    price: "$0",
    description: "Explore mocked searches and validate a niche in minutes.",
    points: ["5 saved searches", "Mock signal summaries", "Idea scorecards"],
  },
  {
    name: "Growth",
    price: "$79",
    description: "Built to be Stripe-ready for recurring founder research workflows.",
    points: [
      "Unlimited searches",
      "Future live source connectors",
      "Team dashboards and exports",
    ],
  },
  {
    name: "Intelligence",
    price: "Custom",
    description: "For studios and product teams monitoring multiple markets.",
    points: [
      "Priority source ingest",
      "Analyst-grade reporting",
      "Supabase-backed historical memory",
    ],
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 lg:px-8">
        <div>
          <p className="text-lg font-semibold text-white">DemandScout AI</p>
          <p className="text-sm text-slate-400">
            Startup intelligence for high-demand SaaS ideas
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/6"
          >
            Dashboard
          </Link>
          <Link
            href="/search/new"
            className="rounded-full bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
          >
            New search
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-6 pb-20 lg:px-8">
        <section className="grid gap-8 pt-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.28em] text-cyan-300/75">
              Demand-driven idea discovery
            </p>
            <h1 className="mt-4 max-w-4xl text-5xl font-semibold tracking-tight text-white sm:text-6xl">
              Find SaaS ideas with proof before you build.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              DemandScout AI analyzes public demand signals and turns them into
              structured SaaS opportunities with pain points, competitor gaps,
              MVP scope, pricing ideas, and validation guidance.
            </p>
            <div className="mt-8 max-w-3xl">
              <SearchForm submitLabel="Analyze a niche" />
            </div>
            <div className="mt-8 flex flex-wrap gap-3 text-sm text-slate-300">
              {pillars.map((pillar) => (
                <span
                  key={pillar}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2"
                >
                  {pillar}
                </span>
              ))}
            </div>
          </div>

          <div className="glass-panel rounded-[32px] p-6">
            <div className="rounded-[28px] border border-cyan-300/16 bg-slate-950/60 p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.22em] text-cyan-300/75">
                    Live concept board
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">
                    Demand heatmap for SaaS wedges
                  </h2>
                </div>
                <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs font-medium text-emerald-200">
                  Mocked sources
                </span>
              </div>
              <div className="mt-6 grid gap-4">
                {[
                  ["Highest demand", "Workflow automation for service-heavy niches"],
                  ["Strongest signal", "Recurring complaints about manual reporting"],
                  ["Best wedge", "Fast MVPs with narrow onboarding scope"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                  >
                    <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
                      {label}
                    </p>
                    <p className="mt-2 text-sm leading-7 text-slate-200">{value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <MetricCard
                  label="OpenAI"
                  value={integrationStatus.openAiConfigured ? "Ready" : "Mock"}
                  helper="Optional AI enrichment keeps the app useful without live credentials."
                />
                <MetricCard
                  label="Supabase"
                  value={integrationStatus.supabaseConfigured ? "Connected" : "Ready"}
                  helper="Auth and database helpers are wired for future persistence."
                />
              </div>
            </div>
          </div>
        </section>

        <section className="mt-18 grid gap-5 md:grid-cols-3">
          {[
            {
              title: "Source-aware by design",
              body: "The analysis layer separates source ingestion from scoring so real APIs or scrapers can replace mocks later.",
            },
            {
              title: "Founder-grade outputs",
              body: "Each idea ships with customer target, proof, pricing angle, difficulty, demand, and MVP scope.",
            },
            {
              title: "Stripe-ready monetization",
              body: "The pricing section and growth packaging are already positioned for checkout integration.",
            },
          ].map((item) => (
            <div key={item.title} className="glass-panel rounded-3xl p-6">
              <h3 className="text-xl font-semibold text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">{item.body}</p>
            </div>
          ))}
        </section>

        <section className="mt-18">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-cyan-300/75">
                Stripe-ready pricing
              </p>
              <h2 className="mt-2 text-3xl font-semibold text-white">
                Monetization blocks that fit a research SaaS
              </h2>
            </div>
            <Link
              href="/dashboard"
              className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/6"
            >
              View dashboard
            </Link>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {pricingTiers.map((tier) => (
              <div key={tier.name} className="glass-panel rounded-[28px] p-6">
                <p className="text-sm uppercase tracking-[0.22em] text-cyan-300/75">
                  {tier.name}
                </p>
                <div className="mt-4 flex items-end gap-2">
                  <span className="text-4xl font-semibold text-white">
                    {tier.price}
                  </span>
                  <span className="pb-1 text-sm text-slate-400">
                    {tier.price === "Custom" ? "engagement" : "/month"}
                  </span>
                </div>
                <p className="mt-4 text-sm leading-7 text-slate-300">
                  {tier.description}
                </p>
                <ul className="mt-6 space-y-3 text-sm text-slate-200">
                  {tier.points.map((point) => (
                    <li key={point}>• {point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
