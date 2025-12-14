import { render, screen } from "@testing-library/react";
import FormHeader from "../FormHeader";
import "@testing-library/jest-dom";

describe("Form Header UI", () => {
  it("renders Cancel and Publicar buttons", () => {
    render(<FormHeader />);
    expect(
      screen.getByRole("button", { name: "Cancel·lar" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Publicar" }),
    ).toBeInTheDocument();
  });
});
