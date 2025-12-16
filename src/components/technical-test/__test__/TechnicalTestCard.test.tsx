import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { BrowserRouter } from "react-router";
import TechnicalTestCard from "../TechnicalTestCard";
import { getLevelIcon } from "../../../utils/getLevelIcon";
import { TechnicalTest } from "../../../types/TechnicalTest";

vi.mock("../../Layout/aside/asideContent", () => ({
  asideContentForTechnicalTest: [
    {
      icon: () => <svg data-testid="react-icon">React Icon</svg>,
      label: "React",
    },
    {
      icon: () => <svg data-testid="javascript-icon">JavaScript Icon</svg>,
      label: "JavaScript",
    },
  ],
}));

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("TechnicalTestCard", () => {
  const mockTest: TechnicalTest = {
    id: "test-123",
    title: "React Testing Best Practices",
    language: "React",
    description: "Learn how to test React components",
    tags: ["testing", "react"],
    created_at: "2025-01-15T10:30:00Z",
    updated_at: "2025-11-24T14:20:00Z",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Level icon hashing", () => {
    it("should always return the same icon for the same title", () => {
      const title = "React Testing Best Practices";

      const firstResult = getLevelIcon(title);
      const secondResult = getLevelIcon(title);

      expect(firstResult).toBe(secondResult);
    });

    it("should return different icons for clearly different titles", () => {
      const titleA = "A";
      const titleB = "B";

      const resultA = getLevelIcon(titleA);
      const resultB = getLevelIcon(titleB);

      expect(resultA).not.toBe(resultB);
    });
  });

  describe("Link navigation", () => {
    it("should render a link with the correct URL to the technical test detail page", () => {
      renderWithRouter(<TechnicalTestCard test={mockTest} />);

      const link = screen.getByRole("link", {
        name: new RegExp(mockTest.title, "i"),
      });

      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute(
        "href",
        `/resources/technical-test/${mockTest.id}`,
      );
    });

    it("should generate correct URL for different test IDs", () => {
      const differentTest = { ...mockTest, id: "test-456" };
      renderWithRouter(<TechnicalTestCard test={differentTest} />);

      const link = screen.getByRole("link", {
        name: new RegExp(differentTest.title, "i"),
      });

      expect(link).toHaveAttribute(
        "href",
        "/resources/technical-test/test-456",
      );
    });
  });

  describe("Date formatting display", () => {
    it("should format a valid ISO date to Catalan locale (ca-ES)", () => {
      renderWithRouter(<TechnicalTestCard test={mockTest} />);

      const dateElement = screen.getByText(/24/);
      expect(dateElement).toBeInTheDocument();
    });

    it("should display 'Data desconeguda' when updated_at is undefined", () => {
      const testWithoutDate = {
        ...mockTest,
        updated_at: undefined as unknown as string,
      };
      renderWithRouter(<TechnicalTestCard test={testWithoutDate} />);

      expect(screen.getByText("Data desconeguda")).toBeInTheDocument();
    });
  });
});
