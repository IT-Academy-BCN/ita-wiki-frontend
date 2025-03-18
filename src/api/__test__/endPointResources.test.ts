import { describe, it, expect, vi } from "vitest";
import { getResources } from "./../endPointResources";
import moock from "../../moock/resources.json";
import { IntResource } from "../../types";

const moockResources = moock.resources.map((resource) => ({
  ...resource,
  create_at: "2025-02-25 00:00:00",
  update_at: "2025-02-25 00:00:00",
})) as IntResource[];

describe("getResources", () => {
  beforeEach(() => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.spyOn(console, "warn").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("debería lanzar un error si fetch falla", async () => {
    global.fetch = vi.fn(() =>
      Promise.reject(new Error("Error al obtener los recursos")),
    );

    await expect(getResources()).rejects.toThrow(
      "Error al obtener los recursos",
    );
  });

  it("debería devolver una lista de recursos vacía si la API responde correctamente pero sin datos", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([]),
      } as Response),
    );

    const resources = await getResources();
    expect(resources).toBeInstanceOf(Array);
  });

  it("debería devolver los datos de la API cuando la respuesta es exitosa", async () => {
    const mockData = [
      { id: 1, name: "Recurso 1" },
      { id: 2, name: "Recurso 2" },
    ];

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      } as Response),
    );

    const resources = await getResources();

    expect(resources).toEqual(mockData);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("resources/"),
      expect.objectContaining({ signal: expect.any(AbortSignal) }),
    );
  });

  it("debería devolver los datos mockeados si la API devuelve un error", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        status: 500,
        statusText: "Internal Server Error",
      } as Response),
    );

    const resources = await getResources();

    expect(resources).toEqual(moockResources);
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
