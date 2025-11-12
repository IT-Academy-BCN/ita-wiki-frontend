import { API_URL, END_POINTS } from "../config";
import { IntResource } from "../types";

/**
 * Fetch resources. If timeoutMs > 0 the request will be aborted after that many ms.
 * Default 0 => no automatic timeout (caller must pass timeout to enable abort).
 */
const getResources = async (timeoutMs = 0): Promise<IntResource[]> => {
  const controller = new AbortController();
  const signal = controller.signal;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  if (timeoutMs > 0) {
    timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  }

  try {
    const url = `${API_URL}${END_POINTS.resources.lists}`;
    const response = await fetch(url, { signal });

    if (!response.ok) {
      console.warn(`Error ${response.status}: ${response.statusText}`);
      return [];
    }

    const data = await response.json();

    if (Array.isArray(data) && data.length) return data as IntResource[];
    if (data && Array.isArray(data.resources) && data.resources.length) {
      return data.resources as IntResource[];
    }

    return [];
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      console.warn("Petición cancelada.");
      return [];
    }
    console.error("Error en getResources:", error);
    throw new Error("Error al obtener los recursos");
  } finally {
    if (timeoutId) clearTimeout(timeoutId);
  }
};

const createResource = async (resource: Partial<IntResource>) => {
  try {
    const response = await fetch(`${API_URL}${END_POINTS.resources.post}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(resource),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || `Error ${response.status}: ${response.statusText}`,
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error al crear recurso:", error);
    throw error;
  }
};

export { getResources, createResource };
