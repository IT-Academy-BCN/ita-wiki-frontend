import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { BrowserRouter } from "react-router";
import HomePage from "../HomePage";
import userEvent from "@testing-library/user-event";

//Mock navigate
const mockNavigate = vi.fn();

// Mock context and API to render without side effects
vi.mock("../../context/UserContext", () => ({
  useUserContext: () => ({ user: null }),
}));
vi.mock("../../api/userApi", () => ({
  getUserRole: vi.fn(),
}));
vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("HomePage", () => {
  it("renders a header element with the main headline", async () => {
    render(<HomePage />);
    const header = await screen.findByRole("banner");
    expect(header).toBeTruthy();
    expect(header.textContent).toMatch(/Aprèn, pràctica i creix/i);
  });

  it("renders exactly 4 section elements", async () => {
    const { container } = render(<HomePage />);

    await screen.findByText(/Descobreix recursos/i);

    const sections = container.querySelectorAll("section");
    expect(sections.length).toBe(4);
  });

  it("renders 4 images within section elements", async () => {
    const { container } = render(<HomePage />);

    await screen.findByText(/Descobreix recursos/i);

    const images = container.querySelectorAll("section img");
    expect(images.length).toBe(4);
  });
});

describe("HomePage Navigation", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it("should navigate to resources page when clicking resources section", async () => {
    renderWithRouter(<HomePage />);

    const resourcesSection = await screen.findByText("Descobreix recursos");
    await userEvent.click(resourcesSection.closest("section")!);

    expect(mockNavigate).toHaveBeenCalledWith("/resources/React");
  });

  it("should navigate to technical tests page when clicking technical section", async () => {
    renderWithRouter(<HomePage />);

    const technicalSection = await screen.findByText("Entrena amb proves tècniques reals");
    await userEvent.click(technicalSection.closest("section")!);

    expect(mockNavigate).toHaveBeenCalledWith("/resources/technical-test/all-tech-tests");
  });

  it("should navigate to codeconnect page when clicking codeconnect section", async () => {
    renderWithRouter(<HomePage />);

    const codeconnectSection = await screen.findByText("Col·labora en projectes");
    await userEvent.click(codeconnectSection.closest("section")!);

    expect(mockNavigate).toHaveBeenCalledWith("/codeconnect");
  });
});
