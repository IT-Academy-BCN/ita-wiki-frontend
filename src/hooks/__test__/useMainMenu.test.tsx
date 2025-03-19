import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import userEvent from "@testing-library/user-event";
import { useMainMenu } from "../useMainMenu";

const TestComponent = () => {
  const { isOpenMainMenu, toggleMainMenu, openMainMenu, closeMainMenu } =
    useMainMenu();
  return (
    <div>
      <span data-testid="status">{isOpenMainMenu ? "open" : "closed"}</span>
      <button onClick={toggleMainMenu}>Toggle</button>
      <button onClick={openMainMenu}>Open</button>
      <button onClick={closeMainMenu}>Close</button>
    </div>
  );
};

describe("useMainMenu hook", () => {
  it("should have an initial state of closed (false)", () => {
    render(<TestComponent />);
    const status = screen.getByTestId("status");
    expect(status.textContent).toBe("closed");
  });

  it("should toggle the main menu state when toggleMainMenu is called", async () => {
    render(<TestComponent />);
    const status = screen.getByTestId("status");
    const toggleButton = screen.getByRole("button", { name: /toggle/i });
    const user = userEvent.setup();

    // Estado inicial: closed
    expect(status.textContent).toBe("closed");

    // Al hacer click en toggle, se debe abrir el menú.
    await user.click(toggleButton);
    expect(status.textContent).toBe("open");

    // Al hacer click nuevamente, se debe cerrar el menú.
    await user.click(toggleButton);
    expect(status.textContent).toBe("closed");
  });

  it("should open the main menu when openMainMenu is called", async () => {
    render(<TestComponent />);
    const status = screen.getByTestId("status");
    const openButton = screen.getByRole("button", { name: /open/i });
    const user = userEvent.setup();

    // Estado inicial: closed
    expect(status.textContent).toBe("closed");

    // Al hacer click en open, se debe abrir el menú.
    await user.click(openButton);
    expect(status.textContent).toBe("open");
  });

  it("should close the main menu when closeMainMenu is called", async () => {
    render(<TestComponent />);
    const status = screen.getByTestId("status");
    const openButton = screen.getByRole("button", { name: /open/i });
    const closeButton = screen.getByRole("button", { name: /close/i });
    const user = userEvent.setup();

    // Primero, abrimos el menú.
    await user.click(openButton);
    expect(status.textContent).toBe("open");

    // Luego, cerramos el menú.
    await user.click(closeButton);
    expect(status.textContent).toBe("closed");
  });
});
