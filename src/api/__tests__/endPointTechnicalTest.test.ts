import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
  afterEach,
  type Mock,
} from "vitest";
import {
  createTechnicalTest,
  fetchTechnicalTestById,
} from "../endPointTechnicalTests";
import { API_URL, END_POINTS } from "../../config";

describe("createTechnicalTest", () => {
  const mockFormData = new FormData();
  mockFormData.append("title", "Prueba técnica test");

  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("debe hacer POST al endpoint correcto y retornar respuesta exitosa", async () => {
    const mockResponseData = { message: "Guardado exitoso" };

    //@ts-expect-error: mocking FormData for test
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponseData,
    });

    const result = await createTechnicalTest(mockFormData);

    expect(fetch).toHaveBeenCalledWith(
      `${API_URL}${END_POINTS.technicaltests.create}`,
      expect.objectContaining({
        method: "POST",
        body: mockFormData,
      }),
    );

    expect(result).toEqual(mockResponseData);
  });

  it("debe lanzar error si la respuesta no es ok", async () => {
    // @ts-expect-error instead of using fetch.mockResolvedValueOnce, we use fetch.mockRejectedValueOnce
    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: "Error de prueba" }),
      status: 400,
      statusText: "Bad Request",
    });

    await expect(createTechnicalTest(mockFormData)).rejects.toThrow(
      "Error de prueba",
    );
  });
});

vi.mock("../../config", () => ({
  API_URL: "https://api.fake",
  END_POINTS: {
    technicaltests: { get: "/tests" },
  },
}));

const TEST_ID = 123;
const MOCK_DATA = {
  data: {
    id: 123,
    title: "Prova tècnica React",
    language: "TypeScript",
    description: "Desenvolupa una aplicació React senzilla.",
    tags: ["database", "frontend"],
  },
};

describe("fetchTechnicalTestById", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    global.fetch = vi.fn();
  });

  it("hauria de retornar les dades quan la resposta és correcta (ok)", async () => {
    (global.fetch as Mock).mockResolvedValue({
      ok: true,
      json: async () => MOCK_DATA,
    });

    const result = await fetchTechnicalTestById(TEST_ID);

    expect(global.fetch).toHaveBeenCalledTimes(1);

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("/tests/123"),
      expect.objectContaining({ signal: expect.any(AbortSignal) }),
    );

    expect(result).toEqual(MOCK_DATA.data);
  });

  it("hauria de llançar un error i fer console.error quan la resposta no és ok", async () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    (global.fetch as Mock).mockResolvedValue({
      ok: false,
      status: 404,
    });

    const result = await fetchTechnicalTestById(TEST_ID);

    expect(result).toBeUndefined();

    expect(consoleSpy).toHaveBeenCalledWith(expect.any(Error));

    expect(consoleSpy.mock.calls[0][0].message).toBe(
      "Failed to fetch technical tests",
    );

    consoleSpy.mockRestore();
  });

  it("hauria de gestionar excepcions de xarxa (ex: servidor caigut)", async () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    (global.fetch as Mock).mockRejectedValue(new Error("Network Error"));

    await fetchTechnicalTestById(TEST_ID);

    expect(consoleSpy).toHaveBeenCalledWith(expect.any(Error));

    consoleSpy.mockRestore();
  });
});
