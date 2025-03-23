import { afterEach, describe, expect, Mock, test, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { getUserRole } from "../../api/userApi";
import { storage } from "../../utils";
import { useUserRol } from "../useUserRol";

vi.mock("../../api/userApi", () => ({
  getUserRole: vi.fn(),
}));

vi.mock("../../utils", () => ({
  storage: {
    save: vi.fn(),
  },
}));

const mockUser = {
  id: 123,
  name: "Test User",
  displayName: "Test User",
  photoURL: "http://example.com/photo.png",
};

describe("useUserRol", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("debería actualizar el rol y guardar el usuario actualizado en storage cuando se llama a handleSetRole", async () => {
    const mockRole = "admin";

    (getUserRole as Mock).mockResolvedValue(mockRole);

    const { result } = renderHook(() => useUserRol({ user: mockUser }));

    await act(async () => {
      result.current.handleSetRole();
    });

    expect(result.current.rol).toEqual({ ...mockUser, role: mockRole });
    expect(storage.save).toHaveBeenCalledWith("user", {
      ...mockUser,
      role: mockRole,
    });
  });

  test("no debería actualizar el rol si el usuario es null", async () => {
    const { result } = renderHook(() => useUserRol({ user: null }));

    await act(async () => {
      result.current.handleSetRole();
    });

    expect(result.current.rol).toBeUndefined();
    expect(storage.save).not.toHaveBeenCalled();
  });

  test("debería lanzar un error cuando getUserRole falla", async () => {
    const errorMessage = "Error al obtener el rol";
    (getUserRole as Mock).mockRejectedValue(new Error(errorMessage));
    const { result } = renderHook(() => useUserRol({ user: mockUser }));

    await expect(result.current.handleSetRole()).rejects.toThrow(errorMessage);
  });
});
