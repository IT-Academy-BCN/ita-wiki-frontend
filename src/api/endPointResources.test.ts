import { describe, it, expect, vi } from "vitest";
import { getResources } from "./endPointResources";
// import moock from "../moock/resources.json";
import { IntResource } from "../types";

const mockResources: IntResource[] = [
  {
    id: 1,
    title: "Recurso 1",
    description: "Desc 1",
    type: "Video",
    created_at: "2025-02-25 00:00:00",
    updated_at: "2025-02-25 00:00:00",
    like_count: 0,
    bookmark_count: 0,
    comment_count: 0,
  } as unknown as IntResource,
  {
    id: 2,
    title: "Recurso 2",
    description: "Desc 2",
    type: "Blog",
    created_at: "2025-02-25 00:00:00",
    updated_at: "2025-02-25 00:00:00",
    like_count: 0,
    bookmark_count: 0,
    comment_count: 0,
  } as unknown as IntResource,
];

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
    expect(resources).toHaveLength(0);
  });

  it("debería devolver los datos de la API cuando la respuesta es exitosa", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResources),
      } as Response),
    );

    const resources = await getResources();

    expect(resources).toEqual(mockResources);
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
    expect(Array.isArray(resources)).toBe(true);
    expect(resources).toHaveLength(0);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("debería devolver la lista de recursos interna cuando la API devuelve un objeto", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ resources: mockResources }),
      } as Response),
    );

    const resources = await getResources();
    expect(resources).toEqual(mockResources);
    expect(resources.length).toBeGreaterThanOrEqual(1);
  });
});
