import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import CreateResourcePage from "../../../pages/CreateResourcePage";
import UserProvider from "../../../context/UserContext";
import { describe, it, expect, vi, type Mock } from "vitest";
import "@testing-library/jest-dom";

vi.mock("../../../api/endPointResources", () => ({
  createResource: vi.fn(),
}));

vi.mock("../../../context/TagsContext", async () => {
  const actual = await vi.importActual<Record<string, unknown>>(
    "../../../context/TagsContext",
  );

  return {
    ...actual,
    useTags: () => ({
      tags: [],
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

import { createResource } from "../../../api/endPointResources";

describe("CreateResourcePage", () => {
  it.skip("POST includes tag IDs not names (TODO: fix test)", async () => {
    render(
      <UserProvider>
        <MemoryRouter>
          <CreateResourcePage />
        </MemoryRouter>
      </UserProvider>,
    );

    fireEvent.change(screen.getAllByRole("textbox")[0], {
      target: { value: "My Resource" },
    });

    fireEvent.change(screen.getAllByRole("textbox")[1], {
      target: { value: "http://example.com" },
    });

    fireEvent.click(screen.getByRole("button", { name: /react/i }));

    fireEvent.click(screen.getByLabelText("Blog"));

    const tagsSelect = await screen.findByLabelText("Tags");
    fireEvent.change(tagsSelect, {
      target: {
        selectedOptions: [{ value: "23" }],
      },
    });

    fireEvent.click(screen.getByText("Publicar"));

    await waitFor(() => {
      expect(createResource).toHaveBeenCalled();
    });

    const mockFn = createResource as Mock;
    const payload = mockFn.mock.calls[0][0];

    expect(payload.tags).toBeDefined();
    const tagIds = (payload.tags ?? []).map((t: unknown) => Number(t));
    expect(tagIds).toContain(23);
  });
});
