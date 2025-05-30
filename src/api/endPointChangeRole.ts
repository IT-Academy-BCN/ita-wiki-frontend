import { API_URL, END_POINTS } from "../config";
import { createRole } from "./endPointRoles";
import { getUserRole } from "./userApi";

interface RoleChangeRequest {
  github_id: number;
  role: string;
}

interface RoleChangeResponse {
  message: string;
  role: {
    github_id: number;
    role: string;
  };
}

const changeRole = async (
  body: RoleChangeRequest,
  githubId: number | null,
): Promise<RoleChangeResponse> => {
  const controller = new AbortController();
  const signal = controller.signal;
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    const url = `${API_URL}${END_POINTS.devTools.roleChange}`;

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      signal,
    });

    clearTimeout(timeout);

    // Check if user has no role (anonymous) and allow creation of student or mentor role
    if (githubId) {
      const userRole = await getUserRole(githubId);
      if (
        (userRole === null || userRole === "anonymous") &&
        ["student", "mentor"].includes(body.role)
      ) {
        const createRoleRequest = {
          github_id: githubId,
          role: body.role,
          authorized_github_id: 1,
        };
        const result = await createRole(createRoleRequest);
        return result;
      }
    }

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || `Error ${response.status}: ${response.statusText}`,
      );
    }

    const data = await response.json();

    // Succesful
    if (data && typeof data === "object") {
      if (
        data.message &&
        data.role &&
        typeof data === "object" &&
        "github_id" in data.role &&
        "role" in data.role
      ) {
        return data as RoleChangeResponse;
      }

      if (data.error) {
        throw new Error(`API Error: ${data.error}`);
      }
    }

    //  Unexpected
    throw new Error("Unexpected response from API.");
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      console.warn("Petition cancelled.");
    }
    console.error("changeRole error:", error);
    throw error;
  }
};

export type { RoleChangeRequest, RoleChangeResponse };
export { changeRole };
