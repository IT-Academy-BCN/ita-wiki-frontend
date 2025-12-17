import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, it, expect, vi } from "vitest";
import TechnicalTestList from "../TechnicalTestList";
import useTechnicalTests from "../../../hooks/useTechnicalTests";

vi.mock("../../../hooks/useTechnicalTests", () => ({
  default: vi.fn(),
}));

const mockedUseTechnicalTests = vi.mocked(useTechnicalTests);

describe("TechnicalTestList skeleton & error states", () => {
  it("shows loading skeletons when loading without error", () => {
    mockedUseTechnicalTests.mockReturnValue({
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
    mockedUseTechnicalTests.mockReturnValue({
      technicalTests: [],
      isLoading: false,
      error: new Error("Algo ha fallado"),
    });

    render(
      <MemoryRouter>
        <TechnicalTestList />
      </MemoryRouter>,
    );

    expect(screen.getByText(/Error: Algo ha fallado/)).toBeDefined();
  });
});
