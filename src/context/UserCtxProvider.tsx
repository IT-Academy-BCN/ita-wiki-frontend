import { FC, ReactNode } from "react";

import { useUser } from "../hooks/useUser";
import { CtxUser, PropsContextUser } from ".";

interface Props {
  children: ReactNode;
}

const UserCtxProvider: FC<Props> = ({ children }) => {
  const value = {
    ...useUser()
  } as PropsContextUser;
  return <CtxUser.Provider value={value}>{children}</CtxUser.Provider>;
};

export default UserCtxProvider;
