import { z } from "zod";
import { IntResource } from "../types";
import { themes } from "../data/themes";
import { categories } from "../data/categories";
import { resourceTypes } from "../data/resourceTypes";

export const resourceSchema: z.ZodType<Partial<IntResource>> = z.object({
  title: z
    .string()
    .min(10, { message: "El título debe tener al menos 10 caracteres" })
    .max(50, { message: "El título debe tener menos de 50 caracteres" }),

  description: z
    .string()
    .min(20, { message: "La descripción debe tener al menos 20 caracteres" })
    .max(150, { message: "La descripción debe tener menos de 150 caracteres" }),

  url: z
    .string()
    .url({ message: "Debe ser una URL válida. Indica el protocolo" })
    .max(300, { message: "La URL debe tener menos de 300 caracteres" }),
  category: z.enum(categories, {
    message: "Por favor, selecciona una categoría válida.",
  }),

  theme: z.enum(themes, { message: "Por favor, selecciona un tema válido" }),

  type: z.enum(resourceTypes, {
    message: "Debes seleccionar al menos un tipo de recurso.",
  }),
});
