import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";
import { useResize } from "../useResize";

describe("useResize hook", () => {
  const originalInnerWidth = window.innerWidth;

  afterEach(() => {
    // Restaurar el valor original de window.innerWidth después de cada prueba
    Object.defineProperty(window, "innerWidth", { configurable: true, value: originalInnerWidth });
  });

  it("should set mobile state when width is less than 640", () => {
    Object.defineProperty(window, "innerWidth", { configurable: true, value: 500 });

    const { result } = renderHook(() => useResize());

    act(() => {
      window.dispatchEvent(new Event("resize"));
    });

    expect(result.current.isMobile).toBe(true);
    expect(result.current.isTablet).toBe(false);
    expect(result.current.isDesktop).toBe(false);
  });

  it("should set tablet state when width is between 640 and 1023", () => {
    Object.defineProperty(window, "innerWidth", { configurable: true, value: 800 });

    const { result } = renderHook(() => useResize());

    act(() => {
      window.dispatchEvent(new Event("resize"));
    });

    expect(result.current.isMobile).toBe(false);
    expect(result.current.isTablet).toBe(true);
    expect(result.current.isDesktop).toBe(false);
  });

  it("should set desktop state when width is 1024 or greater", () => {
    Object.defineProperty(window, "innerWidth", { configurable: true, value: 1200 });

    const { result } = renderHook(() => useResize());

    act(() => {
      window.dispatchEvent(new Event("resize"));
    });

    expect(result.current.isMobile).toBe(false);
    expect(result.current.isTablet).toBe(false);
    expect(result.current.isDesktop).toBe(true);
  });

  it("should update states when record functions are called manually", () => {
    // Establecer el tamaño de pantalla a tablet para la prueba manual
    Object.defineProperty(window, "innerWidth", { configurable: true, value: 800 });

    const { result } = renderHook(() => useResize());

    act(() => {
      result.current.recordMobile();
      result.current.recordTablet();
      result.current.recordDesktop();
    });

    expect(result.current.isMobile).toBe(false);
    expect(result.current.isTablet).toBe(true);
    expect(result.current.isDesktop).toBe(false);
  });
});