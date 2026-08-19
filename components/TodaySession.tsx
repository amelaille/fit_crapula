"use client";

import { getCurrentWeekId, getTodayName } from "@/lib/dates";
import { weeklySchedule, getSessionById } from "@/data/workouts";
import WorkoutSection from "./WorkoutSection";

/** Séance du jour avec les vrais exercices, pré-remplis avec la dernière charge connue. */
export default function TodaySession() {
  const weekId = getCurrentWeekId();
  const dayName = getTodayName();
  const scheduleEntry = weeklySchedule.find((s) => s.day === dayName);
  const session = scheduleEntry?.sessionId ? getSessionById(scheduleEntry.sessionId) : undefined;

  if (!session) {
    return (
      <div className="rounded-2xl border border-border bg-background/60 p-4 text-sm text-foreground/85">
        Aujourd&apos;hui ({dayName}) : {scheduleEntry?.label ?? "repos"} — pas de séance de
        musculation.
      </div>
    );
  }

  return <WorkoutSection session={session} weekId={weekId} fallback />;
}
