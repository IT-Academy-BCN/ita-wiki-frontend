import { render, screen } from "@testing-library/react";
import { FooterResource } from "../FooterResource";

describe("FooterResource Component", () => {
  it("The component must have the initial styles", () => {
    render(
      <FooterResource>
        <h1>Hola</h1>
      </FooterResource>
    );
    const footer = screen.getByTestId("footer-resource");
    expect(footer).toHaveClass(
      "flex gap-2 items-center justify-between w-full px-10 py-4"
    );
  });
});
