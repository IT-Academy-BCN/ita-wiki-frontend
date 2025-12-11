import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { IntUser } from "../types";
import { login, getNewUser, logout } from "../api/endpointLogin";

interface UserContextType {
  user: IntUser | null;
  isAuthenticated: boolean;
  setUser: (user: IntUser | null) => void;
  signOut: () => void;
  signIn: () => Promise<void>;
  saveUser: (user: IntUser) => void;
  error: string | null;
  setError: (error: string | null) => void;
  loading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IntUser | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const initializeAuth = async () => {
      // El token de la URL ya fue capturado en main.tsx
      // Solo necesitamos verificar si existe en localStorage
      const tokenFromStorage = localStorage.getItem("auth_token");

      if (tokenFromStorage) {
        try {
          const userData = await getNewUser(tokenFromStorage);
          setUser(userData);
        } catch (e) {
          localStorage.removeItem("auth_token");
          setError((e as Error).message);
        }
      }
    };

    initializeAuth();
  }, []);

  const saveUser = (user: IntUser) => {
    setUser(user);
  };

  const signIn = async () => {
    setError(null);
    setIsLoading(true);
    try {
      const redirect = await login();

      if (redirect) {
        window.location.href = redirect;
      }
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      try {
        await logout(token);
      } catch (e) {
        // Ignorar errores de logout, limpiar sesión de todos modos
      }
    }
    localStorage.removeItem("auth_token");
    setUser(null);
    setError(null);
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
        loading,
        setIsLoading,
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
