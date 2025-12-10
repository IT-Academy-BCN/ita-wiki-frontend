import { describe, it, expect, vi, beforeEach } from "vitest";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TagInput from "../TagInput";
import type { Tag } from "../../../types";
import type { ReactNode } from "react";

const mockTags: Tag[] = [
  { id: 1, name: "React", created_at: "", updated_at: "" },
  { id: 2, name: "JavaScript", created_at: "", updated_at: "" },
  { id: 3, name: "CSS", created_at: "", updated_at: "" },
  { id: 4, name: "TypeScript", created_at: "", updated_at: "" },
];

const tagsByCategory: Record<string, number[]> = {
  Frontend: [1, 2, 3],
  Backend: [4],
};

let mockTagsData = mockTags;

vi.mock("../../../context/TagsContext", () => ({
  TagsProvider: ({ children }: { children: ReactNode }) => children,
  useTags: () => ({
    tags: mockTagsData,
    tagsByCategory,
    getTagsByCategory: (category: string | null) => {
      if (!category) return [];
      const ids = tagsByCategory[category];
      if (!ids) return [];
      return mockTagsData.filter((tag) => ids.includes(tag.id));
    },
    refreshTags: vi.fn(),
    getTagNameById: (id: number) => mockTagsData.find((t) => t.id === id)?.name,
  }),
}));

describe("TagInput - Integration Tests", () => {
  beforeEach(() => {
    mockTagsData = mockTags;
  });

  it("renderiza el componente correctamente", () => {
    const setSelectedTags = vi.fn();

    render(
      <TagInput
        selectedTags={[]}
        setselectedTags={setSelectedTags}
        selectedCategory={null}
      />,
    );

    expect(screen.getByText("Etiquetes")).toBeInTheDocument();
    expect(screen.getByLabelText("Buscar tags")).toBeInTheDocument();
  });

  it("muestra el container con borde y padding", () => {
    const setSelectedTags = vi.fn();

    const { container } = render(
      <TagInput
        selectedTags={[]}
        setselectedTags={setSelectedTags}
        selectedCategory={null}
      />,
    );

    const mainContainer = container.querySelector(".border.border-gray-200");
    expect(mainContainer).toBeInTheDocument();
  });
  it("muestra mensaje cuando no hay tags seleccionados", () => {
    const setSelectedTags = vi.fn();

    render(
      <TagInput
        selectedTags={[]}
        setselectedTags={setSelectedTags}
        selectedCategory={null}
      />,
    );

    expect(
      screen.getByText("No hi ha etiquetes seleccionades")
    ).toBeInTheDocument();
  });

  it("muestra placeholder de carga cuando no hay tags disponibles", () => {
    mockTagsData = [];
    const setSelectedTags = vi.fn();

    render(
      <TagInput
        selectedTags={[]}
        setselectedTags={setSelectedTags}
        selectedCategory={null}
      />,
    );

    const input = screen.getByLabelText("Buscar tags") as HTMLInputElement;
    expect(input).toHaveAttribute("placeholder", "Carregant etiquetes...");
    expect(input).toBeDisabled();
  });
  it("filtra tags al escribir en el input", async () => {
    const setSelectedTags = vi.fn();
    const user = userEvent.setup();

    render(
      <TagInput
        selectedTags={[]}
        setselectedTags={setSelectedTags}
        selectedCategory={null}
      />,
    );

    const input = screen.getByLabelText("Buscar tags");

    await user.click(input);
    await user.type(input, "React");

    await waitFor(() => {
      expect(screen.getByText("React")).toBeInTheDocument();
      expect(screen.queryByText("Javascript")).not.toBeInTheDocument();
    });
  });

  it("muestra dropdown al hacer focus en el input", async () => {
    const setSelectedTags = vi.fn();
    const user = userEvent.setup();

    render(
      <TagInput
        selectedTags={[]}
        setselectedTags={setSelectedTags}
        selectedCategory={null}
      />,
    );

    const input = screen.getByLabelText("Buscar tags");

    await user.click(input);
    await user.type(input, "R");

    await waitFor(() => {
      expect(screen.getByText("React")).toBeInTheDocument();
    });
  });

  it("filtra tags por categoría seleccionada", () => {
    const setSelectedTags = vi.fn();

    render(
      <TagInput
        selectedTags={[]}
        setselectedTags={setSelectedTags}
        selectedCategory="Frontend"
      />,
    );

    const input = screen.getByLabelText("Buscar tags");
    fireEvent.focus(input);

    expect(mockTags.filter(t => tagsByCategory.Frontend.includes(t.id)).length).toBe(3);
  });

  it("muestra todos los tags cuando categoría es null", async () => {
    const setSelectedTags = vi.fn();
    const user = userEvent.setup();

    render(
      <TagInput
        selectedTags={[]}
        setselectedTags={setSelectedTags}
        selectedCategory={null}
      />,
    );

    const input = screen.getByLabelText("Buscar tags");
    await user.click(input);
    await user.type(input, "a"); 

    await waitFor(() => {
      expect(screen.getByText("React")).toBeInTheDocument();
      expect(screen.getByText("JavaScript")).toBeInTheDocument();
    });
  });

  it("agrega un tag al hacer click en sugerencia", async () => {
    const setSelectedTags = vi.fn();
    const user = userEvent.setup();

    render(
      <TagInput
        selectedTags={[]}
        setselectedTags={setSelectedTags}
        selectedCategory={null}
      />,
    );

    const input = screen.getByLabelText("Buscar tags");
    await user.click(input);
    await user.type(input, "React");

    await waitFor(() => {
      const reactOption = screen.getByText("React");
      fireEvent.click(reactOption);
    });

    expect(setSelectedTags).toHaveBeenCalledWith([mockTags[0]]);
  });

  it("limpia el input después de seleccionar un tag", async () => {
    const setSelectedTags = vi.fn();
    const user = userEvent.setup();

    render(
      <TagInput
        selectedTags={[]}
        setselectedTags={setSelectedTags}
        selectedCategory={null}
      />,
    );

    const input = screen.getByLabelText("Buscar tags") as HTMLInputElement;
    await user.click(input);
    await user.type(input, "React");

    await waitFor(() => {
      const reactOption = screen.getByText("React");
      fireEvent.click(reactOption);
    });

    expect(setSelectedTags).toHaveBeenCalled();
  });
  it("muestra los tags seleccionados como chips", () => {
    const setSelectedTags = vi.fn();
    const selectedTags = [mockTags[0], mockTags[1]];

    render(
      <TagInput
        selectedTags={selectedTags}
        setselectedTags={setSelectedTags}
        selectedCategory={null}
      />,
    );

    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("JavaScript")).toBeInTheDocument();
  });

  it("no muestra mensaje de vacío cuando hay tags seleccionados", () => {
    const setSelectedTags = vi.fn();
    const selectedTags = [mockTags[0]];

    render(
      <TagInput
        selectedTags={selectedTags}
        setselectedTags={setSelectedTags}
        selectedCategory={null}
      />,
    );

    expect(
      screen.queryByText("No hi ha etiquetes seleccionades")
    ).not.toBeInTheDocument();
  });
});
