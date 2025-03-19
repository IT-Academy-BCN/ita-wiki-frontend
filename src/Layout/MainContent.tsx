import { FC } from "react";
import { TypChildren } from "../types";

const MainContent: FC<TypChildren> = ({ children }) => {
  return (
    <main className="main__content grid gap-6 lg:pr-6 max-h-[815px] overflow-x-hidden overflow-y-auto">
      {children}
    </main>
  );
};

export default MainContent;
