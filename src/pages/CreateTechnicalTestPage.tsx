import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useState } from "react";
import { useNavigate } from "react-router";
import PageTitle from "../components/ui/PageTitle";
import Container from "../components/ui/Container";
import FormInput from "../components/resources/create-resources/FormInput";
import ButtonComponent from "../components/atoms/ButtonComponent";
import arrowLeft from "../assets/arrow-left.svg";
import { technicalTestSchema } from "../validations/technicalTestSchema";

interface TechnicalTestForm {
  title: string;
  language: "Java" | "PHP" | "JavaScript" | "TypeScript" | "Python" | "SQL";
  contentType: "text" | "file";
  content?: string;
  file?: FileList;
}

export default function CreateTechnicalTestPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm<TechnicalTestForm>({
    resolver: zodResolver(technicalTestSchema),
    defaultValues: {
      contentType: "text",
    },
  });

  const titleValue = useWatch({
    control,
    name: "title",
    defaultValue: "",
  });

  const contentValue = useWatch({
    control,
    name: "content",
    defaultValue: "",
  });

  const contentType = useWatch({
    control,
    name: "contentType",
    defaultValue: "text",
  });

  const [selectedLanguage, setSelectedLanguage] = useState<string>("");

  const languages = [
    "Java",
    "PHP", 
    "JavaScript",
    "TypeScript",
    "Python",
    "SQL"
  ];

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
    setValue("language", language as TechnicalTestForm["language"]);
  };

  const onSubmit = async () => {
    try {
      // TODO: Implement the API call to create the technical test
      
      toast.success("¡Prueba técnica creada con éxito!");
      setTimeout(() => {
        navigate("/technical-tests");
      }, 1000);
      reset();
    } catch (error) {
      console.error("Error al crear la prueba técnica:", error);
      toast.error("Hubo un error al crear la prueba técnica");
    }
  };

  const charLimitTitle = 100;
  const charLimitContent = 5000;

  const goBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate("/technical-tests");
    }
  };

  return (
    <>
      <PageTitle title="Create Technical Test" />
      <Container>
        <div className="md:flex justify-between items-center">
          <div className="flex flex-col gap-3">
            <button
              onClick={goBack}
              className="text-md font-medium text-primary flex items-center gap-2 cursor-pointer hover:opacity-80"
            >
              <img className="w-4 h-4" src={arrowLeft} alt="Arrow Left" />
              <span>Volver a pruebas técnicas</span>
            </button>
            <h1 className="text-[26px] font-black">Nueva prueba técnica</h1>
          </div>
          <div className="flex">
            <ButtonComponent
              variant="secondary"
              onClick={() => window.history.back()}
              className="min-w-[8rem] max-h-[2.75rem] mr-4"
            >
              Cancelar
            </ButtonComponent>
            <ButtonComponent
              type="button"
              variant="primary"
              className="min-w-[8rem] max-h-[2.75rem]"
              onClick={handleSubmit(onSubmit)}
            >
              Publicar
            </ButtonComponent>
          </div>
        </div>
        <hr className="w-full border-t border-gray-300 mt-3" />

        <div className="flex mt-6 overflow-y-scroll">
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <h2 className="text-sm text-black font-medium mb-3">Título</h2>
            <FormInput
              id="title"
              placeholder="Escribe el título de la prueba técnica"
              register={register}
              errors={errors.title?.message}
              className="max-w-[482px] max-h-[2.6rem] border-[0.06rem] border-gray-300 focus:border-2 focus:border-[#B91879] outline-none"
              maxLength={charLimitTitle}
              onChange={(e) => {
                setValue("title", e.target.value);
              }}
            />
            <div className="w-1/2">
              <p className="text-sm text-slate-600 -mt-5 text-center ml-75">
                {titleValue?.length}/{charLimitTitle}
              </p>
            </div>

            <h2 className="text-sm text-black font-medium mb-2 mt-4">Lenguaje</h2>
            <div className="flex flex-wrap gap-3">
              {languages.map((language) => (
                <ButtonComponent
                  type="button"
                  variant="secondary"
                  onClick={() => handleLanguageSelect(language)}
                  className={`!w-fit text-black ${
                    selectedLanguage === language
                      ? "border-2 border-[#B91879] bg-purple-50"
                      : ""
                  }`}
                  key={language}
                >
                  <div className="flex justify-center items-center gap-1 h-fit px-2">
                    <h1 className="text-sm font-medium">{language}</h1>
                  </div>
                </ButtonComponent>
              ))}
            </div>
            <div className="h-6">
              {errors.language && (
                <p className="text-red-500 text-xs mt-2">
                  {errors.language.message}
                </p>
              )}
            </div>

            <h2 className="text-sm text-black font-medium mb-4 mt-4">
              Tipo de contenido
            </h2>
           <div className="flex justify-start gap-x-10 mb-1">
              <div className="ml-1 flex gap-2 md:text-xl">
                <input
                  type="radio"
                  id="text"
                  value="text"
                  className="scale-150 accent-[#B91879]"
                  {...register("contentType", { required: true })}
                />
                <label htmlFor="text" className="text-sm">
                  Texto
                </label>
              </div>
              <div className="flex gap-2 md:text-xl">
                <input
                  type="radio"
                  id="file"
                  value="file"
                  className="scale-150 accent-[#B91879]"
                  {...register("contentType", { required: true })}
                />
                <label htmlFor="file" className="text-sm">
                  Archivo
                </label>
              </div>
            </div>
            <div className="h-6">
              {errors.contentType && (
                <p className="text-red-500 text-xs">{errors.contentType.message}</p>
              )}
            </div>

            {contentType === "text" ? (
              <>
                <h2 className="text-sm text-black font-medium mb-3 mt-4">
                  Contenido de la prueba técnica
                </h2>
                <div className="max-w-[482px]">
                  <textarea
                    id="content"
                    placeholder="Describe la prueba técnica, instrucciones, requisitos, etc..."
                    maxLength={charLimitContent}
                    className="w-full px-6 py-4 mb-1 border border-[#dddddd] rounded-lg placeholder:font-medium outline-[#B91879] min-h-[200px] resize-vertical"
                    {...register("content")}
                    onChange={(e) => {
                      setValue("content", e.target.value);
                    }}
                  />
                  <div className="flex justify-end">
                    <p className="text-sm text-slate-600 -mt-5">
                      {contentValue?.length}/{charLimitContent}
                    </p>
                  </div>
                  <div className="h-6">
                    {errors.content && (
                      <p className="text-red-500 text-xs">{errors.content.message}</p>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-sm text-black font-medium mb-3 mt-4">
                  Subir archivo
                </h2>
                <div className="max-w-[482px]">
                  <input
                    type="file"
                    id="file"
                    accept=".pdf,.doc,.docx,.zip,.rar,.txt"
                    className="w-full px-6 py-4 mb-1 border border-[#dddddd] rounded-lg outline-[#B91879] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                    {...register("file")}
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Formatos admitidos: PDF, DOC, DOCX, ZIP, RAR, TXT (máx. 10MB)
                  </p>
                  <div className="h-6">
                    {errors.file && (
                      <p className="text-red-500 text-xs">{errors.file.message}</p>
                    )}
                  </div>
                </div>
              </>
            )}
          </form>
        </div>
      </Container>
    </>
  );
}