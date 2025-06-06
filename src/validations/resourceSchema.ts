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
    .min(10, { message: "El título debe tener al menos 10 caracteres" })
    .max(65, { message: "El título debe tener menos de 65 caracteres" }),

  description: z
    .string()
    .max(120, { message: "La descripción debe tener menos de 120 caracteres" })
    .optional()
    .or(z.literal("")),

  url: z
    .string()
    .url({ message: "Debe ser una URL válida. Indica el protocolo" })
    .max(300, { message: "La URL debe tener menos de 300 caracteres" }),

  category: z.enum(categories, {
    message: "Por favor, selecciona una categoría válida.",
  }),

  tags: z
    .array(tagSchema)
    .max(10, { message: "No puedes agregar más de 10 tags." })
    .optional(),

  type: z.enum(resourceTypes, {
    message: "Debes seleccionar al menos un tipo de recurso.",
  }),
});
