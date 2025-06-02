import { useEffect, useState } from "react";
import { Tag } from "../../../types";
import { formatText } from "../../../utils/formatText";
import { useTags } from "../../../context/TagsContext";

interface TagInputProps {
  selectedTags: Tag[];
  setselectedTags: (tag: Tag[]) => void;
  selectedCategory: string | null;
}

const TagInput: React.FC<TagInputProps> = ({
  selectedTags,
  setselectedTags,
  selectedCategory,
}) => {
  const { getTagsByCategory } = useTags();
  const [inputValue, setInputValue] = useState("");
  const [filteredTags, setFilteredTags] = useState<Tag[]>([]);

  useEffect(() => {
    const filtered = getTagsByCategory(selectedCategory);
    setselectedTags([]);
    setFilteredTags([]);
    setInputValue("");
    setTimeout(() => setFilteredTags(filtered), 0);
  }, [selectedCategory]);

  const tags = getTagsByCategory(selectedCategory);
  const tagNames = tags.map((tag) => tag.name);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (value && tags.length) {
      const lowerValue = value.toLowerCase();

      const filtered = tags.filter(
        (tag) =>
          tag.name.toLowerCase().includes(lowerValue) &&
          !selectedTags.some((t) => t.id === tag.id),
      );

      setFilteredTags(filtered);
    } else {
      setFilteredTags([]);
    }
  };

  const addTag = (tag: Tag) => {
    if (!selectedTags.includes(tag)) {
      setselectedTags([...selectedTags, tag]);
    }
    setInputValue("");
    setFilteredTags([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      const trimmedValue = inputValue.trim();

      if (tagNames.includes(trimmedValue)) {
        const selectedTag = tags?.find((tag) => tag.name === trimmedValue);
        if (selectedTag && !selectedTags.includes(selectedTag)) {
          setselectedTags([...selectedTags, selectedTag]);
          setInputValue("");
          setFilteredTags([]);
        }
      } else {
        console.error("El valor ingresado no es válido.");
      }
    }
  };

  const removeTag = (theme: Tag) => {
    if (selectedTags.includes(theme)) {
      setselectedTags(selectedTags.filter((tag) => tag.id !== theme.id));
    }
  };

  return (
    <div className="w-full max-w-[482px]">
      <p className="font-medium mb-2 text-sm text-gray-800">Tags</p>

      <div className="p-2 border rounded-md border-gray-200 flex flex-wrap gap-2 focus:border-2 ">
        {selectedTags &&
          selectedTags.length > 0 &&
          selectedTags.map((tag) => (
            <div
              key={tag.id}
              className="flex items-center bg-[#F6F6F6] font-medium px-3 py-2 rounded-md mb-2 text-sm border border-[#828282]"
            >
              <span>{formatText(tag.name)}</span>
              <button
                onClick={() => removeTag(tag)}
                className="ml-2 text-black hover:text-gray-700 "
              >
                ✕
              </button>
            </div>
          ))}

        <input
          type="text"
          id="tags"
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Escribe un tag..."
          className="w-full border-none outline-none bg-transparent px-2 py-1"
        />
      </div>

      {inputValue.length > 0 && filteredTags.length > 0 && (
        <ul className="bg-white border border-[#DEDEDE] rounded-md shadow-md max-h-48 overflow-y-auto">
          {filteredTags.map((tag) => (
            <li
              key={tag.id}
              className="cursor-pointer p-2 hover:bg-[#B91879] hover:text-white"
              onClick={() => addTag(tag)}
            >
              {formatText(tag.name)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TagInput;
