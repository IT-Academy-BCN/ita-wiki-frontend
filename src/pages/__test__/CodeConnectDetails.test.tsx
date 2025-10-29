import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import { MemoryRouter, Routes, Route } from "react-router";
import CodeConnectDetails, { details } from "../CodeConnectDetails";

describe("CodeConnectDetails", () => {
  it("renders project details correctly", () => {
    render(
      <MemoryRouter initialEntries={["/codeconnect/taskforge"]}>
        <Routes>
          <Route path="/codeconnect/:projectId" element={<CodeConnectDetails />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("TaskForge: forja tu productividad");

    expect(screen.getByText(/TaskForge es una aplicación web de gestión de tareas/i)).toBeInTheDocument();

    details[0].roadmap.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });
});