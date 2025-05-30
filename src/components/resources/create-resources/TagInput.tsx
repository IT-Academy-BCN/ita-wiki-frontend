import { useEffect, useState, useRef } from "react";
import { getTags } from "../../../api/endPointTags";
import { Tag } from "../../../types";
import { formatText } from "../../../utils/formatText";

interface TagInputProps {
  selectedTags: Tag[];
  setselectedTags: (tag: Tag[]) => void;
}

const TagInput: React.FC<TagInputProps> = ({
  selectedTags,
  setselectedTags,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [filteredTags, setFilteredTags] = useState<Tag[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const fetchTags = async () => {
      const tags = await getTags();
      const sortedTags = tags.sort((a, b) =>
        a.name.localeCompare(b.name, "es", { sensitivity: "base" })
      );
      setTags(sortedTags);
    };
    fetchTags();
    setselectedTags([]);
  }, [setselectedTags]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setFilteredTags([]);
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
      (tag) => !selectedTags.some((t) => t.id === tag.id)
    );

    if (lowerValue) {
      const filtered = availableTags.filter((tag) =>
        tag.name.toLowerCase().includes(lowerValue)
      );

      setFilteredTags(filtered);
    } else {
      setFilteredTags(availableTags);
    }
  };

  const handleFocus = () => {
    const availableTags = tags.filter(
      (tag) => !selectedTags.some((t) => t.id === tag.id)
    );
    setFilteredTags(availableTags);
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
          placeholder="Escribe un tag..."
          className="w-full border-none outline-none bg-transparent px-2 py-1"
        />
      </div>

      {filteredTags.length > 0 && (
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
