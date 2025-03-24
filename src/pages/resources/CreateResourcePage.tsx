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
import { useUser } from "./hooks/user/useUser";
import { Main } from "../layouts/Main";

export default function CreateResourcePage() {
  const { user } = useUser();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Partial<IntResource>>({
    resolver: zodResolver(resourceSchema),
  });

  const onSubmit = async (data: Partial<IntResource>) => {
    const resourceWithGithubId = {
      ...data,
      github_id: user?.id,
    };

    try {
      await createResource(resourceWithGithubId);
      toast.success("¡Recurso creado con éxito!");
      setTimeout(() => {
        window.location.href = `/resources/${data?.category?.toLowerCase()}`;
      }, 1000);
      reset();
    } catch (error) {
      console.error("Error al crear el recurso:", error);
      toast.error("Hubo un error al crear el recurso");
    }
  };

  return (
    <Main>
      <section className="bg-white rounded-[15px] col-span-2">
        <h2 className="text-xl font-semibold">Nuevo recurso</h2>
        <article className="flex justify-center mt-20 xl:mr-[198px]">
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
              defaultValue=""
              {...register("category", { required: true })}
            >
              <option value="" disabled>
                Categoria
              </option>
              {categories.map((categorie) => (
                <option key={categorie} value={categorie}>
                  {categorie}
                </option>
              ))}
            </select>
            <div className="h-6">
              {errors.category && (
                <p className="text-red-500 text-sm">
                  {errors.category.message}
                </p>
              )}
            </div>

            <select
              id="theme"
              className="w-full mb-1 px-6 py-4 border border-[#dddddd] rounded-lg placeholder:font-medium outline-[#B91879]"
              defaultValue=""
              {...register("theme", { required: true })}
            >
              <option value="" disabled>
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
                  value="Video"
                  className="scale-150 accent-[#B91879]"
                  {...register("type", { required: true })}
                />
                <label htmlFor="video">Vídeo</label>
              </div>
              <div className="flex gap-2 md:text-xl">
                <input
                  type="radio"
                  id="curso"
                  value="Cursos"
                  className="scale-150 accent-[#B91879]"
                  {...register("type", { required: true })}
                />
                <label htmlFor="curso">Curso</label>
              </div>
              <div className="flex gap-2 md:text-xl">
                <input
                  type="radio"
                  id="blog"
                  value="Blog"
                  className="scale-150 accent-[#B91879]"
                  {...register("type", { required: true })}
                />
                <label htmlFor="blog">Blog</label>
              </div>
            </div>
            <div className="h-6">
              {errors.type && (
                <p className="text-red-500 text-sm">{errors.type.message}</p>
              )}
            </div>

            <div className="md:flex gap-4 mt-1">
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
        </article>
      </section>
    </Main>
  );
}
