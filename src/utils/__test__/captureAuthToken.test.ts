import { describe, it, expect, beforeEach, vi } from "vitest";
import { captureAuthToken } from "../captureAuthToken";

describe("captureAuthToken", () => {
  beforeEach(() => {
    // Limpiar localStorage antes de cada test
    localStorage.clear();
    
    // Limpiar el historial de window para evitar interferencias
    vi.clearAllMocks();
  });

  it("captures token from URL and stores it in localStorage", () => {
    // Simular URL con token: http://example.com/?token=abc123
    const mockToken = "mock-oauth-token-xyz789";
    delete (window as any).location;
    (window as any).location = new URL(`http://localhost:5173/?token=${mockToken}`);
    
    // Mock de history.replaceState
    const replaceStateSpy = vi.spyOn(window.history, 'replaceState');
    
    captureAuthToken();
    
    // Verificar que guardó el token en localStorage
    expect(localStorage.getItem('auth_token')).toBe(mockToken);
    
    // Verificar que limpió la URL
    expect(replaceStateSpy).toHaveBeenCalledWith({}, '', window.location.pathname);
  });

  it("does not store anything if there is no token in URL", () => {
    // Simular URL sin token: http://example.com/
    delete (window as any).location;
    (window as any).location = new URL("http://localhost:5173/");
    
    const replaceStateSpy = vi.spyOn(window.history, 'replaceState');
    
    captureAuthToken();
    
    // Verificar que NO guardó nada en localStorage
    expect(localStorage.getItem('auth_token')).toBeNull();
    
    // Verificar que NO modificó la URL
    expect(replaceStateSpy).not.toHaveBeenCalled();
  });

  it("handles URL with other query parameters", () => {
    // Simular URL con token y otros params: http://example.com/?token=abc&foo=bar
    const mockToken = "mock-oauth-token-xyz789";
    delete (window as any).location;
    (window as any).location = new URL(`http://localhost:5173/?token=${mockToken}&redirect=/dashboard`);
    
    captureAuthToken();
    
    // Verificar que solo capturó el token
    expect(localStorage.getItem('auth_token')).toBe(mockToken);
  });

  it("does not overwrite existing token if URL has no token", () => {
    // Simular que ya hay un token en localStorage
    const existingToken = "existing-token-123";
    localStorage.setItem('auth_token', existingToken);
    
    // URL sin token
    delete (window as any).location;
    (window as any).location = new URL("http://localhost:5173/");
    
    captureAuthToken();
    
    // Verificar que NO sobrescribió el token existente
    expect(localStorage.getItem('auth_token')).toBe(existingToken);
  });

  it("overwrites existing token if URL has a new token", () => {
    // Simular que ya hay un token viejo en localStorage
    const oldToken = "old-token-123";
    localStorage.setItem('auth_token', oldToken);
    
    // URL con nuevo token
    const newToken = "new-token-456";
    delete (window as any).location;
    (window as any).location = new URL(`http://localhost:5173/?token=${newToken}`);
    
    captureAuthToken();
    
    // Verificar que sobrescribió con el nuevo token
    expect(localStorage.getItem('auth_token')).toBe(newToken);
  });
});
