import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router";
import TechnicalPage from "./TechnicalPage";

// Mock parcial correcto
vi.mock("react-router", async () => {
  const actual = await vi.importActual<any>("react-router");
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

describe("TechnicalPage", () => {
  it("renderiza el botón de volver", () => {
    render(
      <MemoryRouter>
        <TechnicalPage />
      </MemoryRouter>
    );
    expect(
      screen.getByText("← Tornar a Proves Tècniques")
    ).toBeInTheDocument();
  });

  it("renderiza el título principal", () => {
    render(
      <MemoryRouter>
        <TechnicalPage />
      </MemoryRouter>
    );
    expect(screen.getByText("Cifrado César")).toBeInTheDocument();
  });

  it("renderiza la fecha y lenguaje", () => {
    render(
      <MemoryRouter>
        <TechnicalPage />
      </MemoryRouter>
    );
    expect(screen.getByText("20 Dic 2024")).toBeInTheDocument();
    expect(screen.getByText("JavaScript")).toBeInTheDocument();
  });

  it("renderiza parte del contenido descriptivo", () => {
    render(
      <MemoryRouter>
        <TechnicalPage />
      </MemoryRouter>
    );
    expect(
      screen.getByText(/Debes diseñar una función de encriptado/i)
    ).toBeInTheDocument();
  });

  it("renderiza los ejemplos finales", () => {
    render(
      <MemoryRouter>
        <TechnicalPage />
      </MemoryRouter>
    );
    expect(screen.getByText(/cifrar\("hola", 3\)/i)).toBeInTheDocument();
  });
});
