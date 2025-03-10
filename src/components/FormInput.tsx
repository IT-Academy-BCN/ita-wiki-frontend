interface FormInputProps {
  id: string;
  placeholder: string;
  register: ;
  errors?: string; // Aquí errors ya es el mensaje del error del campo
}

export default function FormInput({
  id,
  placeholder,
  register,
  errors,
}: FormInputProps) {
  return (
    <div>
      <input
        type="text"
        id={id}
        placeholder={placeholder}
        className="w-full mb-1 px-6 py-4 border border-[#dddddd] rounded-lg placeholder:font-medium outline-[#B91879]"
        {...register(id)}
      />
      <div className="h-6">
        {errors && <p className="text-red-500 text-sm">{errors}</p>}
      </div>
    </div>
  );
}
