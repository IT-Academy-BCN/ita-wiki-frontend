import { renderHook, act, waitFor } from "@testing-library/react";
import { describe, expect, test, vi, beforeEach } from "vitest";
import { UserProvider, useUserContext } from "../UserContext";
import { IntUser } from "../../types";
import * as endpointLogin from "../../api/endpointLogin";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <UserProvider>{children}</UserProvider>
);

const mockCurrentUser: IntUser = {
  id: 12345,
  github_username: "mock_github_username",
  github_id: 2398498450,
  name: "Mock Name",
  email: "mockmail@mockmail.com",
  password: "FakePassword232435",
};

describe("UserContext", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  describe("useEffect - initializeAuth", () => {
    test("should load user from localStorage token on mount", async () => {
      // Mock token en localStorage
      const mockToken = "mock-stored-token-123";
      localStorage.setItem("auth_token", mockToken);

      // Mock getNewUser para que devuelva usuario exitosamente
      vi.spyOn(endpointLogin, "getNewUser").mockResolvedValueOnce(
        mockCurrentUser,
      );

      const { result } = renderHook(() => useUserContext(), { wrapper });

      // Esperar a que el useEffect se ejecute
      await waitFor(() => {
        expect(result.current.user).toEqual(mockCurrentUser);
      });

      expect(endpointLogin.getNewUser).toHaveBeenCalledWith(mockToken);
    });

    test("should clear localStorage and set error if getNewUser fails", async () => {
      // Mock token en localStorage
      const mockToken = "invalid-token-456";
      localStorage.setItem("auth_token", mockToken);

      // Mock getNewUser para que falle
      const errorMessage = "Unauthorized - Invalid token";
      vi.spyOn(endpointLogin, "getNewUser").mockRejectedValueOnce(
        new Error(errorMessage),
      );

      const { result } = renderHook(() => useUserContext(), { wrapper });

      // Esperar a que el useEffect se ejecute
      await waitFor(() => {
        expect(result.current.error).toBe(errorMessage);
      });

      expect(result.current.user).toBe(null);
      expect(localStorage.getItem("auth_token")).toBe(null);
    });

    test("should do nothing if no token in localStorage", async () => {
      // Sin token en localStorage
      const getNewUserSpy = vi.spyOn(endpointLogin, "getNewUser");

      const { result } = renderHook(() => useUserContext(), { wrapper });

      // Esperar un poco para asegurar que el useEffect se ejecutó
      await waitFor(() => {
        expect(result.current.user).toBe(null);
      });

      expect(getNewUserSpy).not.toHaveBeenCalled();
    });
  });

  describe("signIn", () => {
    test("should call login API and redirect on success", async () => {
      const mockRedirectUrl =
        "https://github.com/login/oauth/authorize?client_id=...";

      // Mock login para que devuelva redirect URL
      vi.spyOn(endpointLogin, "login").mockResolvedValueOnce(mockRedirectUrl);

      // Mock window.location.href como setter que captura el valor
      let capturedHref = "";
      Object.defineProperty(window, "location", {
        value: {
          set href(value: string) {
            capturedHref = value;
          },
          get href() {
            return capturedHref;
          },
        },
        writable: true,
        configurable: true,
      });

      const { result } = renderHook(() => useUserContext(), { wrapper });

      // Ejecutar signIn
      await act(async () => {
        await result.current.signIn();
      });

      // Verificar que llamó login
      expect(endpointLogin.login).toHaveBeenCalled();

      // Verificar que redirigió
      expect(capturedHref).toBe(mockRedirectUrl);

      // Verificar estados
      expect(result.current.error).toBe(null);
      expect(result.current.loading).toBe(false);
    });

    test("should set error and stop loading if login fails", async () => {
      const errorMessage = "Failed to connect to GitHub";

      // Mock login para que falle
      vi.spyOn(endpointLogin, "login").mockRejectedValueOnce(
        new Error(errorMessage),
      );

      const { result } = renderHook(() => useUserContext(), { wrapper });

      // Ejecutar signIn
      await act(async () => {
        await result.current.signIn();
      });

      // Verificar que seteó el error
      expect(result.current.error).toBe(errorMessage);

      // Verificar que loading volvió a false
      expect(result.current.loading).toBe(false);
    });
  });

  describe("signOut", () => {
    test("should call logout API and clear localStorage when token exists", async () => {
      const mockToken = "mock-token-to-logout";
      localStorage.setItem("auth_token", mockToken);

      // Mock getNewUser para el useEffect (para que no falle al montar)
      vi.spyOn(endpointLogin, "getNewUser").mockResolvedValueOnce(
        mockCurrentUser,
      );

      // Mock logout API
      const logoutSpy = vi
        .spyOn(endpointLogin, "logout")
        .mockResolvedValueOnce(undefined);

      const { result } = renderHook(() => useUserContext(), { wrapper });

      // Esperar a que el useEffect cargue el usuario
      await waitFor(() => {
        expect(result.current.user).toEqual(mockCurrentUser);
      });

      // Ejecutar signOut
      await act(async () => {
        await result.current.signOut();
      });

      // Verificar que llamó logout API con el token
      expect(logoutSpy).toHaveBeenCalledWith(mockToken);

      // Verificar que limpió localStorage
      expect(localStorage.getItem("auth_token")).toBe(null);

      // Verificar que limpió el estado
      expect(result.current.user).toBe(null);
      expect(result.current.error).toBe(null);
      expect(result.current.isAuthenticated).toBe(false);
    });

    test("should clear session even if logout API fails", async () => {
      const mockToken = "mock-token-456";
      localStorage.setItem("auth_token", mockToken);

      // Mock getNewUser para el useEffect
      vi.spyOn(endpointLogin, "getNewUser").mockResolvedValueOnce(
        mockCurrentUser,
      );

      // Mock logout API para que falle
      const logoutSpy = vi
        .spyOn(endpointLogin, "logout")
        .mockRejectedValueOnce(new Error("Server error"));

      const { result } = renderHook(() => useUserContext(), { wrapper });

      // Esperar a que el useEffect cargue el usuario
      await waitFor(() => {
        expect(result.current.user).toEqual(mockCurrentUser);
      });

      // Ejecutar signOut
      await act(async () => {
        await result.current.signOut();
      });

      // Verificar que intentó llamar logout
      expect(logoutSpy).toHaveBeenCalledWith(mockToken);

      // Verificar que limpió localStorage (a pesar del error)
      expect(localStorage.getItem("auth_token")).toBe(null);

      // Verificar que limpió el estado local
      expect(result.current.user).toBe(null);
      expect(result.current.error).toBe(null);
    });

    test("should only clear local state if no token exists", async () => {
      // Sin token en localStorage
      const logoutSpy = vi.spyOn(endpointLogin, "logout");

      const { result } = renderHook(() => useUserContext(), { wrapper });

      // Setear usuario primero
      act(() => {
        result.current.setUser(mockCurrentUser);
        result.current.setError("Some error");
      });

      // Ejecutar signOut
      await act(async () => {
        await result.current.signOut();
      });

      // Verificar que NO llamó logout API (no hay token)
      expect(logoutSpy).not.toHaveBeenCalled();

      // Verificar que limpió el estado local
      expect(result.current.user).toBe(null);
      expect(result.current.error).toBe(null);
      expect(result.current.isAuthenticated).toBe(false);
    });
  });

  describe("Basic operations", () => {
    test("should provide default value (user is null)", () => {
      const { result } = renderHook(() => useUserContext(), { wrapper });
      expect(result.current.user).toBe(null);
      expect(result.current.error).toBe(null);
      expect(result.current.isAuthenticated).toBe(false);
    });

    test("should update the user with setUser", () => {
      const { result } = renderHook(() => useUserContext(), { wrapper });

      act(() => {
        result.current.setUser(mockCurrentUser);
      });

      expect(result.current.user).toEqual(mockCurrentUser);
      expect(result.current.isAuthenticated).toBe(true);
    });

    test("should save user with saveUser", () => {
      const { result } = renderHook(() => useUserContext(), { wrapper });

      act(() => {
        result.current.saveUser(mockCurrentUser);
      });

      expect(result.current.user).toEqual(mockCurrentUser);
    });

    test("should logout (set user and error to null)", () => {
      const { result } = renderHook(() => useUserContext(), { wrapper });

      act(() => {
        result.current.setUser(mockCurrentUser);
        result.current.setError("Some error");
      });

      act(() => {
        result.current.signOut();
      });

      expect(result.current.user).toBe(null);
      expect(result.current.error).toBe(null);
      expect(result.current.isAuthenticated).toBe(false);
    });

    test("should throw if used outside of provider", () => {
      const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
      expect(() => renderHook(() => useUserContext())).toThrow(
        "useUser must be used within a UserProvider",
      );
      errorSpy.mockRestore();
    });
  });
});
