import { FC, ReactNode } from "react";

import { useUser } from "../hooks/useUser";
import CtxUser, { PropsContext } from ".";
import { useResize } from "../hooks/useResize";
import { useMainMenu } from "../hooks/useMainMenu";

interface Props {
  children: ReactNode;
}

const UserCtxProvider: FC<Props> = ({ children }) => {
  const value = {
    ...useUser(),
    ...useResize(),
    ...useMainMenu(),
  } as PropsContext;
  return <CtxUser.Provider value={value}>{children}</CtxUser.Provider>;
};

export default UserCtxProvider;
