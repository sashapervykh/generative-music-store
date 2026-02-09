import type { Locales } from "~/types/Locales.js";
import locales from "../locale/locales.json" with { type: "json" };
import type { Locale } from "~/types/Locale.js";

const typedLocales: Locales = locales;

class LocaleService {
  getAvailableLocales() {
    const localesData: Locale[] = [];
    for (const locale in typedLocales) {
      if (!typedLocales[locale]) continue;
      localesData.push({
        value: typedLocales[locale].value,
        label: typedLocales[locale].label,
      });
    }
    console.log(localesData);
    return localesData;
  }
}

export const localeService = new LocaleService();
