import { FC, ReactNode } from "react";

interface HeroProps {
  children: ReactNode;
}

const Hero: FC<HeroProps> = ({ children }) => {
  return (
    <article className="flex flex-col gap-8 items-center justify-center h-96">
      {children}
    </article>
  );
};

export default Hero;
