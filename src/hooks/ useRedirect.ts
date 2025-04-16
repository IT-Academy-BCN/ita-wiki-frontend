import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { useCtxUser } from "./useCtxUser";

const DEFAULT_CATEGORY = "React";

export const useRedirect = () => {
  const { user } = useCtxUser();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user) return;

    const role = user.role ?? "anonymous";

    // редирект только если на / и нет флага
    const redirected = sessionStorage.getItem("wasRedirected");

    if (location.pathname === "/" && !redirected) {
      if (["student", "mentor", "anonymous"].includes(role)) {
        navigate(`/resources/${DEFAULT_CATEGORY}`, { replace: true });
      } else if (["admin", "superadmin"].includes(role)) {
        navigate("/admin-dashboard", { replace: true });
      }

      sessionStorage.setItem("wasRedirected", "true");
    }
  }, [user, navigate, location.pathname]);
};