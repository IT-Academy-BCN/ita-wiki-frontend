import { Tag } from "../../types";
import { formatText } from "../../utils/formatText";

interface TagSearchDropdownProps {
  searchTerm: string;
  showSuggestions: boolean;
  allTags: Tag[];
  availableTags: Tag[];
  filteredTags: Tag[];
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  onSelectTag: (tag: Tag) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
  dropdownRef: React.RefObject<HTMLDivElement | null>;
}

export const TagSearchDropdown = ({
  searchTerm,
  showSuggestions,
  allTags,
  availableTags,
  filteredTags,
  onInputChange,
  onFocus,
  onSelectTag,
  inputRef,
  dropdownRef,
}: TagSearchDropdownProps) => {
  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="text"
        value={searchTerm}
        onChange={onInputChange}
        onFocus={onFocus}
        disabled={allTags.length === 0}
        placeholder={
          allTags.length === 0
            ? "Carregant etiquetes..."
            : "Escriu per buscar etiquetes..."
        }
        className="w-full p-2 text-sm focus:outline-none disabled:bg-gray-50 disabled:cursor-not-allowed placeholder:text-gray-400"
        aria-label="Buscar tags"
      />

      {showSuggestions && availableTags.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute z-10 -left-2 -right-2 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-[200px] overflow-y-auto"
        >
          {filteredTags.length === 0 ? (
            <div className="p-3 text-sm text-gray-500">
              {searchTerm.trim()
                ? "No s'han trobat etiquetes"
                : "Totes les etiquetes ja estan seleccionades"}
            </div>
          ) : (
            filteredTags.map((tag) => (
              <div
                key={tag.id}
                onClick={() => onSelectTag(tag)}
                className="px-3 py-2 text-sm cursor-pointer hover:bg-[#B91879] hover:text-white transition-colors"
              >
                {formatText(tag.name)}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
