"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getDailyLogs } from "@/lib/storage";
import { PROGRAM_START, PROGRAM_END } from "@/lib/dates";
import type { DailyLog } from "@/lib/types";

const WEEKDAY_LABELS = ["L", "M", "M", "J", "V", "S", "D"];
const MONTH_LABEL = new Intl.DateTimeFormat("fr-FR", { month: "long", year: "numeric" });

function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

function isSameMonth(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
}

function isSameDay(a: Date, b: Date) {
  return isSameMonth(a, b) && a.getDate() === b.getDate();
}

function toDateKey(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** Calendrier des jours de séance (rond vert) et de cheat meal (point cappuccino), pour Amélie. */
export default function TrainingCalendar() {
  const [logs, setLogs] = useState<DailyLog[]>([]);
  const [month, setMonth] = useState(() => startOfMonth(new Date()));

  useEffect(() => {
    getDailyLogs("amelie").then(setLogs);
  }, []);

  const logsByDate = new Map(logs.map((l) => [l.date, l]));

  const minMonth = startOfMonth(PROGRAM_START);
  const maxMonth = startOfMonth(PROGRAM_END);
  const canGoPrev = month.getTime() > minMonth.getTime();
  const canGoNext = month.getTime() < maxMonth.getTime();

  function changeMonth(delta: number) {
    setMonth((m) => new Date(m.getFullYear(), m.getMonth() + delta, 1));
  }

  // Grille de 42 jours (6 semaines) commençant au lundi de la semaine du 1er du mois.
  const firstWeekday = (month.getDay() + 6) % 7; // 0 = lundi
  const gridStart = new Date(month.getFullYear(), month.getMonth(), 1 - firstWeekday);
  const days = Array.from(
    { length: 42 },
    (_, i) => new Date(gridStart.getFullYear(), gridStart.getMonth(), gridStart.getDate() + i)
  );

  const trainedThisMonth = days.filter(
    (d) => isSameMonth(d, month) && logsByDate.get(toDateKey(d))?.trained
  ).length;

  return (
    <div className="rounded-3xl border border-border bg-surface p-4 shadow-sm sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => changeMonth(-1)}
          disabled={!canGoPrev}
          aria-label="Mois précédent"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-nude/60 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="text-center">
          <p className="text-base font-semibold capitalize text-foreground">
            {MONTH_LABEL.format(month)}
          </p>
          <p className="text-xs text-muted">{trainedThisMonth} séance{trainedThisMonth !== 1 ? "s" : ""} ce mois-ci</p>
        </div>
        <button
          type="button"
          onClick={() => changeMonth(1)}
          disabled={!canGoNext}
          aria-label="Mois suivant"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-nude/60 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-5 grid grid-cols-7 gap-y-2">
        {WEEKDAY_LABELS.map((label, i) => (
          <p key={i} className="text-center text-[0.68rem] font-semibold uppercase tracking-wide text-muted">
            {label}
          </p>
        ))}
        {days.map((d) => {
          const inMonth = isSameMonth(d, month);
          const log = logsByDate.get(toDateKey(d));
          const isToday = isSameDay(d, new Date());
          return (
            <div key={d.toISOString()} className="flex flex-col items-center gap-1 py-0.5">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm transition-colors sm:h-9 sm:w-9 ${
                  !inMonth
                    ? "text-muted/30"
                    : log?.trained
                      ? "bg-success font-semibold text-white"
                      : "text-foreground/80"
                } ${isToday ? "ring-2 ring-accent ring-offset-2 ring-offset-surface" : ""}`}
              >
                {d.getDate()}
              </div>
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  inMonth && log?.cheatMeal ? "bg-nude" : "bg-transparent"
                }`}
              />
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex flex-wrap gap-4 border-t border-border pt-4 text-xs text-muted">
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-success" /> Séance faite
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-nude" /> Cheat meal
        </span>
      </div>
    </div>
  );
}
