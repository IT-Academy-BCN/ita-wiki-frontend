const API_URL = import.meta.env.VITE_API_URL;

export const getUserRole = async (githubId: string): Promise<string> => {
    try {
        const response = await fetch(`${API_URL}/users/user-signedin-as?github_id=${githubId}`);

        if (!response.ok) throw new Error("Error fetching user role");
        const data = await response.json();
        return data.role?.role || "anonymous";
    } catch {
        return "anonymous";
    }
};
