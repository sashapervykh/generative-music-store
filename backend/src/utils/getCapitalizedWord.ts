export function getCapitalizedWord(word: string) {
  return word.charAt(0).toLocaleUpperCase().concat(word.slice(1));
}
