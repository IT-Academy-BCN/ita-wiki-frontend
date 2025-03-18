import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { getRole, createRole } from "./../endPointRoles";
import { API_URL, END_POINTS } from "../../config";
import moock from "../../moock/roles.json";
import type {
  IntRole,
  RoleCreationRequest,
  RoleCreationResponse,
} from "./../endPointRoles";

const mockRole = moock.role as IntRole;
const mockGithubId = 123456;

describe("endPointRoles", () => {
  beforeEach(() => {
    vi.spyOn(console, "error").mockImplementation(() => { });
    vi.spyOn(console, "warn").mockImplementation(() => { });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("getRole", () => {
    it("should return role data when API responds successfully", async () => {
      const mockRoleResponse = {
        role: {
          github_id: mockGithubId,
          role: "admin",
        },
      };

      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockRoleResponse),
        } as Response),
      );

      const result = await getRole(mockGithubId);

      expect(result).toEqual(mockRoleResponse.role);
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(
        `${API_URL}${END_POINTS.roles.lists}${mockGithubId}`,
        expect.objectContaining({ signal: expect.any(AbortSignal) }),
      );
    });

    it("should return mock role when API returns error", async () => {
      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: false,
          status: 404,
          statusText: "Not Found",
        } as Response),
      );

      const result = await getRole(mockGithubId);

      expect(result).toEqual(mockRole);
      expect(console.warn).toHaveBeenCalled();
    });

    it("should return mock role when API returns error response", async () => {
      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ error: "User not found" }),
        } as Response),
      );

      const result = await getRole(mockGithubId);

      expect(result).toEqual(mockRole);
      expect(console.warn).toHaveBeenCalled();
    });

    it("should handle AbortController errors", async () => {
      const abortError = new DOMException(
        "The operation was aborted",
        "AbortError",
      );
      global.fetch = vi.fn(() => Promise.reject(abortError));

      const result = await getRole(mockGithubId);

      expect(result).toEqual(mockRole);
      expect(console.warn).toHaveBeenCalledWith("Petición cancelada.");
    });

    it("should throw error for non-abort errors", async () => {
      global.fetch = vi.fn(() => Promise.reject(new Error("Network error")));

      await expect(getRole(mockGithubId)).rejects.toThrow(
        "Error al obtener los roles",
      );
      expect(console.error).toHaveBeenCalled();
    });
  });

  describe("createRole", () => {
    const mockRequestBody: RoleCreationRequest = {
      authorized_github_id: 555555,
      github_id: mockGithubId,
      role: "student",
    };

    const mockSuccessResponse: RoleCreationResponse = {
      message: "Role created successfully",
      role: {
        github_id: mockGithubId,
        role: "student",
      },
    };

    it("should successfully create a role", async () => {
      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockSuccessResponse),
        } as Response),
      );

      const result = await createRole(mockRequestBody);

      expect(result).toEqual(mockSuccessResponse);
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(`${API_URL}${END_POINTS.roles.post}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mockRequestBody),
      });
    });

    it("should throw error when API returns error", async () => {
      const errorMessage = "Unauthorized access";
      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: false,
          status: 401,
          statusText: "Unauthorized",
          json: () => Promise.resolve({ message: errorMessage }),
        } as Response),
      );

      await expect(createRole(mockRequestBody)).rejects.toThrow(errorMessage);
      expect(console.error).toHaveBeenCalled();
    });

    it("should handle network errors", async () => {
      global.fetch = vi.fn(() => Promise.reject(new Error("Network error")));

      await expect(createRole(mockRequestBody)).rejects.toThrow();
      expect(console.error).toHaveBeenCalled();
    });

    it("should use status text when error response has no message", async () => {
      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: false,
          status: 500,
          statusText: "Internal Server Error",
          json: () => Promise.resolve({}),
        } as Response),
      );

      await expect(createRole(mockRequestBody)).rejects.toThrow(
        "Error 500: Internal Server Error",
      );
      expect(console.error).toHaveBeenCalled();
    });
  });
});
