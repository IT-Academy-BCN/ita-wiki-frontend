import { renderHook } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { useResourceFilter } from "../../../hooks/useResourceFilter";
import { IntResource } from "../../../types";

// Mock the react-router hooks
vi.mock("react-router", () => ({
  useParams: vi.fn(),
  useSearchParams: vi.fn(),
}));

import { useParams, useSearchParams } from "react-router";

describe("useResourceFilter", () => {
  const mockResources: IntResource[] = [
    {
      id: 1,
      github_id: 12345,
      title: "React Basics",
      description: "Learn React basics",
      url: "https://example.com/react",
      category: "React",
      theme: "Componentes",
      type: "Video",
      like_count: 10,
      tags: [{ name: "Componentes" }],
    },
    {
      id: 2,
      github_id: 12346,
      title: "Advanced Hooks",
      description: "Advanced React hooks usage",
      url: "https://example.com/hooks",
      category: "React",
      theme: "UseState & UseEffect",
      type: "Blog",
      like_count: 20,
      tags: [{ name: "UseState & UseEffect" }],
    },
    {
      id: 3,
      github_id: 12347,
      title: "Angular Introduction",
      description: "Intro to Angular",
      url: "https://example.com/angular",
      category: "Angular",
      theme: "Componentes",
      type: "Cursos",
      like_count: 15,
      tags: [{ name: "Componentes" }],
    },
  ];

  let mockParamsData: Record<string, string> = {};
  let mockSetSearchParams: ReturnType<typeof vi.fn>;

  function createMockSearchParams() {
    return {
      get: (key: string) => mockParamsData[key] || null,
      set: (key: string, value: string) => {
        mockParamsData[key] = value;
      },
      toString: () =>
        Object.entries(mockParamsData)
          .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
          .join("&"),
    };
  }

  beforeEach(() => {
    vi.clearAllMocks();
    mockParamsData = {};

    const mockSearchParams = createMockSearchParams();
    mockSetSearchParams = vi.fn();

    (useSearchParams as ReturnType<typeof vi.fn>).mockReturnValue([
      mockSearchParams,
      mockSetSearchParams,
    ]);

    (useParams as ReturnType<typeof vi.fn>).mockReturnValue({
      category: "React",
    });
  });

  it("initializes with default values when URL has no parameters", () => {
    const { result } = renderHook(() =>
      useResourceFilter({
        resources: mockResources,
        selectedResourceTypes: [],
        selectedTags: [],
      }),
    );

    // Should return only React resources since category is mocked to "React"
    expect(result.current.filteredResources.length).toBe(2);
    expect(
      result.current.filteredResources.every((r) => r.category === "React"),
    ).toBe(true);
  });

  it("filters resources by category from URL params", () => {
    (useParams as ReturnType<typeof vi.fn>).mockReturnValue({
      category: "Angular",
    });

    const { result } = renderHook(() =>
      useResourceFilter({
        resources: mockResources,
        selectedResourceTypes: [],
        selectedTags: [],
      }),
    );

    expect(result.current.filteredResources.length).toBe(1);
    expect(result.current.filteredResources[0].category).toBe("Angular");
  });

  it("filters resources by selected resource types", () => {
    const { result } = renderHook(() =>
      useResourceFilter({
        resources: mockResources,
        selectedResourceTypes: ["Video"],
        selectedTags: [],
      }),
    );

    expect(result.current.filteredResources.length).toBe(1);
    expect(result.current.filteredResources[0].type).toBe("Video");
  });

  it("filters resources by selected tags", () => {
    const { result } = renderHook(() =>
      useResourceFilter({
        resources: mockResources,
        selectedResourceTypes: [],
        selectedTags: ["Componentes"],
      }),
    );

    expect(result.current.filteredResources.length).toBe(1);
    expect(result.current.filteredResources[0].theme).toBe("Componentes");
  });

  it("filters resources by search term", () => {
    mockParamsData.search = "React";

    const { result } = renderHook(() =>
      useResourceFilter({
        resources: mockResources,
        selectedResourceTypes: [],
        selectedTags: [],
      }),
    );

    expect(result.current.filteredResources.length).toBe(1);
    expect(result.current.filteredResources[0].title).toContain("React");
  });
});
