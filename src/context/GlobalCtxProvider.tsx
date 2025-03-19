import { FC, ReactNode } from "react";
import { CtxGLobal, PropsContexGLobal } from ".";
import { useResize } from "../hooks/useResize";
import { useMainMenu } from "../hooks/useMainMenu";

interface Props {
  children: ReactNode;
}

const GlobalCtxProvider: FC<Props> = ({ children }) => {
  const value = {
    ...useResize(),
    ...useMainMenu(),
  } as PropsContexGLobal;

  return <CtxGLobal.Provider value={value}>{children}</CtxGLobal.Provider>;
};

export default GlobalCtxProvider;