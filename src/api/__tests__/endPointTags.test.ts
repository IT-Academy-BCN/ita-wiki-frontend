import { describe, it, expect, vi, afterEach } from "vitest";
import { getTags } from "../endPointTags";
import type { Tag } from "../../types";

const mockTags: Tag[] = [
  {
    id: 1,
    name: "react",
    created_at: "2024-01-01T00:00:00.000Z",
    updated_at: "2024-01-01T00:00:00.000Z",
  },
  {
    id: 2,
    name: "node",
    created_at: "2024-01-01T00:00:00.000Z",
    updated_at: "2024-01-01T00:00:00.000Z",
  },
];

describe("getTags", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns tags when response is ok and data is an array", async () => {
    const mockJson = { data: mockTags };

    vi.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: true,
      status: 200,
      statusText: "OK",
      json: async () => mockJson,
    } as unknown as Response);

    const result = await getTags();

    expect(result).toEqual(mockTags);
  });

  it("returns empty array and warns when response is not ok", async () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

    vi.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: "Server Error",
      json: async () => ({}),
    } as unknown as Response);

    const result = await getTags();

    expect(result).toEqual([]);
    expect(warnSpy).toHaveBeenCalled();
  });

  it("returns empty array and warns when data is not an array", async () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

    vi.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: true,
      status: 200,
      statusText: "OK",
      json: async () => ({ data: { invalid: true } }),
    } as unknown as Response);

    const result = await getTags();

    expect(result).toEqual([]);
    expect(warnSpy).toHaveBeenCalled();
  });

  it("returns empty array and logs error when fetch throws", async () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    vi.spyOn(global, "fetch").mockRejectedValueOnce(new Error("Network error"));

    const result = await getTags();

    expect(result).toEqual([]);
    expect(errorSpy).toHaveBeenCalled();
  });
});
