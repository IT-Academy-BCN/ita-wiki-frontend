import { IntUser } from "../types";
import { API_URL } from "../config";

// Función para iniciar el flujo de OAuth con GitHub
export const initiateGitHubOAuth = (): void => {
  // Redirigir al endpoint de OAuth del backend
  window.location.href = `${API_URL}auth/github/redirect`;
};

// Función para obtener el usuario actual desde el backend
export const getCurrentUser = async (): Promise<IntUser> => {
  try {
    const response = await fetch(`${API_URL}user`, {
      method: 'GET',
      credentials: 'include', // Incluir cookies de sesión
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to get current user');
    }

    const userData = await response.json();
    
    return {
      id: userData.id,
      displayName: userData.displayName || userData.name || '',
      photoURL: userData.photoURL || userData.avatar_url || '',
      role: userData.role || 'student',
    };
  } catch (error) {
    throw new Error('Error getting current user');
  }
};

// Función para cerrar sesión
export const signOut = async (): Promise<void> => {
  try {
    await fetch(`${API_URL}auth/logout`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error during sign out:', error);
  }
};

// Función para verificar si el usuario está autenticado
export const checkAuthStatus = async (): Promise<IntUser | null> => {
  try {
    const user = await getCurrentUser();
    return user;
  } catch (error) {
    return null;
  }
};

// Función para manejar el callback de OAuth
export const handleOAuthCallback = async (): Promise<IntUser | null> => {
  try {
    // Verificar si hay parámetros de OAuth en la URL
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const error = urlParams.get('error');
    
    if (error) {
      throw new Error(`OAuth error: ${error}`);
    }
    
    if (code) {
      // El backend debería haber procesado el código y establecido la sesión
      // Ahora verificamos si el usuario está autenticado
      const user = await getCurrentUser();
      
      // Limpiar la URL de los parámetros de OAuth
      window.history.replaceState({}, document.title, window.location.pathname);
      
      return user;
    }
    
    return null;
  } catch (error) {
    console.error('Error handling OAuth callback:', error);
    return null;
  }
}; 