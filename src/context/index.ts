import { createContext } from "react";
import { PropsContexGLobal, PropsContextUser, PropsContextResources } from "./types";

const CtxUser = createContext<PropsContextUser | null>(null);
const CtxGLobal = createContext<PropsContexGLobal | null>(null);
const ResourcesCtx = createContext<PropsContextResources | null>(null);

export { CtxUser, CtxGLobal, ResourcesCtx };
