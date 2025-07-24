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

  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <MyTechnicalTestsPage />
      </MemoryRouter>,
    );
    expect(
      screen.getByText("Cargando pruebas técnicas..."),
    ).toBeInTheDocument();
  });

  it("fetches and displays tech test titles from mock data", async () => {
    const mockData = {
      data: [
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
    };

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockData),
      }),
    ) as unknown as typeof fetch;

    render(
      <MemoryRouter>
        <MyTechnicalTestsPage />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText("- Test A")).toBeInTheDocument();
      expect(screen.getByText("- Test B")).toBeInTheDocument();
    });
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

  it("navigates to create tech test page when 'Crear prueba' button is clicked", async () => {
    render(
      <MemoryRouter initialEntries={["/resources/technical-test"]}>
        <MyTechnicalTestsPage />
      </MemoryRouter>,
    );

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
});
