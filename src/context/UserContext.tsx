import { createContext, useContext, useState, ReactNode } from "react";
import { IntUser } from "../types";
import { signInWithGitHub } from "../api/firebase"; //TODO: Cambiar a signInWithBackend
import { getUserRole } from "../api/userApi";

interface UserContextType {
  user: IntUser | null;
  isAuthenticated: boolean;
  setUser: (user: IntUser | null) => void;
  signOut: () => void;
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
  const signIn = async () => {
    try {
      const newUser = await signInWithGitHub();
      setUser(newUser);
      await handleSetRole(newUser);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unknown error during sign in");
      }
    }
  };

  const handleSetRole = async (user: IntUser) => {
    try {
      const userRole = await getUserRole(user.id);
      const updatedUser = { ...user, role: userRole };
      setUser(updatedUser);
    } catch (error) {
      console.error("Error setting user role:", error);
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
