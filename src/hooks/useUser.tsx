import { useState } from "react";
import { IntUser } from "../types";
import { signInWithGitHub } from "../api/githubAuth";
import { useUserContext } from "../context/UserContext";

export const useUser = () => {
  const { user, setUser } = useUserContext();
  const [error, setError] = useState<string | null>(null);

  const signIn = async () => {
    try {
      const newUser = await signInWithGitHub();
      setUser(newUser);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred.");
      }
    }
  };

  const signOut = () => {
    setUser(null);
    setError(null);
  };

  const saveUser = (user: IntUser) => {
    setUser(user);
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
  };
};