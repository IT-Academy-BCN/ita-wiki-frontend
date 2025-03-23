import { FC } from "react";

interface LeftSideBarBodyProps {
  children: React.ReactNode;
}

const LeftSideBarBody: FC<LeftSideBarBodyProps> = ({ children }) => {
  return (
    <section className="xl:col-start-1 xl:col-end-3 xl:rounded-[15px] bg-stone-500 xl:bg-white">
      {children}
    </section>
  );
};

export default LeftSideBarBody;
