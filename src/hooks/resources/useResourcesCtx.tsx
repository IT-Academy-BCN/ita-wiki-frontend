import { useContext } from "react";
import { ResourcesCtx } from "../../context";

export const useResourceCtx = () => {
  const ctx = useContext(ResourcesCtx);
  if (!ctx) throw new Error("contexto no definido");
  return ctx;
};
