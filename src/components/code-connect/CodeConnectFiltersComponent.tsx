import { useState } from "react";
import { filtersContent } from "./filtersContent";

export const CodeConnectFiltersComponent = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  return (
    <div className="flex flex-wrap gap-3 mb-4">
      {filtersContent.map((cat) => {
        const IconComponent = cat.icon as unknown as React.FC<
          React.SVGProps<SVGSVGElement>
        >;
          return (
            <button
              key={cat.label}
              onClick={() => setSelectedLanguage(cat.label)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 hover:shadow-md cursor-pointer ${
                selectedLanguage === cat.label
                  ? "border-3 border-[#B91879] bg-white text-black"
                  : "border-gray-300 bg-white text-black"
              }`}
            >
              <IconComponent className="w-5 h-5" />
              <span className="text-sm font-medium">{cat.label}</span>
            </button>
          );
        })}
      </div>
    );
};