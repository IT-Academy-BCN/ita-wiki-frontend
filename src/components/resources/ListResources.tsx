import { FC, useState, useEffect } from "react";
import { IntResource } from "../../types";
import { useCtxUser } from "../../hooks/useCtxUser";
import { useResourceFilter } from "../../hooks/useResourceFilter";
import { useResourceSort } from "../../hooks/useResourceSort";

import { Resource } from "./Resource";
import { FilterResources } from "./FilterResources";
import { ListMyResources } from "./ListMyResources";
// import SortButton from "./SortButton";

import { categories } from "../../data/categories";
import { themes } from "../../data/themes";
import { resourceTypes } from "../../data/resourceTypes";
import BookMarkList from "./bookmarks/BookMarkList";
import SearchComponent from "../Layout/header/SearchComponent";
// import FilterButton from "./FilterButton";

interface ListResourceProps {
  resources: IntResource[];
  category?: keyof typeof categories;
}

export const ListResources: FC<ListResourceProps> = ({
  resources,
  category,
}) => {
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useCtxUser();
  const [showSearch, setShowSearch] = useState(false);

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
    // setSortOption,
    // setSelectedYear,
    // availableYears,
    // sortOption,
  } = useResourceSort({
    resources: filteredResources,
  });

  const userCreatedResources = user
    ? resources.filter((resource) => resource.github_id === Number(user.id))
    : [];

  useEffect(() => {}, [sortedResources]);

  const visibleResources = sortedResources.filter((resource) =>
    resource.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggleFilter = () => {
    setShowSearch((prev) => !prev);
  };

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
              <button onClick={handleToggleFilter}>🔍 Buscar recurso</button>

              {/* Campo de búsqueda de recursos */}
              {showSearch && (
                <SearchComponent
                  onSearch={(query) => setSearchTerm(query)}
                  disabled={false}
                />
              )}
              {/* <SortButton
                setSortOption={setSortOption}
                setSelectedYear={setSelectedYear}
                availableYears={availableYears}
                sortOption={sortOption}
              /> */}
              {/* Filter Button (Mobile only) */}
              {/* <FilterButton
                setShowFilters={setShowFilters}
                showFilters={showFilters}
              /> */}
            </div>
            {/* Filters - Visible on mobile when toggled */}
            {showFilters && (
              <div className="sm:hidden mt-4 p-4 bg-gray-100 rounded-lg">
                <h2 className="text-2xl font-bold">Filtros</h2>
                <FilterResources
                  themes={themes}
                  resourceTypes={resourceTypes}
                  selectedTheme={selectedTheme}
                  setSelectedTheme={setSelectedTheme}
                  selectedResourceTypes={selectedResourceTypes}
                  setSelectedResourceTypes={setSelectedResourceTypes}
                  resetTheme={resetTheme}
                />
              </div>
            )}

            <ul className="flex flex-col gap-2 py-8">
              {visibleResources.map((resource: IntResource) => (
                <Resource key={resource.id} resource={resource} />
              ))}
            </ul>
          </div>
        </div>

        <div className="shrink-0 px-4 lg:w-80 mt-6 sm:mt-0 space-y-6">
          <div className="bg-white sm:rounded-xl px-4 py-6 sm:px-6 lg:pl-8 xl:shrink-0 xl:pl-6">
            <BookMarkList resources={resources} />
          </div>
          {user && userCreatedResources.length > 0 && (
            <ListMyResources myResources={userCreatedResources} />
          )}
        </div>
      </div>
    )
  );
};
