import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import { MemoryRouter, Routes, Route } from "react-router";
import { vi } from "vitest";
import CodeConnectDetails from "../CodeConnectDetails";
import moockData from "../../moock/projectDetails.json";

// Mock URL param
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useParams: () => ({ projectId: "taskforge" }),
  };
});

describe("CodeConnectDetails", () => {
  const project = moockData.details[0];

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

    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      project.title,
    );

    project.roadmap.forEach((item) => {
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
      project.title,
    );
  });
});
