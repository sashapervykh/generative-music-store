import z from "zod";

export const querySchema = z.object({
  language: z.string().min(1, "Language is required"),
  seed: z.string().min(1, "Seed is required"),
  likes: z.coerce
    .number()
    .min(0, "Likes must be at least 0")
    .max(10, "Likes cannot exceed 10"),
  page: z.coerce
    .number()
    .int("Page must be an integer")
    .min(1, "Page must be at least 1"),
  view: z.enum(["table", "gallery"], {
    message: 'View must be either "table" or "gallery"',
  }),
});

export type QueryType = z.infer<typeof querySchema>;
