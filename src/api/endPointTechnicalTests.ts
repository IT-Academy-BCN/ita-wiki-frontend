import { API_URL, END_POINTS } from "../config";

export const createTechnicalTest = async (formData: FormData) => {
  const controller = new AbortController();
  const signal = controller.signal;
  const url = `${API_URL}${END_POINTS.technicaltests.create}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData,
      signal,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || `Error ${response.status}: ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      console.warn("Petición cancelada.");
    } else {
      console.error("Error al crear prueba técnica:", error);
    }
    throw error;
  }
};
