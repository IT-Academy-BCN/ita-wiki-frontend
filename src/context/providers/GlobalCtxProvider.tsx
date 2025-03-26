import { FC, ReactNode } from "react";
import { CtxGLobal } from "..";
import { useResize } from "../../hooks/useResize";
import { useMainMenu } from "../../hooks/useMainMenu";
import { PropsContexGLobal } from "../types";
import { useAccess } from "../../hooks/useAccess";
import { useAccessModal } from "../../components/access/useAccessModal";
import { useModals } from "../../hooks/useModals";

interface Props {
  children: ReactNode;
}

const GlobalCtxProvider: FC<Props> = ({ children }) => {
  const value = {
    ...useResize(),
    ...useMainMenu(),
    ...useAccess(),
    ...useAccessModal(),
    ...useModals(),
  } as PropsContexGLobal;

  return <CtxGLobal.Provider value={value}>{children}</CtxGLobal.Provider>;
};

export default GlobalCtxProvider;
