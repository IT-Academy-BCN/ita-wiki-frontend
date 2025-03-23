import { useState } from "react";
import { IntUser } from "../types";
import { UseUserRol } from "./useUser";
import { getUserRole } from "../api/userApi";
import { storage } from "../utils";

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

  return { rol, handleSetRole };
};
