import { render } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { useGlobalCtx } from "../useGlobalCtx";
import GlobalCtxProvider from "../../context/GlobalCtxProvider";

// Mockeamos `useResize` y `useMainMenu` ya que `useGlobalCtx` depende del contexto
vi.mock("../hooks/useResize", () => ({
  useResize: () => ({
    isMobile: false,
    isTablet: false,
    recordMobile: vi.fn(),
    recordTable: vi.fn(),
  }),
}));

vi.mock("../hooks/useMainMenu", () => ({
  useMainMenu: () => ({
    isOpenMainMenu: false,
    toggleMainMenu: vi.fn(),
    openMainMenu: vi.fn(),
    closeMainMenu: vi.fn(),
  }),
}));

// Componente de prueba que usa `useGlobalCtx`
const TestComponent = () => {
  useGlobalCtx(); // Solo llamamos al hook para ver si se lanza error o no
  return <div>Test Component</div>;
};

describe("useGlobalCtx hook", () => {
  it("debe permitir el acceso al contexto dentro de GlobalCtxProvider", () => {
    expect(() =>
      render(
        <GlobalCtxProvider>
          <TestComponent />
        </GlobalCtxProvider>
      )
    ).not.toThrow();
  });

  it("debe lanzar un error si se usa fuera de GlobalCtxProvider", () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => { });

    expect(() => render(<TestComponent />)).toThrow("contexto no definido");

    errorSpy.mockRestore();
  });
});
