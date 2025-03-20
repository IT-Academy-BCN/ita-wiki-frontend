import { IntUseMainMenu } from "../hooks/useMainMenu";
import { IntUser } from "../types";
import { IUseResize } from "../hooks/useResize";

export interface PropsContextUser {
  user: IntUser;
  saveUser: (user: IntUser) => void;
  signIn: () => void;
  signOut: () => void;
  error: string | null;
  setError: (error: string | null) => void;
}
export interface PropsContexGLobal extends IUseResize, IntUseMainMenu {}
