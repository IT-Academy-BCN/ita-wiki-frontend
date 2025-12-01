import React from "react";
import { render, screen } from "@testing-library/react";
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

  it("renders duration input field", () => {
    render(<TechnicalTestForm />);
    expect(screen.getByText("Durada (minuts)")).toBeInTheDocument();
    const durationInput = screen.getByRole("spinbutton");
    expect(durationInput).toBeInTheDocument();
    expect(durationInput).toHaveAttribute("type", "number");
    expect(durationInput).toHaveAttribute("min", "1");
  });

  it("renders difficulty select field with correct options", () => {
    render(<TechnicalTestForm />);
    expect(screen.getByText("Dificultat")).toBeInTheDocument();
    const difficultySelect = screen.getByLabelText("Dificultat");
    expect(difficultySelect).toBeInTheDocument();
    expect(difficultySelect).toHaveValue("easy");

    expect(screen.getByRole("option", { name: "Fàcil" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Mitjana" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Difícil" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Expert" })).toBeInTheDocument();
  });

  it("renders exercises section with 4 textareas", () => {
    render(<TechnicalTestForm />);
    expect(screen.getByText("Exercicis")).toBeInTheDocument();

    const exerciseTextareas = screen.getAllByPlaceholderText(/Exercici \d/);
    expect(exerciseTextareas).toHaveLength(4);
    expect(screen.getByPlaceholderText("Exercici 1")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Exercici 2")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Exercici 3")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Exercici 4")).toBeInTheDocument();
  });
});
