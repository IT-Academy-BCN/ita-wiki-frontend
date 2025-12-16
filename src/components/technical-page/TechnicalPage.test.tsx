import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router";
import userEvent from "@testing-library/user-event";
import TechnicalPage from "./TechnicalPage";
import useTechnicalTestPage from "../../hooks/useTechnicalTestPage";

vi.mock("../../components/ui/Container", () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="mock-container">{children}</div>
  ),
}));

vi.mock("../../components/ui/PageTitle", () => ({
  default: ({ title }: { title: string }) => (
    <div data-testid="mock-page-title">{title}</div>
  ),
}));

vi.mock("../../hooks/useTechnicalTestPage", () => ({
  default: vi.fn(),
}));

const mockNavigate = vi.fn();
vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useNavigate: () => mockNavigate, // Retornem sempre la nostra funció espia
  };
});

const mockTechnicalTest = {
  id: 11,
  title: "Prova React Junior",
  description: "Descripció de prova",
  level: "Junior",
  language: "JavaScript",
  created_at: "2024-01-01",
  tags: ["React", "Frontend"],
  exercises: ["Exercici 1", "Exercici 2"],
  difficulty_level: "Easy",
  duration: 120,
};

describe("TechnicalPage Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should show 'Carregant...' when the hook is isLoading: true", () => {
    (useTechnicalTestPage as Mock).mockReturnValue({
      technicalTest: null,
      isLoading: true,
    });

    render(
      <MemoryRouter initialEntries={["/resources/technical-test/11"]}>
        <Routes>
          <Route
            path="/resources/technical-test/:projectId"
            element={<TechnicalPage />}
          />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText("Carregant...")).toBeInTheDocument();
  });

  it("should render the data when the hook returns technicalTest", () => {
    (useTechnicalTestPage as Mock).mockReturnValue({
      technicalTest: mockTechnicalTest,
      isLoading: false,
    });

    render(
      <MemoryRouter initialEntries={["/resources/technical-test/11"]}>
        <Routes>
          <Route
            path="/resources/technical-test/:projectId"
            element={<TechnicalPage />}
          />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByTestId("mock-page-title")).toBeInTheDocument();
    expect(screen.getByText("Prova React Junior")).toBeInTheDocument();
    expect(screen.getByText("Descripció de prova")).toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument(); // Tag
  });

  it("should navigate back when clicking the back button", async () => {
    (useTechnicalTestPage as Mock).mockReturnValue({
      technicalTest: mockTechnicalTest,
      isLoading: false,
    });

    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={["/resources/technical-test/11"]}>
        <Routes>
          <Route
            path="/resources/technical-test/:projectId"
            element={<TechnicalPage />}
          />
        </Routes>
      </MemoryRouter>,
    );

    const backLink = screen.getByText("Tornar a Proves Tècniques");
    await user.click(backLink);

    expect(mockNavigate).toHaveBeenCalledWith(
      "/resources/technical-test/all-tech-tests",
    );
  });
});
