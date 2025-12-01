import { describe, it, expect, vi, afterEach } from "vitest";
import { joinProject, type ProgrammingRole } from "../endPointJoinProject";

const listProjectId = 1;
const role: ProgrammingRole = "Backend Developer";

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

    const result = await joinProject(listProjectId, role);

    expect(result).toEqual(mockData);
  });

  it("returns null and logs warning when response is not ok", async () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

    vi.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: async () => ({}),
    } as unknown as Response);

    const result = await joinProject(listProjectId, role);

    expect(result).toBeNull();
    expect(warnSpy).toHaveBeenCalled();
  });

  it("throws when fetch rejects", async () => {
    vi.spyOn(global, "fetch").mockRejectedValueOnce(new Error("Network error"));

    await expect(joinProject(listProjectId, role)).rejects.toThrow(
      "Network error",
    );
  });
});
