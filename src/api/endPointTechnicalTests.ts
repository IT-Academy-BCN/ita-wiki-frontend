import { API_URL, END_POINTS } from "../config";

export const createTechnicalTest = async (formData: FormData) => {
  const url = `${API_URL}${END_POINTS.technicaltests.create}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || `Error ${response.status}: ${response.statusText}`,
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

export const fetchTechnicalTests = async () => {
  const url = `${API_URL}${END_POINTS.technicaltests.get}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch technical tests");
    }
    const data = await response.json();
    return data.data;
  } catch (error: unknown) {
    console.error(error);
  }
};

export const fetchTechnicalTestById = async (testId: number) => {
  const url = `${API_URL}${END_POINTS.technicaltests.get}/${testId}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch technical tests");
    }
    const data = await response.json();
    return data.data;
  } catch (error: unknown) {
    console.error(error);
  }
};
