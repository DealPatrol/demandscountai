import type {
  DashboardSnapshot,
  DemandIdea,
  DemandSearchResult,
  DemandSignal,
} from "@/lib/demand-scout/types";
import { createSearchId, hashString, slugify } from "@/lib/demand-scout/utils";

const sourceCatalog = [
  {
    category: "Customer complaints",
    source: "G2 review threads",
    insight:
      "Teams say core workflows still require manual exports and spreadsheet cleanup every week.",
  },
  {
    category: "Community pain points",
    source: "Founder and operator communities",
    insight:
      "Operators keep asking for a single source of truth instead of stitching tools together.",
  },
  {
    category: "Bad software reviews",
    source: "Capterra and app marketplace reviews",
    insight:
      "Users love automation promises but complain about brittle setup and zero visibility after launch.",
  },
  {
    category: "Outsourced busywork",
    source: "Freelancer job boards",
    insight:
      "Businesses repeatedly hire contractors for recurring reporting, tagging, and follow-up workflows.",
  },
  {
    category: "Competitor gaps",
    source: "Pricing pages and roadmap forums",
    insight:
      "Incumbents focus on enterprise breadth, leaving a fast mid-market wedge underserved.",
  },
] as const;

const ideaBlueprints = [
  {
    suffix: "Signal Console",
    target: "Revenue and ops teams",
    problem:
      "They cannot prioritize inbound demand signals fast enough to turn them into product bets.",
    angle:
      "Turn scattered complaints and requests into an always-on idea pipeline with explainable scoring.",
    features: [
      "Complaint clustering by job-to-be-done",
      "Pain point scorecards",
      "Competitor gap watchlist",
      "Weekly idea brief export",
    ],
  },
  {
    suffix: "Workflow Radar",
    target: "Lean service operators",
    problem:
      "They still pay people to repeat operational tasks that should already be automated.",
    angle:
      "Package repetitive back-office work into opinionated automations for a narrow niche.",
    features: [
      "Task-to-playbook conversion",
      "SLA and exception queue",
      "Operator notes and handoff history",
      "Usage-based team seats",
    ],
  },
  {
    suffix: "Review Recovery",
    target: "Product-led SaaS founders",
    problem:
      "They know their users are unhappy, but do not know which friction points are worth building for next.",
    angle:
      "Mine negative reviews and community threads for high-frequency feature gaps with monetization hints.",
    features: [
      "Review theme extraction",
      "Feature request evidence board",
      "Launch readiness checklist",
      "Pricing test recommendations",
    ],
  },
  {
    suffix: "Opportunity Copilot",
    target: "Solo builders and studios",
    problem:
      "They struggle to validate if a niche is urgent enough before committing weeks to an MVP.",
    angle:
      "Blend public demand evidence, competitor analysis, and MVP scoping into a decision cockpit.",
    features: [
      "Demand signal timeline",
      "Validation prompts",
      "Competitor differentiation map",
      "MVP effort estimator",
    ],
  },
] as const;

const pricingSuggestions = [
  "$79/mo starter, $249/mo growth",
  "$99/mo plus usage-based automations",
  "$149/mo team plan with analyst seats",
  "$299/mo with premium intelligence reports",
] as const;

const competitorPatterns = [
  "legacy suites with bloated onboarding",
  "horizontal analytics tools",
  "internal spreadsheets and Notion trackers",
  "agencies stitching Zapier and Airtable",
] as const;

function createSignals(niche: string, seed: number): DemandSignal[] {
  return sourceCatalog.map((source, index) => ({
    category: source.category,
    source: `${source.source} · ${niche}`,
    insight: `${source.insight} In ${niche}, the frustration shows up around ${[
      "reporting latency",
      "manual follow-up",
      "messy handoffs",
      "missed expansion cues",
      "opaque prioritization",
    ][(seed + index) % 5]}.`,
    evidence: `${26 + ((seed + index * 7) % 19)} mentions this month with ${
      2 + ((seed + index) % 4)
    } recurring request patterns.`,
    urgency: index % 2 === 0 ? "High" : "Medium",
  }));
}

function createIdeas(niche: string, signals: DemandSignal[], seed: number) {
  const brandRoot =
    niche
      .split(/\s+/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ") || "Demand";

  return ideaBlueprints.map<DemandIdea>((blueprint, index) => {
    const difficultyScore = 3 + ((seed + index * 5) % 6);
    const demandScore = 68 + ((seed + index * 9) % 26);
    const ideaSignals = [
      signals[index % signals.length],
      signals[(index + 2) % signals.length],
    ];

    return {
      id: `${slugify(`${brandRoot}-${blueprint.suffix}`)}-${index + 1}`,
      name: `${brandRoot} ${blueprint.suffix}`,
      targetCustomer: `${blueprint.target} working in ${niche}`,
      painPoint: `${blueprint.problem} ${niche} buyers want fewer tools and faster proof of ROI.`,
      demandProof: `${ideaSignals[0].evidence} ${ideaSignals[1].evidence}`,
      competitors: [
        `${niche} ${competitorPatterns[index % competitorPatterns.length]}`,
        `${niche} agencies offering manual service packages`,
        `${niche} niche CRMs with weak automation layers`,
      ],
      mvpFeatures: blueprint.features.map(
        (feature) => `${feature} for ${niche}`,
      ),
      difficultyScore,
      demandScore,
      pricingSuggestion:
        pricingSuggestions[(seed + index) % pricingSuggestions.length],
      validationMessage: `Launch with ${blueprint.target.toLowerCase()} already paying for manual work in ${niche}; the strongest proof comes from ${ideaSignals[0].source.toLowerCase()}.`,
      opportunityAngle: blueprint.angle,
      keySignals: ideaSignals,
    };
  });
}

export function generateMockDemandSearch(niche: string): DemandSearchResult {
  const cleanNiche = niche.trim() || "AI operations";
  const seed = hashString(cleanNiche);
  const signals = createSignals(cleanNiche, seed);
  const ideas = createIdeas(cleanNiche, signals, seed);
  const averageDifficulty =
    ideas.reduce((total, idea) => total + idea.difficultyScore, 0) / ideas.length;
  const topDemandScore = Math.max(...ideas.map((idea) => idea.demandScore));

  return {
    searchId: createSearchId(cleanNiche),
    niche: cleanNiche,
    generatedAt: new Date().toISOString(),
    summary: `${cleanNiche} shows repeatable demand around workflow friction, fragmented tools, and manual reporting that buyers already pay contractors to solve.`,
    marketThesis: `The wedge in ${cleanNiche} is not more dashboards. It is faster execution: clear pain clustering, opinionated automations, and a narrower scope than enterprise incumbents.`,
    metrics: {
      demandScore: topDemandScore,
      averageDifficulty: Number(averageDifficulty.toFixed(1)),
      signalCount: signals.length,
      ideaCount: ideas.length,
    },
    signals,
    ideas,
  };
}

const dashboardNiches = [
  "Healthcare staffing",
  "Local real estate investing",
  "Logistics back-office",
  "Creator sponsorship ops",
];

export function generateDashboardSnapshot(): DashboardSnapshot {
  const searches = dashboardNiches.map((niche) => generateMockDemandSearch(niche));
  const recentSearches = searches.map((search, index) => ({
    id: search.searchId,
    niche: search.niche,
    createdAt: `${index + 1}h ago`,
    demandScore: search.metrics.demandScore,
    ideaCount: search.ideas.length,
  }));
  const averageDemandScore =
    searches.reduce((total, search) => total + search.metrics.demandScore, 0) /
    searches.length;

  return {
    viewer: {
      name: "Analyst Mode",
      email: "demo@demandscout.ai",
      plan: "Growth",
    },
    totalSearches: recentSearches.length,
    averageDemandScore: Number(averageDemandScore.toFixed(1)),
    strongestNiche: searches[0]?.niche ?? "Undiscovered niche",
    recentSearches,
    featuredIdeas: searches.flatMap((search) => search.ideas).slice(0, 4),
  };
}
