import Link from "next/link";
import { profile } from "@/data/program";
import DashboardClient from "@/components/DashboardClient";

const shortcuts = [
  { href: "/programme", label: "Programme", desc: "Philosophie, intensité, marche, cardio", emoji: "📘" },
  { href: "/nutrition", label: "Nutrition", desc: "Macros, repas, courses, règles", emoji: "🥗" },
  { href: "/suivi", label: "Suivi", desc: "Poids, mensurations, journal", emoji: "📈" },
  { href: "/semaine/1", label: "Semaines", desc: "Séances et charges éditables", emoji: "🏋️" },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <header>
        <p className="text-sm font-medium text-accent">{profile.title}</p>
        <h1 className="mt-1 text-2xl font-semibold text-foreground sm:text-3xl">
          {profile.goal}
        </h1>
        <p className="mt-2 text-sm text-muted">Objectif : {profile.target}</p>
      </header>

      <DashboardClient />

      <section>
        <h2 className="mb-3 text-lg font-semibold text-foreground">Raccourcis</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {shortcuts.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="rounded-2xl border border-border bg-surface p-4 shadow-sm transition-transform hover:-translate-y-0.5"
            >
              <span className="text-2xl">{s.emoji}</span>
              <p className="mt-2 font-semibold text-foreground">{s.label}</p>
              <p className="mt-0.5 text-xs text-muted">{s.desc}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
