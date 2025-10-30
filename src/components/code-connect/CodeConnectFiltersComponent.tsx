import { FC, SVGProps } from "react";
import { useState } from "react";
import { filtersContent } from "./filtersContent";

type ButtonProps = {
  label: string;
  icon: FC<SVGProps<SVGSVGElement>>;
  isSelected: boolean;
  handleSelect: (label: string) => void;
};

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
      className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all hover:shadow-md
              ${isSelected ? "border-[#B91879]" : "border-gray-300"} `}
    >
      <Icon className="w-5 h-5" />
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
};

const CodeConnectFiltersComponent = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  const handleSelect = (label: string) => {
    setSelectedLanguage(label);
  };

  return (
    <div className="flex flex-wrap gap-3 mb-4">
      {filtersContent.map(({ icon, label }) => {
        const isSelected = selectedLanguage === label;
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
