import "server-only";
import { cache } from "react";
import { headers } from "next/headers";
import type { AppUser } from "./types";
import { emailToUser } from "./identity";
import { createClient } from "./supabase/server";

/**
 * Utilisateur courant (Amélie ou Sena), à appeler depuis un Server Component / Route Handler.
 * Le proxy vérifie déjà la session à chaque requête et transmet l'email via un header —
 * on le relit ici au lieu de rappeler Supabase Auth (évite un aller-retour réseau en double
 * par navigation). Mis en cache par requête : layout + page peuvent l'appeler sans coût
 * supplémentaire. Repli sur un vrai appel Supabase uniquement si le header est absent
 * (cas rare, hors du chemin normal passant par le proxy).
 */
export const getCurrentUser = cache(async (): Promise<AppUser | null> => {
  const headerEmail = (await headers()).get("x-user-email");
  if (headerEmail !== null) {
    return emailToUser(headerEmail || null);
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return emailToUser(user?.email);
});
