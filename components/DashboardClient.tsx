"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getDailyLog, setDailyLog, getWeights } from "@/lib/storage";
import { getCurrentWeekId, getTodayName, toDateKey } from "@/lib/dates";
import { getWeekById } from "@/data/weeks";
import { getPhaseById, weeklyRecap, fridayWalkBonus } from "@/data/program";
import { weeklySchedule } from "@/data/workouts";
import type { AppUser, WeightEntry } from "@/lib/types";
import WeightChart from "./WeightChart";

export default function DashboardClient({ currentUser }: { currentUser: AppUser }) {
  const isAmelie = currentUser === "amelie";
  const weekId = getCurrentWeekId();
  const todayName = getTodayName();
  const todayKey = toDateKey();

  const [weights, setWeights] = useState<WeightEntry[]>([]);
  const [trained, setTrained] = useState(false);
  const [cheatMeal, setCheatMeal] = useState(false);

  useEffect(() => {
    getWeights().then((all) => setWeights(all.filter((w) => w.user === currentUser)));
  }, [currentUser]);

  useEffect(() => {
    if (!isAmelie) return;
    getDailyLog(currentUser, todayKey).then((log) => {
      setTrained(log?.trained ?? false);
      setCheatMeal(log?.cheatMeal ?? false);
    });
  }, [isAmelie, currentUser, todayKey]);

  async function toggleTrained() {
    const next = !trained;
    setTrained(next);
    await setDailyLog(currentUser, todayKey, { trained: next });
  }

  async function toggleCheatMeal() {
    const next = !cheatMeal;
    setCheatMeal(next);
    await setDailyLog(currentUser, todayKey, { cheatMeal: next });
  }

  const week = getWeekById(weekId);
  const phase = getPhaseById(week.phaseId);

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
            <p className="text-xs font-semibold uppercase tracking-wide text-accent">
              Semaine en cours
            </p>
            <h2 className="mt-0.5 text-xl font-semibold text-foreground">
              Semaine {week.id} - {phase.name}
            </h2>
            <p className="mt-1 text-sm text-muted">{week.focus}</p>
            {(week.isDeload || week.isPhotoWeek) && (
              <div className="mt-2 flex flex-wrap gap-1.5">
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
            )}
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
            <div className="mt-3 grid grid-cols-2 gap-3">
              <Stat label="Calories du jour" value={`${todayCalories} kcal`} />
              <Stat label="Marche" value={`${todayWalk} min`} />
            </div>
            {scheduleEntry?.sessionId && (
              <Link
                href={`/semaine/${week.id}#session-${scheduleEntry.sessionId}`}
                className="mt-3 inline-block text-sm font-medium text-accent underline underline-offset-2"
              >
                Aller à la séance →
              </Link>
            )}
            <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-border pt-4">
              <button
                type="button"
                onClick={toggleTrained}
                aria-pressed={trained}
                className={`flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm font-medium transition-colors ${
                  trained
                    ? "border-accent bg-accent text-accent-foreground"
                    : "border-border bg-background text-muted hover:text-foreground"
                }`}
              >
                <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4">
                  <path
                    d="M4 10.5l3.5 3.5L16 5.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {trained ? "Séance faite" : "Marquer comme fait"}
              </button>
              <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                <input
                  type="checkbox"
                  checked={cheatMeal}
                  onChange={toggleCheatMeal}
                  className="h-4 w-4 rounded border-border accent-accent"
                />
                Cheat meal aujourd&apos;hui
              </label>
            </div>
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
