import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, vi } from "vitest";
import "@testing-library/jest-dom";
import { FilterResources } from "../FilterResources";

const mockUseParams = vi.fn();

const mockProps = {
  resourceTypes: ["Video", "Blog", "Cursos"] as const,
  selectedTags: [],
  setSelectedTags: vi.fn(),
  selectedResourceTypes: ["Video", "Blog", "Cursos"],
  setSelectedResourceTypes: vi.fn(),
};

describe("FilterResources Component", () => {
  test("should render Temas section", () => {
    mockUseParams.mockReturnValue({ category: "React" });

    render(<FilterResources {...mockProps} />);

    expect(screen.getByText("Todos")).toBeInTheDocument();
  });

  test("should show no available themes message", () => {
    mockUseParams.mockReturnValue({ category: "UnknownCategory" });

    render(<FilterResources {...mockProps} />);

    expect(screen.getByText("No hi ha temes disponibles.")).toBeInTheDocument();
  });
});
