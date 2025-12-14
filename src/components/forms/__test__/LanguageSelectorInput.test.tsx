import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LanguageSelectorInput from "../LanguageSelectorInput";
import "@testing-library/jest-dom";

describe("Language Selector Input", () => {
  it("renders language selection buttons", () => {
    render(<LanguageSelectorInput />);
    expect(screen.getByText("Llenguatge *")).toBeInTheDocument();
    expect(screen.getAllByRole("button")).toEqual(
      expect.arrayContaining([expect.objectContaining({})]),
    );
  });

  it("selects a language when clicking on a language button", async () => {
    const user = userEvent.setup();
    render(<LanguageSelectorInput />);

    const reactButton = screen.getByRole("button", { name: /React/i });

    expect(reactButton).toHaveClass("border-gray-300");
    expect(reactButton).not.toHaveClass("border-[#B91879]");

    await user.click(reactButton);

    expect(reactButton).toHaveClass("border-[#B91879]");
    expect(reactButton).not.toHaveClass("border-gray-300");
  });
});
