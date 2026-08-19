"use server";

import { redirect } from "next/navigation";
import type { AppUser } from "./types";
import { USER_EMAILS } from "./identity";
import { createClient } from "./supabase/server";

export async function login(
  user: AppUser,
  password: string
): Promise<{ error: string } | undefined> {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: USER_EMAILS[user],
    password,
  });

  if (error) {
    return { error: "Mot de passe incorrect." };
  }

  redirect("/");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
