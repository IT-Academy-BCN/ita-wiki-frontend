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
  it("should navigate to ranking page when clicking ranking section", async () => {
    renderWithRouter(<HomePage />);

    const rankingSection = await screen.findByText("Competeix i millora");
    await userEvent.click(rankingSection.closest("section")!);

    expect(mockNavigate).toHaveBeenCalledWith("/ranking");
  });
});
