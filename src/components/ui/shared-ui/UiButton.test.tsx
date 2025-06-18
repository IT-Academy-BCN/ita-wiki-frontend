import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { UiButton } from "../shared-ui/UiButton";
import React from "react";

describe("UiButton", () => {
  it("renders the button with children", () => {
    render(<UiButton>Click me</UiButton>);
    expect(
      screen.getByRole("button", { name: "Click me" }),
    ).toBeInTheDocument();
  });

  it("applies the correct variant and size styles", () => {
    render(
      <UiButton variant="secondary" size="lg">
        Test
      </UiButton>,
    );
    const button = screen.getByRole("button", { name: "Test" });
    expect(button.className).toMatch(/border/); // secondary
    expect(button.className).toMatch(/text-lg/); // lg
  });

  it("calls onClick handler when clicked", () => {
    const handleClick = vi.fn();
    render(<UiButton onClick={handleClick}>Click me</UiButton>);
    fireEvent.click(screen.getByRole("button", { name: "Click me" }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when disabled", () => {
    const handleClick = vi.fn();
    render(
      <UiButton onClick={handleClick} disabled>
        Disabled
      </UiButton>,
    );
    const button = screen.getByRole("button", { name: "Disabled" });
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
    expect(button).toBeDisabled();
  });

  it("renders icon when provided", () => {
    const TestIcon = () => <svg data-testid="test-icon" />;
    render(<UiButton icon={<TestIcon />}>With Icon</UiButton>);
    expect(screen.getByTestId("test-icon")).toBeInTheDocument();
  });
});
