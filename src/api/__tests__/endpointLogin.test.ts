import { describe, it, expect, vi, afterEach } from "vitest";
import { login } from "../endpointLogin";

const mockLoginResponse = {
  success: true,
  redirect_url: "https://github.com/login/oauth/authorize?client_id=...",
  message: "Redirect to GitHub",
};

describe("login using GitHub", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns GitHub redirect link", async () => {
    vi.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: true,
      status: 200,
      statusText: "OK",
      json: async () => mockLoginResponse,
    } as Response);

    const result = await login();

    expect(result).toEqual(
      expect.stringContaining("github.com/login/oauth/authorize"),
    );
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("auth/github/redirect"),
      expect.objectContaining({
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }),
    );
  });

  it("throws an error when response is not ok", async () => {
    vi.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: false,
      status: 500,
    } as Response);

    await expect(login()).rejects.toThrow("Error 500");
  });
});
