import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter, Routes, Route } from "react-router";
import CodeConnectPage from "../CodeConnectPage";
import { vi } from "vitest";

vi.mock("../../components/ui/PageTitle", () => ({
  default: ({ title }: { title: string }) => (
    <div data-testid="page-title">{title}</div>
  ),
}));

describe("CodeConnectPage", () => {
  it("renders when navigating to /codeconnect", () => {
    render(
      <MemoryRouter initialEntries={["/codeconnect"]}>
        <Routes>
          <Route path="/codeconnect" element={<CodeConnectPage />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByTestId("page-title")).toHaveTextContent(
      "Llista de projectes Code Connect",
    );
    expect(
      screen.getByRole("heading", { level: 2, name: /Code Connect/i }),
    ).toBeInTheDocument();
  });

  it("navigates to /codeconnect/create when clicking the button", () => {
    render(
      <MemoryRouter initialEntries={["/codeconnect"]}>
        <Routes>
          <Route path="/codeconnect" element={<CodeConnectPage />} />
          <Route
            path="/codeconnect/create"
            element={<div>Create Code Connect Page</div>}
          />
        </Routes>
      </MemoryRouter>,
    );

    const button = screen.getByRole("button", { name: /Crear projecte/i });
    fireEvent.click(button);

    expect(screen.getByText("Create Code Connect Page")).toBeInTheDocument();
  });
});
