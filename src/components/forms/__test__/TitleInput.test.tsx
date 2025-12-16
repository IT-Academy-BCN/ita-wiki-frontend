import { render, screen } from "@testing-library/react";
import TitleInput from "../TitleInput";
import "@testing-library/jest-dom";
import { useForm } from "react-hook-form";
import type { TechnicalTestFormData } from "../../../types/TechnicalTest";

const Wrapper = ({ currentLength = 0 }: { currentLength?: number }) => {
  const {
    register,
    formState: { errors },
  } = useForm<TechnicalTestFormData>({
    defaultValues: { title: "" },
  });

  return (
    <TitleInput
      register={register}
      errors={errors}
      currentLength={currentLength}
    />
  );
};

describe("Title Input", () => {
  it("renders title input", () => {
    render(<Wrapper />);
    expect(screen.getByText("Títol *")).toBeInTheDocument();
  });

  it("renders the input field", () => {
    render(<Wrapper />);
    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("maxLength", "65");
  });

  it("displays the character counter", () => {
    render(<Wrapper currentLength={0} />);
    expect(screen.getByText("0/65")).toBeInTheDocument();
  });

  it("updates character counter based on currentLength prop", () => {
    const { rerender } = render(<Wrapper currentLength={10} />);
    expect(screen.getByText("10/65")).toBeInTheDocument();

    rerender(<Wrapper currentLength={25} />);
    expect(screen.getByText("25/65")).toBeInTheDocument();
  });
});
