import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { weeks, getWeekById } from "@/data/weeks";
import { getPhaseById } from "@/data/program";
import WeekWorkouts from "@/components/WeekWorkouts";
import { getCurrentUser } from "@/lib/session";

export function generateStaticParams() {
  return weeks.map((w) => ({ id: String(w.id) }));
}

export default async function WeekPage(props: PageProps<"/semaine/[id]">) {
  const currentUser = await getCurrentUser();
  if (currentUser !== "amelie") redirect("/suivi");

  const { id } = await props.params;
  const weekId = Number(id);

  if (!Number.isInteger(weekId) || weekId < 1 || weekId > 12) {
    notFound();
  }

  const week = getWeekById(weekId);
  const phase = getPhaseById(week.phaseId);
  const previousWeekId = weekId > 1 ? weekId - 1 : null;
  const nextWeekId = weekId < 12 ? weekId + 1 : null;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <Link
          href={previousWeekId ? `/semaine/${previousWeekId}` : "#"}
          aria-disabled={!previousWeekId}
          className={`flex items-center gap-1 rounded-full border border-border px-3.5 py-2 text-sm font-medium ${
            previousWeekId
              ? "text-foreground hover:bg-nude/60"
              : "pointer-events-none text-muted/40"
          }`}
        >
          ← Semaine {previousWeekId ?? ""}
        </Link>
        <div className="flex gap-1.5">
          {weeks.map((w) => (
            <Link
              key={w.id}
              href={`/semaine/${w.id}`}
              className={`hidden h-2 w-2 rounded-full sm:block ${
                w.id === weekId ? "bg-accent" : "bg-border"
              }`}
              aria-label={`Semaine ${w.id}`}
            />
          ))}
        </div>
        <Link
          href={nextWeekId ? `/semaine/${nextWeekId}` : "#"}
          aria-disabled={!nextWeekId}
          className={`flex items-center gap-1 rounded-full border border-border px-3.5 py-2 text-sm font-medium ${
            nextWeekId
              ? "text-foreground hover:bg-nude/60"
              : "pointer-events-none text-muted/40"
          }`}
        >
          Semaine {nextWeekId ?? ""} →
        </Link>
      </div>

      <header className="rounded-3xl border border-border bg-surface p-5 shadow-sm sm:p-7">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
            Semaine {week.id} / 12
          </span>
          <span className="rounded-full bg-nude px-3 py-1 text-xs font-medium text-nude-foreground">
            Mois {phase.id} · {phase.name}
          </span>
          {week.isDeload && (
            <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent">
              Semaine de décharge
            </span>
          )}
          {week.isPhotoWeek && (
            <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent">
              📸 Photos & mensurations
            </span>
          )}
        </div>

        <h1 className="mt-3 text-2xl font-semibold text-foreground sm:text-3xl">
          {week.focus}
        </h1>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat label="Calories training" value={`${week.caloriesTraining} kcal`} />
          <Stat label="Calories repos" value={`${week.caloriesRest} kcal`} />
          <Stat label="Marche/jour" value={`${week.walkMinutes} min`} />
          <Stat label="Objectif du mois" value={phase.objective} />
        </div>

        {week.notes.length > 0 && (
          <ul className="mt-4 flex flex-col gap-1.5 text-sm text-foreground/85">
            {week.notes.map((note) => (
              <li key={note} className="flex gap-2">
                <span className="text-accent">•</span>
                {note}
              </li>
            ))}
          </ul>
        )}

        {week.trainingAdjustments && week.trainingAdjustments.length > 0 && (
          <div className="mt-4 rounded-2xl bg-nude/60 px-4 py-3 text-sm">
            <p className="font-medium text-foreground">Ajustements de la séance ce mois-ci</p>
            <ul className="mt-1.5 flex flex-col gap-1 text-foreground/80">
              {week.trainingAdjustments.map((adj) => (
                <li key={adj}>— {adj}</li>
              ))}
            </ul>
          </div>
        )}
      </header>

      <WeekWorkouts weekId={week.id} previousWeekId={previousWeekId} />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-background/70 px-3.5 py-3">
      <p className="text-[0.68rem] font-medium uppercase tracking-wide text-muted">
        {label}
      </p>
      <p className="mt-0.5 text-base font-semibold text-foreground">{value}</p>
    </div>
  );
}
