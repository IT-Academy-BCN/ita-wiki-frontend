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
      console.warn(
        "Error fetching tags: response not ok",
        response.status,
        response.statusText,
      );
      return [];
    }
    const json = await response.json();

    if (!json?.data || !Array.isArray(json.data)) {
      console.warn("Invalid tags response format:", json);
      return [];
    }

    return json.data;
  } catch (error) {
    console.error("Error fetching tags:", error);
    return [];
  }
};
