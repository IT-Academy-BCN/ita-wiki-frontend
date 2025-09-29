import { FC } from "react";
import UiCheckbox from "./shared-ui/UiCheckbox";

interface FilterGroupProps {
  title: string;
  options: string[];
  selectedValues: string[];
  onToggle: (value: string) => void;
  className?: string;
}

export const FilterGroup: FC<FilterGroupProps> = ({
  title,
  options,
  selectedValues,
  onToggle,
  className = "",
}) => {
  return (
    <div className={`mb-6 ${className}`}>
      <h3 className="text-[16px] text-[#282828] font-bold mb-6">{title}</h3>
      <div className="space-y-2">
        {options.map((option) => {
          const isSelected = selectedValues.includes(option);
          return (
            <div key={option}>
              <UiCheckbox
                checked={isSelected}
                onChange={() => onToggle(option)}
                label={option}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FilterGroup;
