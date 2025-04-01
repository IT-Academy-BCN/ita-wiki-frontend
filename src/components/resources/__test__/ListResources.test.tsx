import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { ListResources } from "../ListResources";
import moock from "../../../moock/resources.json";
import { categories } from "../../../data/categories";
import { IntResource } from "../../../types";
import { describe, it, expect, vi } from "vitest";

vi.mock("../../../hooks/useResourceFilter", () => ({
  useResourceFilter: () => ({
    filteredResources: moockResources,
    selectedTheme: "Todos",
    setSelectedTheme: vi.fn(),
    selectedResourceTypes: ["Video"],
    setSelectedResourceTypes: vi.fn(),
    resetTheme: vi.fn(),
  }),
}));

vi.mock("../../../hooks/useCtxUser", () => ({
  useCtxUser: () => ({
    user: { id: "123463" },
  }),
}));

vi.mock("../../../hooks/useResourceSort", () => ({
  useResourceSort: () => ({
    sortedResources: moockResources,
    setSortOption: vi.fn(),
    setSelectedYear: vi.fn(),
    availableYears: [2022, 2023],
    sortOption: "newest",
  }),
}));

vi.mock("../FilterResources", () => ({
  FilterResources: () => (
    <div data-testid="filter-resources">Filter Resources Component</div>
  ),
}));

vi.mock("../Resource", () => ({
  Resource: ({ resource }: { resource: IntResource }) => (
    <li data-testid={`resource-${resource.id}`}>{resource.title}</li>
  ),
}));

vi.mock("../SortButton", () => ({
  default: () => <button data-testid="sort-button">Sort</button>,
}));

vi.mock("../bookmarks/BookMarkList", () => ({
  default: ({
    bookmarks,
    isLoading,
  }: {
    bookmarks: { id: string; title: string }[];
    isLoading: boolean;
  }) => (
    <div data-testid="bookmark-list">
      {isLoading ? "Loading..." : `Bookmarks: ${bookmarks?.length || 0}`}
    </div>
  ),
}));

vi.mock("../../my-resources/MyResourcesList", () => ({
  ListMyResources: ({ myResources }: { myResources: IntResource[] }) => (
    <div data-testid="my-resources-container">
      {`My Resources: ${myResources?.length || 0}`}
    </div>
  ),
}));

const moockResources = moock.resources.map(
  (resource) =>
    ({
      ...resource,
      created_at: "2025-02-25 00:00:00",
      updated_at: "2025-02-25 00:00:00",
    }) as IntResource,
);

const category = Object.keys(categories)[0] as keyof typeof categories;

describe("ListResources Component", () => {
  it("should render the component and display the correct title", () => {
    render(
      <MemoryRouter>
        <ListResources
          resources={moockResources}
          category={category}
          bookmarkedResources={[]}
          toggleBookmark={() => {}}
        />
      </MemoryRouter>,
    );

    const titleElement = screen.getByText(`Recursos ${String(category)}`);
    expect(titleElement.tagName).toBe("H2");
  });

  it("should render user's own resources when user logged in and own resources present", () => {
    const userResources = moockResources.map((resource) => ({
      ...resource,
      github_id: 123463,
    }));

    render(
      <MemoryRouter>
        <ListResources
          resources={userResources}
          category={category}
          bookmarkedResources={[]}
          toggleBookmark={() => {}}
        />
      </MemoryRouter>,
    );
    expect(screen.queryByTestId("my-resources-container")).toBeInTheDocument();
  });
});
