import { FC, ReactNode } from "react";

import { useUser } from "../../hooks/user/useUser";
import { CtxUser } from "..";
import { PropsContextUser } from "../types";

interface Props {
  children: ReactNode;
}

const UserCtxProvider: FC<Props> = ({ children }) => {
  const value = {
    ...useUser(),
  } as PropsContextUser;
  return <CtxUser.Provider value={value}>{children}</CtxUser.Provider>;
};

export default UserCtxProvider;
