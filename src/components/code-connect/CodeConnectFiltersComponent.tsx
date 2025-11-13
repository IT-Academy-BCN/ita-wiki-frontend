import { FC, SVGProps } from "react";
import { filtersContent } from "./filtersContent";

interface ButtonProps {
  label: string;
  icon: FC<SVGProps<SVGSVGElement>>;
  isSelected: boolean;
  handleSelect: (label: string) => void;
}

interface FiltersProps {
  selected: string | null;
  onChange: (label: string | null) => void;
}

const Button = ({
  label,
  icon: Icon,
  isSelected,
  handleSelect,
}: ButtonProps) => {
  return (
    <button
      onClick={() => handleSelect(label)}
      aria-pressed={isSelected ? "true" : "false"}
      className={`flex items-center gap-2 px-6 py-4 rounded-lg border-2 transition-all hover:shadow-md
              ${isSelected ? "border-primary" : "border-gray-400"} `}
    >
      <Icon className="w-5 h-5" />
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
};

const CodeConnectFiltersComponent = ({ selected, onChange }: FiltersProps) => {
  const handleSelect = (label: string) => {
    onChange(selected === label ? null : label);
  };

  return (
    <div className="flex flex-wrap gap-3 mb-4">
      {filtersContent.map(({ icon, label }) => {
        const isSelected = selected === label;
        return (
          <Button
            key={label}
            label={label}
            icon={icon}
            isSelected={isSelected}
            handleSelect={handleSelect}
          />
        );
      })}
    </div>
  );
};

export default CodeConnectFiltersComponent;
