import { FC, ReactNode } from "react";
import { ResourcesCtx } from "..";
import { PropsContextResources } from "../types";
import { useResourceFilter } from "../../hooks/resources/useResourceFilter";

interface Props {
  children: ReactNode;
}

const ResourcesCtxProvider: FC<Props> = ({ children }) => {
  const value = {
    ...useResourceFilter(),
  } as PropsContextResources;
  return (
    <ResourcesCtx.Provider value={value}>{children}</ResourcesCtx.Provider>
  );
};

export default ResourcesCtxProvider;
