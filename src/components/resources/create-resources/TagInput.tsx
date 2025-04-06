import { useState } from "react";

interface TagInputProps {
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
}

const suggestions = ["React", "JavaScript", "TypeScript", "Node.js", "CSS", "HTML", "Next.js"];

const TagInput: React.FC<TagInputProps> = ({ selectedTags, setSelectedTags }) => {
  const [inputValue, setInputValue] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (value) {
      setFilteredSuggestions(
        suggestions.filter((tag) => tag.toLowerCase().includes(value.toLowerCase()))
      );
    } else {
      setFilteredSuggestions([]);
    }
  };

  const addTag = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
    setInputValue("");
    setFilteredSuggestions([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      addTag(inputValue.trim());
    }
  };

  const removeTag = (tag: string) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag));
  };

  return (
    <div className="w-full max-w-md ">
      {/* Input */}
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Escribe un tag..."
        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {/* Lista de sugerencias */}
      {filteredSuggestions.length > 0 && (
        <ul className="bg-white border rounded-md shadow-md mt-2 h-48 overflow-y-scroll">
          {filteredSuggestions.map((tag) => (
            <li
              key={tag}
              className="cursor-pointer p-2 hover:bg-gray-200"
              onClick={() => addTag(tag)}
            >
              {tag}
            </li>
          ))}
        </ul>
      )}

      {/* Tags seleccionados */}
      <div className="mt-3 flex flex-wrap gap-2">
        {selectedTags.map((tag) => (
          <div key={tag} className="flex items-center bg-blue-200 text-blue-800 px-3 py-1 rounded-full">
            <span>{tag}</span>
            <button
              onClick={() => removeTag(tag)}
              className="ml-2 text-red-500 hover:text-red-700"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagInput;
