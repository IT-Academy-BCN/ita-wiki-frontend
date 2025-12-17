import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
vi.unmock("./endPointTechnicalTests");
import {
  createTechnicalTest,
  fetchTechnicalTests,
} from "./endPointTechnicalTests";
import { API_URL, END_POINTS } from "../config";

vi.mock("../config", () => ({
  API_URL: "http://localhost:3000",
  END_POINTS: {
    technicaltests: {
      create: "/api/technical-tests",
      get: "/api/technical-tests",
    },
  },
}));

const fetchMock = vi.fn();

vi.stubGlobal("fetch", fetchMock);

describe("API Endpoints test", () => {
  const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    consoleSpy.mockClear();
  });

  describe("createTechnicalTest", () => {
    const mockFormData = new FormData();
    mockFormData.append("title", "Prueba técnica test");

    it("should make a POST request to the correct endpoint and return success", async () => {
      const mockResponseData = { message: "Guardado exitoso" };

      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponseData,
      });

      const result = await createTechnicalTest(mockFormData);

      expect(fetchMock).toHaveBeenCalledWith(
        `${API_URL}${END_POINTS.technicaltests.create}`,
        expect.objectContaining({
          method: "POST",
          body: mockFormData,
        }),
      );

      expect(result).toEqual(mockResponseData);
    });

    it("should throw an error if the response is not ok", async () => {
      fetchMock.mockResolvedValueOnce({
        ok: false,
        json: async () => ({ message: "Error de prueba" }),
        status: 400,
        statusText: "Bad Request",
      });

      await expect(createTechnicalTest(mockFormData)).rejects.toThrow(
        "Error de prueba",
      );
    });
  });

  describe("fetchTechnicalTests", () => {
    it("should return the data correctly if the API returns a direct array", async () => {
      const mockData = [{ id: 1, title: "Test A" }];

      fetchMock.mockResolvedValue({
        ok: true,
        json: async () => mockData,
      });

      const result = await fetchTechnicalTests();

      expect(result).toEqual(mockData);
      expect(fetchMock).toHaveBeenCalledTimes(1);
    });

    it('should return "data.data" if the API returns a wrapped object', async () => {
      const mockInnerData = [{ id: 2, title: "Test B" }];

      fetchMock.mockResolvedValue({
        ok: true,
        json: async () => ({ data: mockInnerData }),
      });

      const result = await fetchTechnicalTests();

      expect(result).toEqual(mockInnerData);
    });

    it("should make a console.error if the response is not OK", async () => {
      fetchMock.mockResolvedValue({
        ok: false,
        status: 500,
        statusText: "Server Error",
      });

      const result = await fetchTechnicalTests();

      expect(result).toBeUndefined();
      expect(consoleSpy).toHaveBeenCalled();
    });

    it("should handle network errors (fetch throw)", async () => {
      const networkError = new Error("Network Error");
      fetchMock.mockRejectedValue(networkError);

      await fetchTechnicalTests();

      expect(consoleSpy).toHaveBeenCalledWith(networkError);
    });
  });
});
