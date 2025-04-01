import { render, screen } from "@testing-library/react";
import BookmarkComponent from "../bookmarks/BookmarkComponent";
import { vi } from "vitest";

vi.mock("../../../assets/edit.svg", () => ({
  default: "mocked-edit-icon",
}));

describe("BookmarkComponent", () => {
  const title = "Resource 1";
  const description = "Description 1";
  const url = "https://example.com";

  test("renders the title, description, and link correctly", () => {
    render(
      <BookmarkComponent title={title} description={description} url={url} />,
    );

    expect(screen.getByRole("heading", { level: 4 })).toHaveTextContent(title);
    expect(screen.getByText(description)).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute("href", url);
  });

  test("displays the edit icon", () => {
    render(
      <BookmarkComponent title={title} description={description} url={url} />,
    );

    const editImage = screen.getByAltText("edit");
    expect(editImage).toBeInTheDocument();

    expect(editImage).toHaveClass("w-[15px]");
  });
});
