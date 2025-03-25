import { API_URL, END_POINTS } from "../config";
import { Bookmark } from "../types";
import bookmarksArr from "../moock/bookmarks.json";

const getBookmarks = async (github_id: string): Promise<Bookmark[]> => {
  const controller = new AbortController();
  const signal = controller.signal;
  const url = `${API_URL}/${END_POINTS.bookmarks.get}${github_id}`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      signal,
    });
    if (!response.ok) {
      return bookmarksArr;
    }
    const bookmarks = await response.json();
    return bookmarks;
  } catch {
    return bookmarksArr;
  }
};

export { getBookmarks };
