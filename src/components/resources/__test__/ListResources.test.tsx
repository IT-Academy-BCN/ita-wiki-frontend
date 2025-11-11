import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { ResourcesLayout } from "../ResourcesLayout";
import { ResourcesFiltersProvider } from "../../../context/ResourcesFiltersContext";
import { categories } from "../../../data/categories";
import { IntResource } from "../../../types";
import { describe, it, expect, vi } from "vitest";

vi.mock("../../../hooks/useResourceFilter", () => ({
  useResourceFilter: () => ({
    filteredResources: mockResources,
    selectedTags: [],
    setSelectedTags: vi.fn(),
    selectedResourceTypes: ["Video"],
    setSelectedResourceTypes: vi.fn(),
  }),
}));

vi.mock("../../../context/UserContext", () => ({
  useUserContext: () => ({
    user: { id: "123463" },
  }),
}));

vi.mock("../../../context/ResourcesContext", () => ({
  useResources: () => ({
    isBookmarked: vi.fn(),
    toggleBookmark: vi.fn(),
    resources: mockResources,
    isLoading: false,
    getBookmarkCount: (resourceId: number | string) => {
      const resource = mockResources.find((r) => r.id === resourceId);
      return resource?.bookmark_count || 0;
    },
    bookmarkedResources: [],
    loadingBookmarks: false,
  }),
}));

const mockResources: IntResource[] = [
  {
    id: 1,
    title: "React Basics",
    description: "Learn React step-by-step",
    type: "Video",
    created_at: "2025-02-25 00:00:00",
    updated_at: "2025-02-25 00:00:00",
    like_count: 10,
    bookmark_count: 2,
    comment_count: 1,
  } as unknown as IntResource,
  {
    id: 2,
    title: "Advanced JS",
    description: "Deep dive into JS",
    type: "Blog",
    created_at: "2025-02-25 00:00:00",
    updated_at: "2025-02-25 00:00:00",
    like_count: 5,
    bookmark_count: 0,
    comment_count: 0,
  } as unknown as IntResource,
];

const category = Object.keys(categories)[0] as keyof typeof categories;

describe("ResourcesLayout Component", () => {
  it("should render the component and display the correct title", () => {
    render(
      <MemoryRouter>
        <ResourcesFiltersProvider>
          <ResourcesLayout
            resources={mockResources}
            category={String(category)}
          />
        </ResourcesFiltersProvider>
      </MemoryRouter>,
    );

    const titleElement = screen.getByText(`Recursos ${String(category)}`);
    expect(titleElement.tagName).toBe("H2");
  });
});
