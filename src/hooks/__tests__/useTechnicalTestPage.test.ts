import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import useTechnicalTestPage from "../useTechnicalTestPage";

const { mockFetchTechnicalTestById } = vi.hoisted(() => {
  return {
    mockFetchTechnicalTestById: vi.fn(),
  };
});

vi.mock("../../api/endPointTechnicalTests", () => ({
  fetchTechnicalTestById: mockFetchTechnicalTestById,
}));

const mockData = {
  id: 1,
  title: "Prova React",
  description: "Descripció",
  level: "Junior",
  language: "JavaScript",
  created_at: "2024-01-01",
  tags: ["React"],
  exercises: ["Ex 1"],
  difficulty_level: "Easy",
  duration: 120,
};

describe("useTechnicalTestPage Hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return isLoading true initially and then the data", async () => {
    mockFetchTechnicalTestById.mockResolvedValue(mockData);

    const { result } = renderHook(() => useTechnicalTestPage("1"));

    expect(result.current.isLoading).toBeDefined();

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.technicalTest).toEqual(mockData);
    expect(mockFetchTechnicalTestById).toHaveBeenCalledWith(1);
  });

  it("should handle error when API fails", async () => {
    mockFetchTechnicalTestById.mockRejectedValue(new Error("Error API"));

    const spyConsole = vi.spyOn(console, "error").mockImplementation(() => {});

    const { result } = renderHook(() => useTechnicalTestPage("1"));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.technicalTest).toBeNull();

    spyConsole.mockRestore();
  });
});
