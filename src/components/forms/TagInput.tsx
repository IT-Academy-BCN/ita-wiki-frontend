import { Tag } from "../../types";
import { formatText } from "../../utils/formatText";
import { useTags } from "../../context/TagsContext";

interface TagInputProps {
  selectedTags: Tag[];
  setselectedTags: (tags: Tag[]) => void;
  selectedCategory: string | null;
}

interface TagOptionsProps {
  availableTags: Tag[];
  selectedCategory: string | null;
}

const TagOptions = ({ availableTags, selectedCategory }: TagOptionsProps) => {
  if (availableTags.length === 0) {
    const message = selectedCategory
      ? "No hi ha etiquetes disponibles per aquesta categoria"
      : "No hi ha etiquetes disponibles";

    return <option disabled>{message}</option>;
  }

  return (
    <>
      {availableTags.map((tag) => (
        <option key={tag.id} value={String(tag.id)}>
          {formatText(tag.name)}
        </option>
      ))}
    </>
  );
};

const TagInput = ({
  selectedTags,
  setselectedTags,
  selectedCategory,
}: TagInputProps) => {
  const { tags: allTags, getTagsByCategory } = useTags();

  const availableTags = selectedCategory
    ? getTagsByCategory(selectedCategory)
    : allTags;

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
      <p className="font-medium mb-2 text-sm text-gray-800">Etiquetes</p>
      <select
        id="tags"
        multiple
        value={selectedValues}
        onChange={handleSelectChange}
        disabled={allTags.length === 0}
        className="w-full border border-gray-200 rounded-md p-2 text-sm focus:outline-none focus:border-[#B91879] min-h-[180px]"
        aria-label="Tags"
      >
        <TagOptions
          availableTags={availableTags}
          selectedCategory={selectedCategory}
        />
      </select>
      <p className="mt-1 text-xs text-gray-500">
        Mantén premuda la tecla Ctrl (Windows) o Cmd (Mac) per seleccionar més
        d'un tag.
      </p>
    </div>
  );
};

export default TagInput;
