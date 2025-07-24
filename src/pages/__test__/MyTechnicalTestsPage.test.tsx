import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import MyTechnicalTestsPage from "../MyTechnicalTestsPage";
import { vi } from "vitest";
import { MemoryRouter } from "react-router";

const mockedNavigate = vi.fn();

vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

vi.mock("../hooks/useTechnicalTests", () => ({
  default: () => ({
    technicalTests: [],
    isLoading: false,
    error: null,
  }),
}));

describe("MyTechnicalTestsPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("handles empty data", async () => {
    const emptyMockData = { data: [] };

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve(emptyMockData),
      }),
    ) as unknown as typeof fetch;

    render(
      <MemoryRouter>
        <MyTechnicalTestsPage />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.queryByText("- Test A")).not.toBeInTheDocument();
    });
  });

  describe("Crear prueba button", () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });

    it("renders and navigates when clicked", async () => {
      render(
        <MemoryRouter>
          <MyTechnicalTestsPage />
        </MemoryRouter>,
      );

      const button = await screen.findByRole("button", {
        name: /crear prueba/i,
      });
      expect(button).toBeInTheDocument();

      button.click();

      expect(mockedNavigate).toHaveBeenCalledWith(
        "/resources/technical-test/create",
      );
    });
  });
});
