export function getRandomSeed() {
  const array = new BigUint64Array(1);
  crypto.getRandomValues(array);
  if (!array[0]) throw new Error("Internal error happened");
  return array[0].toString();
}
