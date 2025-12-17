import { render, screen } from "@testing-library/react";
import DescriptionTextarea from "../DescriptionTextarea";
import "@testing-library/jest-dom";
import { useForm } from "react-hook-form";
import type { TechnicalTestFormData } from "../../../types/TechnicalTest";

const Wrapper = ({ currentLength = 0 }: { currentLength?: number }) => {
  const {
    register,
    formState: { errors },
  } = useForm<TechnicalTestFormData>({
    defaultValues: { description: "" },
  });

  return (
    <DescriptionTextarea
      register={register}
      errors={errors}
      currentLength={currentLength}
    />
  );
};

describe("Description Textarea", () => {
  it("renders the textarea", () => {
    render(<Wrapper />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveAttribute("maxLength", "1000");
  });

  it("displays the character counter", () => {
    render(<Wrapper currentLength={0} />);
    expect(screen.getByText("0/1000")).toBeInTheDocument();
  });

  it("updates character counter based on currentLength prop", () => {
    const { rerender } = render(<Wrapper currentLength={50} />);
    expect(screen.getByText("50/1000")).toBeInTheDocument();

    rerender(<Wrapper currentLength={250} />);
    expect(screen.getByText("250/1000")).toBeInTheDocument();
  });
});
