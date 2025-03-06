import { FC } from "react";

interface FilterResourcesProps {
  categories: string[];
  types: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedTypes: string[];
  setSelectedTypes: React.Dispatch<React.SetStateAction<string[]>>;
}

export const FilterResources: FC<FilterResourcesProps> = ({
  categories,
  types,
  selectedCategory,
  setSelectedCategory,
  selectedTypes,
  setSelectedTypes,
}) => {
  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  };

  return (
    <div className="mt-6">
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-3">Temas</h3>
        {categories.map((category) => (
          <label
            key={category}
            className="flex items-center gap-2 mb-2 cursor-pointer"
          >
            <input
              type="radio"
              name="category"
              value={category}
              checked={selectedCategory === category}
              onChange={() => setSelectedCategory(category)}
              className="hidden"
            />
            <div
              className={`w-4 h-4 border-2 rounded-full flex items-center justify-center ${
                selectedCategory === category
                  ? "border-[#B91879]"
                  : "border-gray-400"
              }`}
            >
              {selectedCategory === category && (
                <div className="w-2.5 h-2.5 bg-[#B91879] rounded-full"></div>
              )}
            </div>
            <span className="text-gray-800">{category}</span>
          </label>
        ))}
      </div>

      <div>
        <h3 className="text-lg font-bold mb-3">Tipo</h3>
        {types.map((type) => (
          <label
            key={type}
            className="flex items-center gap-2 mb-2 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={selectedTypes.includes(type)}
              onChange={() => toggleType(type)}
              className="hidden"
            />
            <div
              className={`w-5 h-5 flex items-center justify-center rounded border ${
                selectedTypes.includes(type)
                  ? "bg-[#B91879] border-[#B91879]"
                  : "border-gray-400"
              }`}
            >
              {selectedTypes.includes(type) && (
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
            <span className="text-gray-800">{type}</span>
          </label>
        ))}
      </div>
    </div>
  );
};
