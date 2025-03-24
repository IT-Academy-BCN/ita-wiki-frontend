import { IntResource, IntUser } from "../types";

const API_URL = import.meta.env.VITE_API_URL;

export const getUserRole = async (githubId: number): Promise<string> => {
  try {
    const response = await fetch(`${API_URL}login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ github_id: githubId }),
    });

    //TO-DO: poner AbortController()

    if (!response.ok) return "anonymous"; // provisional fix since the BE doesnt retourn 'anonymous'
    // (B.E currently return 'null' if user has no role in the DB)
    const data = await response.json();
    return data.role?.role;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(
        error.message ||
        "Error during fetching user role. Please, try again 👾",
      );
    }
    throw new Error("Something went wrong, sis. Please, try again 👾");
  }
};

export const getPersonalResources = (
  user: IntUser,
  resources: IntResource[],
): IntResource[] =>
  user
    ? resources.filter((resource) => resource.github_id === Number(user.id))
    : [];
