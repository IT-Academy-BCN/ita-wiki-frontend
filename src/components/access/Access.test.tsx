import { render } from "@testing-library/react";
import Access from "./Access";

describe("Access component", () => {
  it("should render the Access component", () => {
    const { getByText } = render(<Access>Test</Access>);
    const accessElement = getByText("Test");
    expect(accessElement).toBeInTheDocument();
  });

  it("should have no class names", () => {
    const { getByText } = render(<Access>Test</Access>);
    const accessElement = getByText("Test");
    expect(accessElement).not.toHaveClass();
  });
});
