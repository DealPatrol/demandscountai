import Link from "next/link";
import { SearchForm } from "@/components/search-form";
import { SiteShell } from "@/components/site-shell";
import { integrationStatus } from "@/lib/env";

const sources = [
  {
    title: "Customer complaints",
    body: "Mocked complaint clusters identify where buyers already feel workflow pain.",
  },
  {
    title: "Community pain points",
    body: "Community-style threads show repeated requests, confusion, and stalled jobs-to-be-done.",
  },
  {
    title: "Bad software reviews",
    body: "Negative reviews spotlight weak onboarding, brittle automation, and abandoned promises.",
  },
  {
    title: "Repetitive outsourced tasks",
    body: "Recurring service gigs reveal manual work that can be packaged as productized SaaS.",
  },
  {
    title: "Competitor gaps",
    body: "Pricing pages and feature matrices expose what incumbents overbuild or still ignore.",
  },
];

export default function NewSearchPage() {
  return (
    <SiteShell
      active="/search/new"
      eyebrow="New search"
      title="Scan a niche for overlooked SaaS demand"
      description="Enter a market, workflow, or customer segment and DemandScout AI will translate mocked public demand signals into prioritized product ideas."
      actions={
        <Link
          href="/dashboard"
          className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/6"
        >
          Back to dashboard
        </Link>
      }
    >
      <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-6">
          <SearchForm submitLabel="Generate ideas" />
          <div className="glass-panel rounded-[30px] p-6">
            <p className="text-sm uppercase tracking-[0.22em] text-cyan-300/75">
              What the engine returns
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                "Idea name",
                "Target customer",
                "Pain point",
                "Demand proof",
                "Competitors",
                "MVP features",
                "Difficulty score",
                "Demand score",
                "Pricing suggestion",
                "Validation message",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-slate-950/55 px-4 py-3 text-sm text-slate-200"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="glass-panel rounded-[30px] p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm uppercase tracking-[0.22em] text-cyan-300/75">
                Source model
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-white">
                Structured for real connectors later
              </h2>
            </div>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200">
              {integrationStatus.openAiConfigured ? "AI enriched" : "Mock-first"}
            </span>
          </div>
          <div className="mt-6 space-y-4">
            {sources.map((source) => (
              <div
                key={source.title}
                className="rounded-2xl border border-white/10 bg-slate-950/55 p-4"
              >
                <p className="text-sm font-semibold text-white">{source.title}</p>
                <p className="mt-2 text-sm leading-7 text-slate-300">
                  {source.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
