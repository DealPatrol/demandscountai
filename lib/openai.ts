import OpenAI from "openai";
import { appEnv } from "@/lib/env";

export function getOpenAiClient() {
  if (!appEnv.openAiApiKey) {
    return null;
  }

  return new OpenAI({
    apiKey: appEnv.openAiApiKey,
  });
}
