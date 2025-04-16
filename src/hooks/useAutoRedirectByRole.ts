import { useEffect } from "react";
import { useNavigate } from "react-router";

type AutoRedirectRole = "anonymous" | "student" | "mentor" | "admin" | "superadmin";

interface UseAutoRedirectByRoleProps {
  userId: string | null | undefined;
  userRole: AutoRedirectRole | null;
  defaultCategory?: string;
}

export function useAutoRedirectByRole({
  userId,
  userRole,
  defaultCategory = "React",
}: UseAutoRedirectByRoleProps) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId || !userRole) return;

    const redirectKey = `redirected-${userId}`;
    const alreadyRedirected = sessionStorage.getItem(redirectKey);
    if (alreadyRedirected) return;

    sessionStorage.setItem(redirectKey, "true");

    if (["anonymous", "student", "mentor"].includes(userRole)) {
      navigate(`/resources/${defaultCategory}`);
    } else if (["admin", "superadmin"].includes(userRole)) {
      navigate("/admin-dashboard");
    }
  }, [userId, userRole, defaultCategory, navigate]);
}