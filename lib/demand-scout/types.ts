export type DemandSignalCategory =
  | "Customer complaints"
  | "Community pain points"
  | "Bad software reviews"
  | "Outsourced busywork"
  | "Competitor gaps";

export type DemandSignal = {
  category: DemandSignalCategory;
  source: string;
  insight: string;
  evidence: string;
  urgency: "High" | "Medium";
};

export type DemandIdea = {
  id: string;
  name: string;
  targetCustomer: string;
  painPoint: string;
  demandProof: string;
  competitors: string[];
  mvpFeatures: string[];
  difficultyScore: number;
  demandScore: number;
  pricingSuggestion: string;
  validationMessage: string;
  opportunityAngle: string;
  keySignals: DemandSignal[];
};

export type DemandSearchResult = {
  searchId: string;
  niche: string;
  generatedAt: string;
  summary: string;
  marketThesis: string;
  metrics: {
    demandScore: number;
    averageDifficulty: number;
    signalCount: number;
    ideaCount: number;
  };
  signals: DemandSignal[];
  ideas: DemandIdea[];
};

export type DashboardSnapshot = {
  viewer: {
    name: string;
    email: string;
    plan: string;
  };
  totalSearches: number;
  averageDemandScore: number;
  strongestNiche: string;
  recentSearches: Array<{
    id: string;
    niche: string;
    createdAt: string;
    demandScore: number;
    ideaCount: number;
  }>;
  featuredIdeas: DemandIdea[];
};
