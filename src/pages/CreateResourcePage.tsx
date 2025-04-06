import { IntResource } from '../types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resourceSchema } from '../validations/resourceSchema';
import FormInput from '../components/resources/create-resources/FormInput';
import { createResource } from '../api/endPointResources';
import { toast } from 'sonner';
import ButtonComponent from '../components/atoms/ButtonComponent';
import { useUser } from '../hooks/useUser';
import PageTitle from '../components/ui/PageTitle';
import logoJava from '../../src/assets/logo-java 1.svg';
import logoPhp from '../../src/assets/logo-php 1.svg';
import logoJavaS from '../../src/assets//javascript.svg';
import logoTypeS from '../../src/assets/TypescriptVector.svg';
import logoPython from '../../src/assets/pythonVector.svg';
import logoSql from '../../src/assets/sqlVector.svg';
 import TagInput from '../components/resources/create-resources/TagInput';
import { useState } from 'react';

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

  const [tags, setTags] = useState<string[]>([]);

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
      <div className="my-5 w-full lg:w-6/7 bg-white py-10 px-15 rounded-xl overflow-y-scroll">
        <div className="md:flex justify-between items-center">
          <div>
            <h3 className="text-sm font-medium text-gray-500">
              Recursos / crear recurso
            </h3>
            <h1 className="text-[26px] font-black ">
              Nuevo recurso
            </h1>
          </div>
          <div className="flex  ">
            <ButtonComponent
              variant="secondary"
              onClick={() => window.history.back()}
              className="min-w-[8rem] max-h-[2.75rem] mr-4">
              Cancelar
            </ButtonComponent>
            <ButtonComponent
              type="submit"
              variant="primary"
              className="min-w-[8rem] max-h-[2.75rem]">
              Publicar
            </ButtonComponent>
          </div>
        </div>
        <hr className="w-full border-t border-gray-300 mt-3" />

        <div className="flex mt-8">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="">
            <h2 className="text-sm text-black font-medium mb-3">Título</h2>
            <FormInput
              id="title"
              placeholder=""
              register={register}
              errors={errors.title?.message}
              className="max-w-[482px] max-h-[2.6rem] border-[0.06rem] border-gray-300 focus:border-2 focus:border-[#B91879] outline-none mb-0"
            />
            <h2 className="text-sm text-black font-medium mb-3">URL</h2>
            <FormInput
              id="url"
              placeholder=""
              register={register}
              errors={errors.url?.message}
              className="max-w-[482px] max-h-[2.6rem] border-[0.06rem] border-gray-300 focus:border-2 focus:border-[#B91879] outline-none "
            />

            {/* AQUI VAN LOS BOTONES DE LENGUAJE */}
            <h2 className="text-sm text-black font-medium">Lenguaje</h2>
            <div className="flex gap-x-3">
              <ButtonComponent
                type="button"
                variant="secondary"
                className="min-w-[8rem] max-h-[3.5rem] text-black py-2 hover:bg-transparent hover:scale-100 focus:border-2 focus:border-[#B91879]">
                <div className="flex justify-center items-center gap-1 h-fit">
                  <img
                    src={logoJava}
                    alt="LogoJava"
                    className="mx-1"
                  />
                  <h1 className="text-sm font-medium">
                    Java
                  </h1>
                </div>
              </ButtonComponent>

              <ButtonComponent
                type="button"
                variant="secondary"
                className="min-w-[8rem] max-h-[3.5rem] focus:border-2 focus:border-[#B91879] text-black py-2 hover:bg-transparent hover:scale-100
              ">
                <div className="flex justify-center items-center gap-1">
                  <img
                    src={logoPhp}
                    alt="LogoPHP"
                    className="mx-1"
                  />
                  <h1 className=" text-sm font-medium">
                    PHP
                  </h1>
                </div>
              </ButtonComponent>

              <ButtonComponent
                type="button"
                variant="secondary"
                className="min-w-[12rem] max-h-[3.5rem] focus:border-[#B91879] text-black py-2 hover:bg-transparent hover:scale-100
              ">
                <div className="flex justify-center items-center gap-1">
                  <img
                    src={logoJavaS}
                    alt="LogoJavaS"
                    className="mx-1"
                  />
                  <h1 className="text-sm font-medium">
                    JavaScript
                  </h1>
                </div>
              </ButtonComponent>

              <ButtonComponent
                type="button"
                variant="secondary"
                className="min-w-[12rem] max-h-[3.5rem] focus:border-[#B91879] text-black py-2 hover:bg-transparent hover:scale-100
              ">
                <div className="flex justify-center">
                  <img
                    src={logoTypeS}
                    alt="logoTypeS"
                    className="mx-1"
                  />
                  <h1 className="text-sm font-medium">
                    TypeScript
                  </h1>
                </div>
              </ButtonComponent>
              <ButtonComponent
                type="button"
                variant="secondary"
                className="min-w-[8rem] max-h-[3.5rem] focus:border-[#B91879] text-black py-2 hover:bg-transparent hover:scale-100
              ">
                <div className="flex justify-center items-center gap-1">
                  <img
                    src={logoPython}
                    alt="logoPython"
                    className="mx-1"
                  />
                  <h1 className="text-sm font-medium">
                    Python
                  </h1>
                </div>
              </ButtonComponent>
              <ButtonComponent
                type="button"
                variant="secondary"
                className="min-w-[8rem] max-h-[3.5rem] focus:border-[#B91879] text-black py-2 hover:bg-transparent hover:scale-100
              ">
                <div className="flex justify-center items-center gap-1">
                  <img
                    src={logoSql}
                    alt="logoSql"
                    className="mx-1"
                  />
                  <h1 className="text-sm font-medium">
                    SQL
                  </h1>
                </div>
              </ButtonComponent>
            </div>

            {/* CÓDIGO QUE AÚN NO QUIERO BORRAR */}
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

            {/* ESTO DEBERÍA ESTAR MÁS JUNTO */}
            <h2 className="text-sm text-black font-medium mb-5">Tipo de recurso</h2>
            <div className="flex justify-start gap-x-10">
              <div className="ml-1 flex gap-4 md:text-xl">
                <input
                  type="radio"
                  id="video"
                  value="Video"
                  className=" scale-150 accent-[#B91879] "
                  {...register('type', { required: true })}
                />
                <label htmlFor="video" className='text-sm'>Vídeo</label>
              </div>
              <div className="flex gap-2 md:text-xl">
                <input
                  type="radio"
                  id="curso"
                  value="Cursos"
                  className="scale-150 accent-[#B91879]"
                  {...register('type', { required: true })}
                />
                <label htmlFor="curso" className='text-sm'>Curso</label>
              </div>
              <div className="flex gap-2 md:text-xl">
                <input
                  type="radio"
                  id="blog"
                  value="Blog"
                  className="scale-150 accent-[#B91879]"
                  {...register('type', { required: true })}
                />
                <label htmlFor="blog" className='text-sm'>Blog</label>
              </div>
            </div>

            <div className="h-6">
              {errors.type && (
                <p className="text-red-500 text-sm">{errors.type.message}</p>
              )}
            </div>
            {/* FALTA EL CUADRO DE TAGS */}
            <h2 className="text-sm text-black font-medium mb-3">Tags</h2>
            <TagInput selectedTags={tags} setSelectedTags={setTags} />

            <div>
              <hr className="w-full border-t border-gray-300 mt-3 " />
              <h2 className="text-base font-semibold my-4">
                Información adicional
              </h2>
              <h2 className="text-sm text-black font-medium vmb-5 mt-5 mb-3">
                Descripción
              </h2>
              <FormInput
                id="description"
                placeholder=""
                register={register}
                errors={errors.description?.message}
                className="max-w-[482px] max-h-[4.5rem] border-[0.06rem] border-gray-300 focus:border-[#B91879] outline-none"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
