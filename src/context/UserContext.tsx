import { createContext, useContext, useState, ReactNode } from "react";
import { IntUser } from "../types";
import { login } from "../api/endpointLogin";

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
      console.error('Error en iniciar la sessió:', (e as Error).message);
      setError((e as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = () => {
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
