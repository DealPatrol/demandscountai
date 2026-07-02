import type { DemandIdea, DemandSearchResult } from "@/lib/demand-scout/types";
import {
  generateDashboardSnapshot,
  generateMockDemandSearch,
} from "@/lib/demand-scout/mock-data";
import { appEnv } from "@/lib/env";
import { getOpenAiClient } from "@/lib/openai";
import { getSupabaseServerClient } from "@/lib/supabase/server";

function coerceText(value: unknown, fallback: string) {
  return typeof value === "string" && value.trim().length > 0
    ? value.trim()
    : fallback;
}

function coerceStringArray(value: unknown, fallback: string[]) {
  return Array.isArray(value) && value.every((item) => typeof item === "string")
    ? value
    : fallback;
}

function coerceScore(
  value: unknown,
  fallback: number,
  minimum: number,
  maximum: number,
) {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return fallback;
  }

  return Math.min(maximum, Math.max(minimum, Math.round(value)));
}

function mergeIdeas(
  ideas: DemandIdea[],
  candidate: unknown,
  signals: DemandSearchResult["signals"],
) {
  if (!Array.isArray(candidate)) {
    return ideas;
  }

  return ideas.map((idea, index) => {
    const next = candidate[index];
    if (!next || typeof next !== "object") {
      return idea;
    }

    const item = next as Record<string, unknown>;

    return {
      ...idea,
      name: coerceText(item.name, idea.name),
      targetCustomer: coerceText(item.targetCustomer, idea.targetCustomer),
      painPoint: coerceText(item.painPoint, idea.painPoint),
      demandProof: coerceText(item.demandProof, idea.demandProof),
      competitors: coerceStringArray(item.competitors, idea.competitors),
      mvpFeatures: coerceStringArray(item.mvpFeatures, idea.mvpFeatures),
      difficultyScore: coerceScore(
        item.difficultyScore,
        idea.difficultyScore,
        1,
        10,
      ),
      demandScore: coerceScore(item.demandScore, idea.demandScore, 1, 100),
      pricingSuggestion: coerceText(
        item.pricingSuggestion,
        idea.pricingSuggestion,
      ),
      validationMessage: coerceText(
        item.validationMessage,
        idea.validationMessage,
      ),
      opportunityAngle: coerceText(item.opportunityAngle, idea.opportunityAngle),
      keySignals: idea.keySignals.length > 0 ? idea.keySignals : signals.slice(0, 2),
    };
  });
}

async function enrichWithOpenAi(mockResult: DemandSearchResult) {
  const client = getOpenAiClient();

  if (!client) {
    return mockResult;
  }

  try {
    const completion = await client.chat.completions.create({
      model: appEnv.openAiModel,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            "You are a SaaS market intelligence analyst. Return compact JSON with summary, marketThesis, and ideas. Each idea must include name, targetCustomer, painPoint, demandProof, competitors, mvpFeatures, difficultyScore, demandScore, pricingSuggestion, validationMessage, and opportunityAngle.",
        },
        {
          role: "user",
          content: JSON.stringify({
            niche: mockResult.niche,
            signals: mockResult.signals,
            fallbackIdeas: mockResult.ideas,
          }),
        },
      ],
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      return mockResult;
    }

    const parsed = JSON.parse(content) as Record<string, unknown>;
    const nextIdeas = mergeIdeas(mockResult.ideas, parsed.ideas, mockResult.signals);

    return {
      ...mockResult,
      summary: coerceText(parsed.summary, mockResult.summary),
      marketThesis: coerceText(parsed.marketThesis, mockResult.marketThesis),
      ideas: nextIdeas,
      metrics: {
        ...mockResult.metrics,
        demandScore: Math.max(...nextIdeas.map((idea) => idea.demandScore)),
        averageDifficulty: Number(
          (
            nextIdeas.reduce((total, idea) => total + idea.difficultyScore, 0) /
            nextIdeas.length
          ).toFixed(1),
        ),
      },
    };
  } catch {
    return mockResult;
  }
}

export async function analyzeDemandNiche(niche: string) {
  const mockResult = generateMockDemandSearch(niche);
  return enrichWithOpenAi(mockResult);
}

export async function getDashboardSnapshot() {
  const fallback = generateDashboardSnapshot();
  const supabase = await getSupabaseServerClient();

  if (!supabase) {
    return fallback;
  }

  try {
    const { data: userData } = await supabase.auth.getUser();
    const { data: searches } = await supabase
      .from("search_runs")
      .select("search_id,niche,demand_score,idea_count,created_at")
      .order("created_at", { ascending: false })
      .limit(4);

    if (!searches || searches.length === 0) {
      return {
        ...fallback,
        viewer: {
          name: userData.user?.email?.split("@")[0] ?? fallback.viewer.name,
          email: userData.user?.email ?? fallback.viewer.email,
          plan: fallback.viewer.plan,
        },
      };
    }

    const averageDemandScore =
      searches.reduce((total, search) => total + Number(search.demand_score ?? 0), 0) /
      searches.length;

    return {
      ...fallback,
      viewer: {
        name: userData.user?.email?.split("@")[0] ?? fallback.viewer.name,
        email: userData.user?.email ?? fallback.viewer.email,
        plan: fallback.viewer.plan,
      },
      totalSearches: searches.length,
      averageDemandScore: Number(averageDemandScore.toFixed(1)),
      strongestNiche: searches[0]?.niche ?? fallback.strongestNiche,
      recentSearches: searches.map((search) => ({
        id: String(search.search_id),
        niche: String(search.niche),
        createdAt: new Date(String(search.created_at)).toLocaleDateString(),
        demandScore: Number(search.demand_score ?? 0),
        ideaCount: Number(search.idea_count ?? fallback.featuredIdeas.length),
      })),
    };
  } catch {
    return fallback;
  }
}
