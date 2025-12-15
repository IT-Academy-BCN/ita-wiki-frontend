import { useState } from "react";
import { IntUser } from "../types";
import { useUserContext } from "../context/UserContext";
import { getUserRole } from "../api/userApi";

export const useUser = () => {
  const { user, setUser } = useUserContext();
  const [error, setError] = useState<string | null>(null);

  const signIn = async () => {};

  const signOut = () => {
    setUser(null);
    setError(null);
  };

  const saveUser = (user: IntUser) => {
    setUser(user);
  };

  const handleSetRole = async () => {
    if (user) {
      try {
        const userRole = await getUserRole(user.id);
        const updatedUser = { ...user, role: userRole };
        setUser(updatedUser);
      } catch (error) {
        throw new Error(error as string);
      }
    }
  };

  const isAuthenticated = !!user;

  return {
    user,
    isAuthenticated,
    saveUser,
    signIn,
    signOut,
    error,
    setError,
    handleSetRole,
  };
};
