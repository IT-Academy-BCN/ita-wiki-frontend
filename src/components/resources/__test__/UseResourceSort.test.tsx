import { renderHook, act } from "@testing-library/react";
import { useResourceSort } from "../../../hooks/useResourceSort";
import { IntResource } from "../../../types";

describe("useResourceSort hook", () => {
  const resources: IntResource[] = [
    {
      id: 1,
      title: "Resource 1",
      created_at: "2022-01-01",
      like_count: 10,
      github_id: 123456,
      description: "Description 1",
      url: "https://example.com/resource1",
      category: "React",
      theme: "JavaScript",
      type: "Blog",
    },
    {
      id: 2,
      title: "Resource 2",
      created_at: "2021-01-01",
      like_count: 20,
      github_id: 123457,
      description: "Description 2",
      url: "https://example.com/resource2",
      category: "Node",
      theme: "Backend",
      type: "Video",
    },
    {
      id: 3,
      title: "Resource 3",
      created_at: "2023-01-01",
      like_count: 5,
      github_id: 123458,
      description: "Description 3",
      url: "https://example.com/resource3",
      category: "Angular",
      theme: "Frontend",
      type: "Blog",
    },
  ];

  it("should return sorted resources by recent", () => {
    const { result } = renderHook(() => useResourceSort({ resources }));

    act(() => {
      result.current.setSortOption("recent");
    });

    expect(result.current.sortedResources[0].title).toBe("Resource 3");
  });

  it("should return sorted resources by oldest", () => {
    const { result } = renderHook(() => useResourceSort({ resources }));

    act(() => {
      result.current.setSortOption("oldest");
    });

    expect(result.current.sortedResources[0].title).toBe("Resource 2");
  });

  it("should return sorted resources by likes", () => {
    const { result } = renderHook(() => useResourceSort({ resources }));

    act(() => {
      result.current.setSortOption("likes");
    });

    expect(result.current.sortedResources[0].title).toBe("Resource 2");
  });

  it("should filter resources by year", () => {
    const { result } = renderHook(() => useResourceSort({ resources }));

    act(() => {
      result.current.setSelectedYear(2022);
    });

    expect(result.current.sortedResources).toHaveLength(1);
  });
});
