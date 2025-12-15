import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LanguageSelectorInput from "../LanguageSelectorInput";
import "@testing-library/jest-dom";
import { useForm } from "react-hook-form";
import type { TechnicalTestFormData } from "../../../types/TechnicalTest";

const MockIcon = () => <svg data-testid="mock-icon" />;

const mockLanguages = [
  { icon: MockIcon, label: "React" },
  { icon: MockIcon, label: "JavaScript" },
  { icon: MockIcon, label: "TypeScript" },
];

const Wrapper = () => {
  const {
    control,
    formState: { errors },
  } = useForm<TechnicalTestFormData>({
    defaultValues: { language: "JavaScript" },
  });

  return (
    <LanguageSelectorInput
      control={control}
      errors={errors}
      languages={mockLanguages}
    />
  );
};

describe("Language Selector Input", () => {
  it("renders language selection buttons", () => {
    render(<Wrapper />);
    expect(screen.getByText("Llenguatge *")).toBeInTheDocument();
    expect(screen.getAllByRole("button")).toEqual(
      expect.arrayContaining([expect.objectContaining({})]),
    );
  });

  it("selects a language when clicking on a language button", async () => {
    const user = userEvent.setup();
    render(<Wrapper />);

    const reactButton = screen.getByRole("button", { name: /React/i });

    expect(reactButton).toHaveClass("border-gray-300");
    expect(reactButton).not.toHaveClass("border-[#B91879]");

    await user.click(reactButton);

    expect(reactButton).toHaveClass("border-[#B91879]");
    expect(reactButton).not.toHaveClass("border-gray-300");
  });
});
