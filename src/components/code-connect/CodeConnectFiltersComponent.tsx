import { useState } from "react";
import { filtersContent, FilterItem } from "./filtersContent";

export const CodeConnectFiltersComponent = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<
    FilterItem["label"] | null
  >(null);

  const handleSelect = (label: FilterItem["label"]) => {
    setSelectedLanguage(label);
  };

  return (
    <div className="flex flex-wrap gap-3 mb-4">
      {filtersContent.map(({ icon: Icon, label }) => {
        const isSelected = selectedLanguage === label;

        return (
          <button
            key={label}
            onClick={() => handleSelect(label)}
            aria-pressed={isSelected}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all hover:shadow-md
              ${isSelected ? "border-[#B91879]" : "border-gray-300"}
              bg-white text-black`}
          >
            <Icon className="w-5 h-5" />
            <span className="text-sm font-medium">{label}</span>
          </button>
        );
      })}
    </div>
  );
};
