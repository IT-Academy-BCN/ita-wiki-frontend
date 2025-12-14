import { UseFormRegister, FieldErrors } from "react-hook-form";
import { formatDocumentIcons } from "../../icons/formatDocumentIconsArray";
import type { TechnicalTestFormData } from "../../types/TechnicalTest";

interface DescriptionTextareaProps {
  register: UseFormRegister<TechnicalTestFormData>;
  errors: FieldErrors<TechnicalTestFormData>;
  currentLength: number;
}

const DescriptionTextarea = ({
  register,
  errors,
  currentLength,
}: DescriptionTextareaProps) => {
  const charLimitDescription = 1000;

  return (
    <div className="flex flex-col px-10">
      <span className="w-full flex gap-10 p-2 px-5 border border-gray-300 rounded-tl-lg rounded-tr-lg">
        {formatDocumentIcons.map((btn) => {
          const IconComponent = btn.icon;
          return <IconComponent key={btn.label} className="w-5 h-5" />;
        })}
      </span>
      <textarea
        {...register("description")}
        maxLength={charLimitDescription}
        className="w-full min-h-[350px] p-2 border border-gray-300 rounded-bl-lg rounded-br-lg border-t-0 mb-4"
      />
      <div className="flex w-full justify-end me-10 text-sm text-gray-500">
        <span className="self-end">
          {currentLength}/{charLimitDescription}
        </span>
      </div>
      {errors.description && (
        <div className="py-4">
          <p className="text-red-500 text-xs">{errors.description.message}</p>
        </div>
      )}
    </div>
  );
};

export default DescriptionTextarea;
