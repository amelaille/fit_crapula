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

const START_WEIGHT = 72;
const TARGET_WEIGHT = 65.5;

type ChartPoint = {
  week: number;
  target: number;
} & Record<AppUser, number | null>;

function buildData(entries: WeightEntry[]): ChartPoint[] {
  const byUserWeek = new Map<AppUser, Map<number, number>>();
  for (const user of APP_USERS) byUserWeek.set(user, new Map());
  for (const entry of entries) {
    byUserWeek.get(entry.user)?.set(entry.weekId, entry.weight);
  }

  const points: ChartPoint[] = [];
  for (let week = 0; week <= 12; week++) {
    const target = START_WEIGHT - ((START_WEIGHT - TARGET_WEIGHT) / 12) * week;
    const point = {
      week,
      target: Math.round(target * 10) / 10,
    } as ChartPoint;
    for (const user of APP_USERS) {
      point[user] = byUserWeek.get(user)?.get(week) ?? null;
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
            formatter={(value, name) => [
              `${value} kg`,
              name === "target" ? "Objectif" : APP_USER_LABELS[name as AppUser],
            ]}
          />
          <Legend
            formatter={(value) =>
              value === "target" ? "Objectif" : APP_USER_LABELS[value as AppUser]
            }
            wrapperStyle={{ fontSize: 13, color: "var(--muted)" }}
          />
          <Line
            type="monotone"
            dataKey="target"
            stroke="var(--chart-target)"
            strokeWidth={2}
            strokeDasharray="6 5"
            dot={false}
            isAnimationActive={false}
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
