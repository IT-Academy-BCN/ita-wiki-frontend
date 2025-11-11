import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { createCodeConnect, CodeConnectError } from "./endPointCodeConnect";

vi.mock("../config", () => ({
  API_URL: "https://localhost:8000",
  END_POINTS: {
    codeconnect: {
      post: "/codeconnect/create",
    },
  },
}));

describe("createCodeConnect", () => {
  let mockFetch: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockFetch = vi.fn();
    global.fetch = mockFetch;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should create and return on successful request", async () => {
    const mockResponseData = {
      id: "123",
      message: "Code connect created successfully",
      status: "success",
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => mockResponseData,
    });

    const formData = new FormData();
    formData.append("name", "test-connection");
    formData.append("description", "Lorem ipsum lorem");
    formData.append("roadmap", "Calar ipsum lorem");

    // Act
    const result = await createCodeConnect(formData);

    // Assert
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(
      "https://localhost:8000/codeconnect/create",
      expect.objectContaining({
        method: "POST",
        body: formData,
        signal: expect.any(AbortSignal),
      }),
    );

    expect(result).toHaveProperty("data");
    expect(result).toHaveProperty("cancel");
    expect(result.data).toEqual(mockResponseData);
    expect(typeof result.cancel).toBe("function");
  });

  it("should throw an error on failed request", async () => {
    const mockErrorData = {
      message: "Invalid code format",
      code: "INVALID_FORMAT",
    };

    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
      statusText: "Bad Request",
      json: async () => mockErrorData,
    });

    const formData = new FormData();
    formData.append("code", "invalid-code");

    await expect(createCodeConnect(formData)).rejects.toMatchObject({
      message: "Invalid code format",
      status: 400,
      code: "INVALID_FORMAT",
    } as CodeConnectError);

    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it("should throw an error on network failure", async () => {
    mockFetch.mockRejectedValueOnce(new TypeError("Failed to fetch"));
    const formData = new FormData();

    await expect(createCodeConnect(formData)).rejects.toMatchObject({
      message: "Error de conexión. Verifica tu conexión a internet.",
      code: "NETWORK_ERROR",
    } as CodeConnectError);

    expect(mockFetch).toHaveBeenCalledTimes(1);
  });
});
