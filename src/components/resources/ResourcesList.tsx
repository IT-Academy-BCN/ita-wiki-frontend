import { FC, useMemo } from "react";
import { useSearchParams } from "react-router";
import { IntResource } from "../../types";
import { useResourceFilter } from "../../hooks/useResourceFilter";
import { useResourceSort } from "../../hooks/useResourceSort";
import { useResources } from "../../context/ResourcesContext";
import { useResourcesFilters } from "../../context/ResourcesFiltersContext";
import ResourceCard from "../ui/ResourceCard";
import SortButton from "./SortButton";

interface ResourcesListProps {
  resources: IntResource[];
  category?: string;
}

export const ResourcesList: FC<ResourcesListProps> = ({
  resources,
  category,
}) => {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";

  const { selectedResourceTypes, selectedTags } = useResourcesFilters();
  const { isBookmarked, toggleBookmark } = useResources();

  // Filter resources by category
  const categoryFilteredResources = useMemo(() => {
    if (!resources?.length) return [];

    return category
      ? resources.filter((resource) => resource.category === category)
      : resources;
  }, [resources, category]);

  // Apply filters
  const { filteredResources } = useResourceFilter({
    resources: categoryFilteredResources,
    selectedResourceTypes,
    selectedTags,
  });

  // Apply sorting
  const { sortedResources, setSortOption, sortOption } = useResourceSort({
    resources: filteredResources,
  });

  // Apply search filter
  const visibleResources = useMemo(() => {
    if (!searchTerm) return sortedResources;

    const lowerSearchTerm = searchTerm.toLowerCase();
    return sortedResources.filter((resource) =>
      resource.title.toLowerCase().includes(lowerSearchTerm),
    );
  }, [sortedResources, searchTerm]);

  // Early return if no resources
  if (!resources?.length) {
    return (
      <div className="text-center py-8 text-gray-500">
        No hay recursos disponibles.
      </div>
    );
  }

  return (
    <div className="lg:flex-1">
      <div className="flex justify-between items-center">
        {/* El encabezado se eliminó de aquí */}
        <SortButton setSortOption={setSortOption} sortOption={sortOption} />
      </div>

      {/* Resources List */}
      {visibleResources.length === 0 ? (
        <div className="flex flex-col gap-2 py-8">
          <div className="text-center py-8 text-gray-500">
            {categoryFilteredResources.length === 0
              ? "No hay recursos disponibles para esta categoría."
              : "No se encontraron recursos que coincidan con tu búsqueda."}
          </div>
        </div>
      ) : (
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
      )}
    </div>
  );
};
