import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import useTechnicalTests from "../useTechnicalTests";

const { mockFetchTechnicalTests } = vi.hoisted(() => {
  return {
    mockFetchTechnicalTests: vi.fn(),
  };
});

vi.mock("../../api/endPointTechnicalTests", () => {
  return {
    fetchTechnicalTests: mockFetchTechnicalTests,
  };
});

describe("useTechnicalTests Hook", () => {
  beforeEach(() => {
    mockFetchTechnicalTests.mockClear();
  });

  it("hauria de carregar les dades correctament (Success)", async () => {
    const mockData = [{ id: 1, title: "React Test" }];

    mockFetchTechnicalTests.mockResolvedValue(mockData);

    const { result } = renderHook(() => useTechnicalTests());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.technicalTests).toEqual(mockData);
    expect(result.current.error).toBeNull();
  });

  it("hauria de capturar l'error si l'API falla", async () => {
    const errorMessage = "Error 500";
    mockFetchTechnicalTests.mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useTechnicalTests());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error?.message).toBe(errorMessage);
    expect(result.current.technicalTests).toEqual([]);
  });

  it("hauria de donar error si l'API retorna null (No data received)", async () => {
    // PREPARE:
    mockFetchTechnicalTests.mockResolvedValue(null);

    const { result } = renderHook(() => useTechnicalTests());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error?.message).toBe("No data received");
  });
});
