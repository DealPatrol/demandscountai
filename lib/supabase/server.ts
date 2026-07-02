import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { appEnv, integrationStatus } from "@/lib/env";

export async function getSupabaseServerClient() {
  if (!integrationStatus.supabaseConfigured) {
    return null;
  }

  const cookieStore = await cookies();

  return createServerClient(appEnv.supabaseUrl, appEnv.supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {}
      },
    },
  });
}
