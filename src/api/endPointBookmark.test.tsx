import { describe, it, expect, vi } from "vitest";
import { getBookmarks } from "./endPointBookmark";
import { API_URL, END_POINTS } from "../config";
import bookmarksArr from "../moock/bookmarks.json";

describe("getBookmarks", () => {
  const mockGithubId = "test-github-id";
  const mockBookmarks = [{ id: 1, title: "Test Bookmark" }];

  it("should return bookmarks on successful fetch", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockBookmarks),
    });

    const result = await getBookmarks(mockGithubId);

    expect(global.fetch).toHaveBeenCalledWith(
      `${API_URL}/${END_POINTS.bookmarks.get}${mockGithubId}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        signal: expect.any(AbortSignal),
      },
    );
    expect(result).toEqual(mockBookmarks);
  });

  it("should return bookmarksArr on failed fetch", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
    });

    const result = await getBookmarks(mockGithubId);

    expect(result).toEqual(bookmarksArr);
  });

  it("should return bookmarksArr on fetch error", async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error("Fetch error"));

    const result = await getBookmarks(mockGithubId);

    expect(result).toEqual(bookmarksArr);
  });

  it("should handle AbortError", async () => {
    global.fetch = vi
      .fn()
      .mockRejectedValue(new DOMException("Aborted", "AbortError"));

    const result = await getBookmarks(mockGithubId);

    expect(result).toEqual(bookmarksArr);
  });
});
