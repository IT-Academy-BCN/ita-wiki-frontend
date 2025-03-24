import { useEffect, useState } from "react";
import { useUserCtx } from "./useUserCtx";
import { ROLE_PERMISSIONS } from "../../config";

export const usePermissions = () => {
  const { user } = useUserCtx();

  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    if (user && user.id) {
      setUserRole(() => user.role || null);
    } else {
      setUserRole(() => null);
    }
  }, [user]);

  const hasPermission = userRole
    ? ROLE_PERMISSIONS.superadmin.includes(userRole)
    : false;

  return {
    userRole,
    hasPermission,
  };
};
