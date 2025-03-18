import { IntResource, IntUser } from "../types";

const API_URL = import.meta.env.VITE_API_URL;

export const getUserRole = async (githubId: number): Promise<string> => {
  try {
    const response = await fetch(
      `${API_URL}users/user-signedin-as?github_id=${githubId}`,
    );

    //TO-DO: poner AbortController()

    if (!response.ok) throw new Error("Error fetching user role");
    const data = await response.json();
    return data.role?.role || "anonymous";
  } catch {
    return "anonymous";
  }
};

export const getPersonalResources = (user: IntUser, resources: IntResource[]): IntResource[] => user
  ? resources.filter((resource) => resource.github_id === Number(user.id))
  : [];