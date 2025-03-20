import { FC, useEffect, useState } from "react";
import { useParams } from "react-router";

interface FilterResourcesProps {
  themes: readonly string[];
  resourceTypes: readonly string[];
  selectedTheme: string;
  setSelectedTheme: (theme: string) => void;
  selectedResourceTypes: string[];
  setSelectedResourceTypes: (resourceTypes: string[]) => void;
  resetTheme: () => void;
}

export const FilterResources: FC<FilterResourcesProps> = ({
  themes,
  resourceTypes,
  selectedTheme,
  setSelectedTheme,
  selectedResourceTypes,
  setSelectedResourceTypes,
  resetTheme,
}) => {
  const toggleResourceType = (resourceType: string) => {
    if (
      selectedResourceTypes.length === 1 &&
      selectedResourceTypes.includes(resourceType)
    ) {
      setSelectedResourceTypes([...resourceTypes]);
    } else {
      setSelectedResourceTypes(
        selectedResourceTypes.includes(resourceType)
          ? selectedResourceTypes.filter(
              (rType: string) => rType !== resourceType,
            )
          : [...selectedResourceTypes, resourceType],
      );
    }
  };
  const { category } = useParams();
  const [prevCategory, setPrevCategory] = useState<string | null>(null);

  useEffect(() => {
    if (category !== prevCategory) {
      setSelectedResourceTypes([...resourceTypes]);
      setPrevCategory(category ?? null);
      resetTheme();
    }

    if (selectedResourceTypes.length === 0) {
      setSelectedResourceTypes([...resourceTypes]);
    }
  }, [
    category,
    prevCategory,
    resourceTypes,
    selectedResourceTypes,
    setSelectedResourceTypes,
    resetTheme,
  ]);

  return (
    <div className="mt-6 transition-all duration-300 ease-in-out">
      <div className="mb-6">
        <h3 className="text-lg md:text-[26px] font-bold mb-3">Temas</h3>
        {themes.map((theme) => (
          <label
            key={theme}
            className="flex items-center gap-2 mb-2 cursor-pointer"
          >
            <input
              type="radio"
              name="theme"
              value={theme}
              checked={selectedTheme === theme}
              onChange={() => setSelectedTheme(theme)}
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
        {resourceTypes.map((resourceType) => (
          <label
            key={resourceType}
            className="flex items-center gap-2 mb-2 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={selectedResourceTypes.includes(resourceType)}
              onChange={() => toggleResourceType(resourceType)}
              className="hidden"
            />
            <div
              className={`w-5 h-5 flex items-center justify-center rounded border ${
                selectedResourceTypes.includes(resourceType)
                  ? "bg-[#B91879] border-[#B91879]"
                  : "border-gray-400"
              }`}
            >
              {selectedResourceTypes.includes(resourceType) && (
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              )}
            </div>
            <span className="text-gray-800">{resourceType}</span>
          </label>
        ))}
      </div>
    </div>
  );
};
