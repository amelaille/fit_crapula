"use client";

import { useState } from "react";
import type { AppUser } from "@/lib/types";
import { APP_USERS, APP_USER_LABELS } from "@/lib/types";
import { login } from "@/lib/auth-actions";

export default function LoginForm() {
  const [user, setUser] = useState<AppUser>("amelie");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const result = await login(user, password);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
    // Sinon, la Server Action redirige elle-même vers "/".
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-sm flex-col gap-5 rounded-3xl border border-border bg-surface p-6 shadow-sm sm:p-7"
    >
      <div>
        <h1 className="text-xl font-semibold text-foreground">Tu es quel mimi ?</h1>
        <p className="mt-1 text-sm text-muted">Connecte-toi pour accéder au programme.</p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {APP_USERS.map((candidate) => (
          <button
            key={candidate}
            type="button"
            onClick={() => setUser(candidate)}
            aria-pressed={user === candidate}
            className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition-colors ${
              user === candidate
                ? "border-accent bg-accent-soft text-accent"
                : "border-border bg-background text-muted hover:text-foreground"
            }`}
          >
            {APP_USER_LABELS[candidate]}
          </button>
        ))}
      </div>

      <label className="flex flex-col gap-1">
        <span className="text-[0.68rem] font-medium uppercase tracking-wide text-muted">
          Mot de passe
        </span>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
          className="rounded-xl border border-border bg-background px-3.5 py-2.5 text-base text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25"
        />
      </label>

      {error && <p className="text-sm text-nude-foreground">{error}</p>}

      <button
        type="submit"
        disabled={loading || password.length === 0}
        className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Connexion..." : "Se connecter"}
      </button>
    </form>
  );
}
