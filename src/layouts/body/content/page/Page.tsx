import { FC } from "react";

interface PageProps {
  children: React.ReactNode;
}

const Page: FC<PageProps> = ({ children }) => {
  return <article className="w-full">{children}</article>;
};
export default Page;
