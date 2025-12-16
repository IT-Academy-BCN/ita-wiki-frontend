import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TechnicalTestForm } from "../../TechnicalTestForm";
import { vi } from "vitest";
import "@testing-library/jest-dom";
import * as endPointTechnicalTests from "../../../../api/endPointTechnicalTests";

const mockNavigate = vi.fn();

vi.mock("react-router", () => ({
  useNavigate: () => mockNavigate,
}));

vi.mock("../../../../api/endPointTechnicalTests", () => ({
  createTechnicalTest: vi.fn(),
}));

describe("TechnicalTestForm Validation", () => {
  it("shows validation error when title is empty", async () => {
    const user = userEvent.setup();
    render(<TechnicalTestForm />);

    const submitButton = screen.getByRole("button", { name: /Publicar/i });
    await user.click(submitButton);

    await waitFor(() => {
      const errorMessage = screen.getByText(
        /El títol ha de tenir almenys 10 caràcters/i,
      );
      expect(errorMessage).toBeInTheDocument();
    });
  });

  it("shows validation error when language is not selected", async () => {
    const user = userEvent.setup();
    render(<TechnicalTestForm />);

    const titleInput = screen.getAllByRole("textbox")[0];
    await user.type(titleInput, "Test Title with enough characters");

    const submitButton = screen.getByRole("button", { name: /Publicar/i });
    await user.click(submitButton);

    await waitFor(() => {
      const errorMessage = screen.getByText(
        /Si us plau, selecciona un llenguatge vàlid/i,
      );
      expect(errorMessage).toBeInTheDocument();
    });
  });

  it("shows validation error when duration is empty", async () => {
    const user = userEvent.setup();
    render(<TechnicalTestForm />);

    const titleInput = screen.getAllByRole("textbox")[0];
    await user.type(titleInput, "Test Title with enough characters");

    const reactButton = screen.getByRole("button", { name: /React/i });
    await user.click(reactButton);

    const submitButton = screen.getByRole("button", { name: /Publicar/i });
    await user.click(submitButton);

    await waitFor(() => {
      const errorMessage = screen.getByText(/La durada ha de ser un número/i);
      expect(errorMessage).toBeInTheDocument();
    });
  });

  it("shows validation error for invalid duration (negative number)", async () => {
    const user = userEvent.setup();
    render(<TechnicalTestForm />);

    const titleInput = screen.getAllByRole("textbox")[0];
    await user.type(titleInput, "Test Title with enough characters");

    const reactButton = screen.getByRole("button", { name: /React/i });
    await user.click(reactButton);

    const durationInput = screen.getByRole("spinbutton");
    await user.clear(durationInput);
    await user.type(durationInput, "-10");

    const difficultySelect = screen.getByRole("combobox");
    await user.selectOptions(difficultySelect, "easy");

    const submitButton = screen.getByRole("button", { name: /Publicar/i });
    await user.click(submitButton);

    await waitFor(() => {
      const errorMessage = screen.getByText(/La durada ha de ser major que 0/i);
      expect(errorMessage).toBeInTheDocument();
    });
  });

  it("shows validation error for invalid duration (zero)", async () => {
    const user = userEvent.setup();
    render(<TechnicalTestForm />);

    const titleInput = screen.getAllByRole("textbox")[0];
    await user.type(titleInput, "Test Title with enough characters");

    const reactButton = screen.getByRole("button", { name: /React/i });
    await user.click(reactButton);

    const durationInput = screen.getByRole("spinbutton");
    await user.clear(durationInput);
    await user.type(durationInput, "0");

    const difficultySelect = screen.getByRole("combobox");
    await user.selectOptions(difficultySelect, "easy");

    const submitButton = screen.getByRole("button", { name: /Publicar/i });
    await user.click(submitButton);

    await waitFor(() => {
      const errorMessage = screen.getByText(/La durada ha de ser major que 0/i);
      expect(errorMessage).toBeInTheDocument();
    });
  });

  it("does not submit form when validation fails", async () => {
    const user = userEvent.setup();
    const mockCreateTechnicalTest = vi.spyOn(
      endPointTechnicalTests,
      "createTechnicalTest",
    );

    render(<TechnicalTestForm />);

    const submitButton = screen.getByRole("button", { name: /Publicar/i });
    await user.click(submitButton);

    await waitFor(() => {
      const errorMessage = screen.getByText(
        /El títol ha de tenir almenys 10 caràcters/i,
      );
      expect(errorMessage).toBeInTheDocument();
    });

    expect(mockCreateTechnicalTest).not.toHaveBeenCalled();
  });
});
