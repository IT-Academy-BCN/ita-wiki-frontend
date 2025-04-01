import { FC, useState, useEffect } from "react";
import BookmarkComponent from "./BookmarkComponent";
import { IntBookmarkElement } from "../../../types";

interface BookMarkListProps {
  bookmarks: IntBookmarkElement[];
  isLoading?: boolean;
}

const BookMarkList: FC<BookMarkListProps> = ({
  bookmarks,
  isLoading = false,
}) => {
  const [showEmptyMessage, setShowEmptyMessage] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (!isLoading && bookmarks.length === 0) {
      timer = setTimeout(() => {
        setShowEmptyMessage(true);
      }, 1000);
    } else {
      setShowEmptyMessage(false);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isLoading, bookmarks]);

  return (
    <div
      data-testid="bookmarks-container"
      className="bg-white overflow-y-auto h-[40vh] max-h-[400px] sm:rounded-xl px-4 py-6 sm:px-6 lg:pl-8 xl:shrink-0 xl:pl-6"
    >
      <h3 className="text-[22px] font-bold mb-8">Lista de lectura</h3>

      {isLoading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#B91879]"></div>
        </div>
      ) : bookmarks && bookmarks.length > 0 ? (
        <>
          {bookmarks.map((bookmark) => (
            <BookmarkComponent
              key={bookmark.id}
              title={bookmark.title}
              description={bookmark.description}
              url={bookmark.url}
            />
          ))}
        </>
      ) : showEmptyMessage ? (
        <p>Todavía no has agregado ningún recurso a tu lista de lectura.</p>
      ) : null}
    </div>
  );
};

export default BookMarkList;
