import { FC } from "react";

interface ContentProps {
  children: React.ReactNode;
}
const Content: FC<ContentProps> = ({ children }) => {
  return (
    <article className="flex gap-8 col-start-3 col-end-13 justify-between">
      {children}
    </article>
  );
};
export default Content;
