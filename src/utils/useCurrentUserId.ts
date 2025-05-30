import { useUserContext } from "../context/UserContext";

export const useCurrentUserId = (): number | null => {
  const { user } = useUserContext();
  return user?.id || null;
};
