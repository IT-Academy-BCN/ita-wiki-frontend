import { API_URL, END_POINTS } from "../config";
import { IntResource } from "../types";
import moock from "../moock/resources.json";

const moockResources = moock.resources.map(
  (resource) =>
    ({
      ...resource,
      created_at: "2025-02-25 00:00:00",
      updated_at: "2025-02-25 00:00:00",
    }) as IntResource,
);

const getResources = async (): Promise<IntResource[]> => {
  const controller = new AbortController();
  const signal = controller.signal;
  try {
    const url = `${API_URL}${END_POINTS.resources.lists}`;
    const response = await fetch(url, { signal });

    if (!response.ok) {
      console.warn(`Error ${response.status}: ${response.statusText}`);
      return moockResources;
    }

    const data = await response.json();
    return Array.isArray(data) && data.length ? data : moockResources;
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      console.warn("Petición cancelada.");
      return moockResources;
    }
    console.error("Error en getResources:", error);
    throw new Error("Error al obtener los recursos");
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
