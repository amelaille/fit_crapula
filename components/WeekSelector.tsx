type WeekSelectorProps = {
  value: number;
  onChange: (weekId: number) => void;
  label?: string;
  totalWeeks?: number;
};

export default function WeekSelector({
  value,
  onChange,
  label = "Semaine",
  totalWeeks = 12,
}: WeekSelectorProps) {
  const options = Array.from({ length: totalWeeks }, (_, i) => i + 1);

  return (
    <label className="flex flex-col gap-1">
      <span className="text-[0.68rem] font-medium uppercase tracking-wide text-muted">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="rounded-xl border border-border bg-background px-3 py-2 text-sm font-medium text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25"
      >
        {options.map((w) => (
          <option key={w} value={w}>
            Semaine {w}
          </option>
        ))}
      </select>
    </label>
  );
}
