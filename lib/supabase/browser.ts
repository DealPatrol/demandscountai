import { createBrowserClient } from "@supabase/ssr";
import { appEnv, integrationStatus } from "@/lib/env";

let browserClient: ReturnType<typeof createBrowserClient> | null = null;

export function getSupabaseBrowserClient() {
  if (!integrationStatus.supabaseConfigured) {
    return null;
  }

  if (!browserClient) {
    browserClient = createBrowserClient(
      appEnv.supabaseUrl,
      appEnv.supabaseAnonKey,
    );
  }

  return browserClient;
}
