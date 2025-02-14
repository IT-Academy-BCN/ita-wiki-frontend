import { useContext } from "react";
import CtxUser from "../context";

export const useCtxUser = () => {
  const ctx = useContext(CtxUser);
  if (!ctx) throw new Error("contexto no definido");
  return ctx;
};
