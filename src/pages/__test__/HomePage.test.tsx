import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import HomePage from "../HomePage";

// Mock context and API to render without side effects
vi.mock("../../context/UserContext", () => ({
  useUserContext: () => ({ user: null }),
}));
vi.mock("../../api/userApi", () => ({
  getUserRole: vi.fn(),
}));

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
