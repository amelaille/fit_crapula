import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { notFound, redirect } from "next/navigation";
import { weeks, getWeekById } from "@/data/weeks";
import { getPhaseById } from "@/data/program";
import WeekSessions from "@/components/WeekSessions";
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
    <div className="flex flex-col gap-4">

      {/* Navigation semaine precedente et suivante*/}
      <div className="flex items-center justify-between">
        {previousWeekId ? (
          <Link
            href={`/semaine/${previousWeekId}`}
            className="flex items-center gap-1 px-3.5 py-2 text-sm font-medium text-nude hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4" />
            Semaine {previousWeekId}
          </Link>
        ) : (
          <span />
        )}
        <div className="flex gap-1.5">
          {weeks.map((w) => (
            <Link
              key={w.id}
              href={`/semaine/${w.id}`}
              className={`hidden h-2 w-2 rounded-full sm:block ${w.id === weekId ? "bg-accent" : "bg-border"
                }`}
              aria-label={`Semaine ${w.id}`}
            />
          ))}
        </div>
        {nextWeekId ? (
          <Link
            href={`/semaine/${nextWeekId}`}
            className="flex items-center gap-1 px-3.5 py-2 text-sm font-medium text-foreground text-nude hover:text-accent"
          >
            Semaine {nextWeekId}
            <ArrowRight className="h-4 w-4" />
          </Link>
        ) : (
          <span />
        )}
      </div>

      {/* Présentation de la semaine */}
      <header className="rounded-2xl border border-border bg-surface p-5 shadow-sm text-center">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
            Semaine {week.id} / 12
          </span>
          <span className="rounded-full bg-nude px-3 py-1 text-xs font-medium text-nude-foreground">
            Mois {phase.id} - {phase.name}
          </span>
          {week.isDeload && (
            <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent">
              Semaine de décharge
            </span>
          )}
          {week.isPhotoWeek && (
            <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent">
              📸 Photos et mensurations
            </span>
          )}
        </div>

        <h1 className="mt-3 text-xl font-semibold text-foreground sm:text-3xl text-center">
          {week.focus}
        </h1>

        <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4 text-center">
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
          <div className="mt-4 rounded-2xl py-3 text-sm">
            <p className="font-medium text-accent underline">Ajustements des séances</p>
            <ul className="mt-1.5 flex flex-col gap-1 text-foreground/80">
              {week.trainingAdjustments.map((adj) => (
                <li key={adj} className="flex justify-center gap-2">
                  <span className="text-accent">•</span>
                  {adj}
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>

      {/* Séances de la semaine */}
      <WeekSessions weekId={week.id} phaseId={phase.id} />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-border/40 bg-background/70 px-3 py-3">
      <p className="text-[0.68rem] font-medium uppercase tracking-wide text-muted">
        {label}
      </p>
      <p className="mt-0.5 text-sm font-semibold text-foreground">{value}</p>
    </div>
  );
}
