import { useUserContext } from "../context/UserContext";

export const useUser = () => {
  const context = useUserContext();
  
  return {
    user: context.user,
    isAuthenticated: context.isAuthenticated,
    saveUser: context.saveUser,
    signIn: context.signIn,
    signOut: context.signOut,
    error: context.error,
    setError: context.setError,
  };
};
