import { FC } from "react";
import { EnuResourceThemes, EnuResourceTypes } from "../../enums";
import { useResourceCtx } from "../../hooks/resources/useResourcesCtx";

export const FilterResources: FC = () => {
  const themes = [...Object.values(EnuResourceThemes)];
  const types = [...Object.values(EnuResourceTypes)];
  const { selectedTheme, selectedType, selectTheme, selectType } =
    useResourceCtx();
  return (
    <div className="mt-6 transition-all duration-300 ease-in-out">
      <div className="mb-6">
        <h3 className="text-lg md:text-[26px] font-bold mb-3">Temas</h3>
        {themes.map((theme) => (
          <label
            key={theme}
            className="flex items-center gap-2 mb-2 cursor-pointer"
            htmlFor={theme}
          >
            <input
              type="radio"
              id={theme}
              name={theme}
              value={theme}
              checked={selectedTheme === theme}
              onChange={() => selectTheme(theme)}
              className="hidden"
            />

            <div
              className={`w-4 h-4 border-2 rounded-full flex items-center justify-center ${
                selectedTheme === theme ? "border-[#B91879]" : "border-gray-400"
              }`}
            >
              {selectedTheme === theme && (
                <div className="w-2.5 h-2.5 bg-[#B91879] rounded-full"></div>
              )}
            </div>
            <span className="text-gray-800">{theme}</span>
          </label>
        ))}
      </div>

      <div>
        <h3 className="text-lg font-bold mb-3">Tipo de recurso</h3>
        {types.map((type) => (
          <label
            key={type}
            className="flex items-center gap-2 mb-2 cursor-pointer"
            htmlFor={type}
          >
            <input
              type="radio"
              id={type}
              name={type}
              value={type}
              checked={selectedType === type}
              onChange={() => selectType(type)}
              className="hidden"
            />

            <div
              className={`w-4 h-4 border-2 rounded-full flex items-center justify-center ${
                selectedType === type ? "border-[#B91879]" : "border-gray-400"
              }`}
            >
              {selectedType === type && (
                <div className="w-2.5 h-2.5 bg-[#B91879] rounded-full"></div>
              )}
            </div>
            <span className="text-gray-800">{type}</span>
          </label>
        ))}
      </div>
    </div>
  );
};
