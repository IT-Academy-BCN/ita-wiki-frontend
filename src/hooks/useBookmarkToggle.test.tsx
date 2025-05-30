import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useBookmarkToggle } from "./useBookmarkToggle";
import { useUserContext } from "../context/UserContext";
import { createBookmark, deleteBookmark } from "../api/endPointBookmark";
import {
  IntResource,
  IntBookmarkElement,
  Category,
  Theme,
  ResourceType,
} from "../types";

vi.mock("../context/UserContext");
vi.mock("../api/endPointBookmark");

describe("useBookmarkToggle", () => {
  const mockUser = {
    id: 123,
    name: "Test User",
    displayName: "Test Display Name",
    photoURL: "https://example.com/photo.jpg",
    role: "student",
  };

  const mockUserRoleCantBookmark = {
    id: 123,
    name: "Test User",
    displayName: "Test Display Name",
    photoURL: "https://example.com/photo.jpg",
    role: "mentor",
  };

  const mockResource: IntResource = {
    id: 456,
    github_id: 123, // Match the user's id to simulate the owner
    title: "Test Resource",
    description: "Resource Description",
    url: "https://example.com/resource",
    created_at: "2023-01-01T00:00:00Z",
    type: "tutorial" as ResourceType,
    category: "frontend" as Category,
    theme: "react" as Theme,
    like_count: 10,
    bookmark_count: 5,
    comment_count: 3,
  };

  const mockSetBookmarkedResources = vi.fn();

  const mockDateISO = "2023-04-15T10:30:00Z";
  const originalDateNow = Date.now;
  const originalToISOString = Date.prototype.toISOString;

  beforeEach(() => {
    vi.resetAllMocks();

    const mockDate = new Date(mockDateISO);
    global.Date.now = vi.fn(() => mockDate.getTime());
    Date.prototype.toISOString = vi.fn(() => mockDateISO);

    vi.mocked(useUserContext).mockReturnValue({
      user: mockUser,
      isAuthenticated: true,
      signIn: vi.fn(),
      signOut: vi.fn(),
      saveUser: vi.fn(),
      setUser: vi.fn(),
      setError: vi.fn(),
      error: null,
    });

    vi.mocked(createBookmark).mockResolvedValue({
      id: 789, // This is the bookmark id
      github_id: 123, // User id
      resource_id: 456, // Resource id
      created_at: "2023-04-15T10:30:00Z",
      updated_at: "2023-04-15T10:30:00Z",
    });

    vi.mocked(deleteBookmark).mockResolvedValue(true);
  });

  afterEach(() => {
    global.Date.now = originalDateNow;
    Date.prototype.toISOString = originalToISOString;
  });

  it("returns a toggleBookmark function", () => {
    const { result } = renderHook(() => useBookmarkToggle());
    expect(result.current.toggleBookmark).toBeDefined();
    expect(typeof result.current.toggleBookmark).toBe("function");
  });

  describe("toggleBookmark function", () => {
    it("adds a bookmark when resource is not bookmarked", async () => {
      const { result } = renderHook(() => useBookmarkToggle());
      const bookmarkedResources: IntBookmarkElement[] = [];

      await act(async () => {
        await result.current.toggleBookmark(
          mockResource,
          bookmarkedResources,
          mockSetBookmarkedResources,
        );
      });

      // Verify state update function
      const setStateCallback = mockSetBookmarkedResources.mock.calls[0][0];
      const updatedState = setStateCallback(bookmarkedResources);

      // Check if new bookmark was added with correct structure
      expect(updatedState).toHaveLength(1);
      expect(updatedState[0]).toEqual({
        id: mockResource.id,
        github_id: mockUser.id,
        title: mockResource.title,
        description: mockResource.description,
        url: mockResource.url,
        created_at: mockDateISO,
      });

      // Verify API call
      expect(createBookmark).toHaveBeenCalledWith(mockUser.id, mockResource.id);
      expect(deleteBookmark).not.toHaveBeenCalled();
    });

    it("removes a bookmark when resource is already bookmarked", async () => {
      const { result } = renderHook(() => useBookmarkToggle());

      const existingBookmark: IntBookmarkElement = {
        id: mockResource.id!,
        github_id: mockUser.id,
        title: mockResource.title,
        description: mockResource.description,
        url: mockResource.url,
        created_at: "2023-01-01T00:00:00Z",
      };

      const bookmarkedResources: IntBookmarkElement[] = [
        existingBookmark,
        {
          id: 999,
          github_id: mockUser.id,
          title: "Another Resource",
          description: "Another Description",
          url: "https://example.com/another",
          created_at: "2023-02-01T00:00:00Z",
        },
      ];

      await act(async () => {
        await result.current.toggleBookmark(
          mockResource,
          bookmarkedResources,
          mockSetBookmarkedResources,
        );
      });

      const setStateCallback = mockSetBookmarkedResources.mock.calls[0][0];
      const updatedState = setStateCallback(bookmarkedResources);

      expect(updatedState).toHaveLength(1);
      expect(updatedState[0].id).toBe(999);
      expect(
        updatedState.find((b: IntBookmarkElement) => b.id === mockResource.id),
      ).toBeUndefined();

      expect(deleteBookmark).toHaveBeenCalledWith(mockUser.id, mockResource.id);
      expect(createBookmark).not.toHaveBeenCalled();
    });

    it("sorts bookmarks by created_at date when adding a new one", async () => {
      const { result } = renderHook(() => useBookmarkToggle());

      // Create a different resource to avoid collision with existingBookmark
      const newResource: IntResource = {
        ...mockResource,
        id: 789, // Different ID
        title: "New Resource",
      };

      const bookmarkedResources: IntBookmarkElement[] = [
        {
          id: 456, // Matches mockResource id
          github_id: mockUser.id,
          title: "Old Resource",
          description: "Old Description",
          url: "https://example.com/old",
          created_at: "2023-01-10T00:00:00Z",
        },
      ];

      await act(async () => {
        await result.current.toggleBookmark(
          newResource,
          bookmarkedResources,
          mockSetBookmarkedResources,
        );
      });

      // Verify state update function
      const setStateCallback = mockSetBookmarkedResources.mock.calls[0][0];
      const updatedState = setStateCallback(bookmarkedResources);

      // Check if bookmarks are sorted by created_at (newest first)
      expect(updatedState).toHaveLength(2);
      expect(updatedState[0].id).toBe(newResource.id); // Newest should be first
      expect(updatedState[1].id).toBe(456); // Older bookmark
    });

    it("handles errors during API calls", async () => {
      const consoleErrorSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});
      vi.mocked(createBookmark).mockRejectedValue(new Error("API Error"));

      const { result } = renderHook(() => useBookmarkToggle());
      const bookmarkedResources: IntBookmarkElement[] = [];

      let caughtError: Error | null = null;

      await act(async () => {
        try {
          await result.current.toggleBookmark(
            mockResource,
            bookmarkedResources,
            mockSetBookmarkedResources,
          );
        } catch (error) {
          caughtError = error as Error;
        }
      });

      // Verify state was updated despite API error
      expect(mockSetBookmarkedResources).toHaveBeenCalled();

      // Verify error was logged and thrown
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Error toggling bookmark:",
        expect.any(Error),
      );
      expect(caughtError).not.toBeNull();

      consoleErrorSpy.mockRestore();
    });

    it("does nothing when user is not authenticated", async () => {
      // Mock user as null to simulate unauthenticated state
      vi.mocked(useUserContext).mockReturnValue({
        user: null,
        isAuthenticated: false,
        signIn: vi.fn(),
        signOut: vi.fn(),
        saveUser: vi.fn(),
        setUser: vi.fn(),
        setError: vi.fn(),
        error: null,
      });

      const { result } = renderHook(() => useBookmarkToggle());
      const bookmarkedResources: IntBookmarkElement[] = [];

      await act(async () => {
        await result.current.toggleBookmark(
          mockResource,
          bookmarkedResources,
          mockSetBookmarkedResources,
        );
      });

      // Verify no state update or API calls occurred
      expect(mockSetBookmarkedResources).not.toHaveBeenCalled();
      expect(createBookmark).not.toHaveBeenCalled();
      expect(deleteBookmark).not.toHaveBeenCalled();
    });

    it("does nothing when user role has no permission to bookmark", async () => {
      // Mock user as role mentor to simulate unauthorized role
      vi.mocked(useUserContext).mockReturnValue({
        user: mockUserRoleCantBookmark,
        isAuthenticated: true,
        signIn: vi.fn(),
        signOut: vi.fn(),
        saveUser: vi.fn(),
        setUser: vi.fn(),
        setError: vi.fn(),
        error: null,
      });

      const { result } = renderHook(() => useBookmarkToggle());
      const bookmarkedResources: IntBookmarkElement[] = [];

      await act(async () => {
        await result.current.toggleBookmark(
          mockResource,
          bookmarkedResources,
          mockSetBookmarkedResources,
        );
      });

      // Verify no state update or API calls occurred
      expect(mockSetBookmarkedResources).not.toHaveBeenCalled();
      expect(createBookmark).not.toHaveBeenCalled();
      expect(deleteBookmark).not.toHaveBeenCalled();
    });
  });
});
