import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SelectedTagsContainer } from "../SelectedTagsContainer";
import type { Tag } from "../../../types";
describe("SelectedTagsContainer", () => {
  const mockTags: Tag[] = [
    { id: 1, name: "react", created_at: "", updated_at: "" },
    { id: 2, name: "typescript", created_at: "", updated_at: "" },
    { id: 3, name: "css-modules", created_at: "", updated_at: "" },
  ];

  it("muestra mensaje cuando no hay tags seleccionados", () => {
    const onRemove = vi.fn();

    render(<SelectedTagsContainer tags={[]} onRemove={onRemove} />);

    expect(
      screen.getByText("No hi ha etiquetes seleccionades"),
    ).toBeInTheDocument();
  });

  it("renderiza los tags seleccionados como chips", () => {
    const onRemove = vi.fn();

    render(<SelectedTagsContainer tags={mockTags} onRemove={onRemove} />);

    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Typescript")).toBeInTheDocument();
    expect(screen.getByText("Css Modules")).toBeInTheDocument();
  });

  it("llama a onRemove con el ID correcto al hacer click en el botón X", async () => {
    const user = userEvent.setup();
    const onRemove = vi.fn();

    render(<SelectedTagsContainer tags={mockTags} onRemove={onRemove} />);

    const removeButtons = screen.getAllByRole("button");
    const firstRemoveButton = removeButtons[0];

    await user.click(firstRemoveButton);

    expect(onRemove).toHaveBeenCalledTimes(1);
    expect(onRemove).toHaveBeenCalledWith(1);
  });

  it("renderiza múltiples botones de eliminación", () => {
    const onRemove = vi.fn();

    render(<SelectedTagsContainer tags={mockTags} onRemove={onRemove} />);

    const removeButtons = screen.getAllByRole("button");
    expect(removeButtons).toHaveLength(3);
  });

  it("cada botón muestra el símbolo × para eliminar", () => {
    const onRemove = vi.fn();

    render(<SelectedTagsContainer tags={mockTags} onRemove={onRemove} />);

    const removeButtons = screen.getAllByRole("button");

    removeButtons.forEach((button) => {
      expect(button).toHaveTextContent("×");
    });
  });
});
