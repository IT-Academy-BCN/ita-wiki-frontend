import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { ResourcesLayout } from "../ResourcesLayout";
import { ResourcesFiltersProvider } from "../../../context/ResourcesFiltersContext";
import moock from "../../../moock/resources.json";
import { categories } from "../../../data/categories";
import { IntResource } from "../../../types";
import { describe, it, expect, vi } from "vitest";

vi.mock("../../../hooks/useResourceFilter", () => ({
  useResourceFilter: () => ({
    filteredResources: moockResources,
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
    resources: moockResources,
    isLoading: false,
    getBookmarkCount: (resourceId: number | string) => {
      const resource = moockResources.find((r) => r.id === resourceId);
      return resource?.bookmark_count || 0;
    },
    bookmarkedResources: [],
    loadingBookmarks: false,
  }),
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

describe("ResourcesLayout Component", () => {
  it("should render the component and display the correct title", () => {
    render(
      <MemoryRouter>
        <ResourcesFiltersProvider>
          <ResourcesLayout
            resources={moockResources}
            category={String(category)}
          />
        </ResourcesFiltersProvider>
      </MemoryRouter>,
    );

    const titleElement = screen.getByText(`Recursos ${String(category)}`);
    expect(titleElement.tagName).toBe("H2");
  });
});
