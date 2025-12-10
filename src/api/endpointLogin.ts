import { API_URL, END_POINTS } from "../config.ts";

type LoginResponse = {
  success: boolean;
  redirect_url: string;
  message: string;
};

const AUTH = END_POINTS.auth;

export const login = async () => {
  const url = `${API_URL}${AUTH.login}`;

  try {
    const response: Response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) throw new Error(`Error ${response.status}`);

    const data: LoginResponse = await response.json();

    return data.redirect_url;
  } catch (e) {
    throw e;
  }
};
