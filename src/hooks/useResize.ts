import { useEffect, useState } from "react"

export interface IUseResize { isMobile: boolean, isTablet: boolean, setIsMobile: () => void, setTablet: () => void }

export const useResize = () => {
  const [isTablet, setTablet] = useState<boolean>(window.innerWidth < 840)
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768)

  useEffect(() => {
    const resize = () => {
      setIsMobile(window.innerWidth < 768)
      setTablet(window.innerWidth < 980)
    }
    window.addEventListener("resize", () => resize())
    return window.removeEventListener("resize", () => resize())
  }, [isMobile, isTablet])
  return { isMobile, isTablet, setIsMobile, setTablet } as IUseResize
}