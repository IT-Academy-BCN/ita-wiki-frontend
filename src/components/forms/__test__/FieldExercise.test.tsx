import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FieldExercise from "../FieldExercise";
import { useForm } from "react-hook-form";

type ExerciseItem = {
  name: string;
};

type FormValues = {
  exercises: ExerciseItem[];
};

const TestWrapper = () => {
  const { control } = useForm<FormValues>({
    defaultValues: {
      exercises: [],
    },
  });

  return <FieldExercise control={control} />;
};

describe("FieldExercise component", () => {
  it("renders one exercise field initially", () => {
    render(<TestWrapper />);
    const inputs = screen.getAllByLabelText(/Exercise \d+/);
    expect(inputs).toHaveLength(1);
    expect(inputs[0]).toHaveAttribute("placeholder", "Afegir un nou exercici");
  });

  it("adds a new field when clicking add button", async () => {
    const user = userEvent.setup();
    render(<TestWrapper />);

    const addButtons = screen.getAllByLabelText("Afegir camp exercici");
    await user.click(addButtons[0]);

    const inputs = screen.getAllByLabelText(/Exercise \d+/);
    expect(inputs).toHaveLength(2);
  });

  it("removes a field when clicking remove button", async () => {
    const user = userEvent.setup();
    render(<TestWrapper />);

    const addButton = screen.getAllByLabelText("Afegir camp exercici")[0];
    await user.click(addButton);

    let inputs = screen.getAllByLabelText(/Exercise \d+/);
    expect(inputs).toHaveLength(2);

    const removeButton = screen.getByLabelText("Eliminar exercici 2");
    await user.click(removeButton);

    inputs = screen.getAllByLabelText(/Exercise \d+/);
    expect(inputs).toHaveLength(1);
  });

  it("prevents removing the last field", () => {
    render(<TestWrapper />);

    const inputs = screen.getAllByLabelText(/Exercise \d+/);
    expect(inputs).toHaveLength(1);

    const removeButtons = screen.queryAllByLabelText(/Eliminar exercici/);
    expect(removeButtons).toHaveLength(0);
  });
});
