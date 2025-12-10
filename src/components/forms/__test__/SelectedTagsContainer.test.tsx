import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { SelectedTagsContainer } from "../SelectedTagsContainer";
import React from "react";
import type { Tag } from "../../../types";

const mockTags: Tag[] = [
  { id: 1, name: "React", created_at: "2024-01-01", updated_at: "2024-01-01" },
  { id: 2, name: "JavaScript", created_at: "2024-01-01", updated_at: "2024-01-01" },
  { id: 3, name: "CSS", created_at: "2024-01-01", updated_at: "2024-01-01" },
];

vi.mock("../../ui/shared-ui/UiButton", () => ({
  UiButton: ({ children, onClick, ...props }: React.ComponentProps<'button'>) => (
    <button onClick={onClick} {...props}>
      {children}
    </button>
  ),
}));

vi.mock("../../../utils/formatText", () => ({
  formatText: (text: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  },
}));

describe("SelectedTagsContainer", () => {
  it("muestra mensaje cuando no hay tags seleccionados", () => {
    const onRemove = vi.fn();

    render(<SelectedTagsContainer tags={[]} onRemove={onRemove} />);

    expect(
      screen.getByText("No hi ha etiquetes seleccionades")
    ).toBeInTheDocument();
  });

  it("no muestra la lista de chips cuando está vacío", () => {
    const onRemove = vi.fn();

    const { container } = render(
      <SelectedTagsContainer tags={[]} onRemove={onRemove} />
    );

    const chipList = container.querySelector(".flex.flex-wrap");
    expect(chipList).not.toBeInTheDocument();
  });

  it("renderiza la lista de tags correctamente", () => {
    const onRemove = vi.fn();

    render(<SelectedTagsContainer tags={mockTags} onRemove={onRemove} />);

    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Javascript")).toBeInTheDocument();
    expect(screen.getByText("Css")).toBeInTheDocument();
  });

  it("no muestra el mensaje de vacío cuando hay tags", () => {
    const onRemove = vi.fn();

    render(<SelectedTagsContainer tags={mockTags} onRemove={onRemove} />);

    expect(
      screen.queryByText("No hi ha etiquetes seleccionades")
    ).not.toBeInTheDocument();
  });

  it("aplica formatText a cada nombre de tag", () => {
    const onRemove = vi.fn();
    const customTag: Tag = {
      id: 99,
      name: "UPPERCASE",
      created_at: "",
      updated_at: "",
    };

    render(<SelectedTagsContainer tags={[customTag]} onRemove={onRemove} />);

    expect(screen.getByText("Uppercase")).toBeInTheDocument();
  });


  it("cada chip tiene un botón de eliminación con ×", () => {
    const onRemove = vi.fn();

    render(<SelectedTagsContainer tags={mockTags} onRemove={onRemove} />);

    const removeButtons = screen.getAllByRole("button");
    expect(removeButtons).toHaveLength(3);

    removeButtons.forEach((button) => {
      expect(button).toHaveTextContent("×");
    });
  });

  it("cada chip tiene un chip con fondo gris", () => {
    const onRemove = vi.fn();

    const { container } = render(
      <SelectedTagsContainer tags={mockTags} onRemove={onRemove} />
    );

    const chips = container.querySelectorAll(".bg-gray-200");
    expect(chips).toHaveLength(3);
  });

  it("renderiza el número correcto de tags", () => {
    const onRemove = vi.fn();

    render(<SelectedTagsContainer tags={mockTags} onRemove={onRemove} />);

    const chips = screen.getAllByRole("button");
    expect(chips).toHaveLength(mockTags.length);
  });
  it("llama a onRemove con el id correcto al hacer click en ×", () => {
    const onRemove = vi.fn();

    render(<SelectedTagsContainer tags={mockTags} onRemove={onRemove} />);

    const removeButtons = screen.getAllByRole("button");

    fireEvent.click(removeButtons[0]);
    expect(onRemove).toHaveBeenCalledWith(1);

    fireEvent.click(removeButtons[1]);
    expect(onRemove).toHaveBeenCalledWith(2);
  });

  it("llama a onRemove solo una vez por click", () => {
    const onRemove = vi.fn();

    render(<SelectedTagsContainer tags={[mockTags[0]]} onRemove={onRemove} />);

    const removeButton = screen.getByRole("button");

    fireEvent.click(removeButton);

    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  it("no llama a onRemove si no se hace click", () => {
    const onRemove = vi.fn();

    render(<SelectedTagsContainer tags={mockTags} onRemove={onRemove} />);

    expect(onRemove).not.toHaveBeenCalled();
  });

  it("cada botón tiene aria-label descriptivo", () => {
    const onRemove = vi.fn();

    render(<SelectedTagsContainer tags={[mockTags[0]]} onRemove={onRemove} />);

    const button = screen.getByLabelText("Eliminar React");
    expect(button).toBeInTheDocument();
  });

  it("usa type='button' en los botones para prevenir submit", () => {
    const onRemove = vi.fn();

    render(<SelectedTagsContainer tags={[mockTags[0]]} onRemove={onRemove} />);

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("type", "button");
  });
});
