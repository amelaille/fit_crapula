"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { AppUser } from "@/lib/types";
import { APP_USER_LABELS } from "@/lib/types";
import { logout } from "@/lib/auth-actions";
import Image from "next/image";
import { Home, Dumbbell, Apple, ChartColumn } from "lucide-react";

const links = [
  { href: "/", label: "Accueil", icon: Home },
  { href: "/programme", label: "Programme", icon: Dumbbell },
  { href: "/nutrition", label: "Nutrition", icon: Apple },
  { href: "/suivi", label: "Suivi", icon: ChartColumn },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export default function Nav({ user }: { user: AppUser }) {
  const pathname = usePathname();
  const visibleLinks =
    user === "amelie" ? links : links.filter((l) => l.href === "/" || l.href === "/suivi");

  return (
    <>
      {/* Barre du haut — desktop */}
      <header className="sticky top-0 z-30 hidden border-b border-black/20 bg-foreground/95 backdrop-blur sm:block">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3.5">
          <Link href="/" className="flex items-center gap-2 font-semibold text-nude-foreground">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground">
              ✿
            </span>
            <span>Mon programme</span>
          </Link>
          <nav className="flex items-center gap-1">
            {visibleLinks.map(({ href, label }) => {
              const active = isActive(pathname, href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${active
                    ? "bg-accent text-accent-foreground"
                    : "text-nude-foreground/60 hover:bg-white/10 hover:text-nude-foreground"
                    }`}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-nude-foreground/60">{APP_USER_LABELS[user]}</span>
            <button
              type="button"
              onClick={() => logout()}
              className="rounded-full border border-white/20 px-3.5 py-1.5 text-xs font-medium text-nude-foreground/60 transition-colors hover:border-white/40 hover:text-nude-foreground"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      {/* Barre du haut — mobile */}
      <header className="sticky top-0 z-30 flex items-center justify-between bg-background/95 px-4 py-1 backdrop-blur sm:hidden">
        <span className="text-xs font-medium uppercase text-muted">
          {APP_USER_LABELS[user]}
        </span>
        <div>
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-border/60">
            <Image
              src={user === "amelie" ? "/ame.png" : "/sena.png"}
              alt="Photo profil"
              fill
              className="object-cover"
              sizes="36px"
              priority
            />
          </div>
        </div>
        <button
          type="button"
          onClick={() => logout()}
          className="rounded-full border border-border px-3 py-1.5 text-xs bg-nude font-medium text-nude-foreground transition-colors hover:text-foreground"
        >
          Déconnexion
        </button>
      </header>

      {/* Barre du bas — mobile */}
      <nav className="fixed inset-x-0 bottom-0 z-30 bg-background/95 backdrop-blur sm:hidden px-6 py-2">
        <div className="mx-auto flex max-w-md items-stretch justify-between px-2 pb-[max(0.4rem,env(safe-area-inset-bottom))] pt-1.5">
          {visibleLinks.map(({ href, icon: Icon }) => {
            const active = isActive(pathname, href);
            return (
              <Link
                key={href}
                href={href}
                className="rounded-xl text-nude-foreground transition-colors hover:bg-white/10 hover:text-nude-foreground"
              >
                <Icon
                  className={`h-6 w-6 ${active ? "text-accent" : "text-muted"}`}
                />
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}

