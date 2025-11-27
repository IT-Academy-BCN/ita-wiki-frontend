import { API_URL, END_POINTS } from "../config";
import { TagsByCategory } from "../types";

export const fetchTagsByCategory = async (): Promise<TagsByCategory> => {
  const url = `${API_URL}${END_POINTS.tags.categoryFrequency}`;
  try {
    const response = await fetch(url);

    if (!response.ok) {
      console.warn(
        "Error fetching tags by category: response not ok",
        response.status,
        response.statusText,
      );
      return {};
    }

    const json = await response.json();

    if (
      !json ||
      typeof json !== "object" ||
      !json.data ||
      typeof json.data !== "object"
    ) {
      console.warn("Invalid tags-by-category response format:", json);
      return {};
    }

    return json.data as TagsByCategory;
  } catch (error) {
    console.error("Error fetching tags by category:", error);
    return {};
  }
};
