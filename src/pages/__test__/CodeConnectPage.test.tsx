import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import CodeConnectPage from "../CodeConnectPage";
import { vi } from "vitest";

// Mock correto do PageTitle
vi.mock("../../components/ui/PageTitle", () => ({
  default: ({ title }: { title: string }) => (
    <div data-testid="page-title">{title}</div>
  ),
}));

describe("CodeConnectPage", () => {
  it("renders the main page title and content header", () => {
    render(<CodeConnectPage />);

    // Verifica o título da página
    const pageTitle = screen.getByTestId("page-title");
    expect(pageTitle).toHaveTextContent("Lista de proyectos Code Connect");

    // Verifica o título do conteúdo
    const contentHeader = screen.getByRole("heading", {
      level: 2,
      name: /Code Connect/i,
    });
    expect(contentHeader).toBeInTheDocument();
  });
});
