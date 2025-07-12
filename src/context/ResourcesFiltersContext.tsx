import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
  useEffect,
} from "react";
import { useSearchParams, useParams } from "react-router";
import { resourceTypes } from "../data/resourceTypes";

interface ResourcesFiltersContextType {
  // Filter states
  selectedResourceTypes: string[];
  selectedTags: string[];
  expandedCategories: Set<string>;
  showMobileFilters: boolean;

  // Filter actions
  setSelectedResourceTypes: (types: string[]) => void;
  setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
  setExpandedCategories: (categories: Set<string>) => void;
  setShowMobileFilters: (show: boolean) => void;

  // Utility functions
  toggleResourceType: (type: string) => void;
  toggleTag: (tag: string) => void;
  toggleCategory: (category: string) => void;
  clearAllFilters: () => void;
}

const ResourcesFiltersContext = createContext<
  ResourcesFiltersContextType | undefined
>(undefined);

interface ResourcesFiltersProviderProps {
  children: ReactNode;
}

export const ResourcesFiltersProvider: React.FC<
  ResourcesFiltersProviderProps
> = ({ children }) => {
  const { category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialResourceTypes = searchParams
    .get("resourceTypes")
    ?.split(",") || [resourceTypes[0]];
  const initialTags = searchParams.get("tags")?.split(",") || [];

  const [selectedResourceTypes, setSelectedResourceTypes] =
    useState<string[]>(initialResourceTypes);
  const [selectedTags, setSelectedTags] = useState<string[]>(initialTags);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(),
  );
  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);

  const toggleResourceType = useCallback((type: string) => {
    setSelectedResourceTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  }, []);

  const toggleTag = useCallback(
    (tag: string) => {
      setSelectedTags((prev) =>
        prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
      );
    },
    [setSelectedTags],
  );

  const toggleCategory = useCallback((category: string) => {
    setExpandedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
  }, []);

  // Sync with URL params
  useEffect(() => {
    if (category) {
      setSelectedResourceTypes([...resourceTypes]);
    }
  }, [category]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (
      selectedResourceTypes.length > 0 &&
      selectedResourceTypes.some((type) => type.trim() !== "")
    ) {
      params.set("resourceTypes", selectedResourceTypes.join(","));
    }
    const searchQuery = searchParams.get("search");
    if (!params.has("search") && searchQuery) {
      params.set("search", searchQuery);
    }
    if (selectedTags.length > 0) {
      params.set("tags", selectedTags.join(","));
    }

    setSearchParams(params, { replace: true });
  }, [selectedResourceTypes, selectedTags, setSearchParams, searchParams]);

  const clearAllFilters = useCallback(() => {
    setSelectedResourceTypes([]);
    setSelectedTags([]);
    setExpandedCategories(new Set());
  }, []);

  const value: ResourcesFiltersContextType = {
    selectedResourceTypes,
    selectedTags,
    expandedCategories,
    showMobileFilters,
    setSelectedResourceTypes,
    setSelectedTags,
    setExpandedCategories,
    setShowMobileFilters,
    toggleResourceType,
    toggleTag,
    toggleCategory,
    clearAllFilters,
  };

  return (
    <ResourcesFiltersContext.Provider value={value}>
      {children}
    </ResourcesFiltersContext.Provider>
  );
};

export const useResourcesFilters = () => {
  const context = useContext(ResourcesFiltersContext);
  if (context === undefined) {
    throw new Error(
      "useResourcesFilters must be used within a ResourcesFiltersProvider",
    );
  }
  return context;
};
