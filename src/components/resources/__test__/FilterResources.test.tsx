import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { FilterResources } from "../FilterResources";
import { resourceTypes } from "../../../data/resourceTypes";
import { TagsContext } from "../../../context/TagsContext";

// 👇 Mock explícito del hook que trae los tags
// vi.mock("../../../hooks/useTagsByCategory", () => ({
//   useTagsByCategory: () => ({
//     tagsByCategory: {
//       eventos: {
//         Eventos: 5,
//         Conferencias: 2,
//       },
//     },
//   }),
// }));

// 👇 Mock del useParams para definir category
vi.mock("react-router", async () => {
  const actual = await import("react-router");
  return {
    ...actual,
    useParams: () => ({ category: "eventos" }),
  };
});

const mockTags = [
  { id: 5, name: "Eventos" },
  { id: 2, name: "Conferencias" },
];

const mockTagsByCategory = {
  eventos: [5, 2],
};

describe("FilterResources Component", () => {
  let selectedTags: string[];
  let selectedResourceTypes: string[];

  let setSelectedTags: ReturnType<typeof vi.fn>;
  let setSelectedResourceTypes: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    selectedTags = [];
    selectedResourceTypes = [];

    setSelectedTags = vi.fn((tags: string[]) => {
      selectedTags = tags;
    });

    setSelectedResourceTypes = vi.fn((types: string[]) => {
      selectedResourceTypes = types;
    });
  });

  // "Helper"
  const renderWithTagsContext = () => {
    return render(
      <TagsContext.Provider
        value={{
          tags: mockTags,
          tagsByCategory: mockTagsByCategory,
          getTagsByCategory: (category) =>
            category === "eventos" ? mockTags : [],
          getTagNameById: (id) => mockTags.find((tag) => tag.id === id)?.name,
          refreshTags: async () => {},
        }}
      >
        <MemoryRouter>
          <FilterResources
            resourceTypes={[...resourceTypes]}
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
            selectedResourceTypes={selectedResourceTypes}
            setSelectedResourceTypes={setSelectedResourceTypes}
          />
        </MemoryRouter>
      </TagsContext.Provider>
    );
  };

  it("should render dynamic category tags and resource types", () => {
    renderWithTagsContext();

    expect(screen.getByText("Todos")).toBeInTheDocument();
    expect(screen.getByText("Eventos")).toBeInTheDocument();
    expect(screen.getByText("Conferencias")).toBeInTheDocument();

    resourceTypes.forEach((type) => {
      expect(screen.getByText(type)).toBeInTheDocument();
    });
  });

  it("should allow selecting a tag", () => {
    renderWithTagsContext();

    const eventosRadio = screen.getByText("Eventos");
    fireEvent.click(eventosRadio);
    expect(setSelectedTags).toHaveBeenCalledWith(["Eventos"]);
  });
});
