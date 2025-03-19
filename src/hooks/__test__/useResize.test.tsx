import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { useResize } from "../useResize";

// Componente de prueba para exponer los valores del hook
const TestComponent = () => {
  const { isMobile, isTablet, isDesktop } = useResize();
  return (
    <div>
      <span data-testid="mobile">{isMobile ? "mobile" : "not mobile"}</span>
      <span data-testid="tablet">{isTablet ? "tablet" : "not tablet"}</span>
      <span data-testid="desktop">{isDesktop ? "desktop" : "not desktop"}</span>
    </div>
  );
};

describe("useResize hook (basado en Tailwind)", () => {
  it("should set initial state based on window.innerWidth (1024px - Desktop)", () => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 1024,
    });

    render(<TestComponent />);
    expect(screen.getByTestId("mobile").textContent).toBe("not mobile");
    expect(screen.getByTestId("tablet").textContent).toBe("not tablet");
    expect(screen.getByTestId("desktop").textContent).toBe("desktop");
  });

  it("should update state when resized to Tablet (800px)", async () => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 1024,
    });
    render(<TestComponent />);

    await act(async () => {
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 800,
      });
      fireEvent(window, new Event("resize"));
    });

    expect(screen.getByTestId("mobile").textContent).toBe("not mobile");
    expect(screen.getByTestId("tablet").textContent).toBe("tablet");
    expect(screen.getByTestId("desktop").textContent).toBe("not desktop");
  });

  it("should update state when resized to Mobile (500px)", async () => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 1024,
    });
    render(<TestComponent />);

    await act(async () => {
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 500,
      });
      fireEvent(window, new Event("resize"));
    });

    expect(screen.getByTestId("mobile").textContent).toBe("mobile");
    expect(screen.getByTestId("tablet").textContent).toBe("not tablet");
    expect(screen.getByTestId("desktop").textContent).toBe("not desktop");
  });

  it("should update state when resized back to Desktop (1200px)", async () => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 500,
    });
    render(<TestComponent />);

    await act(async () => {
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 1200,
      });
      fireEvent(window, new Event("resize"));
    });

    expect(screen.getByTestId("mobile").textContent).toBe("not mobile");
    expect(screen.getByTestId("tablet").textContent).toBe("not tablet");
    expect(screen.getByTestId("desktop").textContent).toBe("desktop");
  });
});
