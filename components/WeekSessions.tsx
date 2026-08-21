"use client";

import { useEffect, useState } from "react";
import { getDailyLogs } from "@/lib/storage";
import { getDateForWeekDay, toDateKey } from "@/lib/dates";
import { weeklySchedule, getSessionById } from "@/data/workouts";
import { cardio } from "@/data/program";
import type { DailyLog, PhaseId } from "@/lib/types";
import WeekDayAccordion from "./WeekDayAccordion";
import SessionBody from "./SessionBody";
import InfoCallout from "./InfoCallout";

type WeekSessionsProps = {
  weekId: number;
  phaseId: PhaseId;
};

const VISIBLE_DAYS = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Samedi"];

export default function WeekSessions({ weekId, phaseId }: WeekSessionsProps) {
  const [logs, setLogs] = useState<DailyLog[]>([]);

  useEffect(() => {
    getDailyLogs("amelie").then(setLogs);
  }, []);

  const trainedKeys = new Set(logs.filter((l) => l.trained).map((l) => l.date));

  return (
    <div className="flex flex-col gap-4">
      {weeklySchedule
        .filter((s) => VISIBLE_DAYS.includes(s.day))
        .map((s) => {
          const done = trainedKeys.has(toDateKey(getDateForWeekDay(weekId, s.day)));
          const session = s.sessionId ? getSessionById(s.sessionId) : undefined;

          if (session) {
            return (
              <WeekDayAccordion
                key={s.day}
                id={`session-${session.id}`}
                day={s.day}
                title={session.title}
                done={done}
              >
                <SessionBody session={session} weekId={weekId} readOnly />
              </WeekDayAccordion>
            );
          }

          return (
            <WeekDayAccordion key={s.day} id={`session-${s.day}`} day={s.day} title="Cardio" done={done}>
              <CardioBody phaseId={phaseId} />
            </WeekDayAccordion>
          );
        })}
    </div>
  );
}

function CardioBody({ phaseId }: { phaseId: PhaseId }) {
  const monthData = cardio.months.find((m) => m.month === phaseId) ?? cardio.months[0];
  return (
    <div className="flex flex-col gap-3">
      <div className="rounded-xl bg-accent-soft px-4 py-3.5 text-sm sm:px-5">
        <p className="font-medium text-accent">{cardio.intensity}</p>
        <p className="mt-1 text-foreground/80">{cardio.speechTest}</p>
      </div>
      <p className="text-sm text-foreground/85 text-center">
        <span className="font-medium text-foreground">Ce mois-ci : </span>
        {monthData.description}
      </p>
    </div>
  );
}
