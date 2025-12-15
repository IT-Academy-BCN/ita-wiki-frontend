import { Control, Controller, FieldErrors } from "react-hook-form";
import type { TechnicalTestFormData } from "../../types/TechnicalTest";
import { FC, SVGProps } from "react";

type SvgIcon = FC<SVGProps<SVGSVGElement>>;

interface LanguageSelectorProps {
  control: Control<TechnicalTestFormData>;
  errors: FieldErrors<TechnicalTestFormData>;
  languages: { icon: SvgIcon; label: string }[];
}

const LanguageSelectorInput = ({
  control,
  errors,
  languages,
}: LanguageSelectorProps) => {
  return (
    <div className="px-10">
      <label className="block font-medium mb-2">Llenguatge *</label>
      <Controller
        name="language"
        control={control}
        render={({ field }) => (
          <div className="flex flex-wrap gap-3 mb-4">
            {languages.map((cat) => {
              const IconComponent = cat.icon;
              return (
                <button
                  key={cat.label}
                  type="button"
                  onClick={() => field.onChange(cat.label)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 hover:shadow-md cursor-pointer ${
                    field.value === cat.label
                      ? "border-2 border-[#B91879] bg-white"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  <span className="text-sm font-medium">{cat.label}</span>
                </button>
              );
            })}
          </div>
        )}
      />
      {errors.language && (
        <div className="py-4">
          <p className="text-red-500 text-xs">{errors.language.message}</p>
        </div>
      )}
    </div>
  );
};

export default LanguageSelectorInput;
