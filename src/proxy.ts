import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { DEFAULT_LOCALE, LOCALES, isLocale } from "@/lib/i18n";

/* Proxy: locale routing (renamed from middleware per Next.js 16 convention).
   - "/" redirects to the default locale ("/es").
   - Paths without a locale prefix redirect to default locale.
   - Sets x-locale request header so the root layout knows which
     html lang to render. */

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip system paths and static files.
  // The `.` check catches every asset in /public that isn't a page route:
  // og-image.jpg, RENACER-Guia-Editorial.pdf, apple-touch-icon.png, etc.
  // Page routes never contain a dot in the segment, so this is safe.
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/media") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Identify the first path segment
  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0];

  // If the first segment is a locale, pass it through (with header)
  if (firstSegment && isLocale(firstSegment)) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-locale", firstSegment);
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  // Otherwise prefix with default locale and redirect
  const newPathname = `/${DEFAULT_LOCALE}${pathname === "/" ? "" : pathname}`;
  const url = request.nextUrl.clone();
  url.pathname = newPathname;
  return NextResponse.redirect(url);
}

export const config = {
  // Match everything except static files and system paths.
  // The trailing `.*\\..*` excludes any path containing a dot (og-image.jpg,
  // RENACER-Guia-Editorial.pdf, apple-touch-icon.png, etc.) so social-media
  // link previews and PDF downloads bypass the locale redirect.
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|media/|.*\\..*).*)",
  ],
};

// Re-export locale constants for type-safety elsewhere
export { LOCALES };
