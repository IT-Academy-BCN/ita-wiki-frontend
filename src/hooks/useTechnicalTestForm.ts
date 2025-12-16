import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { technicalTestSchema } from "../validations/technicalTestSchema";
import type { TechnicalTestFormData } from "../types/TechnicalTest";

export const useTechnicalTestForm = () => {
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

  const onSubmit = async () => {};

  const handleCancel = () => {};

  return {
    form,
    onSubmit,
    handleCancel,
  };
};
