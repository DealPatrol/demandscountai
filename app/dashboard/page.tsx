import Link from "next/link";
import { IdeaCard } from "@/components/idea-card";
import { MetricCard } from "@/components/metric-card";
import { SiteShell } from "@/components/site-shell";
import { getDashboardSnapshot } from "@/lib/demand-scout/analysis";
import { integrationStatus } from "@/lib/env";

export default async function DashboardPage() {
  const snapshot = await getDashboardSnapshot();
  const featuredSearchId = snapshot.recentSearches[0]?.id ?? "demo-search";
  const featuredNiche = snapshot.recentSearches[0]?.niche ?? "AI operations";

  return (
    <SiteShell
      active="/dashboard"
      eyebrow="Analyst dashboard"
      title={`Welcome back, ${snapshot.viewer.name}`}
      description="Track the hottest markets, revisit promising searches, and see which SaaS wedges show the clearest demand proof."
      actions={
        <Link
          href="/search/new"
          className="rounded-full bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
        >
          Start a new scan
        </Link>
      }
    >
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Searches tracked"
          value={String(snapshot.totalSearches)}
          helper="Recent niches retained from the analysis workflow."
        />
        <MetricCard
          label="Average demand"
          value={snapshot.averageDemandScore.toFixed(1)}
          helper="Composite score across your latest opportunities."
        />
        <MetricCard
          label="Strongest niche"
          value={snapshot.strongestNiche}
          helper="Current best-performing market from mocked evidence."
        />
        <MetricCard
          label="Plan"
          value={snapshot.viewer.plan}
          helper={`Supabase auth ${
            integrationStatus.supabaseConfigured ? "configured" : "ready"
          } for live workspaces.`}
        />
      </section>

      <section className="mt-8 grid gap-6 xl:grid-cols-[0.82fr_1.18fr]">
        <div className="glass-panel rounded-[30px] p-6">
          <p className="text-sm uppercase tracking-[0.22em] text-cyan-300/75">
            Recent searches
          </p>
          <div className="mt-5 space-y-4">
            {snapshot.recentSearches.map((search) => (
              <Link
                key={search.id}
                href={`/results/${search.id}?niche=${encodeURIComponent(search.niche)}`}
                className="block rounded-2xl border border-white/10 bg-slate-950/55 p-4 transition hover:border-cyan-300/25"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-lg font-semibold text-white">{search.niche}</p>
                    <p className="mt-1 text-sm text-slate-400">{search.createdAt}</p>
                  </div>
                  <div className="text-right text-sm text-slate-200">
                    <p>Demand {search.demandScore}</p>
                    <p className="mt-1 text-slate-400">{search.ideaCount} ideas</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-cyan-300/18 bg-cyan-300/8 p-4">
            <p className="text-sm text-slate-100">
              Supabase tables can replace this mocked search history without
              changing the dashboard surface area.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-panel rounded-[30px] p-6">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.22em] text-cyan-300/75">
                  Integration status
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-white">
                  Ready for live sources
                </h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  [
                    "Supabase",
                    integrationStatus.supabaseConfigured
                      ? "Configured"
                      : "Awaiting keys",
                  ],
                  [
                    "OpenAI",
                    integrationStatus.openAiConfigured
                      ? "Configured"
                      : "Mock fallback",
                  ],
                  [
                    "Stripe",
                    integrationStatus.stripeConfigured
                      ? "Configured"
                      : "Pricing-ready",
                  ],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200"
                  >
                    {label}: {value}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <IdeaCard
            idea={snapshot.featuredIdeas[0]}
            niche={featuredNiche}
            searchId={featuredSearchId}
          />
        </div>
      </section>
    </SiteShell>
  );
}
