import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/site-shell";
import { analyzeDemandNiche } from "@/lib/demand-scout/analysis";

type IdeaDetailPageProps = {
  params: Promise<{ ideaId: string }>;
  searchParams: Promise<{ niche?: string; searchId?: string }>;
};

export default async function IdeaDetailPage({
  params,
  searchParams,
}: IdeaDetailPageProps) {
  const { ideaId } = await params;
  const { niche, searchId } = await searchParams;
  const activeNiche = niche?.trim() || "AI operations";
  const result = await analyzeDemandNiche(activeNiche);
  const idea = result.ideas.find((candidate) => candidate.id === ideaId);

  if (!idea) {
    notFound();
  }

  return (
    <SiteShell
      eyebrow="Idea detail"
      active="/dashboard"
      title={idea.name}
      description={idea.opportunityAngle}
      actions={
        <Link
          href={`/results/${searchId ?? result.searchId}?niche=${encodeURIComponent(result.niche)}`}
          className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/6"
        >
          Back to results
        </Link>
      }
    >
      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-6">
          <div className="glass-panel rounded-[30px] p-6">
            <div className="flex flex-wrap gap-3">
              <span className="rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-1 text-sm text-cyan-200">
                Demand score {idea.demandScore}
              </span>
              <span className="rounded-full border border-amber-300/25 bg-amber-300/10 px-3 py-1 text-sm text-amber-200">
                Difficulty score {idea.difficultyScore}
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-200">
                {idea.targetCustomer}
              </span>
            </div>
            <div className="mt-6 grid gap-4">
              <div className="rounded-2xl border border-white/10 bg-slate-950/55 p-4">
                <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
                  Pain point
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-200">
                  {idea.painPoint}
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-950/55 p-4">
                <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
                  Demand proof
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-200">
                  {idea.demandProof}
                </p>
              </div>
              <div className="rounded-2xl border border-cyan-300/18 bg-cyan-300/8 p-4">
                <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
                  Validation message
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-100">
                  {idea.validationMessage}
                </p>
              </div>
            </div>
          </div>

          <div className="glass-panel rounded-[30px] p-6">
            <p className="text-sm uppercase tracking-[0.22em] text-cyan-300/75">
              MVP feature stack
            </p>
            <ul className="mt-5 space-y-3 text-sm text-slate-200">
              {idea.mvpFeatures.map((feature) => (
                <li
                  key={feature}
                  className="rounded-2xl border border-white/10 bg-slate-950/55 px-4 py-3"
                >
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-panel rounded-[30px] p-6">
            <p className="text-sm uppercase tracking-[0.22em] text-cyan-300/75">
              Competitive wedge
            </p>
            <ul className="mt-5 space-y-3 text-sm text-slate-200">
              {idea.competitors.map((competitor) => (
                <li
                  key={competitor}
                  className="rounded-2xl border border-white/10 bg-slate-950/55 px-4 py-3"
                >
                  {competitor}
                </li>
              ))}
            </ul>
            <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/55 p-4">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
                Pricing suggestion
              </p>
              <p className="mt-3 text-sm text-slate-200">
                {idea.pricingSuggestion}
              </p>
            </div>
          </div>

          <div className="glass-panel rounded-[30px] p-6">
            <p className="text-sm uppercase tracking-[0.22em] text-cyan-300/75">
              Signals behind the score
            </p>
            <div className="mt-5 space-y-4">
              {idea.keySignals.map((signal) => (
                <div
                  key={`${signal.category}-${signal.source}`}
                  className="rounded-2xl border border-white/10 bg-slate-950/55 p-4"
                >
                  <p className="text-sm font-semibold text-white">
                    {signal.category}
                  </p>
                  <p className="mt-2 text-sm text-cyan-200">{signal.source}</p>
                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    {signal.insight}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
