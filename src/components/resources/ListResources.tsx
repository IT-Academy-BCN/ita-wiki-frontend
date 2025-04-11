import { FC, useState } from "react";
import { IntResource } from "../../types";
import { useResourceFilter } from "../../hooks/useResourceFilter";
import { useResourceSort } from "../../hooks/useResourceSort";
import { useResources } from "../../context/ResourcesContext";

import { FilterResources } from "./FilterResources";
import SortButton from "./SortButton";

import { categories } from "../../data/categories";
import { themes } from "../../data/themes";
import { resourceTypes } from "../../data/resourceTypes";

import FilterButton from "./FilterButton";
import { useSearchParams } from "react-router";
import ResourceCard from "../ui/ResourceCard";

interface ListResourceProps {
  resources: IntResource[];
  category?: keyof typeof categories;
}

export const ListResources: FC<ListResourceProps> = ({
  resources,
  category,
}) => {
  const [showFilters, setShowFilters] = useState<boolean>(false);

  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";

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

  const { isBookmarked, toggleBookmark } = useResources();

  const visibleResources = sortedResources.filter((resource) =>
    resource.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    resources && (
      <div className="flex h-full">
        <div className="flex flex-1 flex-col lg:flex-row bg-white rounded-xl lg:px-4 lg:px-8 py-4 sm:py-6 mb-6 mx-6">
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
              <FilterButton
                setShowFilters={setShowFilters}
                showFilters={showFilters}
              />
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
                <ResourceCard
                  key={resource.id}
                  resource={resource}
                  isBookmarked={isBookmarked(resource)}
                  toggleBookmark={toggleBookmark}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  );
};
