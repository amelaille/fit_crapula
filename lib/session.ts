import "server-only";
import type { AppUser } from "./types";
import { emailToUser } from "./identity";
import { createClient } from "./supabase/server";

/** Utilisateur courant (Amélie ou Sena), à appeler depuis un Server Component / Route Handler. */
export async function getCurrentUser(): Promise<AppUser | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return emailToUser(user?.email);
}
