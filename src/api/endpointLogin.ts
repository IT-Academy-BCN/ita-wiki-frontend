import { API_URL, END_POINTS } from "../config.ts";
import { IntUser } from "../types.ts";

type LoginResponse = {
  success: boolean;
  redirect_url: string;
  message: string;
};

const AUTH = END_POINTS.auth;

export const login = async () => {
  const url = `${API_URL}${AUTH.login}`;

  const response: Response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) throw new Error(`Error ${response.status}`);

  const data: LoginResponse = await response.json();

  return data.redirect_url;
};

export const getNewUser = async (token: string) => {
  const url = `${API_URL}${AUTH.getCurrentUser}`;

  const response: Response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error(`Error ${response.status}`);

  const data: IntUser = await response.json();

  return data;
};

export const logout = async (token: string) => {
  const url = `${API_URL}${AUTH.logout}`;

  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  localStorage.removeItem("auth_token");
};
