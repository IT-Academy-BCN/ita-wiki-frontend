import { FC } from "react";
import { TypChildren } from "../types";
import layoutCSS from "./css/layout.module.css";
const Content: FC<TypChildren> = ({ children }) => {
  return (
    <section className={`${layoutCSS.mainContent} gap-6 lg:pr-6 overflow-x-hidden overflow-y-auto`}>
      {children}
    </section>
  );
};

export default Content;
