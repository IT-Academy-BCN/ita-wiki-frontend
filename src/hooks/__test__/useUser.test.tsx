import { act, renderHook } from "@testing-library/react";
import { Mock, vi } from "vitest";
import { signInWithGitHub } from "../../api/firebase";
import { storage } from "../../utils";
import { useUser } from "../useUser";
import { getUserRole } from "../../api/userApi";

vi.mock("../../api/firebase", () => ({
  signInWithGitHub: vi.fn(),
}));

vi.mock("../../utils", () => ({
  storage: {
    save: vi.fn(),
    remove: vi.fn(),
    get: vi.fn(),
  },
}));

vi.mock("../../api/userApi", () => ({
  getUserRole: vi.fn(),
}));

describe("useUser hook", () => {
  beforeEach(() => {
    vi.spyOn(console, "error").mockImplementation(() => { });
    vi.spyOn(console, "warn").mockImplementation(() => { });
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should initialize with a user from storage", () => {
    const mockUser = { id: 1, displayName: "John Doe", photoURL: "url" };
    (storage.get as Mock).mockReturnValue(mockUser);

    const { result } = renderHook(() => useUser());
    expect(result.current.user).toEqual(mockUser);
  });

  it("should sign in a user successfully", async () => {
    const mockUser = { id: 1, displayName: "John Doe", photoURL: "url" };
    (signInWithGitHub as unknown as Mock).mockResolvedValue(mockUser);
    (getUserRole as unknown as Mock).mockResolvedValue(undefined);

    const { result } = renderHook(() => useUser());

    await act(async () => {
      await result.current.signIn();
    });

    expect(result.current.user).toEqual(mockUser);
    expect(storage.save).toHaveBeenCalledWith("user", mockUser);
  });

  it("should handle sign-in errors", async () => {
    const errorMessage = "Authentication failed";
    (signInWithGitHub as unknown as Mock).mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useUser());

    await act(async () => {
      await result.current.signIn();
    });

    expect(result.current.error).toBe(errorMessage);
  });

  it("should sign out a user", () => {
    const mockUser = { id: 1, displayName: "John Doe", photoURL: "url" };
    (storage.get as Mock).mockReturnValue(mockUser);

    const { result } = renderHook(() => useUser());

    act(() => {
      result.current.signOut();
    });

    expect(result.current.user).toBeNull();
    expect(storage.remove).toHaveBeenCalledWith("user");
  });

});
