import { render, screen } from "@testing-library/react";
import GitHubLogin from "./GitHubLogin";
import { vi } from "vitest";

describe("Renderizado inicial", () => {
  it("debe renderizar el botón con el texto correcto", () => {
    render(<GitHubLogin />);
    const texto = screen.getByText(/Inicia sessió amb GitHub/i);

    expect(texto).toBeInTheDocument();
  });

  it("debe llamar a la función onClick cuando se hace clic en el botón", () => {
    const onClickMock = vi.fn();
    render(<GitHubLogin onClick={onClickMock} />);

    const boton = screen.getByText(/Inicia sessió amb GitHub/i);
    boton.click();

    expect(onClickMock).toHaveBeenCalled();
  });
});
