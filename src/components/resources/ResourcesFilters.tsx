import { FC, useCallback, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import classNames from "classnames";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useResourcesFilters } from "../../context/ResourcesFiltersContext";
import { resourceTypes } from "../../data/resourceTypes";
import { asideContent } from "../Layout/aside/asideContent";
import { FilterResources } from "./FilterResources";
import { useEffect } from "react";

interface ResourcesFiltersProps {
  isMobile?: boolean;
}

export const ResourcesFilters: FC<ResourcesFiltersProps> = ({
  isMobile = false,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  // Local state for hover - doesn't affect parent context
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const {
    selectedResourceTypes,
    selectedTags,
    expandedCategories,
    toggleResourceType,
    toggleCategory,
    setSelectedResourceTypes,
    setSelectedTags,
    setExpandedCategories,
  } = useResourcesFilters();

  // Extract category from URL
  const currentCategory = currentPath.split("/")[2]
    ? decodeURIComponent(currentPath.split("/")[2])
    : undefined;

  useEffect(() => {
    if (currentCategory) {
      // Obrim només la categoria activa
      setExpandedCategories(new Set([currentCategory]));
    }
  }, [currentCategory, setExpandedCategories]);

  const handleCategoryClick = useCallback(
    (categoryLabel: string) => {
      const path = `/resources/${encodeURIComponent(categoryLabel)}`;
      const isCurrentlyActive = currentCategory === categoryLabel;

      if (isCurrentlyActive) {
        toggleCategory(categoryLabel);
      } else {
        expandedCategories.forEach((cat) => {
          if (cat !== categoryLabel) toggleCategory(cat);
        });
        navigate(path, { replace: false });
      }
    },
    [currentCategory, navigate, toggleCategory, expandedCategories],
  );

  const isPathActive = useCallback(
    (path: string) => currentPath === path,
    [currentPath],
  );

  // Efficient hover handlers that don't cause re-render loops
  const handleMouseEnter = useCallback((categoryLabel: string) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setHoveredCategory(categoryLabel);
  }, []);

  const handleMouseLeave = useCallback(() => {
    // Small delay to prevent flicker when moving mouse between elements
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredCategory(null);
    }, 100);
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  const renderCategoryItem = useCallback(
    (
      item: {
        label: string;
        icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
      },
      index: number,
    ) => {
      const path = `/resources/${encodeURIComponent(item.label)}`;
      const isActivebyPath = isPathActive(path);
      const isClickExpanded = expandedCategories.has(item.label);
      const isHovered = hoveredCategory === item.label;
      const shouldShowDropdown = isClickExpanded || isHovered;
      const isActive = isActivebyPath || isClickExpanded;
      const IconComponent = item.icon;

      return (
        <div key={index} className="mb-2">
          <div
            className="overflow-hidden"
            onMouseEnter={() => handleMouseEnter(item.label)}
            onMouseLeave={handleMouseLeave}
          >
            <div
              className={`flex items-center justify-between p-1 cursor-pointer transition-colors select-none ${
                isActive || isHovered
                  ? "text-[var(--color-primary)]"
                  : "text-gray-500"
              }`}
              onClick={() => handleCategoryClick(item.label)}
            >
              <div className="flex items-center gap-2">
                {(isActive || isHovered) && (
                  <IconComponent className="text-[var(--color-primary)] transition-opacity duration-200" />
                )}
                <span
                  className={classNames("transition-colors font-medium", {
                    "text-[var(--color-primary)]": isActive || isHovered,
                    "text-[#282828]": !isActive && !isHovered,
                  })}
                >
                  {item.label}
                </span>
              </div>

              <div className="p-1 hover:bg-black/10 rounded transition-colors">
                {shouldShowDropdown ? (
                  <ChevronUp
                    className={`w-4 h-4 transition-colors ${
                      isActive || isHovered
                        ? "text-[var(--color-primary)]"
                        : "text-[#282828]"
                    }`}
                  />
                ) : (
                  <ChevronDown
                    className={`w-4 h-4 transition-colors ${
                      isActive || isHovered
                        ? "text-[var(--color-primary)]"
                        : "text-[#282828]"
                    }`}
                  />
                )}
              </div>
            </div>

            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                shouldShowDropdown
                  ? "max-h-[500px] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              {shouldShowDropdown && (
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
        </div>
      );
    },
    [
      isPathActive,
      expandedCategories,
      hoveredCategory,
      handleCategoryClick,
      handleMouseEnter,
      handleMouseLeave,
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
      <h2 className="text-[26px] text-[#282828] font-bold mb-8">Filtros</h2>

      {/* Languages */}
      <div className="mb-6">
        <h3 className="text-[16px] text-[#282828] font-bold mb-6">
          Llenguatge
        </h3>
        <div className="space-y-2">
          {asideContent.map((item, index) => renderCategoryItem(item, index))}
        </div>
      </div>

      {/* Resource Types */}
      <div className="mb-6">
        <h3 className="text-[16px] text-[#282828] font-bold mb-3">Tipo</h3>
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
                      : "border-[1px] border-gray-400"
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
                <span className="text-[14px] text-[#282828]">{type}</span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
};
