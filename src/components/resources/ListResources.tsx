import { FC, useState, useEffect } from "react";
import { IntResource } from "../../types";
import { useCtxUser } from "../../hooks/useCtxUser";
import { IntBookmarkElement } from "../../types";
import { useResourceFilter } from "../../hooks/useResourceFilter";
import { useResourceSort } from "../../hooks/useResourceSort";
import { Resource } from "./Resource";
import { FilterResources } from "./FilterResources";
import { ListMyResources } from "../my-resources/MyResourcesList";
import SortButton from "./SortButton";
import { categories } from "../../data/categories";
import { themes } from "../../data/themes";
import { resourceTypes } from "../../data/resourceTypes";
import BookMarkList from "./bookmarks/BookMarkList";

export interface ListResourceProps {
  resources: IntResource[];
  bookmarkedResources: IntBookmarkElement[];
  toggleBookmark: (resource: IntResource) => void;
  category: keyof typeof categories | undefined;
  loadingBookmarks?: boolean;
}

export const ListResources: FC<ListResourceProps> = ({
  resources,
  category,
  bookmarkedResources,
  toggleBookmark,
  loadingBookmarks = false,
}) => {
  const [showFilters, setShowFilters] = useState<boolean>(false);

  const { user } = useCtxUser();

  const {
    filteredResources,
    selectedTheme,
    setSelectedTheme,
    selectedResourceTypes,
    setSelectedResourceTypes,
    resetTheme,
  } = useResourceFilter({
    resources: resources || [],
    themes,
    resourceTypes,
  });

  const {
    sortedResources,
    setSortOption,
    setSelectedYear,
    availableYears,
    sortOption,
  } = useResourceSort({
    resources: filteredResources,
  });

  const userCreatedResources = user
    ? resources.filter((resource) => resource.github_id === Number(user.id))
    : [];

  const isBookmarked = (resource: IntResource) => {
    return bookmarkedResources.some((bookmark) => bookmark.id === resource.id);
  };

  useEffect(() => {}, [sortedResources]);

  return (
    resources && (
      <div className="mx-auto w-full grow lg:flex xl:px-2 gap-x-6 sm:bg-white lg:bg-transparent">
        <div className="flex flex-col lg:flex-row lg:flex-grow lg:overflow-y-auto bg-white lg:rounded-xl px-4 lg:px-8 py-4 sm:py-6">
          {/* Sidebar Filters (Visible on larger screens, on the left) */}
          <div className="hidden sm:block px-4 py-6 sm:px-6 lg:pr-8 lg:w-80 xl:shrink-0 xl:pr-6">
            <h2 className="text-[26px] font-bold">Filtros</h2>
            <FilterResources
              themes={[...themes]}
              resourceTypes={[...resourceTypes]}
              selectedTheme={selectedTheme}
              setSelectedTheme={setSelectedTheme}
              selectedResourceTypes={selectedResourceTypes}
              setSelectedResourceTypes={setSelectedResourceTypes}
              resetTheme={resetTheme}
            />
          </div>

          <div className="lg:flex-1 px-4 py-6 lg:pl-8 xl:pl-6">
            <div className="flex justify-between items-center">
              <h2 className="text-[26px] font-bold">
                Recursos {String(category) || ""}
              </h2>
              <SortButton
                setSortOption={setSortOption}
                setSelectedYear={setSelectedYear}
                availableYears={availableYears}
                sortOption={sortOption}
              />
              {/* Filter Button (Mobile only) */}
              <button
                className="sm:hidden bg-[#B91879] text-white px-4 py-2 rounded-md flex items-center gap-2"
                onClick={() => setShowFilters(!showFilters)}
              >
                <span>Filtrar</span>
                {showFilters ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="18 15 12 9 6 15"></polyline>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                )}
              </button>
            </div>

            {/* Mobile filters (only shown when toggled) */}
            {showFilters && (
              <div className="sm:hidden mt-4">
                <FilterResources
                  themes={[...themes]}
                  resourceTypes={[...resourceTypes]}
                  selectedTheme={selectedTheme}
                  setSelectedTheme={setSelectedTheme}
                  selectedResourceTypes={selectedResourceTypes}
                  setSelectedResourceTypes={setSelectedResourceTypes}
                  resetTheme={resetTheme}
                />
              </div>
            )}

            <ul className="flex flex-col gap-2 py-8">
              {sortedResources.map((resource: IntResource) => (
                <Resource
                  key={resource.id}
                  resource={resource}
                  isBookmarked={isBookmarked(resource)}
                  toggleBookmark={() => toggleBookmark(resource)}
                />
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col shrink-0 px-4 lg:w-80 mt-6 sm:mt-0 space-y-6">
          <BookMarkList
            bookmarks={bookmarkedResources}
            isLoading={loadingBookmarks}
          />

          <ListMyResources
            myResources={userCreatedResources}
            isLoading={loadingBookmarks}
          />
        </div>
      </div>
    )
  );
};
