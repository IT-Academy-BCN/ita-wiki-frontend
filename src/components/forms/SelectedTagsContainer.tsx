import { Tag } from "../../types";
import { formatText } from "../../utils/formatText";
import { UiButton } from "../ui/shared-ui/UiButton";

interface SelectedTagsContainerProps {
  tags: Tag[];
  onRemove: (tagId: number) => void;
}
export const SelectedTagsContainer = ({
  tags,
  onRemove,
}: SelectedTagsContainerProps) => {
  return (
    <div className="w-full min-h-[60px]">
      {tags.length === 0 ? (
        <p className="text-xs text-gray-400 italic">
          No hi ha etiquetes seleccionades
        </p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <div
              key={tag.id}
              className="flex items-center gap-1 bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm border border-black"
            >
              <span>{formatText(tag.name)}</span>
              <UiButton
                variant="ghost"
                size="sm"
                onClick={() => onRemove(tag.id)}
                className="!p-0 !px-1 hover:text-red-600 font-bold text-lg"
                aria-label={`Eliminar ${tag.name}`}
                type="button"
              >
                ×
              </UiButton>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
