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

describe("TagInput component (dropdown)", () => {
  beforeEach(() => {
    mockTagsData = mockTags;
  });

  it("muestra los tags disponibles en el dropdown", async () => {
    const setSelectedTags = vi.fn();

    render(
      <TagInput
        selectedTags={[]}
        setselectedTags={setSelectedTags}
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
        setselectedTags={setSelectedTags}
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

  it("muestra mensaje cuando no hay tags disponibles para la categoría", () => {
    const setSelectedTags = vi.fn();

    render(
      <TagInput
        selectedTags={[]}
        setselectedTags={setSelectedTags}
        selectedCategory="Backend"
      />,
    );

    expect(
      screen.getByText("No hi ha etiquetes disponibles per aquesta categoria"),
    ).toBeInTheDocument();
  });

  it("muestra todos los tags cuando no hay categoría seleccionada", () => {
    const setSelectedTags = vi.fn();

    render(
      <TagInput
        selectedTags={[]}
        setselectedTags={setSelectedTags}
        selectedCategory={null}
      />,
    );

    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("JavaScript")).toBeInTheDocument();
    expect(screen.getByText("CSS")).toBeInTheDocument();
  });

  it("muestra mensaje de carga cuando allTags está vacío", () => {
    mockTagsData = [];
    const setSelectedTags = vi.fn();

    render(
      <TagInput
        selectedTags={[]}
        setselectedTags={setSelectedTags}
        selectedCategory={null}
      />,
    );

    expect(screen.getByText("Carregant etiquetes...")).toBeInTheDocument();
    const select = screen.getByLabelText("Tags");
    expect(select).toBeDisabled();
  });
});
