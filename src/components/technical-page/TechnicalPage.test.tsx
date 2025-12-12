import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { describe, it, expect, vi, beforeEach, type Mock } from "vitest";
import {
  MemoryRouter,
  Routes,
  Route,
  useParams,
  useNavigate,
} from "react-router";
import userEvent from "@testing-library/user-event";
import TechnicalPage from "./TechnicalPage";
import { fetchTechnicalTestById } from "../../api/endPointTechnicalTests";

vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useParams: vi.fn(),
    useNavigate: vi.fn(),
  };
});

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

vi.mock("../../api/endPointTechnicalTests", () => ({
  fetchTechnicalTestById: vi.fn(),
}));

const mockTechnicalTest = {
  id: 11,
  title: "Prova React Junior",
  description: "Descripció de prova",
  level: "Junior",
  language: "JavaScript",
  created_at: "2024-01-01T12:00:00Z",
  tags: ["React", "Frontend"],
  exercises: ["Exercici 1", "Exercici 2"],
  difficulty_level: "Easy",
  duration: 120,
};

describe("TechnicalPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders correctly with projectId URL parameter", async () => {
    vi.mocked(useParams).mockReturnValue({ projectId: "11" });
    (fetchTechnicalTestById as Mock).mockResolvedValue(mockTechnicalTest);

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

    expect(fetchTechnicalTestById).toHaveBeenCalledWith(11);

    expect(await screen.findByTestId("mock-page-title")).toBeInTheDocument();

    expect(await screen.findByText("Prova React Junior")).toBeInTheDocument();
  });

  it("navigates to all tech tests page when back link is clicked", async () => {
    const mockNavigate = vi.fn();
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
    vi.mocked(useParams).mockReturnValue({ projectId: "11" });

    (fetchTechnicalTestById as Mock).mockResolvedValue(mockTechnicalTest);

    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <TechnicalPage />
      </MemoryRouter>,
    );

    const backLink = await screen.findByText("Tornar a Proves Tècniques");

    await user.click(backLink);

    expect(mockNavigate).toHaveBeenCalledWith(
      "/resources/technical-test/all-tech-tests",
    );
  });
});
