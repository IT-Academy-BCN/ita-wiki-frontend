import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import TagInput from "../../create-resources/TagInput";
import type { Tag } from "../../../../types";

const mockTags: Tag[] = [
  { id: 1, name: "React", created_at: "", updated_at: "" },
  { id: 2, name: "JavaScript", created_at: "", updated_at: "" },
  { id: 3, name: "CSS", created_at: "", updated_at: "" },
];

const tagsByCategory: Record<string, number[]> = {
  Frontend: [1, 2, 3],
};

vi.mock("../../../../context/TagsContext", () => ({
  TagsProvider: ({ children }: { children: React.ReactNode }) => children,
  useTags: () => ({
    tags: mockTags,
    tagsByCategory,
    getTagsByCategory: (category: string | null) => {
      if (!category) return [];
      const ids = tagsByCategory[category];
      if (!ids) return [];
      return mockTags.filter((tag) => ids.includes(tag.id));
    },
    refreshTags: vi.fn(),
    getTagNameById: (id: number) =>
      mockTags.find((t) => t.id === id)?.name,
  }),
}));

describe("TagInput component (dropdown)", () => {
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
      target: { value: "1" }, // id del tag React
    });

    expect(setSelectedTags).toHaveBeenCalledWith([
      { id: 1, name: "React", created_at: "", updated_at: "" },
    ]);
  });
});
