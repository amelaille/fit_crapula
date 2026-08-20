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
      <div className="rounded-2xl bg-accent-soft px-4 py-3.5 text-sm sm:px-5">
        <p className="font-medium text-accent">{session.intensityLabel}</p>
        <p className="mt-1 text-foreground/80">{session.intensityFeeling}</p>
      </div>

      {session.warmup && (
        <p className="mt-3 text-sm text-muted">
          <span className="font-medium text-foreground/80">Échauffement : </span>
          {session.warmup}
        </p>
      )}

      {session.note && (
        <p className="mt-3 text-sm leading-relaxed text-foreground/75">{session.note}</p>
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
              className="rounded-2xl border border-dashed border-border px-4 py-3 text-sm"
            >
              <span className="font-semibold text-foreground">{block.label} — </span>
              <span className="text-foreground/80">{block.detail}</span>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
