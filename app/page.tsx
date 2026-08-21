import Link from "next/link";
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
    <div className="flex flex-col gap-6">
      <header className="text-center">
        {isAmelie ? (
          <>
            <p className="text-sm font-medium text-accent">Étape 1/5</p>
            <h1 className="mt-1 text-2xl font-semibold text-foreground ">
              Sèche sur 3 mois
            </h1>
            <p className="mt-2 text-sm text-muted">Objectif : 60-61kg</p>
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

    </div>
  );
}
