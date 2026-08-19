// Séances A/B/C/D — contenu de référence, recopié fidèlement du programme source.
import type { WorkoutSession } from "@/lib/types";

export const sessionA: WorkoutSession = {
  id: "A",
  day: "Lundi",
  title: "Bas du corps A — Fessiers / Ischios (lourd)",
  duration: "60 min",
  intensityLabel:
    "RIR 1-2 sur hip thrust et SDT roumain · RIR 0-1 sur leg curl et abductions. Charges lourdes, repos longs.",
  intensityFeeling:
    "Effort maximal, tu dois avoir besoin de te concentrer avant chaque série.",
  warmup:
    "5 min vélo + 15 hip thrust au poids du corps + 15 abductions élastique.",
  note: "C'est ta séance la plus difficile de la semaine.",
  exercises: [
    {
      id: "hipthrust-barre",
      name: "Hip thrust barre",
      sets: 4,
      reps: "8-10",
      rest: "2 min",
      rir: "RIR 1-2",
      tempo: "2-0-1-2",
      note: "Ton exercice n°1. Pause 1 s en haut, menton rentré.",
    },
    {
      id: "sdt-roumain",
      name: "Soulevé de terre roumain",
      sets: 4,
      reps: "10",
      rest: "90 s",
      rir: "RIR 1-2",
      tempo: "3-1-1-0",
      note: "Jambes semi-tendues, étirement ischios, dos plat.",
    },
    {
      id: "fentes-bulgares-lundi",
      name: "Fentes bulgares",
      sets: 3,
      reps: "10/jambe",
      rest: "90 s",
      rir: "RIR 1-2",
      tempo: "2-1-1-0",
      note: "Buste penché en avant 30° = plus de fessier.",
    },
    {
      id: "leg-curl-allonge",
      name: "Leg curl allongé",
      sets: 3,
      reps: "12-15",
      rest: "60 s",
      rir: "RIR 0-1",
      note: "Contraction complète.",
    },
    {
      id: "abduction-machine",
      name: "Abduction machine (buste penché)",
      sets: 3,
      reps: "20",
      rest: "45 s",
      rir: "RIR 0-1",
      note: "Moyen fessier — clé de la forme ronde vue de face.",
    },
  ],
};

export const sessionB: WorkoutSession = {
  id: "B",
  day: "Mardi",
  title: "Haut du corps + Core",
  duration: "45 min",
  intensityLabel:
    "RIR 3 partout, charges plafonnées, aucune progression en poids.",
  intensityFeeling:
    "Ça chauffe, jamais de forcing. Tu dois sortir fraîche. Si tu es épuisée, tu es allée trop fort.",
  note:
    "Objectif : entretenir et tonifier, pas construire du volume. Charges modérées, tempo contrôlé, repos courts. Règle du mardi : tu ne montes jamais au-dessus de 4 kg aux élévations latérales, ni au-dessus de 8 kg par haltère au développé. Une fois ces plafonds atteints, tu restes dessus et tu ajoutes des répétitions uniquement. Pas de curl biceps ni d'extensions triceps isolées dans ce programme — le tirage et les pompes suffisent largement à garder des bras toniques sans ajouter de volume.",
  exercises: [
    {
      id: "tirage-vertical-poulie",
      name: "Tirage vertical poulie",
      sets: 3,
      reps: "12",
      rest: "60 s",
      rir: "RIR 3",
      tempo: "2-0-2-0",
    },
    {
      id: "developpe-halteres-assis",
      name: "Développé haltères assis (max 8 kg)",
      sets: 3,
      reps: "12",
      rest: "60 s",
      rir: "RIR 3",
      tempo: "2-0-2-0",
    },
    {
      id: "rowing-haltere-1-bras",
      name: "Rowing haltère 1 bras",
      sets: 3,
      reps: "12/bras",
      rest: "60 s",
      rir: "RIR 3",
      tempo: "2-0-2-0",
    },
    {
      id: "elevations-laterales",
      name: "Élévations latérales (max 4 kg)",
      sets: 3,
      reps: "15",
      rest: "45 s",
      rir: "RIR 3",
      tempo: "2-0-2-0",
      note: "Plafond : jamais au-dessus de 4 kg.",
    },
    {
      id: "pompes",
      name: "Pompes (genoux ou normales)",
      sets: 2,
      reps: "max",
      rest: "60 s",
      rir: "RIR 3",
      tempo: "2-0-2-0",
    },
  ],
  extra: [
    {
      label: "Core",
      detail:
        "Planche 3 × 45 s + dead bug 3 × 12/côté + relevés de jambes 3 × 15 (repos 30 s)",
    },
  ],
};

export const sessionC: WorkoutSession = {
  id: "C",
  day: "Jeudi",
  title: "Bas du corps B — Fessiers / Quadriceps",
  duration: "60 min",
  intensityLabel: "RIR 2 partout. Charges à ~85% de celles du lundi, plus de volume.",
  intensityFeeling:
    "Dur mais répétable — tu ne dois jamais avoir l'impression de survivre.",
  exercises: [
    {
      id: "squat-barre-goblet",
      name: "Squat barre ou goblet",
      sets: 4,
      reps: "10",
      rest: "2 min",
      rir: "RIR 2",
      tempo: "3-0-1-0",
      note: "Descente contrôlée 3 s.",
    },
    {
      id: "presse-cuisses",
      name: "Presse à cuisses pieds hauts",
      sets: 4,
      reps: "12",
      rest: "90 s",
      rir: "RIR 2",
      note: "Pieds hauts et écartés = fessiers.",
    },
    {
      id: "hipthrust-jeudi",
      name: "Hip thrust",
      sets: 3,
      reps: "12-15",
      rest: "90 s",
      rir: "RIR 2",
      tempo: "2-0-1-2",
      note: "Plus léger que lundi.",
    },
    {
      id: "step-up-banc",
      name: "Step-up sur banc",
      sets: 3,
      reps: "12/jambe",
      rest: "60 s",
      rir: "RIR 2",
      note: "Pousse sur le talon.",
    },
    {
      id: "extension-mollets",
      name: "Extension mollets",
      sets: 3,
      reps: "20",
      rest: "45 s",
      rir: "RIR 2",
      note: "Pour des jambes équilibrées.",
    },
  ],
};

export const sessionD: WorkoutSession = {
  id: "D",
  day: "Samedi",
  title: "Fessiers volume + unilatéral",
  duration: "55 min",
  intensityLabel:
    "RIR 0-1 sur les isolations, charges légères, repos courts (45-60 s).",
  intensityFeeling:
    "Objectif congestion et brûlure, pas performance. Charge légère, intention maximale sur chaque contraction.",
  exercises: [
    {
      id: "hipthrust-unilateral",
      name: "Hip thrust unilatéral",
      sets: 3,
      reps: "12/jambe",
      rest: "60 s",
      rir: "RIR 0-1",
    },
    {
      id: "kickback-poulie",
      name: "Kickback poulie",
      sets: 4,
      reps: "15/jambe",
      rest: "45 s",
      rir: "RIR 0-1",
    },
    {
      id: "fentes-marchees",
      name: "Fentes marchées haltères",
      sets: 3,
      reps: "12/jambe",
      rest: "90 s",
      rir: "RIR 0-1",
    },
    {
      id: "good-morning-legere",
      name: "Good morning barre légère",
      sets: 3,
      reps: "15",
      rest: "60 s",
      rir: "RIR 0-1",
    },
    {
      id: "abduction-elastique",
      name: "Abduction élastique (side walk)",
      sets: 3,
      reps: "20 pas",
      rest: "45 s",
      rir: "RIR 0-1",
    },
    {
      id: "hipthrust-finisher",
      name: "Hip thrust — série finale au poids du corps jusqu'à l'échec",
      sets: 1,
      reps: "max",
      rest: "—",
      rir: "RIR 0",
    },
  ],
  extra: [
    {
      label: "Finisher cardio",
      detail: "10 min vélo ou rameur, allure modérée",
    },
  ],
};

export const workoutSessions: WorkoutSession[] = [
  sessionA,
  sessionB,
  sessionC,
  sessionD,
];

export function getSessionById(id: string): WorkoutSession | undefined {
  return workoutSessions.find((s) => s.id === id);
}

/** Toutes les séances, y compris les jours sans musculation (cardio, marche, repos). */
export const weeklySchedule = [
  { day: "Lundi", sessionId: "A" as const, label: "Bas A" },
  { day: "Mardi", sessionId: "B" as const, label: "Haut + Core" },
  { day: "Mercredi", sessionId: null, label: "Cardio" },
  { day: "Jeudi", sessionId: "C" as const, label: "Bas B" },
  { day: "Vendredi", sessionId: null, label: "Marche" },
  { day: "Samedi", sessionId: "D" as const, label: "Bas C" },
  { day: "Dimanche", sessionId: null, label: "Repos" },
];
