import { IntUser } from "../types";

const GITHUB_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID;
const API_URL = import.meta.env.VITE_API_URL;

export const signInWithGitHub = async (): Promise<IntUser> => {
  try {
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=user:email`;
    
    const popup = window.open(
      githubAuthUrl,
      'github-oauth',
      'width=600,height=700,scrollbars=yes,resizable=yes'
    );

    return new Promise((resolve, reject) => {
      const checkClosed = setInterval(() => {
        if (popup?.closed) {
          clearInterval(checkClosed);
          reject(new Error('Authentication cancelled'));
        }
      }, 1000);

      const handleMessage = async (event: MessageEvent) => {
        if (event.origin !== window.location.origin) return;
        
        if (event.data.type === 'GITHUB_OAUTH_SUCCESS') {
          clearInterval(checkClosed);
          popup?.close();
          window.removeEventListener('message', handleMessage);
          
          try {
            const { code } = event.data;
            const user = await exchangeCodeForUser(code);
            resolve(user);
          } catch (error) {
            reject(error);
          }
        }
        
        if (event.data.type === 'GITHUB_OAUTH_ERROR') {
          clearInterval(checkClosed);
          popup?.close();
          window.removeEventListener('message', handleMessage);
          reject(new Error(event.data.error || 'GitHub authentication failed'));
        }
      };

      window.addEventListener('message', handleMessage);
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || "Error during GitHub authentication. Please try again.");
    }
    throw new Error("An unknown error occurred during GitHub authentication.");
  }
};

const exchangeCodeForUser = async (code: string): Promise<IntUser> => {
  try {
    const response = await fetch(`${API_URL}login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
    });

    const data = await response.json();
    
    // If response is not ok, but we still got user data from GitHub, treat as anonymous
    if (!response.ok && !data.github_id) {
      throw new Error('Failed to authenticate with backend');
    }
    
    const newUser: IntUser = {
      id: data.github_id,
      displayName: data.name || data.login,
      photoURL: data.avatar_url || "",
      role: data.role || "anonymous"
    };

    return newUser;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Failed to process GitHub authentication");
  }
};