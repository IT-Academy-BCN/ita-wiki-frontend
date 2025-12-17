import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, it, expect, vi, beforeEach } from "vitest"; // Afegeix beforeEach
import TechnicalTestList from "../TechnicalTestList";
import { TechnicalTest } from "../../../types/TechnicalTest";
// 1. IMPORTA EL HOOK REAL
import useTechnicalTestList from "../../../hooks/useTechnicalTestList";

const mockTests: TechnicalTest[] = [
  {
    id: 1,
    title: "Test A",
    language: "JavaScript",
    description: "Test description A",
    tags: [],
    created_at: "2025-01-01T00:00:00Z",
    updated_at: "2025-01-01T00:00:00Z",
    difficulty_level: "easy",
    duration: 60,
    exercises: [],
    state: "published",
  },
  {
    id: 2,
    title: "Test B",
    language: "TypeScript",
    description: "Test description B",
    tags: [],
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
    difficulty_level: "hard",
    duration: 120,
    exercises: [],
    state: "published",
  },
];

// 2. MOCKEJA EL MÒDUL (sense la factory function, només el path)
vi.mock("../../../hooks/useTechnicalTestList");

// 3. CREA LA REFERÈNCIA AL MOCK
const mockedUseTechnicalTestList = vi.mocked(useTechnicalTestList);

describe("TechnicalTestList", () => {
  // 4. CONFIGURA EL VALOR PER DEFECTE ABANS DE CADA TEST
  beforeEach(() => {
    mockedUseTechnicalTestList.mockReturnValue({
      technicalTests: mockTests,
      isLoading: false,
      error: null,
    });
  });

  it("fetches and displays technical test titles from mock data", async () => {
    render(
      <MemoryRouter>
        <TechnicalTestList />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText("Test A")).toBeDefined();
      expect(screen.getByText("Test B")).toBeDefined();
    });
  });

  it("The title 'Proves tècniques' must be displayed", () => {
    render(
      <MemoryRouter>
        <TechnicalTestList />
      </MemoryRouter>,
    );

    expect(screen.getByText("Proves tècniques")).toBeDefined();
  });

  it("filters by language when filters are provided", () => {
    render(
      <MemoryRouter>
        <TechnicalTestList
          filters={{
            languages: ["JavaScript"],
            years: [],
            difficulties: [],
          }}
        />
      </MemoryRouter>,
    );

    expect(screen.getByText("Test A")).toBeDefined();
    expect(screen.queryByText("Test B")).toBeNull();
  });

  it("filters by year when filters are provided", () => {
    render(
      <MemoryRouter>
        <TechnicalTestList
          filters={{
            languages: [],
            years: ["2024"],
            difficulties: [],
          }}
        />
      </MemoryRouter>,
    );

    expect(screen.getByText("Test B")).toBeDefined();
    expect(screen.queryByText("Test A")).toBeNull();
  });

  it("filters by difficulty (Bàsica -> easy)", () => {
    render(
      <MemoryRouter>
        <TechnicalTestList
          filters={{
            languages: [],
            years: [],
            difficulties: ["Bàsica"],
          }}
        />
      </MemoryRouter>,
    );

    expect(screen.getByText("Test A")).toBeDefined();
    expect(screen.queryByText("Test B")).toBeNull();
  });

  it("filters by difficulty (Difícil -> hard)", () => {
    render(
      <MemoryRouter>
        <TechnicalTestList
          filters={{
            languages: [],
            years: [],
            difficulties: ["Difícil"],
          }}
        />
      </MemoryRouter>,
    );

    expect(screen.getByText("Test B")).toBeDefined();
    expect(screen.queryByText("Test A")).toBeNull();
  });

  // 5. ARA AQUEST TEST JA FUNCIONA CORRECTAMENT
  it("shows error message when there is an error", () => {
    // Sobreescrivim el mock només per aquest test
    mockedUseTechnicalTestList.mockReturnValue({
      technicalTests: [],
      isLoading: false,
      error: new Error("Algo ha fallado"),
    });

    render(
      <MemoryRouter>
        <TechnicalTestList />
      </MemoryRouter>,
    );

    expect(screen.getByText(/Error: Algo ha fallado/)).toBeDefined();
  });
});
