import { FC } from "react";
import { TypChildren } from "../../types";

export const FooterResource: FC<TypChildren> = ({ children }) => {
  return (
    <footer
      data-testid="footer-resource"
      className="flex gap-2 items-center justify-between w-full px-10 py-4"
    >
      {children}
    </footer>
  );
};
