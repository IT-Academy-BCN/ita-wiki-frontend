import { FC, ReactNode } from "react";
import { ResourcesCtx } from "..";
import { PropsContextResources } from "../types";

interface Props {
  children: ReactNode;
}

const ResourcesCtxProvider: FC<Props> = ({ children }) => {
  const value = {
    // ...useResources(), // Uncomment and implement useResources hook if needed
    // ...useResourceCategories(), // Uncomment and implement useResourceCategories hook if needed
    // ...useResourceTypes(), // Uncomment and implement useResourceTypes hook if needed
    // ...useResourceTags(), // Uncomment and implement useResourceTags hook if needed
    // ...useResourceStatus(), // Uncomment and implement useResourceStatus hook if needed
    // ...useResourceAccess(), // Uncomment and implement useResourceAccess hook if needed
  } as PropsContextResources
  return <ResourcesCtx.Provider value={value}>{children}</ResourcesCtx.Provider>;
};

export default ResourcesCtxProvider;