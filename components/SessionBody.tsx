import type { WorkoutSession } from "@/lib/types";
import ExerciseCard from "./ExerciseCard";

type SessionBodyProps = {
  session: WorkoutSession;
  weekId: number;
  fallback?: boolean;
  readOnly?: boolean;
};

/** Contenu d'une séance (intensité, échauffement, exercices, extra) — sans son en-tête. */
export default function SessionBody({ session, weekId, fallback, readOnly }: SessionBodyProps) {
  return (
    <>
      <div className="rounded-xl bg-accent-soft px-4 py-3.5 text-sm">
        <p className="font-medium text-accent">{session.intensityLabel}</p>
        <p className="mt-1 text-foreground/80">{session.intensityFeeling}</p>
      </div>

      {session.warmup && (
        <p className="mt-3 text-sm text-muted">
          <span className="font-medium text-foreground/80">Échauffement : </span>
          {session.warmup}
        </p>
      )}

      <div className="mt-4 flex flex-col gap-3">
        {session.exercises.map((exercise) => (
          <ExerciseCard
            key={exercise.id}
            exercise={exercise}
            weekId={weekId}
            fallback={fallback}
            readOnly={readOnly}
          />
        ))}
      </div>

      {session.extra && session.extra.length > 0 && (
        <div className="mt-4 flex flex-col gap-2">
          {session.extra.map((block) => (
            <div
              key={block.label}
              className="rounded-lg border border-border bg-background/60 px-4 py-3 text-sm flex flex-col gap-1 text-center"
            >
              <h3 className="text-base font-semibold text-foreground">{block.label}</h3>
              <span className="text-muted">{block.detail}</span>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
