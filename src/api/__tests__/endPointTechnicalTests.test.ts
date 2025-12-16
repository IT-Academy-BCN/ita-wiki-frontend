import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
vi.unmock("./endPointTechnicalTests");
import { fetchTechnicalTests } from "../endPointTechnicalTests";

const fetchMock = vi.fn();
vi.stubGlobal("fetch", fetchMock);

describe("fetchTechnicalTests", () => {
  let consoleSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    fetchMock.mockReset();
    consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

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
