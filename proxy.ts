import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // IMPORTANT : ne pas retirer cet appel, il rafraîchit le token Supabase.
  // getSession() lit le cookie localement (pas d'appel réseau à Supabase à chaque navigation),
  // contrairement à getUser() qui revalide en permanence côté serveur. Compromis assumé pour
  // une appli privée à 2 comptes : un cookie volé/révoqué pourrait en théorie être rejoué le
  // temps qu'il expire, mais le gain de vitesse sur chaque clic le justifie ici.
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const user = session?.user ?? null;

  if (!user && request.nextUrl.pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Passe l'identité déjà vérifiée aux Server Components via un header de requête,
  // pour leur éviter un 2e appel réseau à Supabase Auth (getCurrentUser côté layout/page).
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-user-email", user?.email ?? "");
  const finalResponse = NextResponse.next({ request: { headers: requestHeaders } });
  response.cookies.getAll().forEach((cookie) => finalResponse.cookies.set(cookie));

  return finalResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpe?g|gif|svg|webp|avif|ico)$).*)",
  ],
};
