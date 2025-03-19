import { useEffect, useState } from "react";

export interface IUseResize {
  isMobile: boolean;
  isTablet: boolean;
  recordMobile: () => void;
  recordTable: () => void;
}

export const useResize = (): IUseResize => {
  const [isTablet, setTablet] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const recordTable = () => {
    setTablet(window.innerWidth > 480 && window.innerWidth < 768);
  };

  const recordMobile = () => {
    setIsMobile(window.innerWidth < 512);
  };

  useEffect(() => {
    const handleResize = () => {
      recordTable();
      recordMobile();
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { isMobile, isTablet, recordMobile, recordTable };
};
