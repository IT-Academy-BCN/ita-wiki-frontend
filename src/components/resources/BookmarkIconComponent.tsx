import { FC } from "react";
import { Bookmark } from "lucide-react";

interface BookmarkComponentProps {
  marked?: boolean;
}

const BookmarkIconComponent: FC<BookmarkComponentProps> = ({
  marked = false,
}) => {
  return (
    <div
      id="bookmarkIcon"
      data-testid="bookmarkIcon"
      className="flex items-center justify-start gap-2 max-h-12"
    >
      <Bookmark
        size={16}
        fill={marked ? "black" : "none"}
        color={marked ? "black" : "#808080"}
        aria-label={
          marked
            ? "Guardado en la lista de lectura"
            : "No guardado en la lista de lectura"
        }
      />
    </div>
  );
};

export default BookmarkIconComponent;
