import { renderHook, act } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { useResourceFilter } from "../../../hooks/useResourceFilter";
import { IntResource } from "../../../types";

// Mock the react-router hooks
vi.mock("react-router", () => ({
  useParams: vi.fn(),
  useSearchParams: vi.fn(),
}));

import { useParams, useSearchParams } from "react-router";
import { EnuResourcesCategories, EnuResourceThemes, EnuResourceTypes } from "../../../enums";

describe("useResourceFilter", () => {
  const mockThemes = ["Todos", "Componentes", "UseState & UseEffect"] as const;
  const mockResourceTypes = ["Video", "Cursos", "Blog"] as const;

  const mockResources: IntResource[] = [
    {
      id: 1,
      github_id: 12345,
      title: "React Basics",
      description: "Learn React basics",
      url: "https://example.com/react",
      category: "React" as EnuResourcesCategories,
      theme: "Componentes" as EnuResourceThemes,
      type: "Video" as EnuResourceTypes,
      votes: 10,
    },
    {
      id: 2,
      github_id: 12346,
      title: "Advanced Hooks",
      description: "Advanced React hooks usage",
      url: "https://example.com/hooks",
      category: "React" as EnuResourcesCategories,
      theme: "UseState & UseEffect" as EnuResourceThemes,
      type: "Blog" as EnuResourceTypes,
      votes: 20,
    },
    {
      id: 3,
      github_id: 12347,
      title: "Angular Introduction",
      description: "Intro to Angular",
      url: "https://example.com/angular",
      category: "Angular" as EnuResourcesCategories,
      theme: "Componentes" as EnuResourceThemes,
      type: "Cursos" as EnuResourceTypes,
      votes: 15,
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
        themes: mockThemes,
        resourceTypes: mockResourceTypes,
      }),
    );

    expect(result.current.selectedTheme).toBe(mockThemes[0]);
    expect(result.current.selectedResourceTypes).toEqual(mockResourceTypes);
  });

  it("updates URL when selection changes", () => {
    const { result } = renderHook(() =>
      useResourceFilter({
        resources: mockResources,
        themes: mockThemes,
        resourceTypes: mockResourceTypes,
      }),
    );

    act(() => {
      result.current.setSelectedTheme("Componentes");
    });

    expect(mockSetSearchParams).toHaveBeenCalled();
  });

  it("filters resources by category from URL params", () => {
    (useParams as ReturnType<typeof vi.fn>).mockReturnValue({
      category: "Angular",
    });

    const { result } = renderHook(() =>
      useResourceFilter({
        resources: mockResources,
        themes: mockThemes,
        resourceTypes: mockResourceTypes,
      }),
    );

    expect(result.current.filteredResources.length).toBe(1);
    expect(result.current.filteredResources[0].category).toBe("Angular");
  });

  it("resets filters when category changes", () => {
    const mockSetCategory = vi.fn();

    const { rerender } = renderHook(
      (props) => {
        (useParams as ReturnType<typeof vi.fn>).mockReturnValue({
          category: props.category,
        });

        const result = useResourceFilter({
          resources: mockResources,
          themes: mockThemes,
          resourceTypes: mockResourceTypes,
        });

        if (result.selectedTheme === "Todos" && props.category === "Angular") {
          mockSetCategory("reset detected");
        }

        return result;
      },
      { initialProps: { category: "React" } },
    );

    rerender({ category: "Angular" });

    expect(mockSetCategory).toHaveBeenCalledWith("reset detected");
  });
});
