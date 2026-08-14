"use client";

import { useState } from "react";

type DayToggleProps = {
  training: React.ReactNode;
  rest: React.ReactNode;
};

export default function DayToggle({ training, rest }: DayToggleProps) {
  const [type, setType] = useState<"training" | "repos">("training");

  return (
    <div>
      <div className="mb-4 inline-flex rounded-full border border-border bg-background p-1">
        <button
          type="button"
          onClick={() => setType("training")}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            type === "training"
              ? "bg-accent text-accent-foreground"
              : "text-muted"
          }`}
        >
          Jour d&apos;entraînement
        </button>
        <button
          type="button"
          onClick={() => setType("repos")}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            type === "repos" ? "bg-accent text-accent-foreground" : "text-muted"
          }`}
        >
          Jour de repos
        </button>
      </div>
      {type === "training" ? training : rest}
    </div>
  );
}
