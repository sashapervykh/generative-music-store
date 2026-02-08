import type { LANGUAGES } from "../constants/languages";

export type LanguagesType = (typeof LANGUAGES)[keyof typeof LANGUAGES];
