import Link from "next/link";
import { IdeaCard } from "@/components/idea-card";
import { MetricCard } from "@/components/metric-card";
import { SiteShell } from "@/components/site-shell";
import { analyzeDemandNiche } from "@/lib/demand-scout/analysis";

type ResultsPageProps = {
  params: Promise<{ searchId: string }>;
  searchParams: Promise<{ niche?: string }>;
};

export default async function ResultsPage({
  params,
  searchParams,
}: ResultsPageProps) {
  const { searchId } = await params;
  const { niche } = await searchParams;
  const activeNiche = niche?.trim() || searchId.replaceAll("-", " ");
  const result = await analyzeDemandNiche(activeNiche);

  return (
    <SiteShell
      eyebrow="Results"
      active="/search/new"
      title={`Demand scan: ${result.niche}`}
      description={result.summary}
      actions={
        <Link
          href="/search/new"
          className="rounded-full bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
        >
          Run another scan
        </Link>
      }
    >
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Top demand score"
          value={String(result.metrics.demandScore)}
          helper="Highest-scoring idea from the current search."
        />
        <MetricCard
          label="Average difficulty"
          value={result.metrics.averageDifficulty.toFixed(1)}
          helper="Estimated effort to ship a narrow MVP."
        />
        <MetricCard
          label="Signals analyzed"
          value={String(result.metrics.signalCount)}
          helper="Mocked demand sources combined into one brief."
        />
        <MetricCard
          label="Ideas generated"
          value={String(result.metrics.ideaCount)}
          helper="Concepts ranked by urgency and buildability."
        />
      </section>

      <section className="mt-8 grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="glass-panel rounded-[30px] p-6">
          <p className="text-sm uppercase tracking-[0.22em] text-cyan-300/75">
            Market thesis
          </p>
          <p className="mt-4 text-base leading-8 text-slate-200">
            {result.marketThesis}
          </p>

          <div className="mt-6 space-y-4">
            {result.signals.map((signal) => (
              <div
                key={`${signal.category}-${signal.source}`}
                className="rounded-2xl border border-white/10 bg-slate-950/55 p-4"
              >
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <p className="text-sm font-semibold text-white">
                    {signal.category}
                  </p>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200">
                    {signal.urgency} urgency
                  </span>
                </div>
                <p className="mt-2 text-sm text-cyan-200">{signal.source}</p>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {signal.insight}
                </p>
                <p className="mt-3 text-sm text-slate-400">{signal.evidence}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {result.ideas.map((idea) => (
            <IdeaCard
              key={idea.id}
              idea={idea}
              niche={result.niche}
              searchId={result.searchId || searchId}
            />
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
