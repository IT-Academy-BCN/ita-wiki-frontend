import { useContext } from "react";
import { CtxGLobal } from "../context";

export const useGlobalCtx = () => {
  const ctx = useContext(CtxGLobal);
  if (!ctx) throw new Error("contexto no definido");
  return ctx;
};
