import { render, screen } from "@testing-library/react";
import RightSideBar from "./RightSideBar";
import { useUserCtx } from "../hooks/user/useUserCtx";
import { getPersonalResources } from "../api/userApi";
import { Mock, vi } from "vitest";
import { IntResource } from "../types";

vi.mock("../hooks/useUserCtx", () => ({
  useUserCtx: vi.fn(),
}));

vi.mock("../api/userApi", () => ({
  getPersonalResources: vi.fn(),
}));

vi.mock("../components/resources/ListMyResources", () => ({
  ListMyResources: () => <div>ListMyResources Component</div>,
}));

describe("RightSideBar Component", () => {
  const mockResources = [
    {
      id: 1,
      title: "Test Resource",
      github_id: 123456,
      description: "A test resource",
      url: "https://example.com",
      category: "JavaScript",
      theme: "Todos",
      type: "Video",
      created_at: new Date(),
      updated_at: new Date(),
    },
  ];

  afterEach(() => {
    vi.clearAllMocks();
  });

  test("Siempre se renderiza el título 'Lista de lectura'", () => {
    (useUserCtx as Mock).mockReturnValue({ user: null });
    (getPersonalResources as Mock).mockReturnValue([]);
    render(<RightSideBar resources={mockResources as IntResource[]} />);
    expect(screen.getByText("Lista de lectura")).toBeInTheDocument();
  });

  test("No renderiza ListMyResources si no hay usuario", () => {
    (useUserCtx as Mock).mockReturnValue({ user: null });
    (getPersonalResources as Mock).mockReturnValue([]);
    render(<RightSideBar resources={mockResources as IntResource[]} />);
    expect(
      screen.queryByText("ListMyResources Component"),
    ).not.toBeInTheDocument();
  });

  test("Renderiza ListMyResources cuando hay usuario y recursos personales", () => {
    (useUserCtx as Mock).mockReturnValue({ user: { name: "Test User" } });
    (getPersonalResources as Mock).mockReturnValue([
      { id: 1, title: "Resource 1" },
    ]);
    render(<RightSideBar resources={mockResources as IntResource[]} />);
    expect(screen.getByText("ListMyResources Component")).toBeInTheDocument();
  });
});
