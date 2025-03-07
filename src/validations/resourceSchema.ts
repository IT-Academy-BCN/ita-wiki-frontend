import { z } from "zod";
import { IntResource } from "../types";

export const resourceSchema: z.ZodType<Partial<IntResource>> = z.object({
  title: z.string()
    .min(10, { message: "El título debe tener al menos 10 caracteres" })
    .max(50, { message: "El título debe tener menos de 50 caracteres" }),
  description: z.string()
    .min(20, { message: "La descripción debe tener al menos 20 caracteres" })
    .max(150, { message: "La descripción debe tener menos de 150 caracteres" }),
  url: z.string()
    .url({ message: "Debe ser una URL válida. Indica el protocolo" })
    .max(300, { message: "La URL debe tener menos de 300 caracteres" }),
  type: z.string().optional(),
});