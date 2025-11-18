import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import SearchComponent from "./SearchComponent";

describe("SearchComponent", () => {
  it("debe renderizar el input y el ícono", () => {
    render(<SearchComponent onSearch={() => {}} resetTrigger="" />);

    const input = screen.getByPlaceholderText(/cercar recurs/i);
    expect(input).toBeInTheDocument();

    const icon = screen.getByAltText(/cerca/i);
    expect(icon).toBeInTheDocument();
  });

  it("debe actualizar el valor del input al escribir y llamar a onSearch", () => {
    const mockOnSearch = vi.fn();
    render(<SearchComponent onSearch={mockOnSearch} resetTrigger="" />);

    const input = screen.getByPlaceholderText(/cercar recurs/i);
    fireEvent.change(input, { target: { value: "React" } });

    expect(input).toHaveValue("React");
    expect(mockOnSearch).toHaveBeenCalledWith("React");
  });

  it("debe resetear el input cuando cambia resetTrigger", () => {
    const mockOnSearch = vi.fn();
    const { rerender } = render(
      <SearchComponent onSearch={mockOnSearch} resetTrigger="initial" />,
    );

    const input = screen.getByPlaceholderText(/cercar recurs/i);
    fireEvent.change(input, { target: { value: "React" } });
    expect(input).toHaveValue("React");

    rerender(<SearchComponent onSearch={mockOnSearch} resetTrigger="new" />);

    expect(input).toHaveValue("");
  });
});
