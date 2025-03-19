import { createContext } from "react";
import { IntUser } from "../types";
import { IUseResize } from "../hooks/useResize";
export interface PropsContext extends IUseResize {
  user: IntUser;
  saveUser: (user: IntUser) => void;
  signIn: () => void;
  signOut: () => void;
  error: string | null;
  setError: (error: string | null) => void;
}

const CtxUser = createContext<PropsContext | null>(null);

export default CtxUser;
