import { API_URL, END_POINTS } from "../config";
import { TagsIdsByCategory } from "../types";

export const fetchTagsIdsByCategory = async (): Promise<TagsIdsByCategory> => {
  const url = `${API_URL}${END_POINTS.tags.byCategory}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch tags by category");
  }

  const json = await response.json();
  const data = json?.data;

  return (data ?? {}) as TagsIdsByCategory;
};
