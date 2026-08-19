import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Nav from "@/components/Nav";
import { getCurrentUser } from "@/lib/session";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mon programme — 3 mois",
  description: "Suivi personnel du programme sport & nutrition sur 3 mois.",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const user = await getCurrentUser();

  return (
    <html
      lang="fr"
      data-user={user ?? undefined}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        {user && <Nav user={user} />}
        <main
          className={`mx-auto w-full max-w-5xl flex-1 px-4 pt-6 sm:px-6 sm:pt-8 ${
            user ? "pb-24 sm:pb-12" : "pb-6"
          }`}
        >
          {children}
        </main>
      </body>
    </html>
  );
}
