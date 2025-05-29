import { FC, useState } from "react";
import { IntResource } from "../../types";
import { useResourceFilter } from "../../hooks/useResourceFilter";
import { useResourceSort } from "../../hooks/useResourceSort";
import { useResources } from "../../context/ResourcesContext";

import { FilterResources } from "./FilterResources";
import SortButton from "./SortButton";

import { categories } from "../../data/categories";
import { resourceTypes } from "../../data/resourceTypes";

import FilterButton from "./FilterButton";
import { useSearchParams } from "react-router";
import ResourceCard from "../ui/ResourceCard";
import Container from "../ui/Container";

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
    selectedResourceTypes,
    setSelectedResourceTypes,
    selectedTags,
    setSelectedTags,
  } = useResourceFilter({
    resources: resources || [],
    resourceTypes,
  });

  const { sortedResources, setSortOption, sortOption } = useResourceSort({
    resources: filteredResources,
  });

  const { isBookmarked, toggleBookmark } = useResources();

  const visibleResources = sortedResources.filter((resource) =>
    resource.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    resources && (
      <Container>
        <div className="flex flex-col gap-6 py-3 lg:gap-12 xl:gap-20 lg:flex-row">
          {/* Sidebar Filters (Visible on larger screens, on the left) */}
          <div className="hidden sm:block">
            <h2 className="text-[26px] font-bold">Filtros</h2>
            <FilterResources
              resourceTypes={[...resourceTypes]}
              selectedResourceTypes={selectedResourceTypes}
              setSelectedResourceTypes={setSelectedResourceTypes}
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
            />
          </div>

          <div className="lg:flex-1">
            <div className="flex justify-between items-center">
              <h2 className="text-[26px] font-bold">
                Recursos {String(category) || ""}
              </h2>

              <SortButton
                setSortOption={setSortOption}
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
                  resourceTypes={resourceTypes}
                  selectedResourceTypes={selectedResourceTypes}
                  setSelectedResourceTypes={setSelectedResourceTypes}
                  selectedTags={selectedTags}
                  setSelectedTags={setSelectedTags}
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
      </Container>
    )
  );
};
