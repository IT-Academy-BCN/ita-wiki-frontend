import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import { MemoryRouter, Routes, Route } from "react-router";
import CodeConnectDetails, { details } from "../CodeConnectDetails";
import { vi } from "vitest";

vi.mock("react-router-dom", () => ({
  ...vi.importActual("react-router-dom"),
  useParams: () => ({ projectId: "taskforge" }),
}));

describe("CodeConnectDetails", () => {
  it("renders project details correctly", () => {
    render(
      <MemoryRouter initialEntries={["/codeconnect/taskforge"]}>
        <Routes>
          <Route
            path="/codeconnect/:projectId"
            element={<CodeConnectDetails />}
          />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { level: 2 }));

    details[0].roadmap.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  it("navigates to correct project using URL parameter", () => {
    render(
      <MemoryRouter initialEntries={["/codeconnect/taskforge"]}>
        <Routes>
          <Route
            path="/codeconnect/:projectId"
            element={<CodeConnectDetails />}
          />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      details[0].title,
    );
  });
});
