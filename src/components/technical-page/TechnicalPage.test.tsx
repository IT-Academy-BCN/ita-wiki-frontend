import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router";
import TechnicalPage from "./TechnicalPage";

vi.mock("react-router", async () => {
  const actual: typeof import("react-router") =
    await vi.importActual("react-router");

  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

describe("TechnicalPage", () => {
  it("renderitza el botó de tornar", () => {
    render(
      <MemoryRouter>
        <TechnicalPage />
      </MemoryRouter>,
    );
    expect(screen.getByText("← Tornar a Proves Tècniques")).toBeInTheDocument();
  });

  it("renderitza el títol principal", () => {
    render(
      <MemoryRouter>
        <TechnicalPage />
      </MemoryRouter>,
    );
    expect(screen.getByText("Xifratge Cèsar")).toBeInTheDocument();
  });

  it("renderitza la data i llenguatge", () => {
    render(
      <MemoryRouter>
        <TechnicalPage />
      </MemoryRouter>,
    );
    expect(screen.getByText("20 Des 2024")).toBeInTheDocument();
    expect(screen.getByText("JavaScript")).toBeInTheDocument();
  });

  it("renderitza part del contingut descriptiu", () => {
    render(
      <MemoryRouter>
        <TechnicalPage />
      </MemoryRouter>,
    );
    expect(
      screen.getByText(/Has de dissenyar una funció d'encriptació/i),
    ).toBeInTheDocument();
  });

  it("renderitza els exemples finals", () => {
    render(
      <MemoryRouter>
        <TechnicalPage />
      </MemoryRouter>,
    );
    expect(screen.getByText(/cifrar\("hola", 3\)/i)).toBeInTheDocument();
  });
});
