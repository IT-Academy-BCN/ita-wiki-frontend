import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import BookMarkList from "../bookmarks/BookMarkList";
import { IntBookmarkElement } from "../../../types";
import { useGetBookmarksList } from "../../../hooks/useBookmarks";
import { describe, it, expect, vi } from "vitest";
import { Mock } from "vitest";

vi.mock("../../../hooks/useBookmarks", () => ({
  useGetBookmarksList: vi.fn(),
}));

vi.mock("../../../assets/edit.svg", () => ({
  default: "mocked-edit-icon",
}));

describe("BookMarkList Component", () => {
  const mockBookmarks: IntBookmarkElement[] = [
    {
      id: 1,
      github_id: 4567,
      title: "Resource 1",
      description: "Description 1",
      url: "http://example.com/1",
      created_at: "2023-01-01T00:00:00Z",
    },
  ];

  it("should render the component and display the correct title", async () => {
    (useGetBookmarksList as Mock).mockReturnValue(mockBookmarks);

    render(
      <BrowserRouter>
        <BookMarkList bookmarks={mockBookmarks} />
      </BrowserRouter>,
    );

    const titleElement = screen.getByRole("heading", { level: 3 });
    expect(titleElement).toBeInTheDocument();
  });

  it("should render empty message after delay when there are no bookmarks", async () => {
    (useGetBookmarksList as Mock).mockReturnValue([]);

    render(
      <BrowserRouter>
        <BookMarkList bookmarks={[]} />
      </BrowserRouter>,
    );

    await waitFor(
      () => {
        const emptyMessage = screen
          .getByTestId("bookmarks-container")
          .querySelector("p");
        expect(emptyMessage).toBeInTheDocument();
      },
      { timeout: 2000 },
    );
  });

  it("should render BookmarkComponent for each bookmark", async () => {
    (useGetBookmarksList as Mock).mockReturnValue(mockBookmarks);

    render(
      <BrowserRouter>
        <BookMarkList bookmarks={mockBookmarks} />
      </BrowserRouter>,
    );

    await waitFor(() => {
      expect(screen.getAllByRole("article")).toHaveLength(mockBookmarks.length);
      const links = screen.getAllByRole("link");
      expect(links[0]).toHaveAttribute("href", mockBookmarks[0].url);
    });
  });

  it("should display the correct props in BookmarkComponent", async () => {
    (useGetBookmarksList as Mock).mockReturnValue(mockBookmarks);

    render(
      <BrowserRouter>
        <BookMarkList bookmarks={mockBookmarks} />
      </BrowserRouter>,
    );

    await waitFor(() => {
      const linkElements = screen.getAllByRole("link");
      expect(linkElements[0]).toHaveAttribute("href", mockBookmarks[0].url);
    });
  });

  it("should show loading spinner when isLoading is true", async () => {
    render(
      <BrowserRouter>
        <BookMarkList bookmarks={[]} isLoading={true} />
      </BrowserRouter>,
    );

    const spinnerElement = screen
      .getByTestId("bookmarks-container")
      .querySelector(".animate-spin");
    expect(spinnerElement).toBeInTheDocument();
  });
});
