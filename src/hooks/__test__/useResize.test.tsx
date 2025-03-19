import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { useResize } from "../useResize";

// Componente de prueba para exponer los valores del hook
const TestComponent = () => {
  const { isMobile, isTablet } = useResize();
  return (
    <div>
      <span data-testid="mobile">{isMobile ? "mobile" : "not mobile"}</span>
      <span data-testid="tablet">{isTablet ? "tablet" : "not tablet"}</span>
    </div>
  );
};

describe("useResize hook", () => {
  it("should set initial state based on window.innerWidth (800px)", () => {
    // Configuramos window.innerWidth a 800px
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 800,
    });

    render(<TestComponent />);

    const mobile = screen.getByTestId("mobile");
    const tablet = screen.getByTestId("tablet");

    // Con innerWidth = 800:
    // - isMobile es false (800 no es menor que 512)
    // - isTablet es false (800 no está entre 480 y 768)
    expect(mobile.textContent).toBe("not mobile");
    expect(tablet.textContent).toBe("not tablet");
  });

  it("should update state when window is resized to a mobile and tablet width (500px)", () => {
    // Inicialmente configuramos un ancho mayor para asegurar el cambio
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 800,
    });
    render(<TestComponent />);
    const mobile = screen.getByTestId("mobile");
    const tablet = screen.getByTestId("tablet");

    // Verificamos el estado inicial
    expect(mobile.textContent).toBe("not mobile");
    expect(tablet.textContent).toBe("not tablet");

    // Simulamos el cambio a 500px
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 500,
    });
    fireEvent(window, new Event("resize"));

    // Con 500px:
    // - isMobile es true (500 < 512)
    // - isTablet es true (500 está entre 480 y 768)
    expect(mobile.textContent).toBe("mobile");
    expect(tablet.textContent).toBe("tablet");
  });

  it("should update state when window is resized to a width that is mobile but not tablet (400px)", () => {
    // Configuramos un ancho inicial mayor
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 800,
    });
    render(<TestComponent />);
    const mobile = screen.getByTestId("mobile");
    const tablet = screen.getByTestId("tablet");

    // Estado inicial
    expect(mobile.textContent).toBe("not mobile");
    expect(tablet.textContent).toBe("not tablet");

    // Simulamos el cambio a 400px
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 400,
    });
    fireEvent(window, new Event("resize"));

    // Con 400px:
    // - isMobile es true (400 < 512)
    // - isTablet es false (400 no es mayor que 480)
    expect(mobile.textContent).toBe("mobile");
    expect(tablet.textContent).toBe("not tablet");
  });
});
