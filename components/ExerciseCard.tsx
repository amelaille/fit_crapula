import type { Exercise } from "@/lib/types";
import EditableLoad from "./EditableLoad";
import ReadOnlyLoad from "./ReadOnlyLoad";
import { Sparkles } from "lucide-react";

type ExerciseCardProps = {
  exercise: Exercise;
  weekId: number;
  fallback?: boolean;
  readOnly?: boolean;
};

export default function ExerciseCard({ exercise, weekId, fallback, readOnly }: ExerciseCardProps) {
  return (
    <div className="rounded-lg border border-border bg-background/60 p-4">
      <div className="flex flex-col items-center gap-1 mb-4">
        <h3 className="font-semibold text-foreground">{exercise.name}</h3>
        <div className="flex flex-wrap gap-2">
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
      <div className="flex flex-row justify-center mt-1.5 text-sm text-muted gap-3">
        <p className="">
          {exercise.sets} × {exercise.reps}
        </p>
        <Sparkles className="h-4 w-4 text-accent" />
        <p className="">
          Repos {exercise.rest}
        </p>
      </div>

      {exercise.note && (
        <p className="mt-2 text-sm text-foreground/75">{exercise.note}</p>
      )}

      <div className="mt-2 border-t border-border pt-4">
        {readOnly ? (
          <ReadOnlyLoad exerciseId={exercise.id} weekId={weekId} />
        ) : (
          <EditableLoad exerciseId={exercise.id} weekId={weekId} fallback={fallback} />
        )}
      </div>
    </div>
  );
}
