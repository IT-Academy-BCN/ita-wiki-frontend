import { useState } from "react";
import { useCtxUser } from "./useCtxUser";
import { changeRole } from "../api/endPointChangeRole";
import { toast } from "sonner";

export function useChangeUserRole() {
  const { user, saveUser } = useCtxUser();
  const [isChanging, setIsChanging] = useState<boolean>(false);

  const updateUserRole = async (newRole: string) => {
    if (!user || !user.id) return false;
    setIsChanging(true);

    try {
      const request = {
        github_id: user.id,
        role: newRole,
      };

      const response = await changeRole(request);

      if (response && response.role) {
        saveUser({ ...user, role: newRole });
        toast.success(`Rol cambiado a ${newRole}`);
        return true;
      }

      return false;
    } catch (error) {
      console.error("Error changing role:", error);
      toast.error("No se pudo cambiar el rol");
      return false;
    } finally {
      setIsChanging(false);
    }
  };

  return {
    updateUserRole,
    isChanging,
  };
}
