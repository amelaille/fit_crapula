"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getActiveWeek, setActiveWeek, getWeights } from "@/lib/storage";
import { getWeekById } from "@/data/weeks";
import { getPhaseById, weeklyRecap, fridayWalkBonus } from "@/data/program";
import { weeklySchedule } from "@/data/workouts";
import type { AppUser, WeightEntry } from "@/lib/types";
import WeekSelector from "./WeekSelector";
import WeightChart from "./WeightChart";

const DAY_NAMES = [
  "Dimanche",
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
];

export default function DashboardClient({ currentUser }: { currentUser: AppUser }) {
  const isAmelie = currentUser === "amelie";
  const [weekId, setWeekId] = useState(1);
  const [weights, setWeights] = useState<WeightEntry[]>([]);

  useEffect(() => {
    (async () => {
      const [week, weightEntries] = await Promise.all([getActiveWeek(), getWeights()]);
      setWeekId(week);
      setWeights(weightEntries.filter((w) => w.user === currentUser));
    })();
  }, [currentUser]);

  function handleWeekChange(id: number) {
    setWeekId(id);
    setActiveWeek(id).catch(console.error);
  }

  const week = getWeekById(weekId);
  const phase = getPhaseById(week.phaseId);

  const todayName = DAY_NAMES[new Date().getDay()];
  const recap = weeklyRecap.find((r) => r.day === todayName) ?? weeklyRecap[0];
  const scheduleEntry = weeklySchedule.find((s) => s.day === todayName);
  const todayCalories =
    recap.caloriesType === "training" ? week.caloriesTraining : week.caloriesRest;
  const todayWalk = week.walkMinutes + (recap.walkType === "friday" ? fridayWalkBonus : 0);

  const sortedWeights = [...weights].sort((a, b) => a.weekId - b.weekId);
  const firstWeight = sortedWeights[0];
  const lastWeight = sortedWeights[sortedWeights.length - 1];
  const variation =
    lastWeight && firstWeight && lastWeight.weekId !== firstWeight.weekId
      ? Math.round((lastWeight.weight - firstWeight.weight) * 10) / 10
      : null;

  return (
    <div className="flex flex-col gap-6">
      {isAmelie && (
        <>
          {/* Semaine en cours */}
          <section className="rounded-3xl border border-border bg-surface p-5 shadow-sm sm:p-7">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-accent">
                  Semaine en cours
                </p>
                <h2 className="mt-0.5 text-xl font-semibold text-foreground">
                  Semaine {week.id} · Mois {phase.id} — {phase.name}
                </h2>
              </div>
              <WeekSelector value={weekId} onChange={handleWeekChange} label="Changer de semaine" />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
              <Stat label="Aujourd'hui" value={todayName} />
              <Stat label="Calories du jour" value={`${todayCalories} kcal`} />
              <Stat label="Marche" value={`${todayWalk} min`} />
            </div>
            <Link
              href={`/semaine/${week.id}`}
              className="mt-4 inline-flex items-center gap-1 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground"
            >
              Voir le détail de la semaine →
            </Link>
          </section>

          {/* Rappel du jour */}
          <section className="rounded-3xl border border-border bg-surface p-5 shadow-sm sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-wide text-accent">
              Rappel du jour ({todayName})
            </p>
            <h3 className="mt-1 text-lg font-semibold text-foreground">{recap.session}</h3>
            <p className="mt-1 text-sm text-muted">
              Intensité : {recap.intensity}
              {recap.weighIn ? " · Pesée aujourd'hui" : ""}
            </p>
            {scheduleEntry?.sessionId && (
              <Link
                href={`/semaine/${week.id}#session-${scheduleEntry.sessionId}`}
                className="mt-3 inline-block text-sm font-medium text-accent underline underline-offset-2"
              >
                Aller à la séance →
              </Link>
            )}
          </section>
        </>
      )}

      {/* Mini courbe de poids */}
      <section className="rounded-3xl border border-border bg-surface p-5 shadow-sm sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Poids</p>
          {variation !== null && (
            <span
              className={`rounded-full px-3 py-1 text-sm font-semibold ${
                variation <= 0 ? "bg-accent-soft text-accent" : "bg-nude text-nude-foreground"
              }`}
            >
              {variation > 0 ? "+" : ""}
              {variation} kg depuis ta première pesée
            </span>
          )}
        </div>
        {lastWeight ? (
          <p className="mt-1 text-2xl font-semibold text-foreground">
            {lastWeight.weight} kg{" "}
            <span className="text-sm font-normal text-muted">— semaine {lastWeight.weekId}</span>
          </p>
        ) : (
          <p className="mt-2 text-sm text-muted">Aucune pesée enregistrée pour l&apos;instant.</p>
        )}
        <div className="mt-3">
          <WeightChart entries={weights} />
        </div>
        <Link
          href="/suivi"
          className="mt-2 inline-block text-sm font-medium text-accent underline underline-offset-2"
        >
          Voir le suivi complet →
        </Link>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-background/70 px-3.5 py-3">
      <p className="text-[0.68rem] font-medium uppercase tracking-wide text-muted">{label}</p>
      <p className="mt-0.5 text-base font-semibold text-foreground">{value}</p>
    </div>
  );
}
