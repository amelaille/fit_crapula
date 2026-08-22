"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import type { AppUser, WeightEntry } from "@/lib/types";
import { APP_USERS, APP_USER_LABELS } from "@/lib/types";

/** Poids de départ (avant la semaine 1), connu pour Amélie uniquement. */
const BASELINE_WEIGHT: Partial<Record<AppUser, number>> = {
  amelie: 68,
};

type ChartPoint = { week: number } & Record<AppUser, number | null>;

function average(values: number[]): number {
  const sum = values.reduce((total, v) => total + v, 0);
  return Math.round((sum / values.length) * 10) / 10;
}

function buildData(entries: WeightEntry[]): ChartPoint[] {
  const byUserWeek = new Map<AppUser, Map<number, number[]>>();
  for (const user of APP_USERS) byUserWeek.set(user, new Map());
  for (const entry of entries) {
    const weekMap = byUserWeek.get(entry.user);
    const existing = weekMap?.get(entry.weekId);
    if (existing) existing.push(entry.weight);
    else weekMap?.set(entry.weekId, [entry.weight]);
  }

  const points: ChartPoint[] = [];
  for (let week = 0; week <= 12; week++) {
    const point = { week } as ChartPoint;
    for (const user of APP_USERS) {
      const weekValues = byUserWeek.get(user)?.get(week);
      point[user] = weekValues ? average(weekValues) : (week === 0 ? BASELINE_WEIGHT[user] ?? null : null);
    }
    points.push(point);
  }
  return points;
}

export default function WeightChart({ entries }: { entries: WeightEntry[] }) {
  const data = buildData(entries);
  const usersPresent = APP_USERS.filter((user) => entries.some((e) => e.user === user));
  const usersToShow = usersPresent.length > 0 ? usersPresent : APP_USERS;

  return (
    <div className="h-72 w-full sm:h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 12, bottom: 0, left: -12 }}>
          <CartesianGrid stroke="var(--border)" vertical={false} />
          <XAxis
            dataKey="week"
            tick={{ fill: "var(--muted)", fontSize: 12 }}
            tickLine={false}
            axisLine={{ stroke: "var(--border)" }}
            label={{ value: "Semaine", position: "insideBottom", offset: -4, fill: "var(--muted)", fontSize: 12 }}
          />
          <YAxis
            domain={["dataMin - 1", "dataMax + 1"]}
            tick={{ fill: "var(--muted)", fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            unit=" kg"
            width={56}
          />
          <Tooltip
            contentStyle={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 12,
              fontSize: 13,
            }}
            labelFormatter={(week) => (week === 0 ? "Départ" : `Semaine ${week}`)}
            formatter={(value, name) => [`${value} kg`, APP_USER_LABELS[name as AppUser]]}
          />
          <Legend
            formatter={(value) => APP_USER_LABELS[value as AppUser]}
            wrapperStyle={{ fontSize: 13, color: "var(--muted)" }}
          />
          {usersToShow.map((user) => (
            <Line
              key={user}
              type="monotone"
              dataKey={user}
              stroke={`var(--user-${user})`}
              strokeWidth={2.5}
              dot={{ r: 4, fill: `var(--user-${user})`, strokeWidth: 0 }}
              activeDot={{ r: 6 }}
              connectNulls
              isAnimationActive={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
