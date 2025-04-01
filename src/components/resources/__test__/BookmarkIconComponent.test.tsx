import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import BookmarkIconComponent from "../bookmarks/BookmarkIconComponent";
import bookmarkFull from "../../../assets/bookmark_full.svg";
import bookmarkEmpty from "../../../assets/bookmark_empty.svg";

import { vi } from "vitest";

vi.mock("/assets/bookmark_full.svg", () => ({
  default: "test-file-stub",
}));
vi.mock("/assets/bookmark_empty.svg", () => ({
  default: "test-file-stub",
}));

describe("BookmarkIconComponent class", () => {
  it("The component must have the initial styles", () => {
    render(<BookmarkIconComponent marked={false} />);
    const bookmarkIcon = screen.getByTestId("bookmarkIcon");
    expect(bookmarkIcon).toHaveClass("items-center");
  });
});
describe("BookmarkIconComponent", () => {
  it("renders bookmarkFull when marked is true", () => {
    render(<BookmarkIconComponent marked={true} />);
    expect(screen.getByAltText("Bookmark is marked")).toBeInTheDocument();
    expect(screen.getByAltText("Bookmark is marked")).toHaveAttribute(
      "src",
      bookmarkFull,
    );
  });

  it("renders bookmarkEmpty when marked is false", () => {
    render(<BookmarkIconComponent marked={false} />);
    expect(screen.getByAltText("Bookmark is not marked")).toBeInTheDocument();
    expect(screen.getByAltText("Bookmark is not marked")).toHaveAttribute(
      "src",
      bookmarkEmpty,
    );
  });

  it("renders a div with correct class names", () => {
    render(<BookmarkIconComponent marked={true} />);
    expect(screen.getByRole("img").closest("div")).toHaveClass(
      "flex items-center justify-start gap-2 max-h-12",
    );
  });

  it("renders img with correct height", () => {
    render(<BookmarkIconComponent marked={true} />);
    expect(screen.getByAltText("Bookmark is marked")).toHaveAttribute(
      "height",
      "16",
    );
  });
});
