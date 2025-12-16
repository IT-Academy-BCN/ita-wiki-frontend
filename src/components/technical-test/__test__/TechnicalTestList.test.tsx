import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { vi } from "vitest";
import TechnicalTestList from "../TechnicalTestList";

const mockUseTechnicalTests = vi.hoisted(() => vi.fn());

vi.mock("../../../hooks/useTechnicalTests", () => ({
  __esModule: true,
  default: mockUseTechnicalTests,
}));

beforeEach(() => {
  mockUseTechnicalTests.mockReturnValue({
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
  });
});

it("renders technical tests when not loading and without error", async () => {
  render(
    <MemoryRouter>
      <TechnicalTestList />
    </MemoryRouter>,
  );

  await waitFor(() => {
    expect(screen.getByText("Test A")).toBeDefined();
    expect(screen.getByText("Test B")).toBeDefined();
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
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

it("shows loading skeletons when loading without error", () => {
  mockUseTechnicalTests.mockReturnValue({
    technicalTests: [],
    isLoading: true,
    error: null,
  });

  render(
    <MemoryRouter>
      <TechnicalTestList />
    </MemoryRouter>,
  );

  expect(screen.getAllByRole("listitem")).toHaveLength(8);
  expect(screen.queryByText("Test A")).toBeNull();
  expect(screen.queryByText("Test B")).toBeNull();
});

it("shows error message when there is an error", () => {
  mockUseTechnicalTests.mockReturnValue({
    technicalTests: [],
    isLoading: false,
    error: { message: "Algo ha fallado" },
  });

  render(
    <MemoryRouter>
      <TechnicalTestList />
    </MemoryRouter>,
  );

  expect(screen.getByText(/Error: Algo ha fallado/)).toBeDefined();
});
