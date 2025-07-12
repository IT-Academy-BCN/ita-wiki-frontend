import { createContext } from "react";
import { IntUser } from "../types";

export interface PropsContext {
  user: IntUser | null;
  isAuthenticated: boolean;
  saveUser: (user: IntUser) => void;
  signIn: () => void;
  signOut: () => void;
  error: string | null;
  setError: (error: string | null) => void;
}

const CtxUser = createContext<PropsContext | null>(null);

export default CtxUser;

// Export the new filters context
export {
  ResourcesFiltersProvider,
  useResourcesFilters,
} from "./ResourcesFiltersContext";
