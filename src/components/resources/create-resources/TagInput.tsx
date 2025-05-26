import { useEffect, useState } from "react";
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

  useEffect(() => {
    const fetchTags = async () => {
      const tags = await getTags();
      console.log("Fetched Tags:", tags);
      setTags(tags);
    };
    fetchTags();
    setselectedTags([]);
  }, [setselectedTags]);

  const tagIds = tags?.map((tag) => tag.id) || [];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (value && tags.length) {
      const lowerValue = value.toLowerCase();

      const filtered = tags.filter(
        (tag) =>
          tag.name.toLowerCase().includes(lowerValue) &&
          !selectedTags.some((t) => t.id === tag.id)
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
      if (tagIds.includes(parseInt(trimmedValue))) {
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
  useEffect(() => {
    const tagIds = selectedTags.map((tag) => tag.id);
    console.log("✅ Will send tag_ids to POST:", tagIds);
  }, [selectedTags]);

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
