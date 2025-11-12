import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter, Routes, Route } from "react-router";
import CodeConnectCreatPage from "../CodeConnectCreatePage";
import { vi } from "vitest";

vi.mock("../../components/ui/PageTitle", () => ({
  default: ({ title }: { title: string }) => (
    <div data-testid="page-title">{title}</div>
  ),
}));

describe("CodeConnectCreatePage routing", () => {
  it("renders when navigating to /codeconnect/create", () => {
    render(
      <MemoryRouter initialEntries={["/codeconnect/create"]}>
        <Routes>
          <Route
            path="/codeconnect/create"
            element={<CodeConnectCreatPage />}
          />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByTestId("page-title")).toHaveTextContent(
      "Afegir un projecte CodeConnect",
    );
  });
});
