import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { IntUser } from "../types";
import { initiateGitHubOAuth, signOut as authSignOut, checkAuthStatus, handleOAuthCallback } from "../api/authApi";

interface UserContextType {
  user: IntUser | null;
  isAuthenticated: boolean;
  setUser: (user: IntUser | null) => void;
  signOut: () => Promise<void>;
  signIn: () => Promise<void>;
  saveUser: (user: IntUser) => void;
  error: string | null;
  setError: (error: string | null) => void;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IntUser | null>(null);
  const [error, setError] = useState<string | null>(null);

  const saveUser = (user: IntUser) => {
    setUser(user);
  };
  // Verificar estado de autenticación al cargar la aplicación
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Primero verificar si hay un callback de OAuth
        const oauthUser = await handleOAuthCallback();
        if (oauthUser) {
          setUser(oauthUser);
          return;
        }
        
        // Si no hay callback, verificar estado de autenticación normal
        const currentUser = await checkAuthStatus();
        if (currentUser) {
          setUser(currentUser);
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
      }
    };

    checkAuth();
  }, []);

  const signIn = async () => {
    try {
      // Iniciar el flujo de OAuth con GitHub
      initiateGitHubOAuth();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unknown error during sign in");
      }
    }
  };

  const signOut = async () => {
    try {
      await authSignOut();
      setUser(null);
      setError(null);
    } catch (error) {
      console.error("Error during sign out:", error);
      // Aún así, limpiar el estado local
      setUser(null);
      setError(null);
    }
  };

  const isAuthenticated = !!user;

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        signOut,
        signIn,
        saveUser,
        isAuthenticated,
        error,
        setError,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export default UserProvider;
