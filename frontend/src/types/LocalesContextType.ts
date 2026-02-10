import type { Locale } from "./Locale";

export interface LocalesContextType {
  locales: Locale[] | undefined;
  setLocales: (locales: Locale[]) => void;
}
