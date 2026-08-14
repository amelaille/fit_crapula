import type { WorkoutSession } from "@/lib/types";
import ExerciseCard from "./ExerciseCard";

type WorkoutSectionProps = {
  session: WorkoutSession;
  weekId: number;
};

export default function WorkoutSection({ session, weekId }: WorkoutSectionProps) {
  return (
    <section
      id={`session-${session.id}`}
      className="scroll-mt-20 rounded-3xl border border-border bg-surface p-4 shadow-sm sm:p-6"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">
            Séance {session.id} · {session.day}
          </p>
          <h2 className="mt-0.5 text-lg font-semibold text-foreground sm:text-xl">
            {session.title}
          </h2>
        </div>
        <span className="rounded-full bg-nude px-3 py-1 text-xs font-medium text-nude-foreground">
          {session.duration}
        </span>
      </div>

      <div className="mt-4 rounded-2xl bg-accent-soft px-4 py-3.5 text-sm sm:px-5">
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
          <ExerciseCard key={exercise.id} exercise={exercise} weekId={weekId} />
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
    </section>
  );
}
