import { API_URL, END_POINTS } from "../config";

export type CodeConnectError = {
  message: string;
  status?: number;
  code?: string;
};

export const createCodeConnect = async (formData: FormData) => {
  const controller = new AbortController();
  const signal = controller.signal;
  const url = `${API_URL}${END_POINTS.codeconnect.post}`;

  const cancel = () => {
    controller.abort();
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData,
      signal,
    });

    if (!response.ok) {
      let errorMessage = `Error ${response.status}: ${response.statusText}`;
      let errorCode;

      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
        errorCode = errorData.code;
      } catch {
        // Ignore the parsing error and use the default values that have already been set.
      }

      throw {
        message: errorMessage,
        status: response.status,
        code: errorCode,
      } as CodeConnectError;
    }

    const data = await response.json();

    return { data, cancel };
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      console.warn("Petición cancelada por el usuario o timeout.");
      throw {
        message: "Petición cancelada",
        code: "ABORTED",
      } as CodeConnectError;
    }

    if (error instanceof TypeError) {
      console.error("Error de red al crear Code Connect:", error);
      throw {
        message: "Error de conexión. Verifica tu conexión a internet.",
        code: "NETWORK_ERROR",
      } as CodeConnectError;
    }

    console.error("Error al crear Code Connect:", error);
    throw error;
  }
};
