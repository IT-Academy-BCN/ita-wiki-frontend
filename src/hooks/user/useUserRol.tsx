import { useState } from "react";
import { getUserRole } from "../../api/userApi";
import { IntUser } from "../../types";
import { storage } from "../../utils";
import { UseUserRol } from "./useUser";

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
