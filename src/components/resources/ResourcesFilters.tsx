import { FC, useCallback } from "react";
import { useLocation, useNavigate } from "react-router";
import classNames from "classnames";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useResourcesFilters } from "../../context/ResourcesFiltersContext";
import { resourceTypes } from "../../data/resourceTypes";
import { asideContent } from "../Layout/aside/asideContent";
import { FilterResources } from "./FilterResources";

interface ResourcesFiltersProps {
  isMobile?: boolean;
}

export const ResourcesFilters: FC<ResourcesFiltersProps> = ({
  isMobile = false,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const {
    selectedResourceTypes,
    selectedTags,
    expandedCategories,
    toggleResourceType,
    toggleCategory,
    setSelectedResourceTypes,
    setSelectedTags,
  } = useResourcesFilters();

  // Extract category from URL
  const currentCategory = currentPath.split("/")[2]
    ? decodeURIComponent(currentPath.split("/")[2])
    : undefined;

  // Sync dropdown with current category
  const handleCategoryClick = useCallback(
    (categoryLabel: string) => {
      const path = `/resources/${encodeURIComponent(categoryLabel)}`;
      const isCurrentlyActive = currentCategory === categoryLabel;
      if (isCurrentlyActive) {
        toggleCategory(categoryLabel);
      } else {
        navigate(path, { replace: false });
      }
    },
    [currentCategory, navigate, toggleCategory],
  );

  const isPathActive = useCallback(
    (path: string) => currentPath === path,
    [currentPath],
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

  return (
    <div
      className={
        isMobile
          ? "sm:hidden mt-4 p-4 bg-gray-100 rounded-lg"
          : "hidden sm:block"
      }
    >
      <h2 className="text-[26px] font-bold mb-2">Filtros</h2>

      {/* Categories */}
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-3">Categorías</h3>
        <div className="space-y-2">
          {asideContent.map((item, index) => renderCategoryItem(item, index))}
        </div>
      </div>

      {/* Resource Types */}
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
                  onChange={() => toggleResourceType(type)}
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
  );
};
