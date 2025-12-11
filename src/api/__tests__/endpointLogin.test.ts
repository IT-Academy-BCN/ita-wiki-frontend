import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import { getNewUser, login, logout } from "../endpointLogin";

const mockLoginResponse = {
  success: true,
  redirect_url: "https://github.com/login/oauth/authorize?client_id=...",
  message: "Redirect to GitHub",
};

const mockCurrentUser = {
  id: 12345,
  github_username: "mock_github_username",
  github_id: 2398498450,
  name: "Mock Name",
  email: "mockmail@mockmail.com",
  password: "FakePassword232435",
}

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

describe("get current user data", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns user data when token is valid", async () => {
    const mockToken = "mock-bearer-token-12345";
    
    vi.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: true,
      status: 200,
      statusText: "OK",
      json: async () => mockCurrentUser,
    } as Response);

    const result = await getNewUser(mockToken);
    
    expect(result).toEqual(mockCurrentUser);
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("auth/me"),
      expect.objectContaining({
        method: "GET",
        headers: expect.objectContaining({
          "Authorization": `Bearer ${mockToken}`
        })
      })
    );
  });

  it("throws an error when response is not ok", async () => {
    const mockToken = "mock-bearer-token-12345";
    
    vi.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: false,
      status: 401,
    } as Response);

    await expect(getNewUser(mockToken)).rejects.toThrow("Error 401");
  });
});

describe("logout", () => {
  beforeEach(() => {
    // Limpiar localStorage antes de cada test
    localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("calls logout endpoint and removes token from localStorage", async () => {
    const mockToken = "mock-bearer-token-12345";
    
    // Simular que hay un token en localStorage
    localStorage.setItem('auth_token', mockToken);
    
    vi.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: true,
      status: 200,
      statusText: "OK",
    } as Response);

    await logout(mockToken);
    
    // Verificar que llamó al endpoint correcto
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("auth/logout"),
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          "Authorization": `Bearer ${mockToken}`
        })
      })
    );
    
    // Verificar que eliminó el token de localStorage
    expect(localStorage.getItem('auth_token')).toBeNull();
  });

  it("removes token from localStorage even if server request fails", async () => {
    const mockToken = "mock-bearer-token-12345";
    
    localStorage.setItem('auth_token', mockToken);
    
    vi.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: false,
      status: 500,
    } as Response);

    // No debería lanzar error, debe limpiar localStorage de todos modos
    await logout(mockToken);
    
    expect(localStorage.getItem('auth_token')).toBeNull();
  });
})