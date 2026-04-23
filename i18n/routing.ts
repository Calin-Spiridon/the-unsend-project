import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "ro", "fr", "es", "de", "it", "pt"],
  defaultLocale: "en",
});