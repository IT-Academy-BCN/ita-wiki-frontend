import { FC, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useTags } from "../../context/TagsContext";
import { capitalizeFirstLetter } from "../../utils/capitalize";

interface FilterResourcesProps {
  resourceTypes: readonly string[];
  selectedTags: string[];
  setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
  selectedResourceTypes: string[];
  setSelectedResourceTypes: (resourceTypes: string[]) => void;
}

export const FilterResources: FC<FilterResourcesProps> = ({
  resourceTypes,
  selectedTags,
  setSelectedTags,
  selectedResourceTypes,
  setSelectedResourceTypes,
}) => {
  const { category } = useParams();
  const [prevCategory, setPrevCategory] = useState<string | null>(null);
  const { getTagsByCategory } = useTags();

  useEffect(() => {
    if (category !== prevCategory) {
      setSelectedResourceTypes([...resourceTypes]);
      setSelectedTags([]);
      setPrevCategory(category ?? null);
    }
    if (selectedResourceTypes.length === 0 && resourceTypes.length > 0) {
      setSelectedResourceTypes([...resourceTypes]);
    }
  }, [
    category,
    prevCategory,
    resourceTypes,
    selectedResourceTypes,
    setSelectedResourceTypes,
    setSelectedTags,
  ]);

  const categoryTags = getTagsByCategory(category || null);
  const tagNames = categoryTags.map((tag) => capitalizeFirstLetter(tag.name));
  const tags = ["Todos", ...tagNames];

  const toggleTag = (tag: string) => {
    if (tag === "Todos") {
      setSelectedTags([]);
    } else {
      setSelectedTags(
        selectedTags.includes(tag)
          ? selectedTags.filter((t) => t !== tag)
          : [...selectedTags.filter((t) => t !== "Todos"), tag],
      );
    }
  };

  return (
    <div className="mt-1">
      <div className="mb-1">
        {tags.map((tagName) => {
          const isSelected =
            (tagName === "Todos" && selectedTags.length === 0) ||
            selectedTags.includes(tagName);

          return (
            <label
              key={tagName}
              className="flex items-center gap-2 mb-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => toggleTag(tagName)}
                className="hidden"
              />
              <div
                className={`w-5 h-5 flex items-center justify-center rounded border ${
                  isSelected
                    ? "bg-[var(--color-primary)] border-[var(--color-primary)]"
                    : "border-gray-400"
                }`}
              >
                {isSelected && (
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
              <span
                className="text-[14px] text-[#282828] max-w-[120px] truncate inline-block"
                title={tagName}
              >
                {tagName}
              </span>
            </label>
          );
        })}

        {tagNames.length === 0 && (
          <p className="text-sm text-gray-500">No hi ha temes disponibles.</p>
        )}
      </div>
    </div>
  );
};
