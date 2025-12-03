import { describe, it, expect, vi, afterEach } from "vitest";
import { joinProject } from "../endPointJoinProject";

const listProjectId = 1;

describe("endPointJoinProject - joinProject", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns response json when request is ok", async () => {
    const mockData = { success: true };

    vi.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => mockData,
    } as unknown as Response);

    const result = await joinProject(listProjectId, "Backend Developer");

    expect(result).toEqual(mockData);
  });

  it("returns response json when request is ok for frontend role", async () => {
    const mockData = { success: true };

    vi.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => mockData,
    } as unknown as Response);

    const result = await joinProject(listProjectId, "Frontend Developer");

    expect(result).toEqual(mockData);
  });

  it.each([400, 401, 403, 500])(
    "returns null and logs warning when response is not ok (%s)",
    async (statusCode) => {
      const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

      vi.spyOn(global, "fetch").mockResolvedValueOnce({
        ok: false,
        status: statusCode,
        json: async () => ({}),
      } as unknown as Response);

      const result = await joinProject(listProjectId, "Backend Developer");

      expect(result).toBeNull();
      expect(warnSpy).toHaveBeenCalled();
    },
  );

  it("throws when fetch rejects", async () => {
    vi.spyOn(global, "fetch").mockRejectedValueOnce(new Error("Network error"));

    await expect(
      joinProject(listProjectId, "Backend Developer"),
    ).rejects.toThrow("Network error");
  });
});
