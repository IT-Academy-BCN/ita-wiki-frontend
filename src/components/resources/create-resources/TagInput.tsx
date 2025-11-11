import { useEffect, useState, useRef } from "react";
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
  const [inputValue, setInputValue] = useState("");
  const [filteredTags, setFilteredTags] = useState<Tag[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { tags: allTags, getTagsByCategory } = useTags();

  useEffect(() => {
    const filtered = getTagsByCategory(selectedCategory);
    setselectedTags([]);
    setInputValue("");
    setFilteredTags(filtered);
  }, [selectedCategory]);

  const tags = selectedCategory ? getTagsByCategory(selectedCategory) : allTags;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const tagNames = tags?.map((tag) => tag.name) || [];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    const lowerValue = value.toLowerCase();
    const availableTags = tags.filter(
      (tag) => !selectedTags.some((t) => t.id === tag.id),
    );

    if (lowerValue) {
      const filtered = availableTags.filter((tag) =>
        tag.name.toLowerCase().includes(lowerValue),
      );

      setFilteredTags(filtered);
    } else {
      setFilteredTags(availableTags);
    }
    setShowDropdown(true);
  };

  const handleFocus = () => {
    const availableTags = tags.filter(
      (tag) => !selectedTags.some((t) => t.id === tag.id),
    );

    setFilteredTags(availableTags);
    setShowDropdown(true);
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
        console.error("El valor introduït no és vàlid.");
      }
    }
  };

  const removeTag = (theme: Tag) => {
    if (selectedTags.includes(theme)) {
      setselectedTags(selectedTags.filter((tag) => tag.id !== theme.id));
    }
  };

  return (
    <div ref={wrapperRef} className="w-full max-w-[482px]">
      <p className="font-medium mb-2 text-sm text-gray-800">Tags</p>

      <div
        className={`p-2 border rounded-md flex flex-wrap gap-2 ${isFocused ? "border-[#B91879]" : "border-gray-200"}`}
      >
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
          onFocus={() => {
            setIsFocused(true);
            handleFocus();
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          placeholder="Escriu una etiqueta..."
          className="w-full border-none outline-none bg-transparent px-2 py-1"
        />
      </div>

      {showDropdown && (
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
