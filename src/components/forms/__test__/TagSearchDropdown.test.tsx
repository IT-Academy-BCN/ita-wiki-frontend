import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TagSearchDropdown } from "../TagSearchDropdown";
import type { Tag } from "../../../types";
import { createRef } from "react";
describe("TagSearchDropdown", () => {
  const mockAllTags: Tag[] = [
    { id: 1, name: "react", created_at: "", updated_at: "" },
    { id: 2, name: "typescript", created_at: "", updated_at: "" },
    { id: 3, name: "javascript", created_at: "", updated_at: "" },
  ];

  const mockAvailableTags = mockAllTags;

  const defaultProps = {
    searchTerm: "",
    showSuggestions: false,
    allTags: mockAllTags,
    availableTags: mockAvailableTags,
    filteredTags: mockAllTags,
    onInputChange: vi.fn(),
    onFocus: vi.fn(),
    onSelectTag: vi.fn(),
    inputRef: createRef<HTMLInputElement>(),
    dropdownRef: createRef<HTMLDivElement>(),
  };

  it("renderiza el input de búsqueda", () => {
    render(<TagSearchDropdown {...defaultProps} />);

    const input = screen.getByLabelText("Buscar tags");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute(
      "placeholder",
      "Escriu per buscar etiquetes...",
    );
  });

  it("muestra placeholder de carga cuando no hay tags", () => {
    render(
      <TagSearchDropdown
        {...defaultProps}
        allTags={[]}
        availableTags={[]}
        filteredTags={[]}
      />,
    );

    const input = screen.getByLabelText("Buscar tags");
    expect(input).toHaveAttribute("placeholder", "Carregant etiquetes...");
    expect(input).toBeDisabled();
  });

  it("llama a onInputChange cuando el usuario escribe", async () => {
    const user = userEvent.setup();
    const onInputChange = vi.fn();

    render(
      <TagSearchDropdown {...defaultProps} onInputChange={onInputChange} />,
    );

    const input = screen.getByLabelText("Buscar tags");
    await user.type(input, "react");

    expect(onInputChange).toHaveBeenCalled();
  });

  it("llama a onFocus cuando el input recibe foco", async () => {
    const user = userEvent.setup();
    const onFocus = vi.fn();

    render(<TagSearchDropdown {...defaultProps} onFocus={onFocus} />);

    const input = screen.getByLabelText("Buscar tags");
    await user.click(input);

    expect(onFocus).toHaveBeenCalledTimes(1);
  });

  it("muestra el dropdown cuando showSuggestions es true", () => {
    render(
      <TagSearchDropdown
        {...defaultProps}
        showSuggestions={true}
        filteredTags={mockAllTags}
      />,
    );

    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Typescript")).toBeInTheDocument();
    expect(screen.getByText("Javascript")).toBeInTheDocument();
  });

  it("no muestra el dropdown cuando showSuggestions es false", () => {
    render(
      <TagSearchDropdown
        {...defaultProps}
        showSuggestions={false}
        filteredTags={mockAllTags}
      />,
    );

    expect(screen.queryByText("React")).not.toBeInTheDocument();
  });

  it("llama a onSelectTag cuando se hace click en un tag del dropdown", async () => {
    const user = userEvent.setup();
    const onSelectTag = vi.fn();

    render(
      <TagSearchDropdown
        {...defaultProps}
        showSuggestions={true}
        onSelectTag={onSelectTag}
      />,
    );

    const reactTag = screen.getByText("React");
    await user.click(reactTag);

    expect(onSelectTag).toHaveBeenCalledTimes(1);
    expect(onSelectTag).toHaveBeenCalledWith(mockAllTags[0]);
  });

  it("muestra mensaje cuando no hay resultados de búsqueda", () => {
    render(
      <TagSearchDropdown
        {...defaultProps}
        searchTerm="xyz"
        showSuggestions={true}
        filteredTags={[]}
      />,
    );

    expect(screen.getByText("No s'han trobat etiquetes")).toBeInTheDocument();
  });

  it("muestra mensaje cuando todos los tags están seleccionados", () => {
    render(
      <TagSearchDropdown
        {...defaultProps}
        searchTerm=""
        showSuggestions={true}
        filteredTags={[]}
      />,
    );

    expect(
      screen.getByText("Totes les etiquetes ja estan seleccionades"),
    ).toBeInTheDocument();
  });

  it("muestra el valor del searchTerm en el input", () => {
    render(<TagSearchDropdown {...defaultProps} searchTerm="react" />);

    const input = screen.getByLabelText("Buscar tags");
    expect(input).toHaveValue("react");
  });
});
