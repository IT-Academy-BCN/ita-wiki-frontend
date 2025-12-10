import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, it, expect, vi } from "vitest";
import TechnicalTestList from "../TechnicalTestList";
import { TechnicalTest } from "../../../types/TechnicalTest";

const mockTests: TechnicalTest[] = [
  {
    id: "1",
    title: "Test A",
    language: "JavaScript",
    description: "Test description A",
    tags: [],
    created_at: "2025-01-01T00:00:00Z",
    updated_at: "2025-01-01T00:00:00Z",
  },
  {
    id: "2",
    title: "Test B",
    language: "TypeScript",
    description: "Test description B",
    tags: [],
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
];

vi.mock("../../../hooks/useTechnicalTests", () => ({
  default: () => ({
    technicalTests: mockTests,
    isLoading: false,
    error: null,
  }),
}));

describe("TechnicalTestList", () => {
  it("fetches and displays technical test titles from mock data", async () => {
    render(
      <MemoryRouter>
        <TechnicalTestList />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText("Test A")).toBeDefined();
      expect(screen.getByText("Test B")).toBeDefined();
    });
  });

  it("The title 'Proves tècniques' must be displayed", () => {
    render(
      <MemoryRouter>
        <TechnicalTestList />
      </MemoryRouter>,
    );

    expect(screen.getByText("Proves tècniques")).toBeDefined();
  });

  it("filters by language when filters are provided", () => {
    render(
      <MemoryRouter>
        <TechnicalTestList
          filters={{
            languages: ["JavaScript"],
            years: [],
            difficulties: [],
          }}
        />
      </MemoryRouter>,
    );

    expect(screen.getByText("Test A")).toBeDefined();
    expect(screen.queryByText("Test B")).toBeNull();
  });
});
