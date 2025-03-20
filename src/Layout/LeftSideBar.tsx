import { useGlobalCtx } from "../hooks/useGlobalCtx";
import layoutCSS from "./css/layout.module.css"
const LeftSideBar: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isOpenMainMenu } = useGlobalCtx();
  return (
    <aside
      className={`${layoutCSS.leftSideBar} bg-[#EBEBEB]`}
      style={{
        left: isOpenMainMenu ? "0px" : "-100%",
      }}
    >
      {children}
    </aside>
  )
}

export default LeftSideBar