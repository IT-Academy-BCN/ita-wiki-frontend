import { useState } from "react";
import { IntUser } from "../types";
import { signInWithGitHub } from "../api/firebase";
import { storage } from "../utils";
import { getUserRole } from "../api/userApi";

export const useUser = () => {
  const [user, setUser] = useState<IntUser | null>(storage.get("user"));
  const [error, setError] = useState<string | null>(null);

  const signIn = async () => {
    try {
      const newUser = await signInWithGitHub();
      setUser(newUser);
      await handleSetRole();
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred.");
      }
    }
  };

  const signOut = () => {
    localStorage.removeItem("user");
    setUser(null);
    setError(null);
  };

  const saveUser = (user: IntUser) => {
    setUser(() => user);
  };

  const handleSetRole = async () => {
    if (user) {
      try {
        const userRole = await getUserRole(user.id);
        const updatedUser = { ...user, role: userRole };
        setUser(updatedUser);
        storage.save("user", updatedUser);
        console.log("Usuario actualizado:", updatedUser);
      } catch (error) {
        console.error("Error al obtener el rol:", error);
      }
    }
  };

  return {
    user,
    saveUser,
    signIn,
    signOut,
    error,
    setError,
    handleSetRole,
  };
};
