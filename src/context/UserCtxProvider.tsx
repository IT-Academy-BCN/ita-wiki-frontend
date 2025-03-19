import { FC, ReactNode } from "react";

import { useUser } from "../hooks/useUser";
import CtxUser, { PropsContext } from ".";
import { useResize } from "../hooks/useResize";

interface Props {
  children: ReactNode;
}

const UserCtxProvider: FC<Props> = ({ children }) => {
  const value = { ...useUser(), ...useResize() } as PropsContext;
  return <CtxUser.Provider value={value}>{children}</CtxUser.Provider>;
};

export default UserCtxProvider;
