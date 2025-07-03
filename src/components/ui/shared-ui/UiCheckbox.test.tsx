import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import UiCheckbox from "../shared-ui/UiCheckbox";
import React from "react";

describe("UiCheckbox", () => {
  it("renders with label", () => {
    render(
      <UiCheckbox
        checked={false}
        onChange={() => {}}
        label="Aceptar términos"
      />,
    );
    expect(screen.getByText("Aceptar términos")).toBeInTheDocument();
  });

  it("calls onChange when clicked", () => {
    const handleChange = vi.fn();
    render(
      <UiCheckbox checked={false} onChange={handleChange} label="Checkbox" />,
    );
    const label = screen.getByText("Checkbox");
    fireEvent.click(label);
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it("shows check icon when checked is true", () => {
    render(
      <UiCheckbox
        checked={true}
        onChange={() => {}}
        label="Checkbox marcado"
      />,
    );
    const svg = screen.getByRole("img", { hidden: true });
    expect(svg).toBeInTheDocument();
  });
});
