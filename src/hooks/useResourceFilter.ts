import { useState, useEffect, useMemo } from "react";
import { useSearchParams, useParams } from "react-router";
import { IntResource } from "../types";

interface UseResourceFilterProps {
  resources: IntResource[];
  themes: readonly string[];
  resourceTypes: readonly string[];
}

export const useResourceFilter = ({
  resources,
  themes,
  resourceTypes,
}: UseResourceFilterProps) => {
  const { category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const initialTheme = searchParams.get("theme") || themes[0];
  const initialResourceTypes = searchParams
    .get("resourceTypes")
    ?.split(",") || [resourceTypes[0]];

  const [selectedTheme, setSelectedTheme] = useState<string>(initialTheme);
  const [selectedResourceTypes, setSelectedResourceTypes] =
    useState<string[]>(initialResourceTypes);

  const toggleFilter = () => {
    setShowFilters((prev) => !prev);
  }
  const closeFilter = () => {
    setShowFilters(() => false);
  }

  useEffect(() => {
    if (category) {
      setSelectedResourceTypes([...resourceTypes]);
    }
  }, [category, resourceTypes]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedTheme) {
      params.set("theme", selectedTheme);
    }
    if (
      selectedResourceTypes.length > 0 &&
      selectedResourceTypes.some((type) => type.trim() !== "")
    ) {
      params.set("resourceTypes", selectedResourceTypes.join(","));
    }
    const queryString = params.toString();
    setSearchParams(queryString ? params : undefined);
  }, [selectedTheme, selectedResourceTypes, setSearchParams]);

  const resetTheme = () => {
    setSelectedTheme(() => themes[0]);
  };
  const filteredResources = useMemo(() => {
    if (!resources || !category) return [];

    return resources.filter((resource) => {
      const categoryMatch = !category || resource.category === category;
      const themeMatch =
        selectedTheme === "Todos" || resource.theme === selectedTheme;
      const typeMatch =
        selectedResourceTypes.length === 0 ||
        selectedResourceTypes.some(
          (selectedType) => resource.type === selectedType,
        );

      return categoryMatch && themeMatch && typeMatch;
    });
  }, [resources, category, selectedTheme, selectedResourceTypes]);

  return {
    filteredResources,
    selectedTheme,
    setSelectedTheme,
    selectedResourceTypes,
    setSelectedResourceTypes,
    resetTheme,
    showFilters,
    toggleFilter,
    closeFilter
  };
};
