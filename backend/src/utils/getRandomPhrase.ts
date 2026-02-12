import type { Faker } from "@faker-js/faker";
import type { SeededRNG } from "./seededRNG.js";
import { getCapitalizedWord } from "./getCapitalizedWord.js";

const generationFunctions = [
  (faker: Faker) => {
    const adjective = getCapitalizedWord(faker.word.adjective());
    const noun = getCapitalizedWord(faker.word.noun());
    return `${adjective} ${noun}`;
  },
  (faker: Faker) => {
    const firstAdjective = getCapitalizedWord(faker.word.adjective());
    const secondAdjective = getCapitalizedWord(faker.word.adjective());
    const noun = getCapitalizedWord(faker.word.noun());
    return `${firstAdjective} ${secondAdjective} ${noun}`;
  },

  (faker: Faker) => {
    const verb = getCapitalizedWord(faker.word.verb());
    const noun = getCapitalizedWord(faker.word.noun());
    return `${verb} ${noun}`;
  },
  (faker: Faker) => {
    const noun = getCapitalizedWord(faker.word.noun());
    return `${noun}`;
  },
  (faker: Faker) => {
    const verb = getCapitalizedWord(faker.word.verb());
    const adjective = getCapitalizedWord(faker.word.adjective());
    const noun = getCapitalizedWord(faker.word.noun());
    return `${verb} ${adjective} ${noun}`;
  },
];

export function getRandomPhrase(faker: Faker, rng: SeededRNG) {
  const getPhrase = rng.choice(generationFunctions);
  return getPhrase(faker);
}
