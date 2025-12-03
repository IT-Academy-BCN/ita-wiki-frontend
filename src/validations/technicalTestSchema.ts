import { z } from "zod";

const technicalTestLanguages = [
  "React",
  "SQL",
  "JavaScript",
  "TypeScript",
  "Java",
  "PHP",
  "Python",
] as const;

const tagSchema = z.object({
  id: z.number(),
  name: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const technicalTestSchema = z.object({
  title: z
    .string()
    .min(10, { message: "El títol ha de tenir almenys 10 caràcters" })
    .max(65, { message: "El títol ha de tenir menys de 65 caràcters" }),

  language: z.enum(technicalTestLanguages, {
    message: "Si us plau, selecciona un llenguatge vàlid.",
  }),

  description: z
    .string()
    .min(1, { message: "La descripció no pot estar buida" })
    .max(1000, { message: "La descripció ha de tenir menys de 1000 caràcters" })
    .optional()
    .or(z.literal("")),

  tags: z
    .array(tagSchema)
    .max(10, { message: "No pots afegir més de 10 etiquetes." })
    .optional(),
});
