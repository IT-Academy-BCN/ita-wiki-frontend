import { useState, useMemo, useEffect } from "react";
import { useGetResources } from "./useGetResources";
import {
  EnuResourcesCategories,
  EnuResourceThemes,
  EnuResourceTypes,
} from "../../enums";
import { PropsContextResources } from "../../context/types";

export const useResourceFilter = () => {
  const { apiResources } = useGetResources();
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [category, setResourceCategory] = useState<EnuResourcesCategories>(
    EnuResourcesCategories.All,
  );
  const [selectedType, setSelectedType] = useState<EnuResourceTypes | null>(
    null,
  );
  const [selectedTheme, setSelectedTheme] = useState<EnuResourceThemes>(
    EnuResourceThemes.All,
  );
  const [selectedTypes, setSelectedTypes] = useState<EnuResourceTypes[]>([]);

  const [filters, setFilters] = useState({
    category: [category],
    theme: EnuResourceThemes.All,
    type: EnuResourceTypes.Blog,
  });

  const selectTheme = (theme: EnuResourceThemes) => {
    setFilters((prev) => ({
      ...prev,
      theme: theme,
    }));
    setSelectedTheme(theme);
  };
  const selectType = (type: EnuResourceTypes) => {
    setFilters((prev) => ({
      ...prev,
      type: type,
    }));
    setSelectedType(type);
  };
  const selectCategory = (category: EnuResourcesCategories) => {
    setFilters((prev) => ({
      ...prev,
      category: [category],
    }));
    setResourceCategory(category);
  };

  const selectNone = () => {
    setFilters({
      category: [EnuResourcesCategories.All],
      theme: EnuResourceThemes.All,
      type: EnuResourceTypes.Blog,
    });
    setSelectedTheme(EnuResourceThemes.All);
    setSelectedType(EnuResourceTypes.Blog);
    setResourceCategory(EnuResourcesCategories.All);
  };

  const toggleFilter = () => {
    setShowFilters((prev) => !prev);
  };
  const closeFilter = () => {
    setShowFilters(() => false);
  };
  const resetTheme = () => {
    setSelectedTheme(() => EnuResourceThemes.All);
  };

  const toggleResourceType = (resourceType: EnuResourceTypes) => {
    const allResourceTypes = Object.values(EnuResourceTypes);
    if (selectedTypes.length === 1 && selectedTypes.includes(resourceType)) {
      setSelectedTypes(allResourceTypes);
    } else {
      setSelectedTypes(
        selectedTypes.includes(resourceType)
          ? selectedTypes.filter(
            (rType: EnuResourceTypes) => rType !== resourceType,
          )
          : [...selectedTypes, resourceType],
      );
    }
  };

  const updateFilterURL = () => {
    const params = new URLSearchParams();

    if (filters.category && filters.category.length > 0) {
      params.set("category", filters.category.join(","));
    }

    if (filters.theme && filters.theme !== EnuResourceThemes.All) {
      params.set("theme", filters.theme);
    }
    const queryString = params.toString();
    const newUrl =
      window.location.pathname + (queryString ? "?" + queryString : "");
    window.history.replaceState({}, "", newUrl);
  };

  useEffect(() => {
    updateFilterURL();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, selectedTypes]);

  const filteredResources = useMemo(() => {
    if (
      filters.category.includes(EnuResourcesCategories.All) &&
      filters.theme === EnuResourceThemes.All &&
      filters.type === null
    ) {
      return apiResources;
    }
    const clone = structuredClone(apiResources);

    const categoryFilter = clone.filter((resource) => {
      if (filters.category.includes(EnuResourcesCategories.All)) {
        return true;
      }
      return filters.category.includes(
        resource.category as EnuResourcesCategories,
      );
    });
    const themeFilter = categoryFilter.filter((resource) => {
      if (filters.theme === EnuResourceThemes.All) {
        return true;
      }
      return resource.theme === filters.theme;
    });
    const typeFilter = themeFilter.filter((resource) => {
      if (filters.type === null) {
        return true;
      }
      return resource.type === filters.type;
    });
    //
    const resourceTypeFilter = typeFilter.filter((resource) => {
      if (selectedTypes.length === 0) {
        return true;
      }
      return selectedTypes.includes(resource.type as EnuResourceTypes);
    });
    return resourceTypeFilter;
  }, [
    apiResources,
    filters.category,
    filters.theme,
    filters.type,
    selectedTypes,
  ]);

  return {
    showFilters,
    filters,
    filteredResources,
    selectedTheme,
    selectedType,
    selectTheme,
    selectType,
    selectCategory,
    selectNone,
    toggleFilter,
    closeFilter,
    resetTheme,
    updateFilterURL,
    toggleResourceType,
  } as PropsContextResources;
};
