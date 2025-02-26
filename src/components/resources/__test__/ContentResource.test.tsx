import { render, screen } from "@testing-library/react"
import { ContentResource } from "../ContentResource"

describe('ContentResource Component', () => {

  it("The component must have the initial styles", () => {
    render(<ContentResource>
      asdasdasd
    </ContentResource>
    )
    const contentResource = screen.getByTestId("content-resource")
    expect(contentResource).toHaveClass("w-full flex flex-col")
  })

})
