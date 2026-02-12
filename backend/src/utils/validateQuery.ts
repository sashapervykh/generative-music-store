import { querySchema } from "../types/schemas/querySchema.js";

export function validateQuery(params: unknown) {
  const result = querySchema.safeParse(params);

  if (!result.success) {
    console.error("Validation failed:", result.error);
    throw new Error("Invalid query parameters");
  }

  return result.data;
}
