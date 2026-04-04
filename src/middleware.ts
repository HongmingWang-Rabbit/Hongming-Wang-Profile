import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale, isValidLocale } from "./i18n/config";

// Cookie name for storing user's language preference
const LOCALE_COOKIE = "NEXT_LOCALE";

function getPreferredLocale(request: NextRequest): string {
  // 1. Check cookie for stored preference
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
  if (cookieLocale && isValidLocale(cookieLocale)) {
    return cookieLocale;
  }

  // 2. Check Accept-Language header for browser preference
  const acceptLanguage = request.headers.get("accept-language");
  if (acceptLanguage) {
    const languages = acceptLanguage.split(",").map((lang) => {
      const [code, priority] = lang.trim().split(";q=");
      return { code: code.trim().toLowerCase(), priority: priority ? parseFloat(priority) : 1 };
    });
    languages.sort((a, b) => b.priority - a.priority);

    for (const { code } of languages) {
      // Match exact locale or language prefix (e.g., "zh-CN" -> "zh")
      if (isValidLocale(code)) return code;
      const prefix = code.split("-")[0];
      if (isValidLocale(prefix)) return prefix;
    }
  }

  // 3. Fallback to default
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip API routes, static files, and Next.js internals
  if (
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/favicon") ||
    pathname.includes(".") // static files like .css, .js, .png, .docx, etc.
  ) {
    return NextResponse.next();
  }

  // Check if locale is already in the pathname
  const pathnameLocale = locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameLocale) {
    // Valid locale in URL — set cookie to remember and continue
    const response = NextResponse.next();
    response.cookies.set(LOCALE_COOKIE, pathnameLocale, {
      maxAge: 60 * 60 * 24 * 365, // 1 year
      path: "/",
    });
    return response;
  }

  // No locale in URL — redirect to preferred locale
  const preferredLocale = getPreferredLocale(request);
  const newUrl = new URL(`/${preferredLocale}${pathname}`, request.url);
  // Preserve hash and search params
  newUrl.search = request.nextUrl.search;

  const response = NextResponse.redirect(newUrl);
  response.cookies.set(LOCALE_COOKIE, preferredLocale, {
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
  });
  return response;
}

export const config = {
  // Match all paths except API routes, static files, and Next.js internals
  matcher: ["/((?!api|_next/static|_next/image|favicon|.*\\..*).*)"],
};
