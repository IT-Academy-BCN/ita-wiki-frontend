import { vi, expect, test, type Mock } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import CreateResourcePage from "../../../pages/CreateResourcePage";
import UserProvider from "../../../context/UserContext";

// mock estable para tags
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
  const { createResource } = await import("../../../api/endPointResources");

  render(
    <UserProvider>
      <MemoryRouter>
        <CreateResourcePage />
      </MemoryRouter>
    </UserProvider>,
  );

  // Title
  fireEvent.change(screen.getAllByRole("textbox")[0], {
    target: { value: "My Resource" },
  });

  // URL
  fireEvent.change(screen.getAllByRole("textbox")[1], {
    target: { value: "http://example.com" },
  });

  // Category (React)
  fireEvent.click(screen.getByRole("button", { name: /react/i }));

  // Resource type
  fireEvent.click(screen.getByLabelText("Blog"));

  // Seleccionar tag desde el <select>
  const tagSelect = screen.getByLabelText("Tags");

  fireEvent.change(tagSelect, {
    target: { value: "23" }, // id del tag "react"
  });

  // Submit
  fireEvent.click(screen.getByText("Publicar"));

  await waitFor(() => {
    expect(createResource).toHaveBeenCalled();
    const payload = (createResource as Mock).mock.calls[0][0];

    // ahora esperamos IDs (como strings), no nombres
    expect(payload.tags).toEqual(["23"]);
  });
});
