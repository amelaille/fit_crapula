import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import {
  userStats,
  sedentaryJobWarning,
  macrosByPhase,
  macrosRationale,
  weeklyAverageKcal,
  trainingDayMenu,
  restDayMenu,
  restDayNote,
  pleasureRule,
  shoppingList,
  shoppingListTip,
  nonNegotiableRules,
} from "@/data/nutrition";
import InfoCallout from "@/components/InfoCallout";
import MealCard from "@/components/MealCard";
import MacroTable from "@/components/MacroTable";
import DayToggle from "@/components/DayToggle";

export default async function NutritionPage() {
  const currentUser = await getCurrentUser();
  if (currentUser !== "amelie") redirect("/suivi");

  return (
    <div className="flex flex-col gap-10">
      <header>
        <p className="text-sm font-medium text-accent">Nutrition</p>
        <h1 className="mt-1 text-2xl font-semibold text-foreground sm:text-3xl">
          Tes chiffres, tes repas, tes règles
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
          {userStats.height} · départ {userStats.startWeight} kg · cible {userStats.targetWeight} · {userStats.job}
        </p>
      </header>

      {/* Tes chiffres */}
      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold text-foreground">Tes chiffres</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatCard label="Métabolisme de base" value={`${userStats.bmr} kcal`} />
          <StatCard label="Dépense repos + travail" value={`${userStats.restExpenditure} kcal`} />
          <StatCard label="Dépense totale estimée" value={`${userStats.totalExpenditure} kcal`} />
          <StatCard label="Perte attendue" value={userStats.weeklyLoss} />
        </div>
        <InfoCallout tone="warning" title="Point critique lié à ton métier">
          {sedentaryJobWarning}
        </InfoCallout>
      </section>

      {/* Macros par mois */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Calories et macros cyclées</h2>
          <p className="mt-1 text-sm text-muted">Moyenne hebdomadaire : {weeklyAverageKcal}</p>
        </div>
        <div className="flex flex-col gap-4">
          {macrosByPhase.map((m) => (
            <div key={m.phaseId}>
              <p className="mb-2 text-sm font-medium text-foreground/80">
                Mois {m.phaseId}
              </p>
              <MacroTable macros={m} />
            </div>
          ))}
        </div>
        <div className="rounded-2xl border border-border bg-surface p-4 sm:p-5">
          <p className="mb-2 text-sm font-semibold text-foreground">Pourquoi ces macros</p>
          <ul className="flex flex-col gap-2 text-sm text-foreground/85">
            {macrosRationale.map((r) => (
              <li key={r} className="flex gap-2">
                <span className="text-accent">•</span>
                {r}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Journées types */}
      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold text-foreground">Journée type</h2>
        <DayToggle
          training={
            <div className="flex flex-col gap-3">
              {trainingDayMenu.meals.map((meal) => (
                <MealCard key={meal.name} meal={meal} />
              ))}
            </div>
          }
          rest={
            <div className="flex flex-col gap-3">
              <InfoCallout>{restDayNote}</InfoCallout>
              {restDayMenu.meals.map((meal) => (
                <MealCard key={meal.name} meal={meal} />
              ))}
            </div>
          }
        />
      </section>

      {/* Règle des plaisirs */}
      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold text-foreground">La règle des plaisirs</h2>
        <InfoCallout tone="accent" title={pleasureRule.headline}>
          <p>{pleasureRule.explanation}</p>
        </InfoCallout>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-border bg-surface p-4 text-sm leading-relaxed text-foreground/85">
            <p className="mb-1 font-semibold text-foreground">Red Bull</p>
            {pleasureRule.redBull}
          </div>
          <div className="rounded-2xl border border-border bg-surface p-4 text-sm leading-relaxed text-foreground/85">
            <p className="mb-1 font-semibold text-foreground">Repas libre</p>
            {pleasureRule.freeMeal}
          </div>
        </div>
      </section>

      {/* Liste de courses */}
      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold text-foreground">Liste de courses hebdomadaire</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {shoppingList.map((cat) => (
            <div key={cat.category} className="rounded-2xl border border-border bg-surface p-4">
              <p className="mb-2 font-semibold text-foreground">{cat.category}</p>
              <ul className="flex flex-col gap-1 text-sm text-foreground/85">
                {cat.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-accent">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <InfoCallout>{shoppingListTip}</InfoCallout>
      </section>

      {/* Règles non négociables */}
      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold text-foreground">Règles non négociables</h2>
        <ol className="flex flex-col gap-2.5">
          {nonNegotiableRules.map((rule, i) => (
            <li
              key={rule}
              className="flex gap-3 rounded-2xl border border-border bg-surface p-3.5 text-sm text-foreground/85"
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-soft text-xs font-semibold text-accent">
                {i + 1}
              </span>
              <span className="pt-0.5">{rule}</span>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-surface px-3.5 py-3">
      <p className="text-[0.68rem] font-medium uppercase tracking-wide text-muted">{label}</p>
      <p className="mt-0.5 text-base font-semibold text-foreground">{value}</p>
    </div>
  );
}
