// Contenu nutrition — recopié fidèlement du programme source (section 2).
import type { DayMenu, MonthMacros } from "@/lib/types";

export const userStats = {
  height: "1,625 m",
  startWeight: 72,
  targetWeight: "65-66 kg",
  job: "Métier sédentaire (assise 8 h/jour)",
  bmr: 1460, // métabolisme de base, kcal
  restExpenditure: 1750, // dépense au repos + travail assis, sans marche volontaire
  trainingExpenditure: 185, // + 5 séances/semaine, kcal/jour en moyenne
  walkingExpenditure: 110, // + marche quotidienne structurée, kcal/jour
  totalExpenditure: 2050, // dépense totale estimée, kcal/jour
  deficit: 440, // déficit appliqué, kcal/jour
  weeklyLoss: "environ 0,45 kg/semaine",
};

export const sedentaryJobWarning =
  "Point critique lié à ton métier. Sans la marche quotidienne, ta dépense tombe à ~1940 kcal et le déficit à 325 kcal/jour — soit une perte de 1,3 kg/mois au lieu de 2. La marche n'est donc pas un bonus dans ce programme, c'est ce qui rend les chiffres valables. Si tu ne peux vraiment pas la faire une semaine donnée, descends à 1600/1350 kcal cette semaine-là plutôt que de subir la stagnation.";

export const macrosByPhase: MonthMacros[] = [
  {
    phaseId: 1,
    caloriesTraining: 1700,
    caloriesRest: 1400,
    proteinTraining: 140,
    proteinRest: 140,
    fatTraining: 55,
    fatRest: 50,
    carbsTraining: 160,
    carbsRest: 95,
  },
  {
    phaseId: 2,
    caloriesTraining: 1650,
    caloriesRest: 1350,
    proteinTraining: 140,
    proteinRest: 140,
    note:
      "Petit ajustement calorique, ton corps est plus léger. Protéines maintenues à ~140 g (~2 g/kg) ; lipides jamais sous 45 g ; les glucides sont le levier ajusté à la baisse. Le programme source ne détaille pas la répartition G/L exacte de ce palier.",
  },
  {
    phaseId: 3,
    caloriesTraining: 1600,
    caloriesRest: 1300,
    proteinTraining: 140,
    proteinRest: 140,
    note:
      "Protéines maintenues à ~140 g (~2 g/kg) ; lipides jamais sous 45 g ; les glucides sont le levier ajusté à la baisse. Le programme source ne détaille pas la répartition G/L exacte de ce palier.",
  },
];

export const macrosRationale = [
  "Protéines fixes à 140 g (~2 g/kg) : c'est LE paramètre anti-yoyo. Elles protègent ton muscle pendant le déficit, calment la faim et coûtent des calories à digérer.",
  "Lipides jamais sous 45 g : hormones, cycle menstruel, humeur.",
  "Glucides variables : c'est le levier d'ajustement, pas les protéines.",
];

export const weeklyAverageKcal = "~1615 kcal/jour";

export const trainingDayMenu: DayMenu = {
  type: "training",
  totalKcal: 1700,
  meals: [
    {
      name: "Petit-déjeuner",
      kcal: 410,
      macros: "P30 G40 L14",
      items: [
        "Skyr nature 200 g",
        "Flocons d'avoine 35 g",
        "Banane ½ (60 g)",
        "Graines de chia 10 g",
        "Beurre de cacahuète 10 g (1 c. à café rase — pèse-le, c'est le piège n°1)",
        "Thé vert",
      ],
      note:
        "Ton ancien petit-déj était bon mais trop gras pour ses calories (beurre de cacahuète + chia sans glucides = beaucoup de calories, peu de satiété durable). L'avoine change tout.",
    },
    {
      name: "Déjeuner",
      kcal: 480,
      macros: "P38 G52 L10",
      items: [
        "Blanc de poulet 150 g (poids cru)",
        "Riz basmati 60 g (poids cru)",
        "Légumes 200 g (courgettes, brocolis, poivrons…)",
        "Huile d'olive 5 g (1 c. à café)",
        "Épices, ail, citron, sauce soja, herbes : illimité",
      ],
    },
    {
      name: "Collation autour de l'entraînement",
      kcal: 250,
      macros: "P25 G30 L3",
      items: [
        "Skyr 150 g ou 1 dose de whey (30 g)",
        "1 fruit (pomme, orange, poire) ou 2 galettes de riz",
      ],
    },
    {
      name: "Dîner",
      kcal: 450,
      macros: "P28 G35 L16",
      items: [
        "Saumon 120 g ou dinde 150 g ou œufs (3 entiers + 2 blancs)",
        "Patate douce 150 g ou quinoa 50 g cru",
        "Légumes 250 g minimum",
        "Vinaigrette légère (vinaigre balsamique, moutarde, yaourt)",
      ],
    },
    {
      name: "Plaisir",
      kcal: 150,
      macros: "—",
      items: [
        "1 Red Bull sans sucre (0 kcal — celui-ci est gratuit) ou",
        "30 g de bonbons ou",
        "25 g de chocolat noir 70%",
      ],
    },
  ],
};

export const restDayMenu: DayMenu = {
  type: "repos",
  totalKcal: 1400,
  meals: [
    {
      name: "Petit-déjeuner",
      kcal: 0,
      macros: "—",
      items: [
        "Skyr nature 200 g",
        "Flocons d'avoine 25 g (au lieu de 35 g)",
        "Banane ½ (60 g)",
        "Graines de chia 10 g",
        "Beurre de cacahuète 10 g (1 c. à café rase)",
        "Thé vert",
      ],
    },
    {
      name: "Déjeuner",
      kcal: 0,
      macros: "—",
      items: [
        "Blanc de poulet 150 g (poids cru)",
        "Riz basmati 45 g cru (au lieu de 60 g)",
        "Légumes 200 g",
        "Huile d'olive 5 g",
        "Épices, ail, citron, sauce soja, herbes : illimité",
      ],
    },
    {
      name: "Dîner",
      kcal: 0,
      macros: "—",
      items: [
        "Saumon 120 g ou dinde 150 g ou œufs (3 entiers + 2 blancs)",
        "Patate douce 100 g (au lieu de 150 g)",
        "Légumes 250 g minimum",
        "Vinaigrette légère",
      ],
    },
    {
      name: "Plaisir",
      kcal: 150,
      macros: "—",
      items: [
        "1 Red Bull sans sucre (0 kcal) ou",
        "30 g de bonbons ou",
        "25 g de chocolat noir 70%",
      ],
      note: "Maintenu à 150 kcal, comme les jours d'entraînement.",
    },
  ],
};

export const restDayNote =
  "Même structure que le jour d'entraînement : on retire la collation et on réduit les glucides.";

export const pleasureRule = {
  dailyKcal: 150,
  headline: "150 kcal de plaisir par jour, tous les jours, sans négociation.",
  explanation:
    "Un régime sans plaisir tient 3 semaines puis explose. En intégrant tes bonbons et ton Red Bull dans le plan, tu supprimes le cycle privation → craquage → culpabilité → abandon.",
  redBull:
    "La version sans sucre (0 kcal) est gratuite dans ce plan. Limite-toi à 1/jour et pas après 16 h (le sommeil est un facteur de perte de gras sous-estimé). La version classique coûte 110 kcal pour 250 ml — elle rentre dans ton budget plaisir si tu la préfères.",
  freeMeal:
    "1 repas libre par semaine (samedi soir par exemple) : tu manges ce que tu veux sans compter, un seul repas, pas une journée. Compense en faisant du samedi un jour \"repos\" à 1450 kcal sur les autres repas.",
};

export const shoppingList: { category: string; items: string[] }[] = [
  {
    category: "Protéines",
    items: [
      "Poulet 1 kg",
      "Dinde 500 g",
      "Saumon 400 g",
      "Œufs ×12",
      "Skyr 1,5 kg",
      "Whey (optionnel)",
      "Thon nature ×3",
    ],
  },
  {
    category: "Glucides",
    items: [
      "Riz basmati",
      "Flocons d'avoine",
      "Patates douces",
      "Quinoa",
      "Pain complet",
      "Bananes",
      "Pommes",
      "Fruits rouges surgelés",
    ],
  },
  {
    category: "Lipides",
    items: [
      "Huile d'olive",
      "Beurre de cacahuète 100%",
      "Graines de chia",
      "Avocat ×2",
      "Amandes",
    ],
  },
  {
    category: "Légumes",
    items: [
      "Brocolis, courgettes, poivrons, épinards, haricots verts, salade, tomates, oignons (vise 400 g/jour minimum)",
    ],
  },
  {
    category: "Assaisonnements",
    items: [
      "Paprika fumé",
      "Curry",
      "Ail",
      "Gingembre",
      "Sauce soja",
      "Moutarde",
      "Vinaigre balsamique",
      "Citrons",
      "Herbes fraîches",
    ],
  },
];

export const shoppingListTip =
  "Le goût vient des épices et de la cuisson, pas du gras. Poulet mariné 30 min dans yaourt + paprika + ail + citron = zéro calorie ajoutée, résultat excellent.";

export const nonNegotiableRules = [
  "Pèse tes aliments crus les 3 premières semaines, ensuite tu estimeras juste.",
  "2 à 2,5 L d'eau/jour — la rétention d'eau vient souvent d'un manque d'eau.",
  "20 g de protéines minimum à chaque repas.",
  "Ne saute jamais un repas pour \"rattraper\" un écart — c'est le mécanisme central du yoyo.",
  "Le sommeil compte : 7-8 h. Moins de 6 h = +25% de faim le lendemain, littéralement (leptine/ghréline).",
];
