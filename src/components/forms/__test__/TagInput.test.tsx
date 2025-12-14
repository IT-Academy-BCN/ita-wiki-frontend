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
  { id: 5, name: "Node.js", created_at: "", updated_at: "" },
];

const tagsByCategory: Record<string, number[]> = {
  Frontend: [1, 2, 3, 4],
  Backend: [5],
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

describe("TagInput Component", () => {
  let setSelectedTags: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockTagsData = mockTags;
    setSelectedTags = vi.fn();
  });

  describe("Renderizado básico", () => {
    it("renderiza el componente correctamente", () => {
      render(
        <TagInput
          selectedTags={[]}
          setselectedTags={setSelectedTags}
          selectedCategory="Frontend"
        />,
      );

      expect(screen.getByText("Etiquetes")).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText("Escriu per buscar etiquetes..."),
      ).toBeInTheDocument();
    });

    it("muestra mensaje cuando no hay tags disponibles", () => {
      mockTagsData = [];

      render(
        <TagInput
          selectedTags={[]}
          setselectedTags={setSelectedTags}
          selectedCategory={null}
        />,
      );

      expect(
        screen.getByPlaceholderText("Carregant etiquetes..."),
      ).toBeDisabled();
      expect(
        screen.getByText("Esperant que es carreguin les etiquetes..."),
      ).toBeInTheDocument();
    });

    it("muestra mensaje cuando no hay tags seleccionados", () => {
      render(
        <TagInput
          selectedTags={[]}
          setselectedTags={setSelectedTags}
          selectedCategory="Frontend"
        />,
      );

      expect(
        screen.getByText("No hi ha etiquetes seleccionades"),
      ).toBeInTheDocument();
    });
  });

  describe("Búsqueda y filtrado", () => {
    it("muestra el dropdown al hacer focus en el input", async () => {
      const user = userEvent.setup();

      render(
        <TagInput
          selectedTags={[]}
          setselectedTags={setSelectedTags}
          selectedCategory="Frontend"
        />,
      );

      const input = screen.getByPlaceholderText(
        "Escriu per buscar etiquetes...",
      );
      await user.click(input);

      await waitFor(() => {
        expect(screen.getByText("React")).toBeInTheDocument();
        expect(screen.getByText("JavaScript")).toBeInTheDocument();
        expect(screen.getByText("CSS")).toBeInTheDocument();
        expect(screen.getByText("TypeScript")).toBeInTheDocument();
      });
    });

    it("filtra tags según el término de búsqueda", async () => {
      const user = userEvent.setup();

      render(
        <TagInput
          selectedTags={[]}
          setselectedTags={setSelectedTags}
          selectedCategory="Frontend"
        />,
      );

      const input = screen.getByPlaceholderText(
        "Escriu per buscar etiquetes...",
      );
      await user.type(input, "react");

      await waitFor(() => {
        expect(screen.getByText("React")).toBeInTheDocument();
        expect(screen.queryByText("JavaScript")).not.toBeInTheDocument();
        expect(screen.queryByText("CSS")).not.toBeInTheDocument();
      });
    });

    it("búsqueda es case-insensitive", async () => {
      const user = userEvent.setup();

      render(
        <TagInput
          selectedTags={[]}
          setselectedTags={setSelectedTags}
          selectedCategory="Frontend"
        />,
      );

      const input = screen.getByPlaceholderText(
        "Escriu per buscar etiquetes...",
      );
      await user.type(input, "REACT");

      await waitFor(() => {
        expect(screen.getByText("React")).toBeInTheDocument();
      });
    });

    it("muestra mensaje cuando no se encuentran resultados", async () => {
      const user = userEvent.setup();

      render(
        <TagInput
          selectedTags={[]}
          setselectedTags={setSelectedTags}
          selectedCategory="Frontend"
        />,
      );

      const input = screen.getByPlaceholderText(
        "Escriu per buscar etiquetes...",
      );
      await user.type(input, "xyz123");

      await waitFor(() => {
        expect(
          screen.getByText("No s'han trobat etiquetes"),
        ).toBeInTheDocument();
      });
    });
  });

  describe("Agregar tags", () => {
    it("agrega un tag al hacer click en el dropdown", async () => {
      const user = userEvent.setup();

      render(
        <TagInput
          selectedTags={[]}
          setselectedTags={setSelectedTags}
          selectedCategory="Frontend"
        />,
      );

      const input = screen.getByPlaceholderText(
        "Escriu per buscar etiquetes...",
      );
      await user.click(input);

      const reactOption = await screen.findByText("React");
      await user.click(reactOption);

      expect(setSelectedTags).toHaveBeenCalledWith([
        { id: 1, name: "React", created_at: "", updated_at: "" },
      ]);
    });

    it("limpia el input y cierra el dropdown después de agregar un tag", async () => {
      const user = userEvent.setup();

      render(
        <TagInput
          selectedTags={[]}
          setselectedTags={setSelectedTags}
          selectedCategory="Frontend"
        />,
      );

      const input = screen.getByPlaceholderText(
        "Escriu per buscar etiquetes...",
      );
      await user.type(input, "react");

      const reactOption = await screen.findByText("React");
      await user.click(reactOption);

      await waitFor(() => {
        expect(input).toHaveValue("");
      });
    });

    it("no muestra tags ya seleccionados en el dropdown", async () => {
      const user = userEvent.setup();
      const selectedTag = mockTags[0]; // React

      render(
        <TagInput
          selectedTags={[selectedTag]}
          setselectedTags={setSelectedTags}
          selectedCategory="Frontend"
        />,
      );

      const input = screen.getByPlaceholderText(
        "Escriu per buscar etiquetes...",
      );
      await user.click(input);

      const chips = screen.getAllByText("React");
      expect(chips.length).toBe(1);

      await waitFor(() => {
        expect(screen.getByText("JavaScript")).toBeInTheDocument();
        expect(screen.getByText("CSS")).toBeInTheDocument();
      });
    });
  });

  describe("Eliminar tags", () => {
    it("muestra los tags seleccionados como chips", () => {
      const selectedTags = [mockTags[0], mockTags[1]];

      render(
        <TagInput
          selectedTags={selectedTags}
          setselectedTags={setSelectedTags}
          selectedCategory="Frontend"
        />,
      );

      expect(screen.getByText("React")).toBeInTheDocument();
      expect(screen.getByText("JavaScript")).toBeInTheDocument();
    });

    it("elimina un tag al hacer click en el botón X", async () => {
      const user = userEvent.setup();
      const selectedTags = [mockTags[0], mockTags[1]];

      render(
        <TagInput
          selectedTags={selectedTags}
          setselectedTags={setSelectedTags}
          selectedCategory="Frontend"
        />,
      );

      const removeButtons = screen.getAllByRole("button");
      const reactRemoveButton = removeButtons.find(
        (button) => button.textContent === "×",
      );

      if (reactRemoveButton) {
        await user.click(reactRemoveButton);
      }

      expect(setSelectedTags).toHaveBeenCalledWith([mockTags[1]]);
    });
  });

  describe("Filtrado por categoría", () => {
    it("muestra solo tags de la categoría seleccionada", async () => {
      const user = userEvent.setup();

      render(
        <TagInput
          selectedTags={[]}
          setselectedTags={setSelectedTags}
          selectedCategory="Frontend"
        />,
      );

      const input = screen.getByPlaceholderText(
        "Escriu per buscar etiquetes...",
      );
      await user.click(input);

      await waitFor(() => {
        expect(screen.getByText("React")).toBeInTheDocument();
        expect(screen.getByText("JavaScript")).toBeInTheDocument();
        expect(screen.queryByText("Node.js")).not.toBeInTheDocument();
      });
    });

    it("muestra todos los tags cuando no hay categoría seleccionada", async () => {
      const user = userEvent.setup();

      render(
        <TagInput
          selectedTags={[]}
          setselectedTags={setSelectedTags}
          selectedCategory={null}
        />,
      );

      const input = screen.getByPlaceholderText(
        "Escriu per buscar etiquetes...",
      );
      await user.click(input);

      await waitFor(() => {
        expect(screen.getByText("React")).toBeInTheDocument();
        expect(screen.getByText("JavaScript")).toBeInTheDocument();
        expect(screen.getByText("Node.js")).toBeInTheDocument();
      });
    });

    it("no muestra dropdown cuando categoría no tiene tags", async () => {
      const user = userEvent.setup();

      render(
        <TagInput
          selectedTags={[]}
          setselectedTags={setSelectedTags}
          selectedCategory="EmptyCategory"
        />,
      );

      const input = screen.getByPlaceholderText(
        "Escriu per buscar etiquetes...",
      );
      await user.click(input);

      expect(screen.queryByText("React")).not.toBeInTheDocument();
      expect(screen.queryByText("JavaScript")).not.toBeInTheDocument();
    });
  });

  describe("Interacciones del dropdown", () => {
    it("cierra el dropdown al hacer click fuera", async () => {
      const user = userEvent.setup();

      render(
        <div>
          <div data-testid="outside">Outside element</div>
          <TagInput
            selectedTags={[]}
            setselectedTags={setSelectedTags}
            selectedCategory="Frontend"
          />
        </div>,
      );

      const input = screen.getByPlaceholderText(
        "Escriu per buscar etiquetes...",
      );
      await user.click(input);

      await waitFor(() => {
        expect(screen.getByText("React")).toBeInTheDocument();
      });

      const outside = screen.getByTestId("outside");
      fireEvent.mouseDown(outside);

      await waitFor(() => {
        expect(screen.queryByText("React")).not.toBeInTheDocument();
      });
    });

    it("muestra mensaje cuando todos los tags están seleccionados", async () => {
      const user = userEvent.setup();
      const allFrontendTags = mockTags.filter((tag) =>
        [1, 2, 3, 4].includes(tag.id),
      );

      render(
        <TagInput
          selectedTags={allFrontendTags}
          setselectedTags={setSelectedTags}
          selectedCategory="Frontend"
        />,
      );

      const input = screen.getByPlaceholderText(
        "Escriu per buscar etiquetes...",
      );
      await user.click(input);

      await waitFor(() => {
        expect(
          screen.getByText("Totes les etiquetes ja estan seleccionades"),
        ).toBeInTheDocument();
      });
    });
  });
});
