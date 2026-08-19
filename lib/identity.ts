import type { AppUser } from "./types";

/** Associe chaque compte Supabase (email) à son identité dans l'app. */
export const USER_EMAILS: Record<AppUser, string> = {
  amelie: "ameliehp03@gmail.com",
  sena: "fandresena2027@gmail.com",
};

export function emailToUser(email: string | undefined | null): AppUser | null {
  const entry = (Object.entries(USER_EMAILS) as [AppUser, string][]).find(
    ([, userEmail]) => userEmail.toLowerCase() === email?.toLowerCase()
  );
  return entry?.[0] ?? null;
}
