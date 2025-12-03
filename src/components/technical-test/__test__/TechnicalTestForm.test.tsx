import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TechnicalTestForm } from "../TechnicalTestForm";
import { vi } from "vitest";
import "@testing-library/jest-dom";

vi.mock("react-router", () => ({
  useNavigate: () => vi.fn(),
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
});
