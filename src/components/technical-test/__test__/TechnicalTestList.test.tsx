import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { vi } from "vitest";
import TechnicalTestList from "../TechnicalTestList";

vi.mock("../../../hooks/useTechnicalTests", () => ({
  default: () => ({
    technicalTests: [
      {
        id: 1,
        title: "Test A",
        language: "JavaScript",
        description: "Test description A",
        tags: ["tag1"],
      },
      {
        id: 2,
        title: "Test B",
        language: "TypeScript",
        description: "Test description B",
        tags: ["tag2"],
      },
    ],
    isLoading: false,
    error: null,
  }),
}));

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
