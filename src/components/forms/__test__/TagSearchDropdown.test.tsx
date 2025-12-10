import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TagSearchDropdown } from "../TagSearchDropdown";
import type { Tag } from "../../../types";
import { createRef } from "react";
import { formatText } from "../../../utils/formatText";


console.log("formatText result:", formatText("UPPERCASE")); 

const mockTags: Tag[] = [
  { id: 1, name: "React", created_at: "", updated_at: "" },
  { id: 2, name: "JavaScript", created_at: "", updated_at: "" },
  { id: 3, name: "TypeScript", created_at: "", updated_at: "" },
  { id: 4, name: "CSS", created_at: "", updated_at: "" },
];

vi.mock("../../../utils/formatText", () => ({
  formatText: (text: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  },
}));

describe("TagSearchDropdown", () => {
  const defaultProps = {
    searchTerm: "",
    showSuggestions: false,
    allTags: mockTags,
    availableTags: mockTags,
    filteredTags: mockTags,
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
  });

  it("muestra el placeholder correcto cuando hay tags", () => {
    render(<TagSearchDropdown {...defaultProps} />);

    const input = screen.getByPlaceholderText("Escriu per buscar etiquetes...");
    expect(input).toBeInTheDocument();
  });

  it("muestra placeholder de carga cuando no hay tags", () => {
    const props = {
      ...defaultProps,
      allTags: [],
      availableTags: [],
      filteredTags: [],
    };

    render(<TagSearchDropdown {...props} />);

    const input = screen.getByPlaceholderText("Carregant etiquetes...");
    expect(input).toBeInTheDocument();
  });

  it("deshabilita el input cuando no hay tags disponibles", () => {
    const props = {
      ...defaultProps,
      allTags: [],
      availableTags: [],
      filteredTags: [],
    };

    render(<TagSearchDropdown {...props} />);

    const input = screen.getByLabelText("Buscar tags");
    expect(input).toBeDisabled();
  });

  it("el input no está deshabilitado cuando hay tags", () => {
    render(<TagSearchDropdown {...defaultProps} />);

    const input = screen.getByLabelText("Buscar tags");
    expect(input).not.toBeDisabled();
  });
  it("actualiza el valor al escribir en el input", async () => {
    const onInputChange = vi.fn();
    const user = userEvent.setup();

    render(<TagSearchDropdown {...defaultProps} onInputChange={onInputChange} />);

    const input = screen.getByLabelText("Buscar tags");
    await user.type(input, "React");

    expect(onInputChange).toHaveBeenCalled();
  });

  it("llama a onFocus cuando el input recibe focus", () => {
    const onFocus = vi.fn();

    render(<TagSearchDropdown {...defaultProps} onFocus={onFocus} />);

    const input = screen.getByLabelText("Buscar tags");
    fireEvent.focus(input);

    expect(onFocus).toHaveBeenCalledTimes(1);
  });

  it("muestra el searchTerm en el input", () => {
    const props = {
      ...defaultProps,
      searchTerm: "React",
    };

    render(<TagSearchDropdown {...props} />);

    const input = screen.getByLabelText("Buscar tags") as HTMLInputElement;
    expect(input.value).toBe("React");
  });
  it("no muestra dropdown cuando showSuggestions es false", () => {
    const props = {
      ...defaultProps,
      showSuggestions: false,
      searchTerm: "React",
    };

    render(<TagSearchDropdown {...props} />);

    expect(screen.queryByText("React")).not.toBeInTheDocument();
  });

  it("muestra dropdown cuando showSuggestions es true", () => {
    const props = {
      ...defaultProps,
      showSuggestions: true,
      searchTerm: "R",
    };

    render(<TagSearchDropdown {...props} />);

    expect(screen.getByText("React")).toBeInTheDocument();
  });

  it("no muestra dropdown cuando no hay tags disponibles", () => {
    const props = {
      ...defaultProps,
      showSuggestions: true,
      availableTags: [],
      filteredTags: [],
    };

    render(<TagSearchDropdown {...props} />);

    const input = screen.getByLabelText("Buscar tags");
    expect(input.nextSibling).toBeNull();
  });
  it("renderiza todas las sugerencias filtradas", () => {
    const props = {
      ...defaultProps,
      showSuggestions: true,
      searchTerm: "a",
    };

    render(<TagSearchDropdown {...props} />);

    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Javascript")).toBeInTheDocument();
    expect(screen.getByText("Typescript")).toBeInTheDocument();
  });

  it("muestra mensaje cuando no hay resultados de búsqueda", () => {
    const props = {
      ...defaultProps,
      showSuggestions: true,
      searchTerm: "xyz",
      filteredTags: [],
    };

    render(<TagSearchDropdown {...props} />);

    expect(screen.getByText("No s'han trobat etiquetes")).toBeInTheDocument();
  });

  it("muestra mensaje diferente cuando búsqueda vacía y sin resultados", () => {
    const props = {
      ...defaultProps,
      showSuggestions: true,
      searchTerm: "",
      filteredTags: [],
    };

    render(<TagSearchDropdown {...props} />);

    expect(
      screen.getByText("Totes les etiquetes ja estan seleccionades")
    ).toBeInTheDocument();
  });

  it("aplica formatText a cada tag en las sugerencias", () => {
    const customTag: Tag = {
      id: 99,
      name: "UPPERCASE",
      created_at: "",
      updated_at: "",
    };

    const props = {
      ...defaultProps,
      showSuggestions: true,
      filteredTags: [customTag],
    };

    render(<TagSearchDropdown {...props} />);

    expect(screen.getByText("Uppercase")).toBeInTheDocument();
  });
  it("llama a onSelectTag al hacer click en una sugerencia", () => {
    const onSelectTag = vi.fn();

    const props = {
      ...defaultProps,
      showSuggestions: true,
      onSelectTag,
    };

    render(<TagSearchDropdown {...props} />);

    const reactOption = screen.getByText("React");
    fireEvent.click(reactOption);

    expect(onSelectTag).toHaveBeenCalledWith(mockTags[0]);
  });

  it("llama a onSelectTag con el tag correcto", () => {
    const onSelectTag = vi.fn();

    const props = {
      ...defaultProps,
      showSuggestions: true,
      onSelectTag,
    };

    render(<TagSearchDropdown {...props} />);

    const jsOption = screen.getByText("Javascript");
    fireEvent.click(jsOption);

    expect(onSelectTag).toHaveBeenCalledWith(mockTags[1]);
  });

  it("no llama a onSelectTag cuando no hay click", () => {
    const onSelectTag = vi.fn();

    const props = {
      ...defaultProps,
      showSuggestions: true,
      onSelectTag,
    };

    render(<TagSearchDropdown {...props} />);

    expect(onSelectTag).not.toHaveBeenCalled();
  });
  it("el dropdown tiene clases de posicionamiento absolute", () => {
    const props = {
      ...defaultProps,
      showSuggestions: true,
    };

    const { container } = render(<TagSearchDropdown {...props} />);

    const dropdown = container.querySelector(".absolute");
    expect(dropdown).toBeInTheDocument();
  });

  it("las sugerencias tienen clase hover para resaltar", () => {
    const props = {
      ...defaultProps,
      showSuggestions: true,
    };

    const { container } = render(<TagSearchDropdown {...props} />);

    const suggestion = container.querySelector(".hover\\:bg-\\[\\#B91879\\]");
    expect(suggestion).toBeInTheDocument();
  });

  it("el input no tiene borde (diseño integrado)", () => {
    const { container } = render(<TagSearchDropdown {...defaultProps} />);

    const input = container.querySelector("input");
    expect(input?.className).not.toContain("border-gray");
  });

  it("asigna correctamente el inputRef", () => {
    const inputRef = createRef<HTMLInputElement>();
    const props = {
      ...defaultProps,
      inputRef,
    };

    render(<TagSearchDropdown {...props} />);

    expect(inputRef.current).toBeInstanceOf(HTMLInputElement);
  });

  it("asigna correctamente el dropdownRef cuando dropdown está visible", () => {
    const dropdownRef = createRef<HTMLDivElement>();
    const props = {
      ...defaultProps,
      showSuggestions: true,
      dropdownRef,
    };

    render(<TagSearchDropdown {...props} />);

    expect(dropdownRef.current).toBeInstanceOf(HTMLDivElement);
  });
});
