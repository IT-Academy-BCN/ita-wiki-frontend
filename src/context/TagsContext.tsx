import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getTags } from "../api/endPointTags";
import { fetchTagsIdsByCategory } from "../api/endPointTagsIdsByCategory";
import { Tag } from "../types";

interface TagsContextType {
  tags: Tag[];
  tagsByCategory: Record<string, number[]>;
  getTagsByCategory: (category: string | null) => Tag[];
  getTagNameById: (id: number) => string | undefined;
  refreshTags: () => Promise<void>;
}

export const TagsContext = createContext<TagsContextType>({
  tags: [],
  tagsByCategory: {},
  getTagsByCategory: () => [],
  refreshTags: async () => {},
  getTagNameById: () => undefined,
});

export const useTags = () => useContext(TagsContext);

export const TagsProvider = ({ children }: { children: React.ReactNode }) => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [tagsByCategory, setTagsByCategory] = useState<
    Record<string, number[]>
  >({});

  const refreshTags = async () => {
    try {
      const [allTags, tagsByCat] = await Promise.all([
        getTags(),
        fetchTagsIdsByCategory(),
      ]);

      // He movido la lógica de ordenamiento de Lini al contexto
      // para que los tags se ordenen globalmente
      const sortedTags = allTags.sort((a, b) =>
        a.name.localeCompare(b.name, "es", { sensitivity: "base" }),
      );
      setTags(sortedTags);
      setTagsByCategory(tagsByCat);
    } catch (err) {
      console.error("Error fetching tags:", err);
    }
  };

  useEffect(() => {
    refreshTags();
  }, []);

  const tagMap = useMemo(() => {
    const map = new Map<number, string>();
    tags.forEach((tag) => map.set(tag.id, tag.name));
    return map;
  }, [tags]);

  const getTagNameById = (id: number): string | undefined => {
    return tagMap.get(id);
  };

  const getTagsByCategory = (category: string | null): Tag[] => {
    if (!category || !tagsByCategory[category]) return [];
    return tags.filter((tag) => tagsByCategory[category].includes(tag.id));
  };

  return (
    <TagsContext.Provider
      value={{
        tags,
        tagsByCategory,
        getTagsByCategory,
        refreshTags,
        getTagNameById,
      }}
    >
      {children}
    </TagsContext.Provider>
  );
};
