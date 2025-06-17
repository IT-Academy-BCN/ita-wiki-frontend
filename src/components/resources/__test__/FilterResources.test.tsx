import { render, screen } from "@testing-library/react";
import { vi, describe, test, expect } from "vitest";
import { FilterResources } from "../FilterResources";

const mockUseParams = vi.fn();

vi.mock("react-router", () => ({
  useParams: () => mockUseParams(),
}));

const mockProps = {
  resourceTypes: ["Video", "Blog", "Cursos"] as const,
  selectedTags: [],
  setSelectedTags: vi.fn(),
  selectedResourceTypes: ["Video", "Blog", "Cursos"],
  setSelectedResourceTypes: vi.fn(),
};

describe("FilterResources Component", () => {
  test("should render Temas section", () => {
    mockUseParams.mockReturnValue({ category: "React" });

    render(<FilterResources {...mockProps} />);

    expect(screen.getByText("Temas")).toBeInTheDocument();
    expect(screen.getByText("Todos")).toBeInTheDocument();
  });

  test("should show no available themes message", () => {
    mockUseParams.mockReturnValue({ category: "UnknownCategory" });

    render(<FilterResources {...mockProps} />);

    expect(screen.getByText("Temas")).toBeInTheDocument();
    expect(screen.getByText("No hay temas disponibles.")).toBeInTheDocument();
  });
});
