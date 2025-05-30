import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { changeRole } from "./endPointChangeRole";
import { getUserRole } from "./userApi";
import { createRole } from "./endPointRoles";

vi.mock("./userApi", () => ({
  getUserRole: vi.fn(),
}));

vi.mock("./endPointRoles", () => ({
  createRole: vi.fn(),
}));

describe("changeRole", () => {
  const mockGithubId = 123;
  const mockRole = "student";

  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should create a new role for an anonymous user", async () => {
    (getUserRole as ReturnType<typeof vi.fn>).mockResolvedValueOnce(null);
    (createRole as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      message: "Role created successfully",
      role: {
        github_id: mockGithubId,
        role: mockRole,
      },
    });

    const request = {
      github_id: mockGithubId,
      role: mockRole,
    };

    const response = await changeRole(request, mockGithubId);

    expect(getUserRole).toHaveBeenCalledWith(mockGithubId);
    expect(createRole).toHaveBeenCalledWith({
      github_id: mockGithubId,
      role: mockRole,
      authorized_github_id: 1,
    });
    expect(response).toEqual({
      message: "Role created successfully",
      role: {
        github_id: mockGithubId,
        role: mockRole,
      },
    });
  });

  it("should update role for a user with existing role", async () => {
    (getUserRole as ReturnType<typeof vi.fn>).mockResolvedValueOnce("mentor");

    const mockFetchResponse = {
      ok: true,
      json: async () => ({
        message: "Role updated successfully",
        role: {
          github_id: mockGithubId,
          role: "admin",
        },
      }),
    };

    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce(
      mockFetchResponse as Response,
    );

    const request = {
      github_id: mockGithubId,
      role: "admin",
    };

    const response = await changeRole(request, mockGithubId);

    expect(getUserRole).toHaveBeenCalledWith(mockGithubId);
    expect(fetch).toHaveBeenCalled();
    expect(response).toEqual({
      message: "Role updated successfully",
      role: {
        github_id: mockGithubId,
        role: "admin",
      },
    });
  });
});
