import { FC } from "react";
import { Navigate, Outlet } from "react-router";
import { useUserContext } from "../context/UserContext";

export const RequireAuth: FC = () => {
  const { user } = useUserContext();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default RequireAuth;
