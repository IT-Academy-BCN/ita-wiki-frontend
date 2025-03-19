import { useEffect, useState } from "react"

export interface IUseResize { isMobile: boolean, isTablet: boolean, recordMobile: () => void, recordTable: () => void }

export const useResize = () => {

  const [isTablet, setTablet] = useState<boolean>()
  const [isMobile, setIsMobile] = useState<boolean>()

  const recordTable = () => {
    setTablet(window.innerWidth > 480 && window.innerWidth < 768 as boolean)
  }
  const recordMobile = () => {
    setIsMobile(window.innerWidth < 512 as boolean)
  }
  useEffect(() => {
    const resize = () => {
      recordTable()
      recordMobile()
    }
    window.addEventListener("resize", () => resize())
    return window.removeEventListener("resize", () => resize())
  }, [isMobile, isTablet])
  return { isMobile, isTablet, recordMobile, recordTable } as IUseResize
}