import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  TechnicalTestsFiltersProvider,
  useTechnicalTestsFilters,
} from "../TechnicalTestsFiltersContext";

const Consumer = () => {
  const { filters, setFilters } = useTechnicalTestsFilters();

  return (
    <div>
      <div data-testid="langs">{filters.languages.join(",")}</div>
      <button
        onClick={() =>
          setFilters({
            languages: ["React"],
            years: ["2025"],
            difficulties: ["Bàsica"],
          })
        }
      >
        update
      </button>
    </div>
  );
};

describe("TechnicalTestsFiltersContext", () => {
  it("provides default filters and allows updating them", () => {
    render(
      <TechnicalTestsFiltersProvider>
        <Consumer />
      </TechnicalTestsFiltersProvider>,
    );

    expect(screen.getByTestId("langs")).toBeDefined();

    fireEvent.click(screen.getByText("update"));
    expect(screen.getByTestId("langs").textContent).toContain("React");
  });

  it("throws if hook is used outside provider", () => {
    const Broken = () => {
      useTechnicalTestsFilters();
      return null;
    };

    expect(() => render(<Broken />)).toThrow();
  });
});
