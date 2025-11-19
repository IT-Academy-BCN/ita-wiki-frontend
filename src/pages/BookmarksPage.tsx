import { FC } from "react";
import { Bookmark } from "lucide-react";
import { ListBookmarks } from "../components/resources/ListBookmarks";
import { useResources } from "../context/ResourcesContext";
import PageTitle from "../components/ui/PageTitle";

const BookmarksPage: FC = () => {
  const {
    resources,
    isLoading,
    isBookmarked,
    toggleBookmark: toggleBookmarkInContext,
  } = useResources();

  const bookmarkedResources = resources.filter((resource) =>
    isBookmarked(resource),
  );

  return (
    <>
      <PageTitle title="Recursos desats a la teva llista de lectura" />
      {isLoading ? (
        <div className="w-full max-w-screen-xl px-4 mx-auto py-10 text-center">
          Obtenint els recursos...
        </div>
      ) : (
        <div className="w-full max-w-screen-xl px-4 mx-auto grow lg:flex-1 gap-x-6 sm:bg-white lg:bg-transparent">
          <div className="flex flex-col lg:flex-row lg:flex-grow lg:overflow-y-auto bg-white lg:rounded-xl px-4 lg:px-8 py-4 sm:py-6">
            <div className="lg:flex-1 overflow-y-auto h-[calc(100vh-90px)] px-4 py-6 lg:pl-8 xl:pl-6">
              <div className="flex flex-col justify-between items-center">
                <h2 className="text-[26px] font-bold text-center">
                  La teva llista de lectura
                </h2>
                {bookmarkedResources.length > 0 ? (
                  <ListBookmarks
                    bookmarkedResources={bookmarkedResources}
                    toggleBookmark={(resource) =>
                      toggleBookmarkInContext(resource)
                    }
                  />
                ) : (
                  <div className="w-full bg-yellow-50 border border-yellow-200 rounded-md p-4 mt-6">
                    <div className="flex items-center">
                      <Bookmark className="h-5 w-5 text-yellow-500 mr-3" />
                      <div>
                        <h3 className="text-lg font-medium text-yellow-800">
                          No has afegit cap recurs a la teva llista de lectura
                        </h3>
                        <p className="text-yellow-700 mt-1">
                          Afegeix recursos a la teva llista de lectura per
                          veure'ls aquí
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BookmarksPage;
