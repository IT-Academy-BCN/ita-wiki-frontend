import { API_URL, END_POINTS } from "../config";
import moock from "../moock/roles.json";

interface IntRole {
  github_id: number;
  role: string;
  isSuperAdmin: boolean;
  isAdmin: boolean;
  isStudent: boolean;
  isMentor: boolean;
}

interface RoleCreationRequest {
  authorized_github_id: number;
  github_id: number;
  role: string;
}

interface RoleCreationResponse {
  message: string;
  role: {
    github_id: number;
    role: string;
  };
}

const mockRoles: IntRole = moock.role as IntRole;

const getRole = async (github_id: number): Promise<IntRole> => {
  const controller = new AbortController();
  const signal = controller.signal;
  try {
    const url = `${API_URL}${END_POINTS.roles.lists}${github_id}`;

    const response = await fetch(url, { signal });

    if (!response.ok) {
      console.warn(
        `Error ${response.status}: ${response.statusText}, usaremos el mock`,
      );
      return mockRoles;
    }

    const data = await response.json();


    if (data && typeof data === "object" && data.role) {
      console.log(data.role);

      return data.role as IntRole;
    }

    if (data && typeof data === "object" && data.error) {
      console.warn(`API Error: ${data.error}`);
      return mockRoles;
    }

    return mockRoles;
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      console.warn("Petición cancelada.");
      return mockRoles;
    }
    console.error("Error en getRole:", error);
    throw new Error("Error al obtener los roles");
  }
};

const createRole = async (
  body: RoleCreationRequest,
): Promise<RoleCreationResponse> => {
  try {
    const response = await fetch(`${API_URL}${END_POINTS.roles.post}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || `Error ${response.status}: ${response.statusText}`,
      );
    }

    return (await response.json()) as RoleCreationResponse;
  } catch (error) {
    console.error("Error al crear rol:", error);
    throw error;
  }
};

export type { IntRole, RoleCreationRequest, RoleCreationResponse };
export { getRole, createRole };
