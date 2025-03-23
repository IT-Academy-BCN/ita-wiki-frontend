import { FC } from "react"

interface CategoriesProps {
  children?: React.ReactNode
}

const Categories: FC<CategoriesProps> = ({ children }) => {
  return (
    <aside className="xl:col-start-1 xl:col-end-3 xl:rounded-[15px] bg-stone-500 xl:bg-white">
      {children}
    </aside>
  )
}
export default Categories