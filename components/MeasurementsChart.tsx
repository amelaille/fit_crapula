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
import type { Measurement } from "@/lib/types";

const LABELS: Record<string, string> = {
  waist: "Taille",
  hips: "Hanches",
  thigh: "Cuisse",
};

export default function MeasurementsChart({
  measurements,
}: {
  measurements: Measurement[];
}) {
  const data = [...measurements].sort((a, b) => a.weekId - b.weekId);

  if (data.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-border px-4 py-6 text-center text-sm text-muted">
        Ajoute des mensurations pour voir apparaître la courbe.
      </p>
    );
  }

  return (
    <div className="h-64 w-full sm:h-72">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 12, bottom: 0, left: -12 }}>
          <CartesianGrid stroke="var(--border)" vertical={false} />
          <XAxis
            dataKey="weekId"
            tick={{ fill: "var(--muted)", fontSize: 12 }}
            tickLine={false}
            axisLine={{ stroke: "var(--border)" }}
          />
          <YAxis
            tick={{ fill: "var(--muted)", fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            unit=" cm"
            width={56}
          />
          <Tooltip
            contentStyle={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 12,
              fontSize: 13,
            }}
            labelFormatter={(week) => `Semaine ${week}`}
            formatter={(value, name) => [`${value} cm`, LABELS[String(name)] ?? name]}
          />
          <Legend
            formatter={(value) => LABELS[value] ?? value}
            wrapperStyle={{ fontSize: 13, color: "var(--muted)" }}
          />
          <Line type="monotone" dataKey="waist" stroke="var(--chart-1)" strokeWidth={2.5} dot={{ r: 4 }} connectNulls isAnimationActive={false} />
          <Line type="monotone" dataKey="hips" stroke="var(--chart-2)" strokeWidth={2.5} dot={{ r: 4 }} connectNulls isAnimationActive={false} />
          <Line type="monotone" dataKey="thigh" stroke="var(--chart-3)" strokeWidth={2.5} dot={{ r: 4 }} connectNulls isAnimationActive={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
