import { render, screen } from "@testing-library/react";
import TitleInput from "../TitleInput";
import "@testing-library/jest-dom";

describe("Title Input", () => {
  it("renders title input", () => {
    render(<TitleInput />);
    expect(screen.getByText("Títol *")).toBeInTheDocument();
  });
});
