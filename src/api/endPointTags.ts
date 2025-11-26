import { API_URL, END_POINTS } from "../config";
import { Tag } from "../types";

export const getTags = async (): Promise<Tag[]> => {
  const controller = new AbortController();
  const signal = controller.signal;
  const url = `${API_URL}${END_POINTS.tags.get}`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      signal,
    });
    if (!response.ok) {
      return [];
    }
    const json = await response.json();
    const tags = Array.isArray(json?.data) ? json.data : [];

    return tags;
  } catch (error) {
    console.error("Error fetching tags:", error);
    return [];
  }
};
