import { useEffect, useState } from "react";
import { IntUser } from "../types";
import { signInWithGitHub } from "../api/firebase";
import { storage } from "../utils";
import { getUserRole } from "../api/userApi";

export interface UseUserRol {
  rol: IntUser | undefined;
  handleSetRole: () => void;
}


export const useUser = () => {
  const [user, setUser] = useState<IntUser | null>(storage.get("user"));
  const [error, setError] = useState<string | null>(null);
  const { rol, handleSetRole } = useUserRol({ user });

  const signIn = async () => {
    try {
      const newUser = await signInWithGitHub();
      setUser(() => newUser);
      handleSetRole();
    } catch (error) {
      if (error) {
        const customError = error as Error;
        setAccessError(customError.message);
      } else {
        setAccessError("Se produjo un error desconocido.");
      }
    }
  };

  const signOut = () => {
    localStorage.removeItem("user");
    setUser(null);
    setAccessError(null);
  };

  const saveUser = (user: IntUser) => {
    setUser(() => user);
  };
  const setAccessError = (message: string | null) => {
    setError(() => message);
  }
  useEffect(() => {
    if (rol) {
      setUser(() => rol)
    }
    handleSetRole()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    user,
    rol,
    saveUser,
    signIn,
    signOut,
    error,
    setError,
    handleSetRole,
    setAccessError
  };
};

export const useUserRol = ({ user }: { user: IntUser | null }): UseUserRol => {
  const [rol, setRol] = useState<IntUser>();

  const handleSetRole = async () => {
    if (user) {
      try {
        const userRole = await getUserRole(user.id);
        const updatedUser = { ...user, role: userRole };
        setRol(() => updatedUser);
        storage.save("user", updatedUser);
      } catch (error) {
        throw new Error(error as string);
      }
    }
  };

  return { rol, handleSetRole }
}
