import type { Locales } from "~/types/Locales.js";
import locales from "../assets/locale/locales.json" with { type: "json" };
import type { FrontendLocale } from "~/types/FrontendLocale.js";

const typedLocales: Locales = locales;

class LocaleService {
  getAvailableLocales() {
    const localesData: FrontendLocale[] = [];
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
