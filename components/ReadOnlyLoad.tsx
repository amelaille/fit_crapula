"use client";

import { useEffect, useState } from "react";
import { getLoad } from "@/lib/storage";
import type { ExerciseLoad } from "@/lib/types";

type ReadOnlyLoadProps = {
  exerciseId: string;
  weekId: number;
};

/** Repère visuel (charge, reps) pour un exercice — lecture seule, tiret par défaut si rien d'enregistré. */
export default function ReadOnlyLoad({ exerciseId, weekId }: ReadOnlyLoadProps) {
  const [load, setLoad] = useState<ExerciseLoad | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    getLoad(exerciseId, weekId)
      .then((existing) => {
        if (!cancelled) setLoad(existing);
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : String(err));
      });
    return () => {
      cancelled = true;
    };
  }, [exerciseId, weekId]);

  if (error) {
    return <p className="text-xs text-nude">Erreur de chargement : {error}</p>;
  }

  return (
    <div className="flex flex-wrap items-center gap-4 sm:gap-6">
      <div className="flex flex-col gap-1">
        <span className="text-[0.68rem] font-medium uppercase tracking-wide text-muted">
          Charge (kg)
        </span>
        <span className="text-base font-semibold text-foreground">
          {load?.weight != null ? `${load.weight} kg` : "—"}
        </span>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-[0.68rem] font-medium uppercase tracking-wide text-muted">
          Reps réelles
        </span>
        <span className="text-base font-semibold text-foreground">{load?.reps || "—"}</span>
      </div>
    </div>
  );
}
