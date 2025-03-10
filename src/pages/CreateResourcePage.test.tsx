import { render, screen, fireEvent } from "@testing-library/react";
import CreateResourcePage from "../pages/CreateResourcePage.tsx";
import { vi } from "vitest";

vi.mock("../hooks/useUser", () => ({
  useUser: () => ({
    user: { id: "123" },
  }),
}));

describe("CreateResourcePage", () => {
  it("debería actualizar el estado cuando el usuario escribe en los inputs", () => {
    render(<CreateResourcePage />);

    const titleInput = screen.getByPlaceholderText(
      "Título",
    ) as HTMLInputElement;
    const descriptionInput = screen.getByPlaceholderText(
      "Description",
    ) as HTMLInputElement;
    const urlInput = screen.getByPlaceholderText("URL") as HTMLInputElement;

    fireEvent.change(titleInput, { target: { value: "Nuevo recurso" } });
    fireEvent.change(descriptionInput, {
      target: { value: "Descripción de prueba" },
    });
    fireEvent.change(urlInput, { target: { value: "https://ejemplo.com" } });

    expect(titleInput.value).toBe("Nuevo recurso");
    expect(descriptionInput.value).toBe("Descripción de prueba");
    expect(urlInput.value).toBe("https://ejemplo.com");
  });
});
