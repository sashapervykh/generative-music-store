export function checkEnv(env: undefined | string) {
  if (!env) {
    throw new Error("The environment variables were not provided!");
  }
  return env;
}
