import { renderHook, act } from "@testing-library/react";
import { describe, expect, test, vi, beforeEach } from "vitest";
import { UserProvider, useUserContext } from "../context/UserContext";
import { IntUser } from "../types";

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
  });

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
