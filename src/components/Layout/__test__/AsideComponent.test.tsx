import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";

import { vi, describe, test, expect, beforeEach } from "vitest";
import AsideComponent from "../AsideComponent";
import { useUserContext } from "../../../context/UserContext";
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

vi.mock("react-router-dom", () => {
  const actual = vi.importActual("react-router-dom");
  return {
    ...actual,
    useLocation: () => mockUseLocation(),
    useNavigate: () => mockUseNavigate(),
    useSearchParams: () => mockUseSearchParams(),
  };
});

const asideContentMock = [
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

  test("renders aside content items when user is not logged in", () => {
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
        <AsideComponent asideContent={asideContentMock} />
      </MemoryRouter>,
    );

    expect(screen.getByText("Categorias")).toBeInTheDocument();

    asideContentMock.forEach((item) => {
      expect(screen.getByText(item.label)).toBeInTheDocument();
    });
    expect(screen.getAllByTestId("mock-icon")).toHaveLength(
      asideContentMock.length,
    );

    const searchInput = screen.getByRole("textbox");
    expect(searchInput).toBeInTheDocument();

    expect(screen.queryByText("Mis recursos")).not.toBeInTheDocument();
    expect(screen.queryByText("Crear recurso")).not.toBeInTheDocument();
  });

  test("renders user-specific sections when user is logged in", () => {
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
        <AsideComponent asideContent={asideContentMock} />
      </MemoryRouter>,
    );

    expect(screen.getByText("Categorias")).toBeInTheDocument();

    expect(screen.getByText("Mis recursos")).toBeInTheDocument();
    expect(screen.getByText("Guardados")).toBeInTheDocument();
    expect(screen.getByText("Creados")).toBeInTheDocument();
    expect(screen.getByText("Crear recurso")).toBeInTheDocument();
  });

  test("has correct link structure", () => {
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

    mockUseLocation.mockReturnValue({
      pathname: "/resources/React",
      search: "",
      hash: "",
      state: null,
      key: "default",
    });

    render(
      <MemoryRouter>
        <AsideComponent asideContent={asideContentMock} />
      </MemoryRouter>,
    );

    const reactLink = screen.getByText("React").closest("a");
    const nodeLink = screen.getByText("Node").closest("a");

    expect(reactLink).toBeInTheDocument();
    expect(nodeLink).toBeInTheDocument();
    expect(reactLink).toHaveAttribute("href", "/resources/React");
    expect(nodeLink).toHaveAttribute("href", "/resources/Node");

    expect(reactLink).toHaveClass("transition-colors");
    expect(nodeLink).toHaveClass("transition-colors");

    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Node")).toBeInTheDocument();
  });
});
