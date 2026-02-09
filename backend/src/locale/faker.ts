import { Faker, faker } from "@faker-js/faker";
import { fakerDE } from "@faker-js/faker";

export const fakerLocales: Record<string, Faker> = {
  en_US: faker,
  de_DE: fakerDE,
};
