import { useMemo, useState, useRef, useEffect } from "react";
import { Tag } from "../../types";
import { useTags } from "../../context/TagsContext";
import { SelectedTagsContainer } from "./SelectedTagsContainer";
import { TagSearchDropdown } from "./TagSearchDropdown";

interface TagInputProps {
  selectedTags: Tag[];
  setselectedTags: (tags: Tag[]) => void;
  selectedCategory: string | null;
}
const TagInput = ({
  selectedTags,
  setselectedTags,
  selectedCategory,
}: TagInputProps) => {
  const { tags: allTags, getTagsByCategory } = useTags();

  const availableTags = useMemo(() => {
    return selectedCategory ? getTagsByCategory(selectedCategory) : allTags;
  }, [selectedCategory, allTags, getTagsByCategory]);

  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredTags = useMemo(() => {
    if (!searchTerm.trim()) return availableTags;
    return availableTags.filter((tag) =>
      tag.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, availableTags]);

  const unselectedFilteredTags = useMemo(() => {
    return filteredTags.filter(
      (tag) => !selectedTags.some((selected) => selected.id === tag.id)
    );
  }, [filteredTags, selectedTags]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleRemoveTag = (tagId: number) => {
    setselectedTags(selectedTags.filter((tag) => tag.id !== tagId));
  };

  const handleAddTag = (tag: Tag) => {
    if (!selectedTags.some((selected) => selected.id === tag.id)) {
      setselectedTags([...selectedTags, tag]);
      setSearchTerm("");
      setShowSuggestions(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setShowSuggestions(true);
  };

  return (
    <div className="w-full max-w-[482px]">
      <p className="font-medium mb-2 text-sm text-gray-800">Etiquetes</p>

      <div className="w-full border border-gray-200 rounded-lg p-2 bg-white relative">
        <SelectedTagsContainer tags={selectedTags} onRemove={handleRemoveTag} />

        <TagSearchDropdown
          inputRef={inputRef}
          dropdownRef={dropdownRef}
          searchTerm={searchTerm}
          showSuggestions={showSuggestions}
          allTags={allTags}
          availableTags={availableTags}
          filteredTags={unselectedFilteredTags}
          onInputChange={handleInputChange}
          onFocus={() => setShowSuggestions(true)}
          onSelectTag={handleAddTag}
        />
      </div>

      <p className="mt-1 text-xs text-gray-500">
        {allTags.length === 0
          ? "Esperant que es carreguin les etiquetes..."
          : "Escriu per buscar i fes clic a una etiqueta per afegir-la"}
      </p>
    </div>
  );
};

export default TagInput;
