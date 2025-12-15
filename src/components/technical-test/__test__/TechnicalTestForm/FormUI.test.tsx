import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TechnicalTestForm } from "../../TechnicalTestForm";
import { vi } from "vitest";
import "@testing-library/jest-dom";

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
  it("renders content type toggle buttons", () => {
    render(<TechnicalTestForm />);
    expect(screen.getByRole("button", { name: "Text" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Fitxer" })).toBeInTheDocument();
  });

  it("updates duration input when user enters a number", async () => {
    const user = userEvent.setup();
    render(<TechnicalTestForm />);

    const durationInput = screen.getByRole("spinbutton");
    await user.type(durationInput, "60");

    expect(durationInput).toHaveValue(60);
  });
});
