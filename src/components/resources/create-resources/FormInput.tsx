import { UseFormRegister, FieldPath, FieldValues } from "react-hook-form";

interface FormInputProps<T extends FieldValues> {
  id: FieldPath<T>;
  placeholder: string;
  register: UseFormRegister<T>;
  errors?: string;
  className?: string;
  maxLength?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FormInput<T extends FieldValues>({
  id,
  placeholder,
  register,
  errors,
  className,
  maxLength,
  onChange,
}: FormInputProps<T>) {
  return (
    <div>
      <input
        type="text"
        id={id}
        placeholder={placeholder}
        maxLength={maxLength}
        className={`w-full px-6 py-4 mb-1 border border-[#dddddd] rounded-lg placeholder:font-medium outline-[#B91879] ${className}`}
        {...register(id, {
          onChange: (e) => {
            onChange?.(e);
          },
        })}
      />
      <div className="h-6">
        {errors && <p className="text-red-500 text-xs">{errors}</p>}
      </div>
    </div>
  );
}
