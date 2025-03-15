import { FC } from "react";
import BookmarkComponent from './BookmarkComponent';
import { IntResource } from '../../../types';
import { useGetBookmarksList } from "../../../hooks/useBookmarks"

interface BookMarkListProps {
    resources: IntResource[];
}

const BookMarkList: FC<BookMarkListProps> = ({ resources }) => {
    const bookmarkArr = useGetBookmarksList(resources)
    console.log("arr en coponente", bookmarkArr);

    return (
        <div className='h-[50vh] overflow-auto'>
            <h3 className="text-[22px] font-bold mb-8">Lista de lectura</h3>

            {bookmarkArr && bookmarkArr.length === 0 ? (
                <p>No hay lista de recursos disponible</p>
            ) : (
                <div>
                    {bookmarkArr && bookmarkArr.map((bookmark) => (
                        <BookmarkComponent
                            key={bookmark.id}
                            title={bookmark.title}
                            description={bookmark.description}
                            url={bookmark.url}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default BookMarkList;
