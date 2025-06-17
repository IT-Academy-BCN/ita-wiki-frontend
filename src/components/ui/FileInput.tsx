import { UseFormRegister, FieldPath, FieldValues } from "react-hook-form";

interface FormFileInputProps<T extends FieldValues> {
  id: FieldPath<T>;
  register: UseFormRegister<T>;
  errors?: string;
  className?: string;
  accept?: string;
}

export default function FormFileInput<T extends FieldValues>({
  id,
  register,
  errors,
  className,
  accept = ".pdf,.txt,.doc,.docx",
}: FormFileInputProps<T>) {
  return (
    <div>
      <input
        type="file"
        id={id}
        accept={accept}
        className={`w-full px-6 py-4 mb-1 border border-[#dddddd] rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary file:text-white hover:file:opacity-90 ${className}`}
        {...register(id)}
      />
      <div className="h-6">
        {errors && <p className="text-red-500 text-xs">{errors}</p>}
      </div>
    </div>
  );
}