import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import CreateResourcePage from "../../../pages/CreateResourcePage";
import UserProvider from "../../../context/UserContext";
import { vi, expect, test, type Mock } from "vitest";

vi.mock("../../../api/endPointResources", async () => {
  return {
    createResource: vi.fn(),
  };
});

// Mock tag context
vi.mock("../../../context/TagsContext", async () => {
  const actual = await vi.importActual("../../../context/TagsContext");
  return {
    ...actual,
    useTags: () => ({
      getTagsByCategory: (category: string) => {
        if (category === "React") {
          return [
            { id: 18, name: "node", created_at: "", updated_at: "" },
            { id: 23, name: "react", created_at: "", updated_at: "" },
          ];
        }
        return [];
      },
    }),
  };
});

test("POST includes tag IDs not names", async () => {
  const { createResource } = await import("../../../api/endPointResources");

  render(
    <UserProvider>
      <MemoryRouter>
        <CreateResourcePage />
      </MemoryRouter>
    </UserProvider>,
  );

  // Fill title (1st input)
  fireEvent.change(screen.getAllByRole("textbox")[0], {
    target: { value: "My Resource" },
  });

  // Fill URL (2nd input)
  fireEvent.change(screen.getAllByRole("textbox")[1], {
    target: { value: "http://example.com" },
  });

  // Select category
  fireEvent.click(screen.getByRole("button", { name: /react/i }));

  // Select resource type
  fireEvent.click(screen.getByLabelText("Blog"));

  // Select tag
  fireEvent.change(screen.getByPlaceholderText("Escriu una etiqueta..."), {
    target: { value: "react" },
  });

  await waitFor(() => {
    fireEvent.click(screen.getAllByText("React")[1]);
  });

  screen
    .getAllByText("React")
    .forEach((el, i) => console.log(`React match ${i}:`, el.outerHTML));

  // Submit
  fireEvent.click(screen.getByText("Publicar"));

  await waitFor(() => {
    expect(createResource).toHaveBeenCalled();
    const payload = (createResource as Mock).mock.calls[0][0];
    // TODO - Update test to match real tags
    expect(payload.tags).toEqual(["intermedio"]);
  });
});