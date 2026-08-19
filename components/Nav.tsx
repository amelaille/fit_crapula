"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { AppUser } from "@/lib/types";
import { APP_USER_LABELS } from "@/lib/types";
import { logout } from "@/lib/auth-actions";

const links = [
  { href: "/", label: "Accueil", icon: HomeIcon },
  { href: "/programme", label: "Programme", icon: BookIcon },
  { href: "/nutrition", label: "Nutrition", icon: AppleIcon },
  { href: "/suivi", label: "Suivi", icon: ChartIcon },
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
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    active
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
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-black/20 bg-foreground/95 px-4 py-2.5 backdrop-blur sm:hidden">
        <Link href="/" className="flex items-center gap-2 font-semibold text-nude-foreground">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent text-accent-foreground">
            ✿
          </span>
        </Link>
        <div className="flex items-center gap-2.5">
          <span className="text-sm font-medium text-nude-foreground/60">{APP_USER_LABELS[user]}</span>
          <button
            type="button"
            onClick={() => logout()}
            className="rounded-full border border-white/20 px-3 py-1 text-xs font-medium text-nude-foreground/60"
          >
            Déconnexion
          </button>
        </div>
      </header>

      {/* Barre du bas — mobile */}
      <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-surface/95 backdrop-blur sm:hidden">
        <div className="mx-auto flex max-w-md items-stretch justify-between px-2 pb-[max(0.4rem,env(safe-area-inset-bottom))] pt-1.5">
          {visibleLinks.map(({ href, label, icon: Icon }) => {
            const active = isActive(pathname, href);
            return (
              <Link
                key={href}
                href={href}
                className="flex flex-1 flex-col items-center gap-0.5 rounded-xl px-2 py-1.5"
              >
                <Icon
                  className={`h-5 w-5 ${active ? "text-accent" : "text-muted"}`}
                />
                <span
                  className={`text-[0.68rem] font-medium ${
                    active ? "text-accent" : "text-muted"
                  }`}
                >
                  {label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}

function HomeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M4 11.5L12 4l8 7.5M6 10v9a1 1 0 0 0 1 1h3v-5.5h4V20h3a1 1 0 0 0 1-1v-9"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M4 5.5C4 4.67 4.67 4 5.5 4H12v16H5.5A1.5 1.5 0 0 1 4 18.5v-13ZM20 5.5c0-.83-.67-1.5-1.5-1.5H12v16h6.5a1.5 1.5 0 0 0 1.5-1.5v-13Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AppleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M15.5 8.2c1.9-.1 3 .9 3.7 2-2.9 1.6-2.4 5.5.5 6.7-.5 1.4-1.2 2.7-2.4 3.9-1 1-2 1.2-3 .6-.9-.5-1.9-.5-2.8 0-1.1.6-2 .3-3-.6C6 18.2 4.8 14.6 6 11.6c.9-2.2 2.7-3.2 4.4-3.2 1 0 1.8.5 2.5.5.6 0 1.6-.6 2.6-.7Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M13.5 6c.4-.9 1.3-1.7 2.3-1.8-.1 1-.6 1.9-1.3 2.5-.6.6-1.5 1-2.4.9 0-.9.6-1.9 1.4-2.6Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M4 20V10M10 20V4M16 20v-7M20 20H4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
