import type { Exercise } from "@/lib/types";
import EditableLoad from "./EditableLoad";
import ReadOnlyLoad from "./ReadOnlyLoad";

type ExerciseCardProps = {
  exercise: Exercise;
  weekId: number;
  fallback?: boolean;
  readOnly?: boolean;
};

export default function ExerciseCard({ exercise, weekId, fallback, readOnly }: ExerciseCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-background/60 p-4 sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <h3 className="font-semibold text-foreground">{exercise.name}</h3>
        <div className="flex flex-wrap gap-1.5">
          {exercise.rir && (
            <span className="rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-medium text-accent">
              {exercise.rir}
            </span>
          )}
          {exercise.tempo && (
            <span className="rounded-full bg-nude px-2.5 py-0.5 text-xs font-medium text-nude-foreground">
              Tempo {exercise.tempo}
            </span>
          )}
        </div>
      </div>

      <p className="mt-1.5 text-sm text-muted">
        {exercise.sets} × {exercise.reps} · repos {exercise.rest}
      </p>

      {exercise.note && (
        <p className="mt-2 text-sm italic text-foreground/75">{exercise.note}</p>
      )}

      <div className="mt-3.5 border-t border-border pt-3.5">
        {readOnly ? (
          <ReadOnlyLoad exerciseId={exercise.id} weekId={weekId} />
        ) : (
          <EditableLoad exerciseId={exercise.id} weekId={weekId} fallback={fallback} />
        )}
      </div>
    </div>
  );
}
