import { render, screen } from "@testing-library/react";
import FormHeader from "../FormHeader";
import { vi } from "vitest";
import "@testing-library/jest-dom";

describe("Form Header UI", () => {
  const mockOnCancel = vi.fn();
  const mockOnPublish = vi.fn();

  it("renders Cancel and Publicar buttons", () => {
    render(
      <FormHeader
        onCancel={mockOnCancel}
        onPublish={mockOnPublish}
        textBack="Back to list"
        title="Test Form Title"
      />,
    );
    expect(
      screen.getByRole("button", { name: "Cancel·lar" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Publicar" }),
    ).toBeInTheDocument();
  });
});
