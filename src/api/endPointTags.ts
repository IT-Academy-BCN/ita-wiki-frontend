import { API_URL, END_POINTS } from "../config";
import { Tag } from "../types";

type TagsApiResponse = Tag[] | { data: Tag[] } | { tags: Tag[] };

export const getTags = async (): Promise<Tag[]> => {
  const url = `${API_URL}${END_POINTS.tags.get}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      console.warn(
        "Error fetching tags: response not ok",
        response.status,
        response.statusText,
      );
      return [];
    }

    const data: TagsApiResponse = await response.json();

    let tags: Tag[] | undefined;

    if (Array.isArray(data)) {
      tags = data;
    } else if ("data" in data && Array.isArray(data.data)) {
      tags = data.data;
    } else if ("tags" in data && Array.isArray(data.tags)) {
      tags = data.tags;
    }

    if (!tags) {
      console.warn("Unexpected tags response format:", data);
      return [];
    }

    return tags;
  } catch (error) {
    console.error("Error fetching tags:", error);
    return [];
  }
};
