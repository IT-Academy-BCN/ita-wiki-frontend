import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TechnicalTestForm } from "../../TechnicalTestForm";
import { vi } from "vitest";
import "@testing-library/jest-dom";
import * as endPointTechnicalTests from "../../../../api/endPointTechnicalTests";
import { toast } from "sonner";

const mockNavigate = vi.fn();

vi.mock("react-router", () => ({
  useNavigate: () => mockNavigate,
}));

vi.mock("../../../../api/endPointTechnicalTests", () => ({
  createTechnicalTest: vi.fn(),
}));

vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe("TechnicalTestForm UI", () => {
  it("renders heading and back link", () => {
    render(<TechnicalTestForm />);
    expect(screen.getByText("Nova prova tècnica")).toBeInTheDocument();
    expect(screen.getByText("Tornar a proves tècniques")).toBeInTheDocument();
  });

  it("renders title input", () => {
    render(<TechnicalTestForm />);
    expect(screen.getByText("Títol *")).toBeInTheDocument();
  });

  it("renders language selection buttons", () => {
    render(<TechnicalTestForm />);
    expect(screen.getByText("Llenguatge *")).toBeInTheDocument();
    expect(screen.getAllByRole("button")).toEqual(
      expect.arrayContaining([expect.objectContaining({})]),
    );
  });

  it("renders content type toggle buttons", () => {
    render(<TechnicalTestForm />);
    expect(screen.getByRole("button", { name: "Text" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Fitxer" })).toBeInTheDocument();
  });

  it("renders Cancel and Publicar buttons", () => {
    render(<TechnicalTestForm />);
    expect(
      screen.getByRole("button", { name: "Cancel·lar" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Publicar" }),
    ).toBeInTheDocument();
  });

  it("updates duration input when user enters a number", async () => {
    const user = userEvent.setup();
    render(<TechnicalTestForm />);

    const durationInput = screen.getByRole("spinbutton");
    await user.type(durationInput, "60");

    expect(durationInput).toHaveValue(60);
  });

  it("selects a language when clicking on a language button", async () => {
    const user = userEvent.setup();
    render(<TechnicalTestForm />);

    const reactButton = screen.getByRole("button", { name: /React/i });

    expect(reactButton).toHaveClass("border-gray-300");
    expect(reactButton).not.toHaveClass("border-[#B91879]");

    await user.click(reactButton);

    expect(reactButton).toHaveClass("border-[#B91879]");
    expect(reactButton).not.toHaveClass("border-gray-300");
  });

  it("submits form with valid data and navigates on success", async () => {
    const user = userEvent.setup();
    const mockCreateTechnicalTest = vi.spyOn(
      endPointTechnicalTests,
      "createTechnicalTest",
    );
    mockCreateTechnicalTest.mockResolvedValue({ id: 1, success: true });

    render(<TechnicalTestForm />);

    const titleInput = screen.getAllByRole("textbox")[0];
    await user.type(titleInput, "Test Technical Assessment");

    const reactButton = screen.getByRole("button", { name: /React/i });
    await user.click(reactButton);

    const durationInput = screen.getByRole("spinbutton");
    await user.type(durationInput, "60");

    const difficultySelect = screen.getByRole("combobox");
    await user.selectOptions(difficultySelect, "Easy");

    const descriptionTextarea = screen.getAllByRole("textbox")[1];
    await user.type(descriptionTextarea, "This is a test description");

    const submitButton = screen.getByRole("button", { name: /Publicar/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockCreateTechnicalTest).toHaveBeenCalledTimes(1);
    });

    const formDataArg = mockCreateTechnicalTest.mock.calls[0][0];
    expect(formDataArg).toBeInstanceOf(FormData);
    expect(formDataArg.get("title")).toBe("Test Technical Assessment");
    expect(formDataArg.get("language")).toBe("React");
    expect(formDataArg.get("duration")).toBe("60");
    expect(formDataArg.get("difficulty")).toBe("Easy");
    expect(formDataArg.get("description")).toBe("This is a test description");

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith(
        "Prova tècnica publicada amb èxit!",
      );
    });

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith(
        "/resources/technical-test/all-tech-tests",
        {
          state: { successMessage: "Prueba técnica publicada con éxito" },
        },
      );
    });
  });
});
