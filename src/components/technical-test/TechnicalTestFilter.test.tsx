import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { TechnicalTestFilter } from "./TechnicalTestFilter";

// Mock the aside content
vi.mock("../Layout/aside/asideContent", () => ({
  asideContentForTechnicalTest: [
    { label: "JavaScript", icon: vi.fn() },
    { label: "Java", icon: vi.fn() },
    { label: "Python", icon: vi.fn() },
  ],
}));

describe("TechnicalTestFilter", () => {
  it("renders filter title", () => {
    render(<TechnicalTestFilter />);
    expect(screen.getByText("Filtres")).toBeInTheDocument();
  });

  it("renders all filter sections", () => {
    render(<TechnicalTestFilter />);

    expect(screen.getByText("Llenguatge")).toBeInTheDocument();
    expect(screen.getByText("Any")).toBeInTheDocument();
    expect(screen.getByText("Dificultad")).toBeInTheDocument();
  });

  it("renders language options", () => {
    render(<TechnicalTestFilter />);

    expect(screen.getByText("JavaScript")).toBeInTheDocument();
    expect(screen.getByText("Java")).toBeInTheDocument();
    expect(screen.getByText("Python")).toBeInTheDocument();
  });

  it("renders year options", () => {
    render(<TechnicalTestFilter />);

    expect(screen.getByText("2025")).toBeInTheDocument();
    expect(screen.getByText("2024")).toBeInTheDocument();
    expect(screen.getByText("2023")).toBeInTheDocument();
  });

  it("renders difficulty options", () => {
    render(<TechnicalTestFilter />);

    expect(screen.getByText("Bàsica")).toBeInTheDocument();
    expect(screen.getByText("Intermèdia")).toBeInTheDocument();
    expect(screen.getByText("Difícil")).toBeInTheDocument();
  });

  it("has default selected values", () => {
    render(<TechnicalTestFilter />);

    // Check default selected languages
    const jsCheckbox = screen.getByLabelText("JavaScript");
    const javaCheckbox = screen.getByLabelText("Java");
    expect(jsCheckbox).toBeChecked();
    expect(javaCheckbox).toBeChecked();

    // Check default selected years
    const year2025Checkbox = screen.getByLabelText("2025");
    const year2024Checkbox = screen.getByLabelText("2024");
    expect(year2025Checkbox).toBeChecked();
    expect(year2024Checkbox).toBeChecked();

    // Check default selected difficulty
    const basicCheckbox = screen.getByLabelText("Bàsica");
    expect(basicCheckbox).toBeChecked();
  });

  it("calls onFiltersChange when language is toggled", () => {
    const mockOnFiltersChange = vi.fn();
    render(<TechnicalTestFilter onFiltersChange={mockOnFiltersChange} />);

    const pythonCheckbox = screen.getByLabelText("Python");
    fireEvent.click(pythonCheckbox);

    expect(mockOnFiltersChange).toHaveBeenCalledWith({
      languages: ["JavaScript", "Java", "Python"],
      years: ["2025", "2024"],
      difficulties: ["Bàsica"],
    });
  });

  it("calls onFiltersChange when year is toggled", () => {
    const mockOnFiltersChange = vi.fn();
    render(<TechnicalTestFilter onFiltersChange={mockOnFiltersChange} />);

    const year2023Checkbox = screen.getByLabelText("2023");
    fireEvent.click(year2023Checkbox);

    expect(mockOnFiltersChange).toHaveBeenCalledWith({
      languages: ["JavaScript", "Java"],
      years: ["2025", "2024", "2023"],
      difficulties: ["Bàsica"],
    });
  });

  it("calls onFiltersChange when difficulty is toggled", () => {
    const mockOnFiltersChange = vi.fn();
    render(<TechnicalTestFilter onFiltersChange={mockOnFiltersChange} />);

    const intermediateCheckbox = screen.getByLabelText("Intermèdia");
    fireEvent.click(intermediateCheckbox);

    expect(mockOnFiltersChange).toHaveBeenCalledWith({
      languages: ["JavaScript", "Java"],
      years: ["2025", "2024"],
      difficulties: ["Bàsica", "Intermèdia"],
    });
  });

  it("unchecks language when clicked again", () => {
    const mockOnFiltersChange = vi.fn();
    render(<TechnicalTestFilter onFiltersChange={mockOnFiltersChange} />);

    const jsCheckbox = screen.getByLabelText("JavaScript");
    fireEvent.click(jsCheckbox);

    expect(mockOnFiltersChange).toHaveBeenCalledWith({
      languages: ["Java"], // JavaScript removed
      years: ["2025", "2024"],
      difficulties: ["Bàsica"],
    });
  });

  it("works without onFiltersChange callback", () => {
    render(<TechnicalTestFilter />);

    const pythonCheckbox = screen.getByLabelText("Python");
    fireEvent.click(pythonCheckbox);

    // Should not throw an error
    expect(pythonCheckbox).toBeInTheDocument();
  });
});
