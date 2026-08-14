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
import type { WeightEntry } from "@/lib/types";

const START_WEIGHT = 72;
const TARGET_WEIGHT = 65.5;

type ChartPoint = {
  week: number;
  actual: number | null;
  target: number;
};

function buildData(entries: WeightEntry[]): ChartPoint[] {
  const byWeek = new Map(entries.map((e) => [e.weekId, e.weight]));
  const points: ChartPoint[] = [];
  for (let week = 0; week <= 12; week++) {
    const target =
      START_WEIGHT - ((START_WEIGHT - TARGET_WEIGHT) / 12) * week;
    const actual = week === 0 ? START_WEIGHT : byWeek.get(week) ?? null;
    points.push({ week, actual: actual ?? null, target: Math.round(target * 10) / 10 });
  }
  return points;
}

export default function WeightChart({ entries }: { entries: WeightEntry[] }) {
  const data = buildData(entries);

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
              name === "actual" ? "Ton poids" : "Objectif",
            ]}
          />
          <Legend
            formatter={(value) => (value === "actual" ? "Ton poids" : "Objectif")}
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
          <Line
            type="monotone"
            dataKey="actual"
            stroke="var(--chart-actual)"
            strokeWidth={2.5}
            dot={{ r: 4, fill: "var(--chart-actual)", strokeWidth: 0 }}
            activeDot={{ r: 6 }}
            connectNulls
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
