import { FC, useState, useMemo, useEffect, useCallback } from "react";
import { useLocation, useSearchParams, useNavigate } from "react-router";
import classNames from "classnames";
import { ChevronDown, ChevronUp } from "lucide-react";
import { IntResource } from "../../types";
import { useResourceFilter } from "../../hooks/useResourceFilter";
import { useResourceSort } from "../../hooks/useResourceSort";
import { useResources } from "../../context/ResourcesContext";

import { FilterResources } from "./FilterResources";
import SortButton from "./SortButton";

import { categories } from "../../data/categories";
import { resourceTypes } from "../../data/resourceTypes";
import { asideContent } from "../Layout/aside/asideContent";

import FilterButton from "./FilterButton";
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
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(),
  );

  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const currentPath = location.pathname;
  const searchTerm = searchParams.get("search") || "";

  // Extract category from URL with memoization
  const currentCategory = useMemo(() => {
    const pathSegments = currentPath.split("/");
    if (pathSegments[1] === "resources" && pathSegments[2]) {
      return decodeURIComponent(pathSegments[2]);
    }
    return category ? String(category) : undefined;
  }, [currentPath, category]);

  // Sync dropdown with current category
  useEffect(() => {
    if (currentCategory) {
      setExpandedCategories(new Set([currentCategory]));
    }
  }, [currentCategory]);

  // Memoized category filtering
  const categoryFilteredResources = useMemo(() => {
    if (!resources?.length) return [];

    return currentCategory
      ? resources.filter((resource) => resource.category === currentCategory)
      : resources;
  }, [resources, currentCategory]);

  const {
    filteredResources,
    selectedResourceTypes,
    setSelectedResourceTypes,
    selectedTags,
    setSelectedTags,
  } = useResourceFilter({
    resources: categoryFilteredResources,
    resourceTypes,
  });

  const { sortedResources, setSortOption, sortOption } = useResourceSort({
    resources: filteredResources,
  });

  const { isBookmarked, toggleBookmark } = useResources();

  // Memoized search filtering
  const visibleResources = useMemo(() => {
    if (!searchTerm) return sortedResources;

    const lowerSearchTerm = searchTerm.toLowerCase();
    return sortedResources.filter((resource) =>
      resource.title.toLowerCase().includes(lowerSearchTerm),
    );
  }, [sortedResources, searchTerm]);

  // Optimized path checking
  const isPathActive = useCallback(
    (path: string) => currentPath === path,
    [currentPath],
  );

  const handleCategoryClick = useCallback(
    (categoryLabel: string) => {
      const path = `/resources/${encodeURIComponent(categoryLabel)}`;
      const isCurrentlyActive = currentCategory === categoryLabel;
      const isCurrentlyExpanded = expandedCategories.has(categoryLabel);

      if (isCurrentlyActive) {
        setExpandedCategories(
          isCurrentlyExpanded ? new Set() : new Set([categoryLabel]),
        );
      } else {
        navigate(path, { replace: false });
      }
    },
    [currentCategory, expandedCategories, navigate],
  );

  const renderCategoryItem = useCallback(
    (
      item: {
        label: string;
        icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
      },
      index: number,
    ) => {
      const path = `/resources/${encodeURIComponent(item.label)}`;
      const isActive = isPathActive(path);
      const isExpanded = expandedCategories.has(item.label);
      const IconComponent = item.icon;

      return (
        <div key={index} className="mb-2">
          <div className="overflow-hidden">
            {/* Header de la categoría - TODO clickeable */}
            <div
              className={classNames(
                "flex items-center justify-between p-1 cursor-pointer transition-colors select-none",
                {
                  "text-[var(--color-primary)]": isActive,
                  "": !isActive,
                },
              )}
              onClick={() => handleCategoryClick(item.label)}
            >
              {/* Contenido de la categoría */}
              <div className="flex items-center space-x-3 flex-1">
                <IconComponent
                  className={classNames("w-5 h-5", {
                    "text-[var(--color-primary)]": isActive,
                    "text-gray-500": !isActive,
                  })}
                />
                <span
                  className={classNames("transition-colors font-medium", {
                    "text-[var(--color-primary)]": isActive,
                    "text-gray-700": !isActive,
                  })}
                >
                  {item.label}
                </span>
              </div>

              {/* Chevron */}
              <div className="p-1 hover:bg-black/10 rounded">
                {isExpanded ? (
                  <ChevronUp
                    className={classNames("w-4 h-4", {
                      "text-[var(--color-primary)]": isActive,
                      "text-gray-400": !isActive,
                    })}
                  />
                ) : (
                  <ChevronDown
                    className={classNames("w-4 h-4", {
                      "text-[var(--color-primary)]": isActive,
                      "text-gray-400": !isActive,
                    })}
                  />
                )}
              </div>
            </div>

            {/* Contenido expandible con filtros */}
            {isExpanded && (
              <div className="px-3 pb-3">
                <div className="pt-1">
                  <FilterResources
                    resourceTypes={resourceTypes}
                    selectedResourceTypes={selectedResourceTypes}
                    setSelectedResourceTypes={setSelectedResourceTypes}
                    selectedTags={selectedTags}
                    setSelectedTags={setSelectedTags}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      );
    },
    [
      isPathActive,
      expandedCategories,
      handleCategoryClick,
      selectedResourceTypes,
      setSelectedResourceTypes,
      selectedTags,
      setSelectedTags,
    ],
  );

  // Early return if no resources
  if (!resources?.length) {
    return (
      <Container>
        <div className="text-center py-8 text-gray-500">
          No hay recursos disponibles.
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="flex flex-col gap-6 py-3 lg:gap-12 xl:gap-20 lg:flex-row">
        {/* Sidebar Filters (Desktop) */}
        <div className="hidden sm:block">
          <h2 className="text-[26px] font-bold mb-2">Filtros</h2>

          {/* Categories */}
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-3">Categorías</h3>
            <div className="space-y-2">
              {asideContent.map((item, index) =>
                renderCategoryItem(item, index),
              )}
            </div>
          </div>

          {/* Resource Types - EXACTAMENTE COMO EL ORIGINAL */}
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-3">Tipos de recursos</h3>
            <div className="space-y-2">
              {resourceTypes.map((type) => {
                const isSelected = selectedResourceTypes.includes(type);

                return (
                  <label
                    key={type}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => {
                        if (isSelected) {
                          setSelectedResourceTypes(
                            selectedResourceTypes.filter((t) => t !== type),
                          );
                        } else {
                          setSelectedResourceTypes([
                            ...selectedResourceTypes,
                            type,
                          ]);
                        }
                      }}
                      className="hidden"
                    />
                    <div
                      className={`w-5 h-5 flex items-center justify-center rounded ${
                        isSelected
                          ? "bg-[#B91879] border-[#B91879]"
                          : "border-gray-400"
                      }`}
                    >
                      {isSelected && (
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-sm text-gray-800">{type}</span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:flex-1">
          <div className="flex justify-between items-center">
            <h2 className="text-[26px] font-bold">
              Recursos {currentCategory || ""}
            </h2>

            {/* SORTBUTTON EXACTAMENTE IGUAL AL ORIGINAL */}
            <SortButton setSortOption={setSortOption} sortOption={sortOption} />

            {/* Mobile Filter Button */}
            <FilterButton
              setShowFilters={setShowFilters}
              showFilters={showFilters}
            />
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <div className="sm:hidden mt-4 p-4 bg-gray-100 rounded-lg">
              <h2 className="text-2xl font-bold">Filtros</h2>

              <div className="mb-6">
                <h3 className="text-lg font-bold mb-3">Categorías</h3>
                <div className="space-y-2">
                  {asideContent.map((item, index) =>
                    renderCategoryItem(item, index),
                  )}
                </div>
              </div>
            </div>
          )}

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
      </div>
    </Container>
  );
};
