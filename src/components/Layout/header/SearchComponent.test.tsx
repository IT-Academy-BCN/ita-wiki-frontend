import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import SearchComponent from "./SearchComponent";

describe("SearchComponent", () => {
  test("debe renderizar el input y el ícono", () => {
    render(
      <SearchComponent onSearch={() => {}} disabled={false} resetTrigger="" />,
    );

    const input = screen.getByPlaceholderText(/buscar recurso/i);
    expect(input).toBeInTheDocument();

    const icon = screen.getByAltText(/buscar/i);
    expect(icon).toBeInTheDocument();
  });
});

describe("SearchComponent", () => {
  it("debe actualizar el valor del input al escribir y llamar a onSearch", () => {
    const mockOnSearch = vi.fn();
    render(
      <SearchComponent
        onSearch={mockOnSearch}
        disabled={false}
        resetTrigger=""
      />,
    );

    const input = screen.getByPlaceholderText(/buscar recurso/i);
    fireEvent.change(input, { target: { value: "React" } });

    expect(input).toHaveValue("React");

    expect(mockOnSearch).toHaveBeenCalledWith("React");
  });
});

describe("SearchComponent", () => {
  it("debe resetear el input cuando cambia resetTrigger", () => {
    const mockOnSearch = vi.fn();
    const { rerender } = render(
      <SearchComponent
        onSearch={mockOnSearch}
        disabled={false}
        resetTrigger="initial"
      />,
    );

    const input = screen.getByPlaceholderText(/buscar recurso/i);
    fireEvent.change(input, { target: { value: "React" } });
    expect(input).toHaveValue("React");

    rerender(
      <SearchComponent
        onSearch={mockOnSearch}
        disabled={false}
        resetTrigger="new"
      />,
    );

    expect(input).toHaveValue("");
  });
});
describe("SearchComponent disbled si le pasamos la prop", () => {
  it("debe deshabilitar el input cuando disabled es true", () => {
    render(
      <SearchComponent onSearch={() => {}} disabled={true} resetTrigger="" />,
    );

    const input = screen.getByPlaceholderText(/buscar recurso/i);
    expect(input).toBeDisabled();
  });
});
