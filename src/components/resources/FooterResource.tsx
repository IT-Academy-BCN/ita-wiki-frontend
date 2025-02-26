import { FC } from "react"
import { TypChildren } from "../../types"

export const FooterResource: FC<TypChildren> = ({ children }) => {
  return (
    <footer role="resource" data-testid="footer-resource" className="flex gap-2 items-center w-full px-12 py-4">
      {children}
    </footer>
  )
}
