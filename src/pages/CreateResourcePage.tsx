import { IntResource } from "../types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resourceSchema } from "../validations/resourceSchema";
import FormInput from "../components/FormInput";
import { createResource } from "../api/endPointResources";
import { toast } from "sonner";
import ButtonComponent from "../components/atoms/ButtonComponent";
import { categories } from "../data/categories";
import { themes } from "../data/themes";

export default function CreateResourcePage() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<Partial<IntResource>>({
    resolver: zodResolver(resourceSchema),
  });

  const onSubmit = async (data: Partial<IntResource>) => {
    const resourceWithGithubId = {
      ...data,
      github_id: 6729608,
    };

    try {
      await createResource(resourceWithGithubId);
      toast.success("¡Recurso creado con éxito!");
      reset();
    } catch (error) {
      console.error("Error al crear el recurso:", error);
      toast.error("Hubo un error al crear el recurso");
    }
  };

  return (
    <div className="w-full">
      <h1 className="font-semibold">Nuevo recurso</h1>
      <div className="flex justify-center mt-20 xl:mr-[198px]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="my-5 w-full lg:w-3/5 bg-white p-10 rounded-xl"
        >
          <FormInput
            id="title"
            placeholder="Título"
            register={register}
            errors={errors.title?.message}
          />
          <FormInput
            id="description"
            placeholder="Descripción"
            register={register}
            errors={errors.description?.message}
          />
          <FormInput
            id="url"
            placeholder="URL"
            register={register}
            errors={errors.url?.message}
          />

          <select
            id="category"
            className="w-full mb-1 px-6 py-4 border border-[#dddddd] rounded-lg placeholder:font-medium outline-[#B91879]"
            {...register("category")}
          >
            <option
              value="Tecnología"
              className=" disabled:text-[#909AA3]"
              disabled
              selected
            >
              Tecnología
            </option>
            {categories.map((categorie) => (
              <option key={categorie} value={categorie}>
                {categorie}
              </option>
            ))}
          </select>
          <div className="h-6">
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category.message}</p>
            )}
          </div>

          <select
            id="theme"
            className="w-full mb-1 px-6 py-4 border border-[#dddddd] rounded-lg placeholder:font-medium outline-[#B91879]"
            {...register("theme")}
          >
            <option
              value="Tema"
              className=" disabled:text-[#909AA3]"
              disabled
              selected
            >
              Tema
            </option>
            {themes.map((theme) => (
              <option key={theme} value={theme}>
                {theme}
              </option>
            ))}
          </select>
          <div className="h-6">
            {errors.theme && (
              <p className="text-red-500 text-sm">{errors.theme.message}</p>
            )}
          </div>

          <div className="flex justify-around">
            <div className="flex gap-2 md:text-xl">
              <input
                type="radio"
                id="video"
                value="video"
                className="scale-150 accent-[#B91879]"
                {...register("type")}
              />
              <label htmlFor="video">Vídeo</label>
            </div>
            <div className="flex gap-2 md:text-xl">
              <input
                type="radio"
                id="curso"
                value="curso"
                className="scale-150 accent-[#B91879]"
                {...register("type")}
              />
              <label htmlFor="curso">Curso</label>
            </div>
            <div className="flex gap-2 md:text-xl">
              <input
                type="radio"
                id="blog"
                value="blog"
                className="scale-150 accent-[#B91879]"
                {...register("type")}
              />
              <label htmlFor="blog">Blog</label>
            </div>
          </div>

          {errors.type && (
            <p className="text-red-500 text-sm">{errors.type.message}</p>
          )}

          <div className="flex gap-4 mt-4">
            <ButtonComponent type="submit" variant="primary">
              Crear
            </ButtonComponent>
            <ButtonComponent
              variant="secondary"
              onClick={() => window.history.back()}
            >
              Cancelar
            </ButtonComponent>
          </div>
        </form>
        <pre>{JSON.stringify(watch(), null, 2)}</pre>
      </div>
    </div>
  );
}
