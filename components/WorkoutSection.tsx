import type { WorkoutSession } from "@/lib/types";
import SessionBody from "./SessionBody";

type WorkoutSectionProps = {
  session: WorkoutSession;
  weekId: number;
  fallback?: boolean;
};

export default function WorkoutSection({ session, weekId, fallback }: WorkoutSectionProps) {
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

      <div className="mt-4">
        <SessionBody session={session} weekId={weekId} fallback={fallback} />
      </div>
    </section>
  );
}
