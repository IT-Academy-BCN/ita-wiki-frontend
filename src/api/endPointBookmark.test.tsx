import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  getBookmarks,
  createBookmark,
  deleteBookmark,
} from "./endPointBookmark";

const getApiUrl = () => {
  return process.env.NODE_ENV === "test"
    ? "http://localhost:8000/api/"
    : "https://ita-wiki-backend-production.up.railway.app/api/";
};

const endpoints = {
  bookmarks: {
    get: "bookmarks/",
    post: "bookmarks",
    delete: "bookmarks",
  },
};

beforeEach(() => {
  vi.spyOn(console, "error").mockImplementation(() => {});
  vi.spyOn(console, "log").mockImplementation(() => {});
});

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
      `${getApiUrl()}${endpoints.bookmarks.get}${mockGithubId}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        signal: expect.any(AbortSignal),
      },
    );
    expect(result).toEqual(mockBookmarks);
  });

  it("should return empty array on failed fetch", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
    });

    const result = await getBookmarks(mockGithubId);

    expect(result).toEqual([]);
  });

  it("should return empty array on fetch error", async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error("Fetch error"));

    const result = await getBookmarks(mockGithubId);

    expect(result).toEqual([]);
  });

  it("should handle AbortError", async () => {
    global.fetch = vi
      .fn()
      .mockRejectedValue(new DOMException("Aborted", "AbortError"));

    const result = await getBookmarks(mockGithubId);

    expect(result).toEqual([]);
  });
});

describe("createBookmark", () => {
  const mockGithubId = "test-github-id";
  const mockResourceId = 123;
  const mockNewBookmark = {
    id: 456,
    github_id: mockGithubId,
    resource_id: mockResourceId,
  };

  it("should create and return a bookmark on successful request", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockNewBookmark),
    });

    const result = await createBookmark(mockGithubId, mockResourceId);

    expect(global.fetch).toHaveBeenCalledWith(
      `${getApiUrl()}${endpoints.bookmarks.post}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          github_id: mockGithubId,
          resource_id: mockResourceId,
        }),
        signal: expect.any(AbortSignal),
      },
    );
    expect(result).toEqual(mockNewBookmark);
  });

  it("should throw an error on failed request", async () => {
    const errorData = { message: "Invalid data" };
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      json: () => Promise.resolve(errorData),
    });

    await expect(createBookmark(mockGithubId, mockResourceId)).rejects.toThrow(
      `Failed to create bookmark: ${JSON.stringify(errorData)}`,
    );
  });

  it("should handle empty error response", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      json: () => Promise.reject(new Error("Cannot parse JSON")),
    });

    await expect(createBookmark(mockGithubId, mockResourceId)).rejects.toThrow(
      "Failed to create bookmark: null",
    );
  });

  it("should throw an error on network failure", async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error("Network error"));

    await expect(createBookmark(mockGithubId, mockResourceId)).rejects.toThrow(
      "Network error",
    );
  });
});

describe("deleteBookmark", () => {
  const mockGithubId = "test-github-id";
  const mockResourceId = 123;

  it("should return true on successful deletion", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
    });

    const result = await deleteBookmark(mockGithubId, mockResourceId);

    expect(global.fetch).toHaveBeenCalledWith(
      `${getApiUrl()}${endpoints.bookmarks.delete}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          github_id: mockGithubId,
          resource_id: mockResourceId,
        }),
        signal: expect.any(AbortSignal),
      },
    );
    expect(result).toBe(true);
  });

  it("should throw an error on failed deletion", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
    });

    await expect(deleteBookmark(mockGithubId, mockResourceId)).rejects.toThrow(
      "Failed to delete bookmark",
    );
  });

  it("should throw an error on network failure", async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error("Network error"));

    await expect(deleteBookmark(mockGithubId, mockResourceId)).rejects.toThrow(
      "Network error",
    );
  });
});
