# Mon programme — Sport & Nutrition (3 mois)

Application personnelle de suivi pour le programme sport & nutrition sur 3 mois
(fessiers, jambes toniques, ventre plat). App mono-utilisateur, sans backend :
toutes tes données (charges, poids, commentaires, mensurations) vivent dans le
`localStorage` de ton navigateur.

## Lancer l'app

```bash
npm install
npm run dev
```

Ouvre [http://localhost:3000](http://localhost:3000).

Aucune configuration serveur, aucune base de données, aucune clé d'API à
fournir.

## Sauvegarder tes données

Comme tout vit dans le `localStorage` de ton navigateur, tes données peuvent
être perdues si tu vides le cache ou changes de navigateur/appareil. Va sur la
page **Suivi** et clique régulièrement sur **Export JSON** pour télécharger une
sauvegarde. Le bouton **Import JSON** restaure une sauvegarde précédente.

## Modifier le contenu du programme

Le contenu de référence (séances, exercices, repas, semaines, philosophie) est
codé en dur dans `/data`, pas dans une base de données — c'est volontaire :
c'est là que tu modifies le programme quand tu veux l'ajuster.

- `data/workouts.ts` — les 4 séances (A/B/C/D) : exercices, séries/reps, repos,
  RIR, tempo, notes techniques. Chaque exercice a un `id` stable (ex.
  `"hipthrust-barre"`) — ne le change pas si tu as déjà des charges
  enregistrées dessus, sinon tu perds le lien avec tes données sauvegardées.
- `data/weeks.ts` — le mapping des 12 semaines : phase, calories, focus,
  notes, ajustements d'entraînement, semaines de décharge/photos.
- `data/nutrition.ts` — macros par phase, journées types (repas, grammages),
  règle des plaisirs, liste de courses, règles non négociables.
- `data/program.ts` — tout le contenu explicatif : les 3 piliers, le système
  RIR, la marche, le cardio, les 3 phases détaillées, le suivi, la reverse
  diet après le programme.

Les types de ces objets sont définis dans `lib/types.ts`. Les fonctions
d'accès au `localStorage` (SSR-safe) sont dans `lib/storage.ts`.

## Structure

```
/app         pages (App Router) : dashboard, programme, nutrition, suivi, semaine/[id]
/components  composants réutilisables (ExerciseCard, MealCard, WeightChart, ...)
/data        contenu de référence du programme (voir ci-dessus)
/lib         types partagés + helpers localStorage
```

## Stack

Next.js (App Router) · TypeScript strict · Tailwind CSS v4 · Recharts ·
`localStorage` pour toute la persistance.
