import { render, screen } from "@testing-library/react";
import Terms from "./Terms";
import { vi } from "vitest";

// Mock del hook useGlobalCtx
vi.mock("../../hooks/useGlobalCtx", () => ({
  useGlobalCtx: () => ({
    isCheckedTerms: false,
    handleCheckboxChange: vi.fn(),
  }),
}));

describe("Terms Component", () => {
  it("renderiza correctamente el checkbox con el texto 'Acepto términos legales'", () => {
    render(<Terms />);
    const checkbox = screen.queryByRole("checkbox", {
      name: "terms",
    });
    expect(checkbox).not.toBeInTheDocument();
  });

  it("renderiza correctamente el label asociado al checkbox", () => {
    render(<Terms />);
    const label = screen.getByText("Acepto términos legales");
    expect(label).toBeInTheDocument();
  });
});
