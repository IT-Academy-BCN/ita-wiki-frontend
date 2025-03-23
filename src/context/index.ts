import { createContext } from "react";
import { PropsContexGLobal, PropsContextUser } from "./typesCtx";

const CtxUser = createContext<PropsContextUser | null>(null);
const CtxGLobal = createContext<PropsContexGLobal | null>(null);

export { CtxUser, CtxGLobal };
