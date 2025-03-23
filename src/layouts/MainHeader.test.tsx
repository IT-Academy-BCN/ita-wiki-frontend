import { render, screen, fireEvent } from "@testing-library/react";
import MainHeader from "./MainHeader";
import { Mock, vi } from "vitest";

vi.mock("../hooks/useGlobalCtx", () => ({
  useGlobalCtx: vi.fn(),
}));
vi.mock("../hooks/useUserCtx", () => ({
  useUserCtx: vi.fn(),
}));
vi.mock("../hooks/useRedirectTo", () => ({
  useRedirectTo: vi.fn(() => ({ goTo: vi.fn() })),
}));
// Mock del Modal para identificar su renderizado
vi.mock("../components/Modal/Modal", () => ({
  Modal: () => <div data-testid="modal">Modal Abierto</div>,
}));

import { useGlobalCtx } from "../hooks/useGlobalCtx";
import { useUserCtx } from "../hooks/useUserCtx";

describe("MainHeader Component", () => {
  test("muestra vista móvil y llama toggleMainMenu", () => {
    const toggleMainMenu = vi.fn();
    (useGlobalCtx as Mock).mockReturnValue({
      isTablet: true,
      isMobile: false,
      toggleMainMenu,
      openModal: vi.fn(),
      isModalOpen: () => false,
    });
    // No se necesita usuario para vista móvil
    (useUserCtx as Mock).mockReturnValue({ user: null });

    render(<MainHeader />);
    // Verifica que se muestra botón con title "Open"
    const openBtn = screen.getByRole("button", { name: "Open" });
    expect(openBtn).toBeInTheDocument();
    fireEvent.click(openBtn);
    expect(toggleMainMenu).toHaveBeenCalled();
  });

  test("muestra vista desktop con búsqueda y select de idioma", () => {
    (useGlobalCtx as Mock).mockReturnValue({
      isTablet: false,
      isMobile: false,
      toggleMainMenu: vi.fn(),
      openModal: vi.fn(),
      isModalOpen: () => false,
    });
    (useUserCtx as Mock).mockReturnValue({ user: { name: "Juan" } });

    render(<MainHeader />);
    // Verifica que se renderiza el input de búsqueda
    const searchInput = screen.getByPlaceholderText("Buscar recurso");
    expect(searchInput).toBeInTheDocument();
    // Verifica que se renderiza el select de idiomas
    const langSelect = screen.getByTitle("lang");
    expect(langSelect).toBeInTheDocument();
  });

  test("muestra Modal cuando isModalOpen devuelve true", () => {
    const openModal = vi.fn();
    (useGlobalCtx as Mock).mockReturnValue({
      isTablet: false,
      isMobile: false,
      toggleMainMenu: vi.fn(),
      openModal,
      isModalOpen: (key: string) => key === "access",
    });
    (useUserCtx as Mock).mockReturnValue({ user: { name: "Juan" } });

    render(<MainHeader />);
    // Se espera que, al retornar true, se renderice el Modal
    const modal = screen.getByTestId("modal");
    expect(modal).toBeInTheDocument();
  });
});
