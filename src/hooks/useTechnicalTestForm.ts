import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { technicalTestSchema } from "../validations/technicalTestSchema";
import { createTechnicalTest } from "../api/endPointTechnicalTests";
import type { TechnicalTestFormData } from "../types/TechnicalTest";

export const useTechnicalTestForm = () => {
  const navigate = useNavigate();

  const form = useForm<TechnicalTestFormData>({
    resolver: zodResolver(technicalTestSchema),
    defaultValues: {
      title: "",
      description: "",
      language: undefined,
      duration: undefined,
      difficulty: undefined,
      tags: [],
      contentType: "text",
      file: [],
    },
  });

  const onSubmit = async (data: TechnicalTestFormData) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("language", data.language);
    formData.append("duration", String(data.duration));
    formData.append("difficulty_level", data.difficulty);

    if (data.contentType === "text") {
      formData.append("description", data.description || "");
    } else if (data.file && data.file.length > 0) {
      formData.append("file", data.file[0]);
    }

    if (data.tags && Array.isArray(data.tags) && data.tags.length > 0) {
      data.tags.forEach((tag) => {
        formData.append("tags[]", String(tag.id));
      });
    }

    try {
      await createTechnicalTest(formData);
      toast.success("Prova tècnica publicada amb èxit!");
      form.reset();
      navigate("/resources/technical-test/all-tech-tests", {
        state: { successMessage: "Prueba técnica publicada con éxito" },
      });
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error al publicar la prueba técnica");
    }
  };

  const handleCancel = () => {
    navigate("/resources/technical-test/all-tech-tests");
  };

  return {
    form,
    onSubmit,
    handleCancel,
  };
};
