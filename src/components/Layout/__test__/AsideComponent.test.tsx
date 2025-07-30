import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { vi, describe, test, expect, beforeEach } from "vitest";
import AsideComponent from "../AsideComponent";
import { useUserContext } from "../../../context/UserContext";
import { asideContentForTechnicalTest } from "../aside/asideContent";

import sql_vector from "../../../assets/sqlVector.svg?react";
import python_vector from "../../../assets/pythonVector.svg?react";
import ts_vector from "../../../assets/TypescriptVector.svg?react";
import js_vector from "../../../assets/javascript.svg?react";
import java_vector from "../../../assets/logo-java 1.svg?react";
import php_vector from "../../../assets/logo-php 1.svg?react";
import react_vector from "../../../assets/react.svg?react";

// Mocks
const MockIcon = () => <svg data-testid="mock-icon" />;

const mockUseLocation = vi.fn();
const mockUseNavigate = vi.fn();
const mockUseSearchParams = vi.fn();

vi.mock("../../../context/UserContext", () => ({
  useUserContext: vi.fn().mockReturnValue({
    user: null,
    isAuthenticated: false,
    signIn: vi.fn(),
    signOut: vi.fn(),
    error: null,
    setError: vi.fn(),
    saveUser: vi.fn(),
    setUser: vi.fn(),
  }),
}));

vi.mock("../../../assets/sqlVector.svg?react", () => ({
  default: () => <svg data-testid="sql-icon" />,
}));
vi.mock("../../../assets/pythonVector.svg?react", () => ({
  default: () => <svg data-testid="python-icon" />,
}));
vi.mock("../../../assets/TypescriptVector.svg?react", () => ({
  default: () => <svg data-testid="ts-icon" />,
}));
vi.mock("../../../assets/javascript.svg?react", () => ({
  default: () => <svg data-testid="js-icon" />,
}));
vi.mock("../../../assets/logo-java 1.svg?react", () => ({
  default: () => <svg data-testid="java-icon" />,
}));
vi.mock("../../../assets/logo-php 1.svg?react", () => ({
  default: () => <svg data-testid="php-icon" />,
}));
vi.mock("../../../assets/logo-node 1.svg?react", () => ({
  default: () => <svg data-testid="node-icon" />,
}));
vi.mock("../../../assets/react.svg?react", () => ({
  default: () => <svg data-testid="react-icon" />,
}));
vi.mock("../../../assets/angular.svg?react", () => ({
  default: () => <svg data-testid="angular-icon" />,
}));
vi.mock("../../../assets/data-science.svg?react", () => ({
  default: () => <svg data-testid="datascience-icon" />,
}));

vi.mock("react-router-dom", () => {
  const actual = vi.importActual("react-router-dom");
  return {
    ...actual,
    useLocation: () => mockUseLocation(),
    useNavigate: () => mockUseNavigate(),
    useSearchParams: () => mockUseSearchParams(),
  };
});

const asideContentForTechnicalTestMock = [
  { icon: MockIcon, label: "React" },
  { icon: MockIcon, label: "Node" },
];

describe("AsideComponent Tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    mockUseLocation.mockReturnValue({
      pathname: "/resources",
      search: "",
      hash: "",
      state: null,
      key: "default",
    });

    mockUseNavigate.mockReturnValue(vi.fn());
    mockUseSearchParams.mockReturnValue([new URLSearchParams(), vi.fn()]);
  });

  test("renders search input when user is not logged in", () => {
    vi.mocked(useUserContext).mockReturnValue({
      user: null,
      isAuthenticated: false,
      signIn: vi.fn(),
      signOut: vi.fn(),
      error: null,
      setError: vi.fn(),
      saveUser: vi.fn(),
      setUser: vi.fn(),
    });

    render(
      <MemoryRouter>
        <AsideComponent
          asideContentForTechnicalTest={asideContentForTechnicalTestMock}
        />
      </MemoryRouter>,
    );

    const searchInput = screen.getByRole("textbox");
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveAttribute("placeholder", "Buscar recurso");

    expect(screen.queryByText("Mis recursos")).toBeInTheDocument();
    expect(screen.queryByText("Crear recurso")).toBeInTheDocument();
  });

  test("should display 'Mis recursos' and 'Crear recurso' sections", () => {
    vi.mocked(useUserContext).mockReturnValue({
      user: null,
      isAuthenticated: false,
      signIn: vi.fn(),
      signOut: vi.fn(),
      error: null,
      setError: vi.fn(),
      saveUser: vi.fn(),
      setUser: vi.fn(),
    });

    render(
      <MemoryRouter>
        <AsideComponent
          asideContentForTechnicalTest={asideContentForTechnicalTestMock}
        />
      </MemoryRouter>,
    );

    expect(screen.getByText("Mis recursos")).toBeInTheDocument();
    expect(screen.getByText("Crear recurso")).toBeInTheDocument();
  });

  test("renders user sections when logged in", () => {
    vi.mocked(useUserContext).mockReturnValue({
      user: {
        id: 12345,
        displayName: "Test User",
        photoURL: "https://example.com/photo.jpg",
      },
      isAuthenticated: true,
      signIn: vi.fn(),
      signOut: vi.fn(),
      error: null,
      setError: vi.fn(),
      saveUser: vi.fn(),
      setUser: vi.fn(),
    });

    render(
      <MemoryRouter>
        <AsideComponent
          asideContentForTechnicalTest={asideContentForTechnicalTestMock}
        />
      </MemoryRouter>,
    );

    expect(screen.getByText("Mis recursos")).toBeInTheDocument();
    expect(screen.getByText("Guardados")).toBeInTheDocument();
    expect(screen.getByText("Creados")).toBeInTheDocument();
    expect(screen.getByText("Crear recurso")).toBeInTheDocument();
  });

  test("renders search input with correct attributes", () => {
    vi.mocked(useUserContext).mockReturnValue({
      user: null,
      isAuthenticated: false,
      signIn: vi.fn(),
      signOut: vi.fn(),
      error: null,
      setError: vi.fn(),
      saveUser: vi.fn(),
      setUser: vi.fn(),
    });

    render(
      <MemoryRouter>
        <AsideComponent
          asideContentForTechnicalTest={asideContentForTechnicalTestMock}
        />
      </MemoryRouter>,
    );

    const searchInput = screen.getByRole("textbox");
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveAttribute("placeholder", "Buscar recurso");
  });

  test("should render 'Inicio' link", () => {
    vi.mocked(useUserContext).mockReturnValue({
      user: null,
      isAuthenticated: false,
      signIn: vi.fn(),
      signOut: vi.fn(),
      error: null,
      setError: vi.fn(),
      saveUser: vi.fn(),
      setUser: vi.fn(),
    });

    render(
      <MemoryRouter>
        <AsideComponent
          asideContentForTechnicalTest={asideContentForTechnicalTestMock}
        />
      </MemoryRouter>,
    );

    expect(screen.getByText("Inicio")).toBeInTheDocument();
  });

  test("asideContentForTechnicalTest has correct labels and length", () => {
    const expectedLabels = [
      "React",
      "SQL",
      "JavaScript",
      "TypeScript",
      "Java",
      "PHP",
      "Python",
    ];

    expect(asideContentForTechnicalTest).toHaveLength(expectedLabels.length);

    expectedLabels.forEach((label, index) => {
      expect(asideContentForTechnicalTest[index].label).toBe(label);
      expect(typeof asideContentForTechnicalTest[index].icon).toBe("function");
    });
  });

  test("asideContentForTechnicalTest icons are correctly assigned", () => {
    const expectedIcons = [
      react_vector,
      sql_vector,
      js_vector,
      ts_vector,
      java_vector,
      php_vector,
      python_vector,
    ];

    asideContentForTechnicalTest.forEach((item, index) => {
      expect(item.icon).toBe(expectedIcons[index]);
    });
  });
});
