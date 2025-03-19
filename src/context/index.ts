import { createContext } from "react";
import { IntUser } from "../types";
import { IUseResize } from "../hooks/useResize";
import { IntUseMainMenu } from "../hooks/useMainMenu";
interface PropsContextUser {
  user: IntUser;
  saveUser: (user: IntUser) => void;
  signIn: () => void;
  signOut: () => void;
  error: string | null;
  setError: (error: string | null) => void;
}
interface PropsContexGLobal extends IUseResize, IntUseMainMenu {}

const CtxUser = createContext<PropsContextUser | null>(null);

const CtxGLobal = createContext<PropsContexGLobal | null>(null);

export { CtxUser, CtxGLobal };

export type { PropsContextUser, PropsContexGLobal };
