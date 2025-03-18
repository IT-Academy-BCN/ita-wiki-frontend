import { describe, it, expect, vi, afterEach } from "vitest";
import { getUserRole } from "../api/userApi";

const API_URL = "http://localhost:8000/api/";

describe("getUserRole", () => {
  afterEach(() => {
    vi.restoreAllMocks(); // Restaurar mocks después de cada test
  });

  it("debe devolver el rol del usuario cuando la API responde correctamente", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ role: { role: "admin" } }),
      }),
    ) as unknown as typeof fetch;

    const role = await getUserRole(1234567);

    expect(global.fetch).toHaveBeenCalledWith(`${API_URL}login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: "1234567", // ✅ Enviar solo el ID como string plano
    });

    expect(role).toBe("admin");
  });

  it("debe manejar errores inesperados como fallos de red", async () => {
    global.fetch = vi.fn(() => Promise.reject(new Error("Network error")));

    await expect(getUserRole(7777777)).rejects.toThrow("Network error");
  });
});
