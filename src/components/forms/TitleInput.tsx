import { UseFormRegister, FieldErrors } from "react-hook-form";
import type { TechnicalTestFormData } from "../../types/TechnicalTest";

interface TitleInputProps {
  register: UseFormRegister<TechnicalTestFormData>;
  errors: FieldErrors<TechnicalTestFormData>;
  currentLength: number;
}

const TitleInput = ({ register, errors, currentLength }: TitleInputProps) => {
  const charLimitTitle = 65;

  return (
    <div className="flex flex-col px-10">
      <label className="block mb-2 mt-8 font-medium">Títol *</label>
      <input
        type="text"
        {...register("title")}
        className="sm:w-1/2 p-2 border border-[#B91879] rounded-lg mb-4"
        maxLength={charLimitTitle}
      />
      <div className="sm:w-1/2 self-end sm:me-10 text-sm text-gray-500">
        <span>
          {currentLength}/{charLimitTitle}
        </span>
      </div>
      {errors.title && (
        <div className="py-4">
          <p className="text-red-500 text-xs">{errors.title.message}</p>
        </div>
      )}
    </div>
  );
};

export default TitleInput;
