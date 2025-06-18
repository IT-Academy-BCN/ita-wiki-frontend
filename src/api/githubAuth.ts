import { IntUser } from "../types";

const GITHUB_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID;
const API_URL = import.meta.env.VITE_API_URL;

export const signInWithGitHub = async (): Promise<IntUser> => {
  try {
    const state = crypto.randomUUID();
    sessionStorage.setItem('github_oauth_state', state);
    
    const redirectUri = `${API_URL}auth/github/callback`;
    
    const authUrl = new URL('https://github.com/login/oauth/authorize');
    authUrl.searchParams.set('client_id', GITHUB_CLIENT_ID);
    authUrl.searchParams.set('redirect_uri', redirectUri);
    authUrl.searchParams.set('scope', 'user:email');
    authUrl.searchParams.set('state', state);
    
    window.location.href = authUrl.toString();
    
    throw new Error('Redirecting to GitHub...');
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An unknown error occurred during GitHub authentication.");
  }
};

export const getCurrentUser = async (): Promise<IntUser | null> => {
  try {
    const response = await fetch(`${API_URL}auth/me`, {
      method: "GET",
      credentials: 'include',
    });
    
    if (!response.ok) {
      return null;
    }
    
    const data = await response.json();
    
    return {
      id: data.github_id,
      displayName: data.name || data.login,
      photoURL: data.avatar_url || "",
      role: data.role || "anonymous"
    };
  } catch (error) {
    return null;
  }
};

export const signOutFromGitHub = async (): Promise<void> => {
  try {
    await fetch(`${API_URL}auth/logout`, {
      method: "POST",
      credentials: 'include',
    });
  } catch (error) {
    // Ignore logout errors
  }
};