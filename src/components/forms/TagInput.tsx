/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Tag } from "../../types";
import { formatText } from "../../utils/formatText";
import { useTags } from "../../context/TagsContext";

interface TagInputProps {
  selectedTags: Tag[];
  setselectedTags: (tags: Tag[]) => void;
  selectedCategory: string | null;
}

const TagInput: React.FC<TagInputProps> = ({
  selectedTags,
  setselectedTags,
  selectedCategory,
}) => {
  const { tags: allTags, getTagsByCategory } = useTags();

  const [availableTags, setAvailableTags] = useState<Tag[]>([]);

  useEffect(() => {
    const source = selectedCategory
      ? getTagsByCategory(selectedCategory)
      : allTags;

    const normalized = Array.isArray(source) ? source : [];
    setAvailableTags(normalized);
    setselectedTags([]);
  }, [selectedCategory, allTags]);

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

    setselectedTags(newSelectedTags);
  };

  const selectedValues = selectedTags.map((tag) => String(tag.id));

  return (
    <div className="w-full max-w-[482px]">
      <p className="font-medium mb-2 text-sm text-gray-800">Tags</p>

      <select
        id="tags"
        multiple
        value={selectedValues}
        onChange={handleSelectChange}
        className="w-full border border-gray-200 rounded-md p-2 text-sm focus:outline-none focus:border-[#B91879] min-h-[180px]"
        aria-label="Tags"
      >
        {availableTags.map((tag) => (
          <option key={tag.id} value={String(tag.id)}>
            {formatText(tag.name)}
          </option>
        ))}
      </select>

      <p className="mt-1 text-xs text-gray-500">
        Mantén premuda la tecla Ctrl (Windows) o Cmd (Mac) per seleccionar més
        d&apos;un tag.
      </p>
    </div>
  );
};

export default TagInput;
