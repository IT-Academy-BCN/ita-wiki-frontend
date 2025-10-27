import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import { MemoryRouter, Routes, Route } from "react-router";
import CodeConnectPage from "../CodeConnectPage";
import { vi } from "vitest";

vi.mock("../../components/ui/PageTitle", () => ({
  default: ({ title }: { title: string }) => (
    <div data-testid="page-title">{title}</div>
  ),
}));

describe("CodeConnectPage routing", () => {
  it("renders when navigating to /codeconnect", () => {
    render(
      <MemoryRouter initialEntries={["/codeconnect"]}>
        <Routes>
          <Route path="/codeconnect" element={<CodeConnectPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId("page-title")).toHaveTextContent(
      "Lista de proyectos Code Connect"
    );
    expect(
      screen.getByRole("heading", { level: 2, name: /Code Connect/i })
    ).toBeInTheDocument();
  });
});