import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import UiCard from "../shared-ui/UiCard";
import React from "react";

describe("UiCard", () => {
  it("renders children correctly", () => {
    render(<UiCard>Contenido de la tarjeta</UiCard>);
    expect(screen.getByText("Contenido de la tarjeta")).toBeInTheDocument();
  });

  it("applies custom className if provided", () => {
    render(
      <UiCard className="custom-class" testId="custom-card">
        <>{}</>
      </UiCard>,
    );
    const card = screen.getByTestId("custom-card");
    expect(card).toHaveClass("custom-class");
  });
});
