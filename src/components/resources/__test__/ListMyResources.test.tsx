import { render, screen } from "@testing-library/react";
import { vi, describe, test, expect } from "vitest";
import { ListMyResources } from "../ListMyResources";
import { IntResource } from "../../../types";

vi.mock("../../ui/ResourceCard", () => ({
  default: vi.fn(({ resource }) => (
    <li data-testid={`resource-card-${resource.id}`}>
      <div>{resource.title}</div>
      <div>{resource.description}</div>
    </li>
  )),
}));

vi.mock("../../../context/UserContext", () => ({
  useUserContext: vi.fn().mockReturnValue({
    user: { id: "user123" },
    isAuthenticated: true,
    signIn: vi.fn(),
    signOut: vi.fn(),
    error: null,
    setError: vi.fn(),
    saveUser: vi.fn(),
  }),
}));

describe("ListMyResources Component", () => {
  const mockBase = [
    {
      id: 1,
      title: "React Basics",
      description: "Learn React fundamentals",
      type: "Blog",
    },
    {
      id: 2,
      title: "Advanced TypeScript",
      description: "Master TypeScript concepts",
      type: "Video",
    },
  ];

  const mockResources = mockBase.map(
    (resource) =>
      ({
        ...resource,
      }) as IntResource,
  );

  test("renders correctly with my resources", () => {
    render(<ListMyResources myResources={mockResources} />);

    expect(screen.getByTestId("resource-card-1")).toBeInTheDocument();
    expect(screen.getByTestId("resource-card-2")).toBeInTheDocument();

    expect(screen.getByText("React Basics")).toBeInTheDocument();
    expect(screen.getByText("Advanced TypeScript")).toBeInTheDocument();
  });

  test("renders empty list when no resources", () => {
    render(<ListMyResources myResources={[]} />);

    const list = screen.getByRole("list");
    expect(list).toBeInTheDocument();
    expect(list.children).toHaveLength(0);
  });

  test("renders the correct number of resources", () => {
    const manyResources = Array.from({ length: 5 }, (_, index) => ({
      ...mockBase[0],
      id: index + 1,
      title: `Resource ${index + 1}`,
      created_at: "2025-02-25 00:00:00",
      updated_at: "2025-02-25 00:00:00",
    })) as IntResource[];

    render(<ListMyResources myResources={manyResources} />);

    const list = screen.getByRole("list");
    expect(list.children).toHaveLength(5);

    for (let i = 1; i <= 5; i++) {
      expect(screen.getByTestId(`resource-card-${i}`)).toBeInTheDocument();
      expect(screen.getByText(`Resource ${i}`)).toBeInTheDocument();
    }
  });
});
