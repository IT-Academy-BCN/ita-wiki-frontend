import { API_URL, END_POINTS } from "../config";
import { Tag } from "../types";

// posibles formas de la respuesta de la API
type TagsApiResponse = Tag[] | { data: Tag[] } | { tags: Tag[] };

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
      // 👇 Los tests esperan un console.warn aquí
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
      // API devuelve un array plano: [ {id, name, ...}, ... ]
      tags = data;
    } else if ("data" in data && Array.isArray(data.data)) {
      // API devuelve { data: [ ... ] }
      tags = data.data;
    } else if ("tags" in data && Array.isArray(data.tags)) {
      // API devuelve { tags: [ ... ] }
      tags = data.tags;
    }

    if (!tags) {
      // 👇 Y otro console.warn cuando el formato no es válido
      console.warn("Unexpected tags response format:", data);
      return [];
    }

    return tags;
  } catch (error) {
    // Aquí los tests sí esperan un console.error
    console.error("Error fetching tags:", error);
    return [];
  }
};
