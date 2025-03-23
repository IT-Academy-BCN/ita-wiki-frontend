import { IntUseMainMenu } from "../hooks/useMainMenu";
import { IntUser } from "../types";
import { IUseResize } from "../hooks/useResize";
import { AccessProps } from "../hooks/useAccess";
import { AccessModalProps } from "../components/access/useAccessModal";
import { UseUserRol } from "../hooks/useUser";
import { ModalState } from "../hooks/useModals";

export interface PropsContextUser extends UseUserRol {
  user: IntUser;
  saveUser: (user: IntUser) => void;
  signIn: () => void;
  signOut: () => void;
  error: string | null;
  setError: (error: string | null) => void;
}
export interface PropsContexGLobal
  extends IUseResize,
    IntUseMainMenu,
    AccessProps,
    AccessModalProps,
    ModalState {}
