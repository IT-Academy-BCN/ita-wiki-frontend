import { useEffect, useState } from "react";

export interface IUseResize {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  recordMobile: () => void;
  recordTablet: () => void;
  recordDesktop: () => void;
}

export const useResize = (): IUseResize => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isTablet, setTablet] = useState<boolean>(false);
  const [isDesktop, setDesktop] = useState<boolean>(false);

  const recordMobile = () => {
    setIsMobile(window.innerWidth < 640); // Tailwind sm
  };

  const recordTablet = () => {
    setTablet(window.innerWidth >= 640 && window.innerWidth < 1024); // Tailwind md
  };

  const recordDesktop = () => {
    setDesktop(window.innerWidth >= 1024); // Tailwind lg y superior
  };

  useEffect(() => {
    const handleResize = () => {
      recordMobile();
      recordTablet();
      recordDesktop();
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { isMobile, isTablet, isDesktop, recordMobile, recordTablet, recordDesktop };
};
