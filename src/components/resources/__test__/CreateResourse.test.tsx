import { vi, expect, test, type Mock } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import CreateResourcePage from "../../../pages/CreateResourcePage";
import UserProvider from "../../../context/UserContext";
import "@testing-library/jest-dom";

const mockTags = [
  { id: 18, name: "node", created_at: "", updated_at: "" },
  { id: 23, name: "react", created_at: "", updated_at: "" },
];

const mockGetTagsByCategory = (category: string) => {
  if (category === "React") {
    return mockTags;
  }
  return [];
};

vi.mock("../../../context/TagsContext", async () => {
  const actual = await vi.importActual("../../../context/TagsContext");
  return {
    ...actual,
    useTags: () => ({
      tags: mockTags,
      tagsByCategory: { React: [18, 23] },
      getTagsByCategory: mockGetTagsByCategory,
      refreshTags: vi.fn(),
      getTagNameById: (id: number) => mockTags.find((t) => t.id === id)?.name,
    }),
  };
});

vi.mock("../../../api/endPointResources", () => ({
  createResource: vi.fn(),
}));

test("POST includes tag IDs not names", async () => {
  const user = userEvent.setup();
  const { createResource } = await import("../../../api/endPointResources");

  render(
    <UserProvider>
      <MemoryRouter>
        <CreateResourcePage />
      </MemoryRouter>
    </UserProvider>,
  );

  const textboxes = screen.getAllByRole("textbox");
  await user.type(textboxes[0], "My Resource");
  await user.type(textboxes[1], "http://example.com");

  await user.click(screen.getByRole("button", { name: /react/i }));
  await user.click(screen.getByLabelText("Blog"));

  const tagInput = screen.getByPlaceholderText(
    "Escriu per buscar etiquetes...",
  );
  await user.click(tagInput);

  await waitFor(async () => {
    const dropdownItems = screen.getAllByText("React");
    const reactTagOption = dropdownItems[dropdownItems.length - 1];
    await user.click(reactTagOption);
  });

  await user.click(screen.getByText("Publicar"));

  await waitFor(() => {
    expect(createResource).toHaveBeenCalled();
    const payload = (createResource as Mock).mock.calls[0][0];

    expect(payload.tags).toEqual(["23"]);
  });
});

vi.mock("../../../assets/sqlVector.svg?react", () => ({
  default: () => <svg data-testid="sql-icon" />,
}));
vi.mock("../../../assets/pythonVector.svg?react", () => ({
  default: () => <svg data-testid="python-icon" />,
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
vi.mock("../../../assets/angular.svg?react", () => ({
  default: () => <svg data-testid="angular-icon" />,
}));
vi.mock("../../../assets/react.svg?react", () => ({
  default: () => <svg data-testid="react-icon" />,
}));
vi.mock("../../../assets/logo-node 1.svg?react", () => ({
  default: () => <svg data-testid="node-icon" />,
}));

test("renders all technology icons as SVG elements", () => {
  render(
    <UserProvider>
      <MemoryRouter>
        <CreateResourcePage />
      </MemoryRouter>
    </UserProvider>,
  );

  expect(screen.getByTestId("node-icon")).toBeInTheDocument();
  expect(screen.getByTestId("react-icon")).toBeInTheDocument();
  expect(screen.getByTestId("angular-icon")).toBeInTheDocument();
  expect(screen.getByTestId("js-icon")).toBeInTheDocument();
  expect(screen.getByTestId("java-icon")).toBeInTheDocument();
  expect(screen.getByTestId("php-icon")).toBeInTheDocument();
  expect(screen.getByTestId("python-icon")).toBeInTheDocument();
  expect(screen.getByTestId("sql-icon")).toBeInTheDocument();
});
