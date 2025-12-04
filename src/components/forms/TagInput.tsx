import { useEffect, useState, useRef } from "react";
import { Tag } from "../../types";
import { formatText } from "../../utils/formatText";
import { useTags } from "../../context/TagsContext";

interface TagInputProps {
  selectedTags: Tag[];
  setSelectedTags: (tags: Tag[]) => void;
  selectedCategory: string | null;
}

const TagInput: React.FC<TagInputProps> = ({
  selectedTags,
  setSelectedTags,
  selectedCategory,
}) => {
  const { tags: allTags, getTagsByCategory } = useTags();

  const [availableTags, setAvailableTags] = useState<Tag[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const previousCategory = useRef<string | null>(selectedCategory);

  useEffect(() => {
    try {
      const source = selectedCategory
        ? getTagsByCategory(selectedCategory)
        : allTags;

      const normalized = Array.isArray(source) ? source : [];
      setAvailableTags(normalized);
      setIsLoading(allTags.length === 0);
      setError(null);
    } catch (err) {
      setError("Error loading tags");
      console.error("Error in TagInput:", err);
    }
  }, [selectedCategory, allTags, getTagsByCategory]);

  useEffect(() => {
    if (previousCategory.current !== selectedCategory) {
      setSelectedTags([]);
      previousCategory.current = selectedCategory;
    }
  }, [selectedCategory, setSelectedTags]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { selectedOptions, value } = event.target;

    let selectedIds: string[] = [];

    if (selectedOptions && selectedOptions.length > 0) {
      selectedIds = Array.from(selectedOptions, (option) => option.value);
    } else if (value) {
      selectedIds = [value];
    }

    const newSelectedTags = availableTags.filter((tag) =>
      selectedIds.includes(String(tag.id)),
    );

    setSelectedTags(newSelectedTags);
  };

  const selectedValues = selectedTags.map((tag) => String(tag.id));

  return (
    <div className="w-full max-w-[482px]">
      <p className="font-medium mb-2 text-sm text-gray-800">Tags</p>

      {error ? (
        <div className="w-full border border-red-300 bg-red-50 rounded-md p-4 text-sm text-red-600">
          {error}
        </div>
      ) : (
        <>
          <select
            id="tags"
            multiple
            value={selectedValues}
            onChange={handleSelectChange}
            disabled={isLoading}
            className={`w-full border border-gray-200 rounded-md p-2 text-sm focus:outline-none focus:border-[#B91879] min-h-[180px] ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            aria-label="Tags"
          >
            {isLoading ? (
              <option disabled>Carregant tags...</option>
            ) : availableTags.length === 0 ? (
              <option disabled>
                {selectedCategory
                  ? "No hi ha tags disponibles per aquesta categoria"
                  : "No hi ha tags disponibles"}
              </option>
            ) : (
              availableTags.map((tag) => (
                <option key={tag.id} value={String(tag.id)}>
                  {formatText(tag.name)}
                </option>
              ))
            )}
          </select>

          <p className="mt-1 text-xs text-gray-500">
            Mantén premuda la tecla Ctrl (Windows) o Cmd (Mac) per seleccionar
            més d&apos;un tag.
          </p>
        </>
      )}
    </div>
  );
};

export default TagInput;
