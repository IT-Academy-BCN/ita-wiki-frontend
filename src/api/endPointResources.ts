import { API_URL, END_POINTS } from "../config";
import { IntResource } from "../types";
import moock from "../moock/resources.json";

const moockResources = moock.resources.map(resource => ({
  ...resource,
  create_at: "2025-02-25 00:00:00",
  update_at: "2025-02-25 00:00:00"
} as IntResource));

const getResources = async (): Promise<IntResource[]> => {
  const controller = new AbortController();
  const signal = controller.signal;

  try {
    const url = `${API_URL}${END_POINTS.resources.lists}`;
    const response = await fetch(url, { signal });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    return Array.isArray(data) && data.length ? data : moockResources;

  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      console.warn("Petición cancelada.");
      return moockResources;
    }
    console.error("Error en getResources:", error);
    return moockResources;
  }
};

export { getResources };
