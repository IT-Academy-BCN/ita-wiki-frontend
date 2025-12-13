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

  duration: z
    .number({ invalid_type_error: "La durada ha de ser un número" })
    .positive({ message: "La durada ha de ser major que 0" })
    .int({ message: "La durada ha de ser un número enter" }),

  difficulty: z.enum(["Easy", "Medium", "Hard", "Expert"], {
    required_error: "Si us plau, selecciona una dificultat vàlida.",
  }),

  contentType: z.enum(["text", "file"]).default("text"),

  file: z
    .instanceof(FileList)
    .or(z.array(z.instanceof(File)))
    .optional()
    .refine(
      (files) => {
        if (!files || (Array.isArray(files) && files.length === 0)) return true;
        const file = files instanceof FileList ? files[0] : files[0];
        return file ? file.size <= 5 * 1024 * 1024 : true;
      },
      { message: "El fitxer ha de ser menys de 5 MB" },
    )
    .refine(
      (files) => {
        if (!files || (Array.isArray(files) && files.length === 0)) return true;
        const file = files instanceof FileList ? files[0] : files[0];
        return file ? file.type === "application/pdf" : true;
      },
      { message: "El fitxer ha de ser un PDF" },
    ),
});
