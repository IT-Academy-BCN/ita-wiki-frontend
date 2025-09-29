import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { FilterGroup } from "./FilterGroup";

describe("FilterGroup", () => {
  const mockOptions = ["Option 1", "Option 2", "Option 3"];
  const mockSelectedValues = ["Option 1"];
  const mockOnToggle = vi.fn();

  beforeEach(() => {
    mockOnToggle.mockClear();
  });

  it("renders title", () => {
    render(
      <FilterGroup
        title="Test Filter"
        options={mockOptions}
        selectedValues={mockSelectedValues}
        onToggle={mockOnToggle}
      />,
    );

    expect(screen.getByText("Test Filter")).toBeInTheDocument();
  });

  it("renders all options", () => {
    render(
      <FilterGroup
        title="Test Filter"
        options={mockOptions}
        selectedValues={mockSelectedValues}
        onToggle={mockOnToggle}
      />,
    );

    expect(screen.getByText("Option 1")).toBeInTheDocument();
    expect(screen.getByText("Option 2")).toBeInTheDocument();
    expect(screen.getByText("Option 3")).toBeInTheDocument();
  });

  it("shows correct checked state", () => {
    render(
      <FilterGroup
        title="Test Filter"
        options={mockOptions}
        selectedValues={mockSelectedValues}
        onToggle={mockOnToggle}
      />,
    );

    const option1Checkbox = screen.getByLabelText("Option 1");
    const option2Checkbox = screen.getByLabelText("Option 2");

    expect(option1Checkbox).toBeChecked();
    expect(option2Checkbox).not.toBeChecked();
  });

  it("calls onToggle when option is clicked", () => {
    render(
      <FilterGroup
        title="Test Filter"
        options={mockOptions}
        selectedValues={mockSelectedValues}
        onToggle={mockOnToggle}
      />,
    );

    const option2Checkbox = screen.getByLabelText("Option 2");
    fireEvent.click(option2Checkbox);

    expect(mockOnToggle).toHaveBeenCalledWith("Option 2");
  });

  it("applies custom className", () => {
    const { container } = render(
      <FilterGroup
        title="Test Filter"
        options={mockOptions}
        selectedValues={mockSelectedValues}
        onToggle={mockOnToggle}
        className="custom-class"
      />,
    );

    const filterGroup = container.firstChild as HTMLElement;
    expect(filterGroup).toHaveClass("custom-class");
  });

  it("handles empty options array", () => {
    render(
      <FilterGroup
        title="Test Filter"
        options={[]}
        selectedValues={[]}
        onToggle={mockOnToggle}
      />,
    );

    expect(screen.getByText("Test Filter")).toBeInTheDocument();
    // Should not render any checkboxes
    expect(screen.queryByRole("checkbox")).not.toBeInTheDocument();
  });

  it("handles empty selectedValues", () => {
    render(
      <FilterGroup
        title="Test Filter"
        options={mockOptions}
        selectedValues={[]}
        onToggle={mockOnToggle}
      />,
    );

    const option1Checkbox = screen.getByLabelText("Option 1");
    const option2Checkbox = screen.getByLabelText("Option 2");

    expect(option1Checkbox).not.toBeChecked();
    expect(option2Checkbox).not.toBeChecked();
  });
});
