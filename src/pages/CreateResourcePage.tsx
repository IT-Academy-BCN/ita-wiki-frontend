import { IntResource } from '../types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resourceSchema } from '../validations/resourceSchema';
import FormInput from '../components/FormInput';
import { createResource } from '../api/endPointResources';
import { toast } from 'sonner';
import ButtonComponent from '../components/atoms/ButtonComponent';
import { categories } from '../data/categories';
import { themes } from '../data/themes';
import { useUser } from '../hooks/useUser';
import PageTitle from '../components/ui/PageTitle';
import logoJava from '../../src/assets/logo-java 1.svg';
import logoPhp from '../../src/assets/logo-php 1.svg';
import logoJavaS from '../../src/assets//javascript.svg';
import logoTypeS from '../../src/assets/TypescriptVector.svg';
import logoPython from '../../src/assets/pythonVector.svg';
import logoSql from '../../src/assets/sqlVector.svg';
import { useEffect } from 'react';

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
      toast.success('¡Recurso creado con éxito!');
      setTimeout(() => {
        window.location.href = `/resources/${data?.category?.toLowerCase()}`;
      }, 1000);
      reset();
    } catch (error) {
      console.error('Error al crear el recurso:', error);
      toast.error('Hubo un error al crear el recurso');
    }
  };

  return (
    <>
      <PageTitle title="Create Resource" />
      <div className="my-5 w-full lg:w-6/7 bg-white py-10 px-15 rounded-xl">
        <div className="md:flex justify-between items-center mt-1">
          <div>
            <h3 className="text-[14px] font-medium text-gray-500">
              Recursos / crear recurso
            </h3>
            <h1 className="font-extrabold text-[26px] font-black ">
              Nuevo recurso
            </h1>
          </div>
          <div className="flex  ">
            <ButtonComponent
              variant="secondary"
              onClick={() => window.history.back()}
              className="min-w-[8rem] max-h-[2.75rem]  mr-4  ">
              Cancelar
            </ButtonComponent>
            <ButtonComponent
              type="submit"
              variant="primary"
              className="min-w-[8rem] max-h-[2.75rem] ">
              Publicar
            </ButtonComponent>
          </div>
        </div>
        <hr className="w-full border-t border-gray-300 mt-4 " />

        <div className="flex  mt-12 ]">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="">
            <h2 className="text-xl text-black mb-2">Título</h2>
            <FormInput
              id="title"
              placeholder=""
              register={register}
              errors={errors.title?.message}
              className="min-w-[31rem] max-h-[2.6rem] border-[0.06rem] border-gray-300 focus:border-[#B91879] outline-none"
            />
            <h2 className="text-xl text-black mb-2">URL</h2>
            <FormInput
              id="url"
              placeholder=""
              register={register}
              errors={errors.url?.message}
              className="min-w-[31rem] max-h-[2.6rem] border-[0.06rem] border-gray-300 focus:border-[#B91879] outline-none "
            />
            {/* AQUI VAN LOS BOTONES DE LENGUAJE */}
            <h2 className="text-xl text-black mb-2">Lenguaje</h2>
            <div className=" flex gap-6 mb-4">
              <ButtonComponent
                type="button"
                variant="secondary"
                className="min-w-[8rem] max-h-[3.5rem] focus:border-[#B91879] text-black py-2 hover:bg-transparent hover:scale-100
              ">
                <div className="flex justify-center">
                  <img
                    src={logoJava}
                    alt="LogoJava"
                    className="mb-2 mx-1"
                  />
                  <h1 className="mt-3 ml-1 mr-1 text-[1rem] font-medium">
                    Java
                  </h1>
                </div>
              </ButtonComponent>

              <ButtonComponent
                type="button"
                variant="secondary"
                className="min-w-[8rem] max-h-[3.5rem] focus:border-[#B91879] text-black py-2 hover:bg-transparent hover:scale-100
              ">
                <div className="flex justify-center mt-1">
                  <img
                    src={logoPhp}
                    alt="LogoPHP"
                    className="mb-2 mx-1"
                  />
                  <h1 className="mt-1 ml-1 mr-1 text-[1rem] font-medium">
                    PHP
                  </h1>
                </div>
              </ButtonComponent>

              <ButtonComponent
                type="button"
                variant="secondary"
                className="min-w-[12rem] max-h-[3.5rem] focus:border-[#B91879] text-black py-2 hover:bg-transparent hover:scale-100
              ">
                <div className="flex justify-center p-1">
                  <img
                    src={logoJavaS}
                    alt="LogoJavaS"
                    className="mb-2 mx-1 mt-1"
                  />
                  <h1 className="mt-2 ml-1 mr-1 text-[1rem] font-medium">
                    JavaScript
                  </h1>
                </div>
              </ButtonComponent>

              <ButtonComponent
                type="button"
                variant="secondary"
                className="min-w-[12rem] max-h-[3.5rem] focus:border-[#B91879] text-black py-2 hover:bg-transparent hover:scale-100
              ">
                <div className="flex justify-center pt-2">
                  <img
                    src={logoTypeS}
                    alt="logoTypeS"
                    className="mb-2 mx-1"
                  />
                  <h1 className=" ml-1 mr-1 text-[1rem] font-medium">
                    TypeScript
                  </h1>
                </div>
              </ButtonComponent>
              <ButtonComponent
                type="button"
                variant="secondary"
                className="min-w-[8rem] max-h-[3.5rem] focus:border-[#B91879] text-black py-2 hover:bg-transparent hover:scale-100
              ">
                <div className="flex justify-center pt-1">
                  <img
                    src={logoPython}
                    alt="logoPython"
                    className="mb-2 mx-1"
                  />
                  <h1 className="mt-1 ml-1 mr-1 text-[1rem] font-medium">
                    Python
                  </h1>
                </div>
              </ButtonComponent>
              <ButtonComponent
                type="button"
                variant="secondary"
                className="min-w-[8rem] max-h-[3.5rem] focus:border-[#B91879] text-black py-2 hover:bg-transparent hover:scale-100
              ">
                <div className="flex justify-center">
                  <img
                    src={logoSql}
                    alt="logoSql"
                    className="mb-2 mx-1 p-1"
                  />
                  <h1 className="mt-3 ml-1 mr-1 text-[1rem] font-medium">
                    SQL
                  </h1>
                </div>
              </ButtonComponent>
            </div>

            {/* <select
              id="category"
              className="w-full mb-1 px-6 py-4 border border-[#dddddd] rounded-lg placeholder:font-medium outline-[#B91879]"
              defaultValue=""
              {...register('category', { required: true })}>
              <option
                value=""
                disabled>
                Categoria
              </option>
              {categories.map((categorie) => (
                <option
                  key={categorie}
                  value={categorie}>
                  {categorie}
                </option>
              ))}
            </select> */}
            {/* <div className="h-6">
              {errors.category && (
                <p className="text-red-500 text-sm">
                  {errors.category.message}
                </p>
              )}
            </div> */}

            {/* <select
              id="theme"
              className="w-full mb-1 px-6 py-4 border border-[#dddddd] rounded-lg placeholder:font-medium outline-[#B91879]"
              defaultValue=""
              {...register('theme', { required: true })}>
              <option
                value=""
                disabled>
                Tema
              </option>
              {themes.map((theme) => (
                <option
                  key={theme}
                  value={theme}>
                  {theme}
                </option>
              ))}
            </select> */}
            {/* <div className="h-6">
             
              {errors.theme && (
                <p className="text-red-500 text-sm">{errors.theme.message}</p>
              )}
            </div> */}
            <h2 className="text-xl text-black mb-5">Tipo de recurso</h2>
            <div className="flex justify-between mx-3 ">
              <div className="flex gap-4 md:text-xl">
                <input
                  type="radio"
                  id="video"
                  value="Video"
                  className=" scale-150 accent-[#B91879] "
                  {...register('type', { required: true })}
                />
                <label htmlFor="video">Vídeo</label>
              </div>
              <div className="flex gap-2 md:text-xl">
                <input
                  type="radio"
                  id="curso"
                  value="Cursos"
                  className="scale-150 accent-[#B91879]"
                  {...register('type', { required: true })}
                />
                <label htmlFor="curso">Curso</label>
              </div>
              <div className="flex gap-2 md:text-xl">
                <input
                  type="radio"
                  id="blog"
                  value="Blog"
                  className="scale-150 accent-[#B91879]"
                  {...register('type', { required: true })}
                />
                <label htmlFor="blog">Blog</label>
              </div>
            </div>

            <div className="h-6">
              {errors.type && (
                <p className="text-red-500 text-sm">{errors.type.message}</p>
              )}
            </div>

            <h2 className="text-xl text-black mb-5">Tags</h2>
            <div>
              <hr className="w-full border-t border-gray-300 mt-4 " />
              <h2 className="text-xl font-semibold mb-5 mt-5">
                Información adicional
              </h2>
              <h2 className="text-xl text-black font-light mb-5 mt-5">
                Descripción
              </h2>
              <FormInput
                id="description"
                placeholder=""
                register={register}
                errors={errors.description?.message}
                className="min-w-[30rem] max-h-[4.5rem] border-[0.06rem] border-gray-300 focus:border-[#B91879] outline-none"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
