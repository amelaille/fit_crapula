// Contenu nutrition — recopié fidèlement du programme source (section 2).
import type { DayMenu, MonthMacros } from "@/lib/types";

export const userStats = {
  height: "1,625 m",
  startWeight: 66,
  targetWeight: "60-61 kg",
  job: "Métier sédentaire (assise 8 h/jour)",
  bmr: 1400, // métabolisme de base, kcal
  restExpenditure: 1680, // dépense au repos + travail assis, sans marche volontaire
  trainingExpenditure: 170, // + 5 séances/semaine, kcal/jour en moyenne
  walkingExpenditure: 100, // + marche quotidienne structurée, kcal/jour
  totalExpenditure: 1950, // dépense totale estimée, kcal/jour
  deficit: 370, // déficit appliqué, kcal/jour
  weeklyLoss: "environ 0,37 kg/semaine",
};

export const sedentaryJobWarning =
  "Point critique lié à ton métier. Sans la marche quotidienne, ta dépense tombe à ~1850 kcal et le déficit à 270 kcal/jour — soit une perte d'environ 1,2 kg/mois au lieu de 1,6. La marche n'est donc pas un bonus dans ce programme, c'est ce qui rend les chiffres valables. Si tu ne peux vraiment pas la faire une semaine donnée, descends à 1600/1350 kcal cette semaine-là plutôt que de subir la stagnation.";

export const macrosByPhase: MonthMacros[] = [
  {
    phaseId: 1,
    caloriesTraining: 1650,
    caloriesRest: 1400,
    proteinTraining: 140,
    proteinRest: 140,
    fatTraining: 55,
    fatRest: 50,
    carbsTraining: 149,
    carbsRest: 95,
  },
  {
    phaseId: 2,
    caloriesTraining: 1600,
    caloriesRest: 1350,
    proteinTraining: 140,
    proteinRest: 140,
    note:
      "Petit ajustement calorique, ton corps est plus léger. Protéines maintenues à ~140 g (~2 g/kg) ; lipides jamais sous 45 g ; les glucides sont le levier ajusté à la baisse. Le programme source ne détaille pas la répartition G/L exacte de ce palier.",
  },
  {
    phaseId: 3,
    caloriesTraining: 1550,
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

export const weeklyAverageKcal = "~1580 kcal/jour";

export const trainingDayMenu: DayMenu = {
  type: "training",
  totalKcal: 1650,
  meals: [
    {
      name: "Petit-déjeuner",
      kcal: 400,
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
      kcal: 470,
      macros: "P38 G50 L10",
      items: [
        "Blanc de poulet 150 g (poids cru)",
        "Riz basmati 55 g (poids cru)",
        "Légumes 200 g (courgettes, brocolis, poivrons…)",
        "Huile d'olive 5 g (1 c. à café)",
        "Épices, ail, citron, sauce soja, herbes : illimité",
      ],
    },
    {
      name: "Collation autour de l'entraînement",
      kcal: 230,
      macros: "P25 G28 L3",
      items: [
        "Skyr 150 g ou 1 dose de whey (30 g)",
        "1 fruit (pomme, orange, poire)",
      ],
    },
    {
      name: "Dîner",
      kcal: 430,
      macros: "P28 G32 L15",
      items: [
        "Saumon 110 g ou dinde 150 g ou œufs (3 entiers + 2 blancs)",
        "Patate douce 130 g ou patate 145 g ou quinoa 32 g (poids cru)",
        "Légumes 250 g minimum",
        "Épices, ail, citron, sauce soja, herbes : illimité",
      ],
    },
    {
      name: "Plaisir",
      kcal: 120,
      macros: "—",
      items: [
        "1 Red Bull sans sucre (0 kcal — gratuit) ou",
        "1 Red Bull classique ou",
        "25 g de bonbons ou",
        "20 g de chocolat noir 70%",
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
      kcal: 355,
      macros: "P29 G34 L13",
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
      kcal: 440,
      macros: "P37 G42 L10",
      items: [
        "Blanc de poulet 150 g (poids cru)",
        "Riz basmati 45 g cru (au lieu de 55 g)",
        "Légumes 200 g",
        "Huile d'olive 5 g",
        "Épices, ail, citron, sauce soja, herbes : illimité",
      ],
    },
    {
      name: "Dîner",
      kcal: 400,
      macros: "P28 G27 L15",
      items: [
        "Saumon 110 g ou dinde 150 g ou œufs (3 entiers + 2 blancs)",
        "Patate douce 100 g ou patate 112 g ou quinoa 25 g (poids cru — au lieu de 130/145/32 g)",
        "Légumes 250 g minimum",
        "Épices, ail, citron, sauce soja, herbes : illimité",
      ],
    },
    {
      name: "Plaisir",
      kcal: 120,
      macros: "—",
      items: [
        "1 Red Bull sans sucre (0 kcal) ou",
        "1 Red Bull classique ou",
        "25 g de bonbons ou",
        "20 g de chocolat noir 70%",
      ],
      note: "Maintenu à 120 kcal, comme les jours d'entraînement.",
    },
  ],
};

export const restDayNote =
  "Même structure que le jour d'entraînement : on retire la collation et on réduit les glucides.";

export const pleasureRule = {
  dailyKcal: 120,
  headline: "120 kcal de plaisir par jour, tous les jours, sans négociation.",
  explanation:
    "Un régime sans plaisir tient 3 semaines puis explose. En intégrant tes bonbons et ton Red Bull dans le plan, tu supprimes le cycle privation → craquage → culpabilité → abandon.",
  redBull:
    "La version sans sucre (0 kcal) est gratuite dans ce plan et illimitée dans le raisonnable. Pas après 16 h (le sommeil est un facteur de perte de gras sous-estimé). La version classique rentre dans ton budget plaisir de 120 kcal, à la place des bonbons ou du chocolat.",
  freeMeal:
    "1 repas libre par semaine (cheat) : tu manges ce que tu veux sans compter, un seul repas, pas une journée entière.",
};

export const shoppingList: { category: string; items: string[] }[] = [
  {
    category: "Protéines",
    items: [
      "Poulet 1050 g",
      "Dinde 450 g",
      "Saumon 220 g",
      "Œufs — 6 entiers + 4 blancs",
      "Skyr 1625 g",
      "Whey — 4 doses (120 g)",
    ],
  },
  {
    category: "Glucides",
    items: [
      "Flocons d'avoine 225 g",
      "Riz basmati 365 g",
      "Patate douce 390 g",
      "Pomme de terre 290 g",
      "Quinoa ou boulgour 60 g",
      "Banane ×4",
      "Fruit collation ×5",
    ],
  },
  {
    category: "Lipides",
    items: [
      "Huile d'olive 35 g",
      "Beurre de cacahuète 70 g",
      "Graines de chia 70 g",
    ],
  },
  {
    category: "Légumes",
    items: [
      "Légumes 3150 g/semaine (~450 g/jour) — brocolis, courgettes, poivrons, épinards, haricots verts, salade, tomates, oignons",
    ],
  },
  {
    category: "Plaisir",
    items: ["Red Bull — 3 zéro + 2 normale", "Bombecs 175 g"],
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
  "Le goût vient des épices et de la cuisson, pas du gras. Poulet mariné 30 min dans yaourt + paprika + ail + citron = zéro calorie ajoutée, résultat excellent. Ces quantités sont celles du mois 1 : les féculents (avoine, riz, patates, quinoa) diminuent légèrement en mois 2 et 3 à mesure que les calories baissent, les protéines et légumes restant constants.";

export const nonNegotiableRules = [
  "Pèse tes aliments crus les 3 premières semaines, ensuite tu estimeras juste.",
  "2 à 2,5 L d'eau/jour — la rétention d'eau vient souvent d'un manque d'eau.",
  "20 g de protéines minimum à chaque repas.",
  "Ne saute jamais un repas pour \"rattraper\" un écart — c'est le mécanisme central du yoyo.",
  "Le sommeil compte : 7-8 h. Moins de 6 h = +25% de faim le lendemain, littéralement (leptine/ghréline).",
];
