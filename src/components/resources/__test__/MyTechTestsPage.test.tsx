import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import MyTechTestsPage from "../../../pages/MyTechTestsPage";
import { vi } from "vitest";
import { MemoryRouter } from "react-router";

describe("MyTechTestsPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <MyTechTestsPage />
      </MemoryRouter>,
    );
    expect(screen.getByRole("list")).toBeInTheDocument();
  });

  it("fetches and displays tech test titles from mock data", async () => {
    const mockData = {
      data: [
        {
          id: 1,
          title: "Test A",
          language: "JavaScript",
          description: "Test description A",
          tags: ["tag1"],
        },
        {
          id: 2,
          title: "Test B",
          language: "TypeScript",
          description: "Test description B",
          tags: ["tag2"],
        },
      ],
    };

    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData),
      }),
    ) as unknown as typeof fetch;

    render(
      <MemoryRouter>
        <MyTechTestsPage />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText("- Test A")).toBeInTheDocument();
      expect(screen.getByText("- Test B")).toBeInTheDocument();
    });

    expect(fetch).toHaveBeenCalledWith("/technical-tests-mock.json");
  });

  it("handles empty data", async () => {
    const emptyMockData = { data: [] };

    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(emptyMockData),
      }),
    ) as unknown as typeof fetch;

    render(
      <MemoryRouter>
        <MyTechTestsPage />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.queryByText("- Test A")).not.toBeInTheDocument();
    });
  });
});
