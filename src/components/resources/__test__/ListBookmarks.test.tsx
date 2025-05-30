import { render, screen } from "@testing-library/react";
import { vi, describe, test, expect } from "vitest";
import { ListBookmarks } from "../ListBookmarks";
import { IntResource } from "../../../types";
import userEvent from "@testing-library/user-event";
// import { useUserContext } from "../../../context/UserContext";

vi.mock("../../ui/ResourceCard", () => ({
  default: vi.fn(({ resource, isBookmarked, toggleBookmark }) => (
    <li data-testid={`resource-card-${resource.id}`}>
      <div>{resource.title}</div>
      <div>{resource.description}</div>
      <button
        onClick={toggleBookmark}
        data-testid={`toggle-bookmark-${resource.id}`}
        data-bookmarked={isBookmarked ? "true" : "false"}
      >
        {isBookmarked ? "Bookmarked" : "Not Bookmarked"}
      </button>
    </li>
  )),
}));

vi.mock("../../../context/UserContext.tsx", () => ({
  useUserContext: vi.fn().mockReturnValue({
    user: { id: "user123" },
    isAuthenticated: true,
    signIn: vi.fn(),
    signOut: vi.fn(),
    error: null,
    setError: vi.fn(),
    saveUser: vi.fn(),
  }),
}));

describe("ListBookmarks Component", () => {
  const mockBase = [
    {
      id: 1,
      title: "React Basics",
      description: "Learn React fundamentals",
      type: "Article",
    },
    {
      id: 2,
      title: "Advanced TypeScript",
      description: "Master TypeScript concepts",
      type: "Video",
    },
  ];

  const mockResources = mockBase.map(
    (resource) =>
      ({
        ...resource,
      }) as IntResource,
  );

  test("renders correctly with bookmarked resources", () => {
    const toggleBookmarkMock = vi.fn();

    render(
      <ListBookmarks
        bookmarkedResources={mockResources}
        toggleBookmark={toggleBookmarkMock}
      />,
    );

    expect(screen.getByTestId("resource-card-1")).toBeInTheDocument();
    expect(screen.getByTestId("resource-card-2")).toBeInTheDocument();

    expect(screen.getByText("React Basics")).toBeInTheDocument();
    expect(screen.getByText("Advanced TypeScript")).toBeInTheDocument();

    expect(screen.getByTestId("toggle-bookmark-1")).toHaveAttribute(
      "data-bookmarked",
      "true",
    );
    expect(screen.getByTestId("toggle-bookmark-2")).toHaveAttribute(
      "data-bookmarked",
      "true",
    );
  });

  test("calls toggleBookmark with the correct resource when clicked", async () => {
    const toggleBookmarkMock = vi.fn();
    const user = userEvent.setup();

    render(
      <ListBookmarks
        bookmarkedResources={mockResources}
        toggleBookmark={toggleBookmarkMock}
      />,
    );

    await user.click(screen.getByTestId("toggle-bookmark-1"));

    expect(toggleBookmarkMock).toHaveBeenCalledTimes(1);
    expect(toggleBookmarkMock).toHaveBeenCalledWith(mockResources[0]);

    await user.click(screen.getByTestId("toggle-bookmark-2"));

    expect(toggleBookmarkMock).toHaveBeenCalledTimes(2);
    expect(toggleBookmarkMock).toHaveBeenCalledWith(mockResources[1]);
  });

  test("renders empty list when no bookmarked resources", () => {
    const toggleBookmarkMock = vi.fn();

    render(
      <ListBookmarks
        bookmarkedResources={[]}
        toggleBookmark={toggleBookmarkMock}
      />,
    );

    const list = screen.getByRole("list");
    expect(list).toBeInTheDocument();
    expect(list.children).toHaveLength(0);
  });
});
