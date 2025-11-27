import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter, Routes, Route, useParams, useNavigate } from "react-router";
import userEvent from "@testing-library/user-event";
import TechnicalPage from "./TechnicalPage";

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

describe("TechnicalPage", () => {
  it("renders correctly with projectId URL parameter", () => {
    vi.mocked(useParams).mockReturnValue({ projectId: "11" });

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

    expect(screen.getByTestId("mock-container")).toBeInTheDocument();
    expect(screen.getByTestId("mock-page-title")).toBeInTheDocument();
    expect(vi.mocked(useParams)()).toEqual({ projectId: "11" });
  });

  it("renders the page structure with title and container", () => {
    vi.mocked(useParams).mockReturnValue({});

    render(
      <MemoryRouter>
        <TechnicalPage />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("mock-page-title")).toBeInTheDocument();
    expect(screen.getByTestId("mock-container")).toBeInTheDocument();
  });

  it("navigates to all tech tests page when back link is clicked", async () => {
    const mockNavigate = vi.fn();
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
    vi.mocked(useParams).mockReturnValue({});

    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <TechnicalPage />
      </MemoryRouter>,
    );

    const backLink = screen.getByText("Tornar a Proves Tècniques");
    await user.click(backLink);

    expect(mockNavigate).toHaveBeenCalledWith(
      "/resources/technical-test/all-tech-tests",
    );
  });
});
