import { z } from "zod";
import { IntResource } from "../types";
import { categories } from "../data/categories";
import { resourceTypes } from "../data/resourceTypes";

const tagSchema = z.object({
  id: z.number(),
  name: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const resourceSchema: z.ZodType<Partial<IntResource>> = z.object({
  title: z
    .string()
    .min(10, { message: "El títol ha de tenir almenys 10 caràcters" })
    .max(65, { message: "El títol ha de tenir menys de 65 caràcters" }),

  description: z
    .string()
    .max(120, { message: "La descripció ha de tenir menys de 120 caràcters" })
    .optional()
    .or(z.literal("")),

  url: z
    .string()
    .url({ message: "Ha de ser una URL vàlida. Indica el protocol" })
    .max(300, { message: "La URL ha de tenir menys de 300 caràcters" }),

  category: z.enum(categories, {
    message: "Si us plau, selecciona una categoria vàlida.",
  }),

  tags: z
    .array(tagSchema)
    .max(10, { message: "No pots afegir més de 10 etiquetes." })
    .optional(),

  type: z.enum(resourceTypes, {
    message: "Has de seleccionar almenys un tipus de recurs.",
  }),
});
