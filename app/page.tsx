import Link from "next/link";
import { profile } from "@/data/program";
import DashboardClient from "@/components/DashboardClient";
import { getCurrentUser } from "@/lib/session";

const shortcuts = [
  { href: "/programme", label: "Programme", desc: "Philosophie, intensité, marche, cardio", emoji: "📘" },
  { href: "/nutrition", label: "Nutrition", desc: "Macros, repas, courses, règles", emoji: "🥗" },
  { href: "/suivi", label: "Suivi", desc: "Poids, journal", emoji: "📈" },
  { href: "/semaine/1", label: "Semaines", desc: "Séances et charges éditables", emoji: "🏋️" },
];

export default async function DashboardPage() {
  const currentUser = (await getCurrentUser())!;
  const isAmelie = currentUser === "amelie";
  const visibleShortcuts = isAmelie ? shortcuts : shortcuts.filter((s) => s.href === "/suivi");

  return (
    <div className="flex flex-col gap-8">
      <header>
        {isAmelie ? (
          <>
            <p className="text-sm font-medium text-accent">{profile.title}</p>
            <h1 className="mt-1 text-2xl font-semibold text-foreground sm:text-3xl">
              {profile.goal}
            </h1>
            <p className="mt-2 text-sm text-muted">Objectif : {profile.target}</p>
          </>
        ) : (
          <>
            <p className="text-sm font-medium text-accent">Suivi</p>
            <h1 className="mt-1 text-2xl font-semibold text-foreground sm:text-3xl">
              Ton évolution
            </h1>
            <p className="mt-2 text-sm text-muted">
              Ta courbe, tes commentaires, et l&apos;avancée d&apos;Amélie.
            </p>
          </>
        )}
      </header>

      <DashboardClient currentUser={currentUser} />

      <section>
        <h2 className="mb-3 text-lg font-semibold text-foreground">Raccourcis</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {visibleShortcuts.map((s) => (
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
