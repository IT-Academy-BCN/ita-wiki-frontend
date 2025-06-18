import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import BookmarkIconComponent from "../BookmarkIconComponent";

describe("BookmarkIconComponent class", () => {
  it("The component must have the initial styles", () => {
    render(<BookmarkIconComponent marked={false} />);
    const bookmarkIcon = screen.getByTestId("bookmarkIcon");
    expect(bookmarkIcon).toHaveClass("items-center");
  });
});

describe("BookmarkIconComponent", () => {
  it("renders filled bookmark icon when marked is true", () => {
    render(<BookmarkIconComponent marked={true} />);
    const bookmarkIcon = screen.getByLabelText(
      "Guardado en la lista de lectura",
    );
    expect(bookmarkIcon).toBeInTheDocument();

    const svgElement = bookmarkIcon.closest("svg");
    expect(svgElement).toBeInTheDocument();

    const svgPaths = svgElement?.querySelectorAll("path");
    expect(svgPaths?.length).toBeGreaterThan(0);

    expect(svgElement).toHaveAttribute("stroke", "black");
  });

  it("renders empty bookmark icon when marked is false", () => {
    render(<BookmarkIconComponent marked={false} />);
    const bookmarkIcon = screen.getByLabelText(
      "No guardado en la lista de lectura",
    );
    expect(bookmarkIcon).toBeInTheDocument();

    const svgElement = bookmarkIcon.closest("svg");
    expect(svgElement).toBeInTheDocument();

    expect(svgElement).toHaveAttribute("stroke", "#808080");
  });

  it("renders a div with correct class names", () => {
    render(<BookmarkIconComponent marked={true} />);
    const bookmarkContainer = screen.getByTestId("bookmarkIcon");
    expect(bookmarkContainer).toHaveClass(
      "flex items-center justify-start gap-2 max-h-12",
    );
  });

  it("renders bookmark with correct size", () => {
    render(<BookmarkIconComponent marked={true} />);
    const bookmarkIcon = screen.getByLabelText(
      "Guardado en la lista de lectura",
    );

    const svgElement = bookmarkIcon.closest("svg");
    expect(svgElement).toBeInTheDocument();

    expect(svgElement).toHaveAttribute("width", "16");
    expect(svgElement).toHaveAttribute("height", "16");
  });
});
