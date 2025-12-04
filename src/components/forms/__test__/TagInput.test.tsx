import { describe, it, expect, vi, beforeEach } from "vitest";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import TagInput from "../TagInput";
import type { Tag } from "../../../types";
import type { ReactNode } from "react";

const mockTags: Tag[] = [
  { id: 1, name: "React", created_at: "", updated_at: "" },
  { id: 2, name: "JavaScript", created_at: "", updated_at: "" },
  { id: 3, name: "CSS", created_at: "", updated_at: "" },
];

const tagsByCategory: Record<string, number[]> = {
  Frontend: [1, 2, 3],
  Backend: [],
};

let mockTagsData = mockTags;
const mockGetTagsByCategory = (category: string | null) => {
  if (!category) return [];
  const ids = tagsByCategory[category];
  if (!ids) return [];
  return mockTagsData.filter((tag) => ids.includes(tag.id));
};

vi.mock("../../../context/TagsContext", () => ({
  TagsProvider: ({ children }: { children: ReactNode }) => children,
  useTags: () => ({
    tags: mockTagsData,
    tagsByCategory,
    getTagsByCategory: mockGetTagsByCategory,
    refreshTags: vi.fn(),
    getTagNameById: (id: number) => mockTagsData.find((t) => t.id === id)?.name,
  }),
}));

describe("TagInput component (dropdown)", () => {
  beforeEach(() => {
    mockTagsData = [...mockTags];
  });

  it("muestra los tags disponibles en el dropdown", async () => {
    const setSelectedTags = vi.fn();

    render(
      <TagInput
        selectedTags={[]}
        setSelectedTags={setSelectedTags}
        selectedCategory="Frontend"
      />,
    );

    const select = screen.getByLabelText("Tags");
    expect(select).toBeInTheDocument();

    const options = await screen.findAllByRole("option");

    expect(options).toHaveLength(3);
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("JavaScript")).toBeInTheDocument();
    expect(screen.getByText("CSS")).toBeInTheDocument();
  });

  it("agrega un tag al seleccionar una opción del dropdown", async () => {
    const setSelectedTags = vi.fn();

    render(
      <TagInput
        selectedTags={[]}
        setSelectedTags={setSelectedTags}
        selectedCategory="Frontend"
      />,
    );

    const select = screen.getByLabelText("Tags") as HTMLSelectElement;

    await screen.findByText("React");

    fireEvent.change(select, {
      target: { value: "1" },
    });

    expect(setSelectedTags).toHaveBeenCalledWith([
      { id: 1, name: "React", created_at: "", updated_at: "" },
    ]);
  });

  it("permite seleccionar múltiples tags", async () => {
    const setSelectedTags = vi.fn();

    render(
      <TagInput
        selectedTags={[]}
        setSelectedTags={setSelectedTags}
        selectedCategory="Frontend"
      />,
    );

    const select = screen.getByLabelText("Tags") as HTMLSelectElement;

    await screen.findByText("React");

    const reactOption = screen.getByText("React") as HTMLOptionElement;
    const jsOption = screen.getByText("JavaScript") as HTMLOptionElement;

    Object.defineProperty(select, "selectedOptions", {
      value: [reactOption, jsOption],
      writable: true,
    });

    fireEvent.change(select);

    expect(setSelectedTags).toHaveBeenCalledWith([
      { id: 1, name: "React", created_at: "", updated_at: "" },
      { id: 2, name: "JavaScript", created_at: "", updated_at: "" },
    ]);
  });

  it("muestra estado de carga cuando no hay tags", () => {
    mockTagsData = [];
    const setSelectedTags = vi.fn();

    render(
      <TagInput
        selectedTags={[]}
        setSelectedTags={setSelectedTags}
        selectedCategory="Frontend"
      />,
    );

    const select = screen.getByLabelText("Tags") as HTMLSelectElement;
    expect(select).toBeDisabled();
    expect(screen.getByText("Carregant tags...")).toBeInTheDocument();
  });

  it("muestra mensaje cuando no hay tags disponibles para la categoría", () => {
    const setSelectedTags = vi.fn();

    render(
      <TagInput
        selectedTags={[]}
        setSelectedTags={setSelectedTags}
        selectedCategory="Backend"
      />,
    );

    expect(
      screen.getByText("No hi ha tags disponibles per aquesta categoria"),
    ).toBeInTheDocument();
  });

  it("muestra todos los tags cuando no hay categoría seleccionada", () => {
    const setSelectedTags = vi.fn();

    render(
      <TagInput
        selectedTags={[]}
        setSelectedTags={setSelectedTags}
        selectedCategory={null}
      />,
    );

    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("JavaScript")).toBeInTheDocument();
    expect(screen.getByText("CSS")).toBeInTheDocument();
  });

  it("limpia los tags seleccionados cuando cambia la categoría", () => {
    const setSelectedTags = vi.fn();
    const { rerender } = render(
      <TagInput
        selectedTags={[mockTags[0]]}
        setSelectedTags={setSelectedTags}
        selectedCategory="Frontend"
      />,
    );

    expect(setSelectedTags).not.toHaveBeenCalled();

    rerender(
      <TagInput
        selectedTags={[mockTags[0]]}
        setSelectedTags={setSelectedTags}
        selectedCategory="Backend"
      />,
    );

    expect(setSelectedTags).toHaveBeenCalledWith([]);
  });

  it("muestra el texto de instrucciones de ayuda", () => {
    const setSelectedTags = vi.fn();

    render(
      <TagInput
        selectedTags={[]}
        setSelectedTags={setSelectedTags}
        selectedCategory="Frontend"
      />,
    );

    expect(
      screen.getByText(
        /Mantén premuda la tecla Ctrl \(Windows\) o Cmd \(Mac\) per seleccionar més d'un tag/i,
      ),
    ).toBeInTheDocument();
  });
});
