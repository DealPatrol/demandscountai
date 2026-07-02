export const appEnv = {
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
  openAiApiKey: process.env.OPENAI_API_KEY ?? "",
  openAiModel: process.env.OPENAI_MODEL ?? "gpt-4.1-mini",
  stripeCheckoutUrl: process.env.NEXT_PUBLIC_STRIPE_CHECKOUT_URL ?? "",
  stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID ?? "",
};

export const integrationStatus = {
  supabaseConfigured:
    appEnv.supabaseUrl.length > 0 && appEnv.supabaseAnonKey.length > 0,
  openAiConfigured: appEnv.openAiApiKey.length > 0,
  stripeConfigured:
    appEnv.stripeCheckoutUrl.length > 0 || appEnv.stripePriceId.length > 0,
};
