// Contenu philosophie, système d'intensité, marche, cardio, suivi, après-programme.
// Recopié fidèlement du programme source (sections 1, 3.1-3.3, 3.8-3.9, 5, 6).
import type { Phase } from "@/lib/types";

export const profile = {
  title: "Femme, 23 ans, 72 kg",
  goal:
    "Fessiers développés, jambes toniques et fines, haut du corps tonique sans volume, ventre plat",
  target: "65-66 kg à la fin des 3 mois, sans effet yoyo",
};

// ---------- 1. Comprendre ton corps de rêve ----------

export const pillars = [
  {
    label: "Taux de gras bas (~20-23%)",
    benefit: "Ventre plat, jambes fines, définition",
    priority: 3,
  },
  {
    label: "Muscle fessier développé",
    benefit: "Volume et rondeur des fesses",
    priority: 3,
  },
  {
    label: "Haut du corps entretenu",
    benefit: "Épaules dessinées = taille qui paraît plus fine",
    priority: 2,
  },
];

export const classicMistake =
  "Erreur classique à éviter : supprimer le haut du corps pour \"ne pas grossir\". Des épaules légèrement dessinées créent l'effet sablier et font paraître la taille plus fine. On ne supprime pas, on réduit le volume et on garde l'intensité.";

export const geneticsNote =
  "Note honnête sur la génétique : le rapport fesses très volumineuses / cuisses très fines est en grande partie génétique (largeur du bassin, insertions musculaires, répartition du gras). Tu peux énormément améliorer ta forme — tu ne peux pas choisir ta structure osseuse. Vise ta meilleure version, pas une copie.";

// ---------- 3.1 Structure hebdomadaire ----------

export const weeklyStructureTable = [
  { day: "Lundi", session: "Bas du corps A — Fessiers/Ischios (lourd)", duration: "60 min" },
  { day: "Mardi", session: "Haut du corps + Core (volume réduit)", duration: "45 min" },
  { day: "Mercredi", session: "Cardio — course 30-40 min + mobilité", duration: "45 min" },
  { day: "Jeudi", session: "Bas du corps B — Fessiers/Quadriceps", duration: "60 min" },
  { day: "Vendredi", session: "Repos actif — marche 45 min", duration: "—" },
  { day: "Samedi", session: "Bas du corps C — Fessiers volume + unilatéral", duration: "55 min" },
  { day: "Dimanche", session: "Repos complet", duration: "—" },
];

// ---------- 3.2 La marche ----------

export const walking = {
  target: "45 minutes de marche volontaire par jour, en plus de tes déplacements normaux.",
  breakdown: [
    {
      moment: "Avant de commencer à travailler",
      duration: "15 min",
      how: "Tour du quartier. Descends un arrêt plus tôt si tu prends les transports.",
    },
    {
      moment: "Après le déjeuner",
      duration: "20 min",
      how: "Marche digestive — améliore aussi la glycémie post-repas et la concentration de l'après-midi.",
    },
    {
      moment: "Fin de journée",
      duration: "10 min",
      how: "Coupure entre travail et soirée.",
    },
  ],
  rule50:
    "La règle des 50 minutes. Toutes les 50 min de code, lève-toi et marche 3 min (aller chercher de l'eau, monter un étage, faire le tour de l'open space). Sur une journée de 8 h, ça fait ~25 min supplémentaires que tu ne sentiras jamais passer. Mets un timer, ou cale-le sur tes cycles Pomodoro si tu en utilises.",
  landmarks: [
    "Marche normale → 100 pas/minute → 45 min → 4 500 pas volontaires",
    "Une informaticienne sans effort particulier fait ~3 000-4 000 pas/jour",
    "Total avec le plan : ~8 000 pas/jour",
  ],
  phoneNote:
    "Si tu veux quand même mesurer : ton téléphone le fait déjà gratuitement (app Santé sur iPhone, Google Fit sur Android) — mais uniquement quand il est sur toi. Utilise-le comme indicateur de tendance, pas comme vérité absolue.",
  fridayNote:
    "Le vendredi, jour sans séance, la marche monte à 60 min (une vraie sortie, pas du fractionné de bureau).",
};

// ---------- 3.3 Le système RIR ----------

export const rirDefinition =
  "RIR = Répétitions En Réserve : le nombre de répétitions que tu aurais encore pu faire à la fin de ta série.";

export const rirScale = [
  { level: "RIR 4+", feeling: "Facile, tu pourrais discuter", meaning: "Trop léger, aucun stimulus" },
  { level: "RIR 3", feeling: "Ça travaille mais c'est confortable", meaning: "Zone d'échauffement / d'apprentissage" },
  { level: "RIR 2", feeling: "Les 2 dernières reps ralentissent", meaning: "Zone de travail standard", highlight: true },
  { level: "RIR 1", feeling: "La dernière rep est très dure, la vitesse chute", meaning: "Zone lourde", highlight: true },
  { level: "RIR 0", feeling: "Échec technique — tu ne peux plus en faire une", meaning: "Isolation uniquement" },
];

export const rirHowToJudge =
  "Comment savoir où tu en es concrètement : observe la vitesse de la barre. Tant que tes répétitions montent à la même vitesse, tu es à RIR 3+. Dès qu'une répétition ralentit visiblement sans que tu le veuilles, tu es à RIR 1-2. Si tu bloques à mi-chemin, tu es à RIR 0.";

export const dailyIntensityTable = [
  {
    day: "Lundi",
    session: "Bas A",
    rirTarget: "RIR 1-2 sur hip thrust et SDT roumain · RIR 0-1 sur leg curl et abductions",
    loads: "Lourdes — c'est ta séance de force",
    rest: "2 min",
    feeling: "Effort maximal, tu dois avoir besoin de te concentrer avant chaque série",
  },
  {
    day: "Mardi",
    session: "Haut du corps",
    rirTarget: "RIR 3 partout",
    loads: "Légères à modérées, plafonnées",
    rest: "60 s",
    feeling: "Ça chauffe, jamais de forcing. Tu dois sortir fraîche",
  },
  {
    day: "Mercredi",
    session: "Cardio",
    rirTarget: "RPE 5-6/10",
    loads: "—",
    rest: "—",
    feeling: "Test de la parole : tu dois pouvoir tenir une phrase complète sans t'essouffler",
  },
  {
    day: "Jeudi",
    session: "Bas B",
    rirTarget: "RIR 2 partout",
    loads: "Modérées (~85% de lundi)",
    rest: "90 s",
    feeling: "Dur mais répétable, volume plus élevé",
  },
  {
    day: "Samedi",
    session: "Bas C",
    rirTarget: "RIR 0-1 sur les isolations",
    loads: "Légères, séries longues",
    rest: "45-60 s",
    feeling: "Brûlure, congestion. Charge légère, intention maximale",
  },
];

export const tuesdayWhy = {
  text:
    "C'est le levier qui répond exactement à ton \"j'ai l'impression de prendre trop de muscles en haut\". À RIR 3, sans jamais augmenter les charges, tu envoies un signal de maintien : ton corps garde le muscle existant et la tonicité, mais n'a aucune raison d'en construire davantage. Tu progresses en répétitions, pas en poids. À l'inverse, sur les séances bas du corps, tu cherches à devenir franchement plus forte. C'est là que le volume est souhaitable.",
  rule:
    "Règle du mardi : tu ne montes jamais au-dessus de 4 kg aux élévations latérales, ni au-dessus de 8 kg par haltère au développé. Une fois ces plafonds atteints, tu restes dessus et tu ajoutes des répétitions uniquement.",
};

export const tempoNotation =
  "Notation : 3-1-1-0 = 3 s de descente, 1 s de pause en bas, 1 s de montée, 0 s de pause en haut.";

export const tempoTable = [
  { exercise: "Hip thrust", tempo: "2-0-1-2", why: "La pause de 2 s en haut est ce qui fait le fessier" },
  { exercise: "Squat", tempo: "3-0-1-0", why: "Descente lente = plus de tension, moins de charge nécessaire" },
  { exercise: "SDT roumain", tempo: "3-1-1-0", why: "L'étirement contrôlé est tout l'exercice" },
  { exercise: "Fentes bulgares", tempo: "2-1-1-0", why: "Contrôle de l'équilibre" },
  { exercise: "Isolations (kickback, abduction)", tempo: "1-0-1-1", why: "Contraction tenue en fin de mouvement" },
  { exercise: "Haut du corps (mardi)", tempo: "2-0-2-0", why: "Contrôlé, jamais d'élan" },
];

export const tempoExplanation =
  "Un tempo lent te permet d'obtenir plus de stimulus avec moins de charge — utile quand l'objectif n'est pas la performance pure.";

export const chooseLoadsSteps = [
  "Fais 2 séries d'échauffement très légères",
  "Mets une charge que tu penses pouvoir faire 12 fois, arrête-toi à 10",
  "Si les 10 étaient à RIR 3 ou plus → +5 kg à la série suivante",
  "Continue jusqu'à trouver la charge qui te met à RIR 2 sur le nombre de reps prescrit",
  "Note-la. C'est ton point de départ.",
];

export const chooseLoadsNote =
  "Les semaines 1 et 2 servent à ça. Ne cherche pas à performer, cherche tes repères.";

export const doubleProgression = {
  steps: [
    "Tu commences à 8 reps sur toutes les séries à RIR 2",
    "Séance après séance, tu ajoutes 1 rep : 8 → 9 → 10",
    "Quand tu atteins 10 reps sur toutes les séries à RIR 2 → +2,5 kg (ou +5 kg sur presse/hip thrust)",
    "Tu redescends à 8 reps avec la nouvelle charge, et tu recommences",
  ],
  expectedResults:
    "Sur 12 semaines, attends-toi à progresser d'environ +20 à +30% sur le hip thrust et +15% sur le squat. C'est ça, le vrai indicateur que le programme fonctionne — plus que la balance.",
};

export const tooHardSignals = [
  "Courbatures qui durent plus de 3 jours",
  "Tes charges baissent 2 séances de suite sur le même exercice",
  "Sommeil perturbé, réveils nocturnes",
  "Faim incontrôlable ou au contraire disparition totale de l'appétit",
  "Motivation à zéro avant la séance pendant plus d'une semaine",
];

export const tooHardResponse =
  "Réponse : semaine de décharge immédiate (charges -40%, une série en moins par exercice, calories maintenues). Ce n'est pas un échec, c'est de la gestion.";

export const tooEasySignals = [
  "Tu finis tes séries en sachant que tu aurais pu en faire 4-5 de plus",
  "Tu n'as jamais besoin de te préparer mentalement avant une série",
  "Tes charges sont identiques depuis 3 semaines",
  "Tu ne ressens aucune congestion sur les fessiers en fin de séance",
];

// ---------- 3.8 Cardio ----------

export const cardio = {
  intensity: "RPE 5-6/10 — allure conversationnelle.",
  speechTest:
    "Test de la parole : tu dois pouvoir dire une phrase complète sans t'arrêter pour respirer. Si tu ne peux dire que 3 mots, ralentis. Si tu peux chanter, accélère.",
  months: [
    { month: 1, description: "30 min course allure conversationnelle (tu dois pouvoir parler)" },
    { month: 2, description: "35 min, ou alternance 25 min course + 10 min intervalles (30 s rapide / 90 s lent ×5)" },
    { month: 3, description: "40 min, ou 5-7 km selon ta forme" },
  ],
  warning:
    "Important : pas plus de cardio que ça. Trop de cardio en déficit brûle du muscle fessier — exactement ce que tu ne veux pas. La marche quotidienne fait le travail de fond, la musculation fait la forme.",
};

// ---------- 3.9 Progression absolue ----------

export const progressionRule =
  "Chaque semaine, tu dois battre la semaine précédente sur au moins un exercice : +2,5 kg, ou +1 répétition, ou +1 série. Note tout dans un carnet ou une appli. Sans surcharge progressive, tu perds du gras et du muscle — c'est ça qui donne l'effet \"je suis juste plus petite mais pas plus dessinée\".";

// ---------- 4. Progression sur 3 mois ----------

export const phases: Phase[] = [
  {
    id: 1,
    name: "Installation",
    weekRange: [1, 4],
    objective: "-3 kg (dont ~1 kg d'eau la première semaine)",
    expectedWeight: "~69 kg",
    caloriesTraining: 1700,
    caloriesRest: 1400,
    points: [
      "Volume d'entraînement : tel que décrit dans le programme",
      "Focus : technique et régularité, pas les charges. Apprends le hip thrust et le soulevé de terre roumain correctement, quitte à rester légère 2 semaines.",
      "Pèse tous tes aliments",
      "Semaine 4 : première série de photos et mensurations",
    ],
    whatHappens:
      "La semaine 2 sera la plus dure (fatigue, faim, motivation qui baisse). C'est physiologique, ça passe en semaine 3. Ne change rien.",
  },
  {
    id: 2,
    name: "Intensification",
    weekRange: [5, 8],
    objective: "-2 kg",
    expectedWeight: "~67 kg",
    caloriesTraining: 1650,
    caloriesRest: 1350,
    points: [
      "Calories : 1650 / 1350 (petit ajustement, ton corps est plus léger)",
      "Ajoute 1 série sur le hip thrust et le squat (5 séries au lieu de 4)",
      "Ajoute 5 min au cardio du mercredi",
      "Passe la marche volontaire à 55 min/jour (ajoute 10 min à la sortie du matin)",
      "Semaine 8 = semaine de décharge : garde les calories, réduis toutes les charges de 40% et retire 1 série par exercice. Ce n'est pas de la triche, c'est ce qui permet de continuer sans blessure ni stagnation.",
    ],
    whatHappens:
      "C'est ici que tes fesses vont visiblement changer de forme. Le poids sur la balance ralentira — c'est normal, tu construis du muscle en perdant du gras.",
  },
  {
    id: 3,
    name: "Définition",
    weekRange: [9, 12],
    objective: "-2 kg",
    expectedWeight: "~65 kg",
    caloriesTraining: 1600,
    caloriesRest: 1300,
    points: [
      "Calories : 1600 / 1300",
      "Réduis les repos à 60-75 s sur les séances B et C (densité)",
      "Ajoute une 2e séance de cardio léger le vendredi (marche rapide 40 min ou vélo)",
      "Maintiens les charges lourdes le lundi — ne baisse jamais l'intensité en fin de sèche, c'est le signal qui dit à ton corps de garder le muscle",
      "Semaine 12 : photos, mensurations, bilan complet",
    ],
    whatHappens:
      "Le physique se dessine, le poids devient un indicateur secondaire par rapport aux mensurations et aux photos.",
  },
];

// ---------- 5. Suivi ----------

export const trackingMeasurements = [
  { what: "Poids", when: "3× / semaine (lun, mer, ven) au réveil, à jeun", how: "Note la moyenne hebdomadaire — c'est le seul chiffre qui compte" },
  { what: "Tour de taille", when: "1× / semaine, lundi", how: "Au niveau du nombril" },
  { what: "Tour de hanches", when: "1× / semaine", how: "Au point le plus large" },
  { what: "Tour de cuisse", when: "1× / semaine", how: "15 cm au-dessus du genou" },
  { what: "Photos", when: "Toutes les 4 semaines", how: "Face, profil, dos — même lumière, même tenue, même heure" },
];

export const scaleReadingNote =
  "Ton poids peut varier de 1,5 kg en un jour (règles, sel, glucides, transit). Une hausse ponctuelle n'est jamais du gras. Compare uniquement les moyennes de semaine à semaine.";

export const periodsNote =
  "Attends-toi à 1-2 kg de rétention d'eau la semaine précédant tes règles, avec plus de faim et moins de force. Ne réduis pas les calories à ce moment-là. Le poids redescend seul en 3-5 jours. C'est un piège classique qui pousse à se sous-alimenter puis à craquer.";

export const stagnationChecklist = [
  "Vérifie tes pesées d'aliments — les huiles, beurres et sauces sont les coupables dans 80% des cas",
  "Chronomètre honnêtement ta marche volontaire pendant 3 jours — c'est souvent 25 min réelles quand on croit en faire 45",
  "Seulement ensuite, retire 100 kcal (glucides) des jours d'entraînement",
];

export const stagnationNote = "Si tu stagnes plus de 2 semaines (moyennes, pas jours isolés) :";

// ---------- 6. Après les 3 mois — anti-yoyo ----------

export const afterProgram = {
  intro:
    "C'est là que ton problème passé s'est joué. Ne saute pas cette section. Tu ne retournes jamais directement à ton alimentation d'avant. Tu fais une reverse diet :",
  reverseDietSteps: [
    { weeks: "Semaines 13-14", change: "+100 kcal/jour (glucides)" },
    { weeks: "Semaines 15-16", change: "+100 kcal supplémentaires" },
    { weeks: "Semaines 17-18", change: "+100 kcal supplémentaires" },
  ],
  maintenanceTarget:
    "Tu continues jusqu'à environ 1950-2050 kcal/jour, ton nouveau niveau d'entretien. À chaque palier, tu maintiens les entraînements identiques. Le poids peut monter de 0,5-1 kg (glycogène et eau) — ce n'est pas du gras.",
  options: [
    "Maintien : tu restes à l'entretien 2-3 mois, ton corps se stabilise, ton métabolisme récupère",
    "Prise de masse ciblée : +200 kcal au-dessus de l'entretien pendant 3-4 mois pour construire davantage de fessiers, puis nouvelle sèche",
  ],
  vision:
    "Le physique que tu vises se construit sur 18-24 mois, en alternant ces phases. Les 3 mois qui viennent sont le premier cycle, pas la ligne d'arrivée. C'est précisément cette vision longue qui supprime le yoyo : il n'y a plus de \"fin de régime\", donc plus de \"reprise après régime\".",
};

export const disclaimer =
  "Ce programme est une base générale d'entraînement et de nutrition, pas un avis médical. Si tu as un antécédent de trouble alimentaire, un problème thyroïdien, hormonal ou articulaire, parles-en à un médecin ou à un diététicien avant de commencer. Un bilan sanguin (fer, ferritine, vitamine D, TSH) est une bonne idée avant toute sèche chez une femme de ton âge.";

export function getPhaseById(id: 1 | 2 | 3): Phase {
  return phases.find((p) => p.id === id)!;
}

// ---------- 7. Récapitulatif hebdomadaire ----------

export const weeklyRecap: {
  day: string;
  session: string;
  caloriesType: "training" | "repos";
  walkType: "baseline" | "friday";
  intensity: string;
  weighIn: boolean;
}[] = [
  { day: "Lundi", session: "Bas A", caloriesType: "training", walkType: "baseline", intensity: "RIR 1-2", weighIn: true },
  { day: "Mardi", session: "Haut + Core", caloriesType: "training", walkType: "baseline", intensity: "RIR 3", weighIn: false },
  { day: "Mercredi", session: "Cardio", caloriesType: "training", walkType: "baseline", intensity: "RPE 5-6", weighIn: true },
  { day: "Jeudi", session: "Bas B", caloriesType: "training", walkType: "baseline", intensity: "RIR 2", weighIn: false },
  { day: "Vendredi", session: "Marche", caloriesType: "repos", walkType: "friday", intensity: "—", weighIn: true },
  { day: "Samedi", session: "Bas C", caloriesType: "training", walkType: "baseline", intensity: "RIR 0-1", weighIn: false },
  { day: "Dimanche", session: "Repos", caloriesType: "repos", walkType: "baseline", intensity: "—", weighIn: false },
];

/** Le vendredi, la marche volontaire s'ajoute +15 min à la base de la phase (ex: 45 → 60 min en mois 1). */
export const fridayWalkBonus = 15;
