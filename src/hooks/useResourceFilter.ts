import { useMemo } from "react";
import { useSearchParams, useParams } from "react-router";
import { IntResource } from "../types";

interface UseResourceFilterProps {
  resources: IntResource[];
  selectedResourceTypes?: string[];
  selectedTags?: string[];
}

export const useResourceFilter = ({
  resources,
  selectedResourceTypes = [],
  selectedTags = [],
}: UseResourceFilterProps) => {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  const filteredResources = useMemo(() => {
    if (!resources) return [];

    return resources.filter((resource) => {
      const normalize = (value: string) =>
        value.trim().toLowerCase().replace(/\s+/g, "-");

      const categoryMatch = !category || resource.category === category;
      const typeMatch =
        selectedResourceTypes.length === 0 ||
        selectedResourceTypes.some(
          (selectedType) => resource.type === selectedType,
        );
      const searchMatch =
        !searchQuery ||
        resource.title.toLowerCase().includes(searchQuery.toLowerCase());

      const tagMatch =
        selectedTags.length === 0 ||
        selectedTags.some((tag) =>
          resource.tags?.some((t) => {
            const tagName = typeof t === "string" ? t : t.name;
            return normalize(tagName) === normalize(tag);
          }),
        );

      return categoryMatch && typeMatch && searchMatch && tagMatch;
    });
  }, [resources, category, selectedResourceTypes, searchQuery, selectedTags]);

  return {
    filteredResources,
  };
};
