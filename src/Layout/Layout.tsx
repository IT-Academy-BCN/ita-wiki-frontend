import { FC, ReactNode } from "react";
import layoutCSS from "./css/layout.module.css";
interface Props {
  children: ReactNode;
}

export const Layout: FC<Props> = ({ children }) => {
  return <section className={layoutCSS.layout}>{children}</section>;
};
