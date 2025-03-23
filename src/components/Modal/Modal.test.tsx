import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { Modal } from "./Modal";
import { EnuModalKeys } from "../../enums";

// Mock del hook useGlobalCtx
const closeModalMock = vi.fn();
vi.mock("../../hooks/useGlobalCtx", () => ({
  useGlobalCtx: () => ({
    isModalOpen: (key: EnuModalKeys) => key === EnuModalKeys.ACCESS,
    closeModal: closeModalMock,
  }),
}));

// NUEVO: Mock del hook useUserCtx para evitar "contexto no definido"
vi.mock("../../hooks/useUserCtx", () => ({
  useUserCtx: () => ({}),
}));

describe("Modal Component", () => {
  beforeEach(() => {
    closeModalMock.mockClear();
  });

  it("debe renderizar el modal cuando isModalOpen es true", () => {
    render(<Modal />);
    expect(screen.getByRole("button", { name: /X/i })).toBeInTheDocument();
  });

  it("debe llamar a closeModal al hacer click en el botón de cerrar", () => {
    render(<Modal />);
    const btnCerrar = screen.getByRole("button", { name: /X/i });
    fireEvent.click(btnCerrar);
    expect(closeModalMock).toHaveBeenCalledWith(EnuModalKeys.ACCESS);
  });
});
