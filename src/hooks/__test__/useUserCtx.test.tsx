
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";// Importamos el módulo para hacer mock
import { useUserCtx } from "../useUserCtx";
import UserCtxProvider from "../../context/UserCtxProvider";
import { useUser } from "../useUser";

// Mock de useUser usando vi.mock()
vi.mock("../useUser", async () => {
  const actual = await vi.importActual<typeof import("../useUser")>(
    "../useUser"
  );
  return {
    ...actual,
    useUser: vi.fn(() => ({
      user: {
        id: 1,
        displayName: "Usuario de Prueba",
        photoURL: "http://ejemplo.com/foto.png",
      },
      saveUser: vi.fn(),
      signIn: vi.fn(),
      signOut: vi.fn(),
      error: null,
      setError: vi.fn(),
    })),
  };
});

describe("useCtxUser hook con UserCtxProvider", () => {
  const TestComponent = () => {
    const { user } = useUserCtx();
    return (
      <div>
        <p data-testid="user-name">{user.displayName}</p>
        <p data-testid="user-role">{user.role || "Sin rol"}</p>
      </div>
    );
  };

  it("debe proporcionar el contexto de usuario correctamente sin role", () => {
    render(
      <UserCtxProvider>
        <TestComponent />
      </UserCtxProvider>
    );

    expect(screen.getByTestId("user-name").textContent).toBe("Usuario de Prueba");
    expect(screen.getByTestId("user-role").textContent).toBe("Sin rol");
  });

  it("debe permitir un usuario con role definido", () => {
    vi.mocked(useUser).mockReturnValue({
      user: {
        id: 2,
        displayName: "Admin User",
        photoURL: "http://ejemplo.com/admin.png",
        role: "admin",
      },
      saveUser: vi.fn(),
      signIn: vi.fn(),
      signOut: vi.fn(),
      error: null,
      setError: vi.fn(),
      handleSetRole: vi.fn(() => Promise.resolve())
    });

    render(
      <UserCtxProvider>
        <TestComponent />
      </UserCtxProvider>
    );

    expect(screen.getByTestId("user-name").textContent).toBe("Admin User");
    expect(screen.getByTestId("user-role").textContent).toBe("admin");
  });
});
