import { ReactNode } from "react";

const Container = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className="h-full flex flex-col">
      <div
        className={`${className} flex-1 bg-white rounded-xl p-6 mb-6 mx-6 sm:py-12 md:px-10 xl:px-16`}
      >
        {children}
      </div>
    </div>
  );
};

export default Container;
