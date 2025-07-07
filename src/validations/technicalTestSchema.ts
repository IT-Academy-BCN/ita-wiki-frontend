import { z } from "zod";

const languages = [
  "Java",
  "PHP",
  "JavaScript",
  "TypeScript",
  "Python",
  "SQL",
] as const;
const contentTypes = ["text", "file"] as const;

export const technicalTestSchema = z
  .object({
    title: z
      .string()
      .min(10, { message: "El título debe tener al menos 10 caracteres" })
      .max(100, { message: "El título debe tener menos de 100 caracteres" }),

    language: z.enum(languages, {
      message: "Por favor, selecciona un lenguaje válido.",
    }),

    contentType: z.enum(contentTypes, {
      message: "Debes seleccionar el tipo de contenido.",
    }),

    content: z
      .string()
      .min(50, { message: "El contenido debe tener al menos 50 caracteres" })
      .max(5000, {
        message: "El contenido debe tener menos de 5000 caracteres",
      })
      .optional(),

    file: z
      .instanceof(FileList)
      .optional()
      .refine((files) => !files || files.length <= 1, {
        message: "Solo puedes subir un archivo",
      })
      .refine(
        (files) =>
          !files || files.length === 0 || files[0].size <= 5 * 1024 * 1024,
        {
          message: "El archivo debe pesar menos de 5MB",
        },
      )
      .refine(
        (files) =>
          !files ||
          files.length === 0 ||
          [
            "application/pdf",
            "text/plain",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          ].includes(files[0].type),
        {
          message: "Solo se permiten archivos PDF, TXT, DOC o DOCX",
        },
      ),
  })
  .refine(
    (data) => {
      if (
        data.contentType === "text" &&
        (!data.content || data.content.trim() === "")
      ) {
        return false;
      }
      if (
        data.contentType === "file" &&
        (!data.file || data.file.length === 0)
      ) {
        return false;
      }
      return true;
    },
    {
      message: "Debes proporcionar contenido de texto o subir un archivo",
      path: ["content"],
    },
  );

export type TechnicalTestFormData = z.infer<typeof technicalTestSchema>;
