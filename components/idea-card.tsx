import Link from "next/link";
import type { DemandIdea } from "@/lib/demand-scout/types";

type IdeaCardProps = {
  idea: DemandIdea;
  niche: string;
  searchId: string;
};

function ScorePill({
  label,
  score,
  tone,
}: {
  label: string;
  score: number;
  tone: "cyan" | "amber";
}) {
  return (
    <div
      className={`rounded-full border px-3 py-1 text-xs font-medium ${
        tone === "cyan"
          ? "border-cyan-300/25 bg-cyan-300/10 text-cyan-200"
          : "border-amber-300/25 bg-amber-300/10 text-amber-200"
      }`}
    >
      {label}: {score}
    </div>
  );
}

export function IdeaCard({ idea, niche, searchId }: IdeaCardProps) {
  return (
    <article className="glass-panel rounded-[28px] p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.22em] text-cyan-300/70">
            {idea.targetCustomer}
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-white">{idea.name}</h3>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
            {idea.opportunityAngle}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <ScorePill label="Demand" score={idea.demandScore} tone="cyan" />
          <ScorePill
            label="Difficulty"
            score={idea.difficultyScore}
            tone="amber"
          />
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-slate-950/55 p-4">
          <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
            Pain point
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-200">{idea.painPoint}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-slate-950/55 p-4">
          <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
            Demand proof
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-200">
            {idea.demandProof}
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl border border-white/10 bg-slate-950/55 p-4">
          <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
            MVP features
          </p>
          <ul className="mt-3 space-y-2 text-sm text-slate-200">
            {idea.mvpFeatures.map((feature) => (
              <li key={feature}>• {feature}</li>
            ))}
          </ul>
        </div>
        <div className="space-y-4 rounded-2xl border border-white/10 bg-slate-950/55 p-4">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
              Competitors
            </p>
            <ul className="mt-3 space-y-2 text-sm text-slate-200">
              {idea.competitors.map((competitor) => (
                <li key={competitor}>• {competitor}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
              Pricing suggestion
            </p>
            <p className="mt-3 text-sm text-slate-200">{idea.pricingSuggestion}</p>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-cyan-300/18 bg-cyan-300/8 p-4 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-slate-100">{idea.validationMessage}</p>
        <Link
          href={`/ideas/${idea.id}?niche=${encodeURIComponent(niche)}&searchId=${encodeURIComponent(searchId)}`}
          className="rounded-full border border-cyan-200/30 px-4 py-2 text-sm font-medium text-cyan-100 transition hover:bg-cyan-200/12"
        >
          Open idea detail
        </Link>
      </div>
    </article>
  );
}
