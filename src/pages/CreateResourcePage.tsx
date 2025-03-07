import { IntResource } from "../types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resourceSchema } from "../validations/resourceSchema";
import ButtonComponent from "../components/atoms/ButtonComponent";
import { useUser } from "../hooks/useUser";

export default function CreateResourcePage() {

  const {register, watch, handleSubmit,formState: { errors }} = useForm<Partial<IntResource>>({
    resolver: zodResolver(resourceSchema),
  });

  return (
    <div className="w-full">
      <h1 className="font-semibold">Nuevo recurso</h1>
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
        })}
        className="my-5 space-y-3.5 md:w-1/2 bg-white p-10 rounded-xl"
      >
        {/* Campo Título */}
        <div>
          <input
            type="text"
            placeholder="Título"
            className="w-full px-6 py-4 border border-[#dddddd] rounded-lg placeholder:font-medium outline-[#B91879] "
            {...register("title")}
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        {/* Campo Descripción */}
        <div>
          <input
            type="text"
            id="description"
            placeholder="Descripción"
            className="w-full px-6 py-4 border border-[#dddddd] rounded-lg placeholder:font-medium outline-[#B91879]"
            {...register("description")}
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        {/* Campo URL */}
        <div>
          <input
            type="text"
            id="url"
            placeholder="URL"
            className="w-full px-6 py-4 border border-[#dddddd] rounded-lg placeholder:font-medium outline-[#B91879]"
            {...register("url")}
          />
          {errors.url && (
            <p className="text-red-500 text-sm">{errors.url.message}</p>
          )}
        </div>

        {/* Botones */}
        <div className="mt-12">
          <ButtonComponent
            className="outline-[#B91879]"
            children="Crear"
            variant="primary"
            type="submit"
          />
          <ButtonComponent
            className="outline-[#B91879]"
            children="Cancelar"
            variant="secondary"
          />
        </div>
      </form>

      {/* Vista previa de datos en tiempo real */}
      <div>
        {JSON.stringify(watch(), null, 2)}
      </div>
    </div>
  );
}
