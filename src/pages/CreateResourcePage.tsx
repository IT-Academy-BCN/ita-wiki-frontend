import { IntResource, Theme, Category } from "../types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resourceSchema } from "../validations/resourceSchema";
import FormInput from "../components/resources/create-resources/FormInput";
import { createResource } from "../api/endPointResources";
import { toast } from "sonner";
import ButtonComponent from "../components/atoms/ButtonComponent";
import { useUser } from "../hooks/useUser";
import PageTitle from "../components/ui/PageTitle";
import logoJava from "../../src/assets/logo-java 1.svg";
import logoPhp from "../../src/assets/logo-php 1.svg";
import logoJavaS from "../../src/assets/javascript.svg";
import logoTypeS from "../../src/assets/TypescriptVector.svg";
import logoPython from "../../src/assets/pythonVector.svg";
import logoSql from "../../src/assets/sqlVector.svg";
import TagInput from "../components/resources/create-resources/TagInput";
import { useState } from "react";
import { themes } from "../data/themes";

export default function CreateResourcePage() {
  const { user } = useUser();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resourceSchema),
  });

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);

  const handleThemeChange = (theme: (typeof themes)[number] | null) => {
    setSelectedTheme(theme);
    setValue("theme", theme);
  };

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
    setValue("category", category);
  };

  const onSubmit = async (data: Partial<IntResource>) => {
    const resourceWithGithubId = {
      ...data,
      github_id: user?.id,
    };

    try {
      await createResource(resourceWithGithubId);
      toast.success("¡Recurso creado con éxito!");
      setTimeout(() => {
        window.location.href = `/resources/${data?.category}`;
      }, 1000);
      reset();
    } catch (error) {
      console.error("Error al crear el recurso:", error);
      toast.error("Hubo un error al crear el recurso");
    }
  };
  const [charCount, setCharCount] = useState(0);
  const charLimitTitle = 65;
  const charLimitDescription = 120;
  return (
    <>
      <PageTitle title="Create Resource" />
      <div className="mx-18 w-full lg:w-6/7 bg-white py-13 px-15  rounded-xl ">
        <div className="md:flex justify-between items-center">
          <div>
            <h3 className="text-sm font-medium text-gray-500">
              Recursos / crear recurso
            </h3>
            <h1 className="text-[26px] font-black ">Nuevo recurso</h1>
          </div>
          <div className="flex  ">
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
              className="min-w-[8rem] max-h-[2.75rem] "
              onClick={handleSubmit(onSubmit)}
            >
              Publicar
            </ButtonComponent>
          </div>
        </div>
        <hr className="w-full border-t border-gray-300 mt-3" />

        <div className="flex mt-6 overflow-y-scroll">
          <form onSubmit={handleSubmit(onSubmit)} className="w-full ">
            <h2 className="text-sm text-black font-medium mb-3">Título</h2>
            <FormInput
              id="title"
              placeholder=""
              register={register}
              errors={errors.title?.message}
              className="max-w-[482px] max-h-[2.6rem] border-[0.06rem]  border-gray-300 focus:border-2 focus:border-[#B91879] outline-none "
              maxLength={charLimitTitle}
              onChange={(e) => setCharCount(e.target.value.length)}
            />
            <div className="w-1/2">
              <p className="text-sm text-slate-600 -mt-5 text-center ml-75">
                {charCount}/{charLimitTitle}
              </p>
            </div>

            <h2 className="text-sm text-black font-medium mb-2 ">URL</h2>
            <FormInput
              id="url"
              placeholder=""
              register={register}
              errors={errors.url?.message}
              className="max-w-[482px] max-h-[2.6rem] border-[0.06rem] border-gray-300 focus:border-2 focus:border-[#B91879] outline-none "
            />

            <h2 className="text-sm text-black font-medium mb-2">Lenguaje</h2>
            <div className="flex gap-x-3 w-1/2">
              <ButtonComponent
                type="button"
                variant="secondary"
                onClick={() => handleCategorySelect("Java")}
                className={`min-w-[8rem] max-h-[5rem] text-black  ${
                  selectedCategory === "Java"
                    ? "border-2 focus:border-[#B91879]"
                    : ""
                }`}
              >
                <div className="flex justify-center items-center gap-1 h-fit">
                  <img src={logoJava} alt="LogoJava" className="w-7" />
                  <h1 className="text-sm font-medium">Java</h1>
                </div>
              </ButtonComponent>

              <ButtonComponent
                type="button"
                variant="secondary"
                onClick={() => handleCategorySelect("Fullstack PHP")}
                className={`min-w-[8rem] max-h-[3.5rem] text-black py-2 ${
                  selectedCategory === "Fullstack PHP"
                    ? "border-2 focus:border-[#B91879]"
                    : ""
                }`}
              >
                <div className="flex justify-center items-center gap-1">
                  <img src={logoPhp} alt="LogoPHP" className="w-7" />
                  <h1 className="text-sm font-medium">PHP</h1>
                </div>
              </ButtonComponent>

              <ButtonComponent
                type="button"
                variant="secondary"
                onClick={() => handleCategorySelect("Javascript")}
                className={`min-w-[12rem] max-h-[3.5rem] text-black py-2 ${
                  selectedCategory === "Javascript"
                    ? "border-2 focus:border-[#B91879]"
                    : ""
                }`}
              >
                <div className="flex justify-center items-center gap-1">
                  <img src={logoJavaS} alt="LogoJavaS" className="w-5" />
                  <h1 className="text-sm font-medium">JavaScript</h1>
                </div>
              </ButtonComponent>

              <ButtonComponent
                type="button"
                variant="secondary"
                onClick={() => handleCategorySelect("TypeScript")}
                className={`min-w-[12rem] max-h-[3.5rem] text-black py-2 ${
                  selectedCategory === "TypeScript"
                    ? "border-2 focus:border-[#B91879]"
                    : ""
                }`}
              >
                <div className="flex justify-center items-center gap-1">
                  <img src={logoTypeS} alt="LogoTypeS" className="w-6" />
                  <h1 className="text-sm font-medium">TypeScript</h1>
                </div>
              </ButtonComponent>

              <ButtonComponent
                type="button"
                variant="secondary"
                onClick={() => handleCategorySelect("Python")}
                className={`min-w-[8rem] max-h-[3.5rem] text-black py-2 ${
                  selectedCategory === "Python"
                    ? "border-2 focus:border-[#B91879]"
                    : ""
                }`}
              >
                <div className="flex justify-center items-center gap-1">
                  <img src={logoPython} alt="LogoPython" className="w-6" />
                  <h1 className="text-sm font-medium">Python</h1>
                </div>
              </ButtonComponent>

              <ButtonComponent
                type="button"
                variant="secondary"
                onClick={() => handleCategorySelect("SQL")}
                className={`min-w-[8rem] max-h-[3.5rem] text-black py-2 ${
                  selectedCategory === "SQL"
                    ? "border-2  focus:border-[#B91879]"
                    : ""
                }`}
              >
                <div className="flex justify-center items-center gap-1">
                  <img src={logoSql} alt="LogoSQL" className="w-5" />
                  <h1 className="text-sm font-medium">SQL</h1>
                </div>
              </ButtonComponent>
            </div>
            <div className="h-6">
              {errors.category && (
                <p className="text-red-500 text-xs mt-2">
                  {errors.category.message}
                </p>
              )}
            </div>
            <h2 className="text-sm text-black font-medium mb-4">
              Tipo de recurso
            </h2>
            <div className="flex justify-start gap-x-10 mb-1">
              <div className="ml-1 flex gap-2 md:text-xl">
                <input
                  type="radio"
                  id="video"
                  value="Video"
                  className=" scale-150 accent-[#B91879] "
                  {...register("type", { required: true })}
                />
                <label htmlFor="video" className="text-sm">
                  Vídeo
                </label>
              </div>
              <div className="flex gap-2 md:text-xl">
                <input
                  type="radio"
                  id="curso"
                  value="Cursos"
                  className="scale-150 accent-[#B91879]"
                  {...register("type", { required: true })}
                />
                <label htmlFor="curso" className="text-sm">
                  Curso
                </label>
              </div>
              <div className="flex gap-2 md:text-xl">
                <input
                  type="radio"
                  id="blog"
                  value="Blog"
                  className="scale-150 accent-[#B91879]"
                  {...register("type", { required: true })}
                />
                <label htmlFor="blog" className="text-sm">
                  Blog
                </label>
              </div>
            </div>
            <div className="h-6">
              {errors.type && (
                <p className="text-red-500 text-xs">{errors.type.message}</p>
              )}
            </div>
            <TagInput
              selectedTheme={selectedTheme}
              setSelectedTheme={handleThemeChange}
            />
            <div className="h-6">
              {errors.theme && (
                <p className="text-red-500 text-xs">{errors.theme.message}</p>
              )}
            </div>
            <div>
              <hr className="w-full border-t border-gray-300 mt-3" />

              <h2 className="text-base font-semibold mt-6 mb-6">
                Información adicional
              </h2>
              <h2 className="text-sm text-black font-medium mt-2 mb-2">
                Descripción
              </h2>
              <FormInput
                id="description"
                placeholder=""
                register={register}
                errors={errors.description?.message}
                className="max-w-[482px] max-h-[4.5rem] border-[0.06rem] border-gray-300 focus:border-[#B91879] outline-none"
                maxLength={charLimitDescription}
                onChange={(e) => setCharCount(e.target.value.length)}
              />
              <div className="w-1/2">
                <p className="text-sm text-slate-600 -mt-5 text-center ml-75">
                  {charCount}/{charLimitDescription}
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
