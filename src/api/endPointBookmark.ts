import { API_URL, END_POINTS } from "../config";
import { Bookmark } from "../types";

const getBookmarks = async (github_id: string): Promise<Bookmark[]> => {
  const controller = new AbortController();
  const signal = controller.signal;
  const url = `${API_URL}${END_POINTS.bookmarks.get}${github_id}`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      signal,
    });
    if (!response.ok) {
      return [];
    }
    const bookmarks = await response.json();

    return bookmarks;
  } catch {
    return [];
  }
};

const createBookmark = async (
  github_id: string,
  resource_id: number,
): Promise<Bookmark> => {
  const controller = new AbortController();
  const signal = controller.signal;
  const url = `${API_URL}${END_POINTS.bookmarks.post}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        github_id,
        resource_id,
      }),
      signal,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error("Error data:", errorData);
      throw new Error(
        `Failed to create bookmark: ${JSON.stringify(errorData)}`,
      );
    }

    const newBookmark = await response.json();
    return newBookmark;
  } catch (error) {
    console.error("Error creating bookmark:", error);
    throw error;
  }
};

const deleteBookmark = async (
  github_id: string,
  resource_id: number,
): Promise<boolean> => {
  const controller = new AbortController();
  const signal = controller.signal;
  const url = `${API_URL}${END_POINTS.bookmarks.delete}`;

  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        github_id,
        resource_id,
      }),
      signal,
    });

    if (!response.ok) {
      throw new Error("Failed to delete bookmark");
    }

    return true;
  } catch (error) {
    console.error("Error deleting bookmark:", error);
    throw error;
  }
};

export { getBookmarks, createBookmark, deleteBookmark };
