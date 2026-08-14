"use client";

import { useState } from "react";
import { copyLoadsFromWeek, getLoadsForWeek } from "@/lib/storage";
import { workoutSessions } from "@/data/workouts";
import WorkoutSection from "./WorkoutSection";

type WeekWorkoutsProps = {
  weekId: number;
  previousWeekId: number | null;
};

export default function WeekWorkouts({ weekId, previousWeekId }: WeekWorkoutsProps) {
  const [refreshKey, setRefreshKey] = useState(0);
  const [message, setMessage] = useState<string | null>(null);

  function handleCopy() {
    if (previousWeekId === null) return;
    const previousLoads = getLoadsForWeek(previousWeekId);
    if (previousLoads.length === 0) {
      setMessage(`Aucune charge enregistrée en semaine ${previousWeekId}.`);
      setTimeout(() => setMessage(null), 2500);
      return;
    }
    copyLoadsFromWeek(previousWeekId, weekId);
    setRefreshKey((k) => k + 1);
    setMessage(`Charges de la semaine ${previousWeekId} copiées.`);
    setTimeout(() => setMessage(null), 2500);
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={handleCopy}
          disabled={previousWeekId === null}
          className="rounded-full border border-accent bg-accent-soft px-4 py-2 text-sm font-medium text-accent transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
        >
          Copier les charges de la semaine {previousWeekId ?? "précédente"}
        </button>
        {message && <span className="text-sm text-muted">{message}</span>}
      </div>

      <div key={refreshKey} className="flex flex-col gap-5">
        {workoutSessions.map((session) => (
          <WorkoutSection key={session.id} session={session} weekId={weekId} />
        ))}
      </div>
    </div>
  );
}
