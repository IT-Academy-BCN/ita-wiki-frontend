import { FC } from "react";
import { TypChildren } from "../../types";

export const ContentResource: FC<TypChildren> = ({ children }) => {
  return (
    <article role="resource" data-testid="content-resource" className="w-full flex flex-col">
      {children}
    </article>
  )
}
