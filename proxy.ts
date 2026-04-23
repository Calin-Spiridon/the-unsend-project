import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["en", "ro", "fr", "es", "de", "it", "pt"],
  defaultLocale: "en",
  localeDetection: true,
});

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};