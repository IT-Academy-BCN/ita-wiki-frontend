import { FC } from "react"
import { TypChildren } from "../../types";

export const BodyResource: FC<TypChildren> = ({ children }) => {
  return (
    <section role="resource" data-testid="body-resource" className="flex w-full p-4">
      {children}
    </section>
  )
}
