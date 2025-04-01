import { FC } from "react";
import bookmarkFull from "../../../assets/bookmark_full.svg";
import bookmarkEmpty from "../../../assets/bookmark_empty.svg";

interface BookmarkComponentProps {
  marked: boolean;
}
const BookmarkIconComponent: FC<BookmarkComponentProps> = ({ marked }) => {
  return (
    <div
      id="bookmarkIcon"
      data-testid="bookmarkIcon"
      className="flex items-center justify-start gap-2 max-h-12"
    >
      {marked ? (
        <img src={bookmarkFull} height={16} alt="Bookmark is marked" />
      ) : (
        <img src={bookmarkEmpty} height={16} alt="Bookmark is not marked" />
      )}
    </div>
  );
};

export default BookmarkIconComponent;
