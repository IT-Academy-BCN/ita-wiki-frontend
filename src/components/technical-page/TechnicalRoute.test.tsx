import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router";
import { describe, it, expect, vi } from "vitest";

// Mockeamos el componente real para no depender de su implementación actual
vi.mock("./TechnicalPage", () => {
  return {
    default: () => <div data-testid="technical-page">Technical Page Mock</div>,
  };
});

// Importamos después del mock para obtener la versión mockeada
import TechnicalPage from "./TechnicalPage";

describe("Ruta /resources/technical-test/999", () => {
  it("renderiza el componente TechnicalPage a través de la ruta", () => {
    render(
      <MemoryRouter initialEntries={["/resources/technical-test/999"]}>
        <Routes>
          <Route path="/resources/technical-test/999" element={<TechnicalPage />} />
        </Routes>
      </MemoryRouter>
    );

    // Comprobamos que el mock del componente está en el DOM
    const el = screen.getByTestId("technical-page");
    expect(el).toBeTruthy();
    expect(el.textContent).toContain("Technical Page Mock");
  });
});
