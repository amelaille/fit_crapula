import type { AppUser, ExerciseLoad, WeightEntry, WeekComment } from "./types";
import { supabase } from "./supabase/client";

// Toutes les fonctions parlent à Supabase (Postgres). Elles sont async et
// pensées pour être appelées depuis des Client Components ("use client").

// ---------- Charges (ExerciseLoad) ----------

export async function getLoads(): Promise<ExerciseLoad[]> {
  const { data, error } = await supabase
    .from("exercise_loads")
    .select("exercise_id, week_id, weight, reps, done");
  if (error) throw error;
  return (data ?? []).map(rowToLoad);
}

export async function getLoadsForWeek(weekId: number): Promise<ExerciseLoad[]> {
  const { data, error } = await supabase
    .from("exercise_loads")
    .select("exercise_id, week_id, weight, reps, done")
    .eq("week_id", weekId);
  if (error) throw error;
  return (data ?? []).map(rowToLoad);
}

export async function getLoad(
  exerciseId: string,
  weekId: number
): Promise<ExerciseLoad | undefined> {
  const { data, error } = await supabase
    .from("exercise_loads")
    .select("exercise_id, week_id, weight, reps, done")
    .eq("exercise_id", exerciseId)
    .eq("week_id", weekId)
    .maybeSingle();
  if (error) throw error;
  return data ? rowToLoad(data) : undefined;
}

export async function setLoad(load: ExerciseLoad): Promise<void> {
  const { error } = await supabase.from("exercise_loads").upsert({
    exercise_id: load.exerciseId,
    week_id: load.weekId,
    weight: load.weight,
    reps: load.reps,
    done: load.done,
  });
  if (error) throw error;
}

/** Copie toutes les charges de `fromWeekId` vers `toWeekId` (écrase les existantes). */
export async function copyLoadsFromWeek(
  fromWeekId: number,
  toWeekId: number
): Promise<void> {
  const source = await getLoadsForWeek(fromWeekId);
  if (source.length === 0) return;
  const copied = source.map((l) => ({
    exercise_id: l.exerciseId,
    week_id: toWeekId,
    weight: l.weight,
    reps: l.reps,
    done: false,
  }));
  const { error } = await supabase.from("exercise_loads").upsert(copied);
  if (error) throw error;
}

function rowToLoad(row: {
  exercise_id: string;
  week_id: number;
  weight: number | null;
  reps: string | null;
  done: boolean;
}): ExerciseLoad {
  return {
    exerciseId: row.exercise_id,
    weekId: row.week_id,
    weight: row.weight,
    reps: row.reps,
    done: row.done,
  };
}

// ---------- Poids (WeightEntry) ----------
// Renvoie les entrées de tout le monde : tout le monde voit les stats de tout le monde.

export async function getWeights(): Promise<WeightEntry[]> {
  const { data, error } = await supabase
    .from("weight_entries")
    .select("app_user, week_id, weight, entry_date")
    .order("week_id", { ascending: true });
  if (error) throw error;
  return (data ?? []).map((row) => ({
    user: row.app_user,
    weekId: row.week_id,
    weight: row.weight,
    date: row.entry_date,
  }));
}

export async function addWeight(entry: WeightEntry): Promise<void> {
  const { error } = await supabase.from("weight_entries").upsert({
    app_user: entry.user,
    week_id: entry.weekId,
    weight: entry.weight,
    entry_date: entry.date,
  });
  if (error) throw error;
}

// ---------- Commentaires hebdomadaires ----------

export async function getComments(): Promise<WeekComment[]> {
  const { data, error } = await supabase
    .from("week_comments")
    .select("app_user, week_id, text, updated_at");
  if (error) throw error;
  return (data ?? []).map((row) => ({
    user: row.app_user,
    weekId: row.week_id,
    text: row.text,
    updatedAt: row.updated_at,
  }));
}

export async function getComment(
  user: AppUser,
  weekId: number
): Promise<WeekComment | undefined> {
  const { data, error } = await supabase
    .from("week_comments")
    .select("app_user, week_id, text, updated_at")
    .eq("app_user", user)
    .eq("week_id", weekId)
    .maybeSingle();
  if (error) throw error;
  return data
    ? { user: data.app_user, weekId: data.week_id, text: data.text, updatedAt: data.updated_at }
    : undefined;
}

export async function setComment(
  user: AppUser,
  weekId: number,
  text: string
): Promise<void> {
  const { error } = await supabase.from("week_comments").upsert({
    app_user: user,
    week_id: weekId,
    text,
    updated_at: new Date().toISOString(),
  });
  if (error) throw error;
}

// ---------- Semaine active ----------

export async function getActiveWeek(): Promise<number> {
  const { data, error } = await supabase
    .from("app_state")
    .select("active_week")
    .eq("id", 1)
    .maybeSingle();
  if (error) throw error;
  return data?.active_week ?? 1;
}

export async function setActiveWeek(weekId: number): Promise<void> {
  const { error } = await supabase
    .from("app_state")
    .upsert({ id: 1, active_week: weekId });
  if (error) throw error;
}
