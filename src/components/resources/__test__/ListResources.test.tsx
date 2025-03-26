import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { ListResources } from "../ListResources";
import moock from "../../../moock/resources.json";
import { IntResource } from "../../../types";
import { describe, it, expect, vi } from "vitest";
import { EnuResourcesCategories } from "../../../enums";

vi.mock("../../../hooks/useResourceFilter", () => ({
  useResourceFilter: () => ({
    filteredResources: moockResources,
    selectedTheme: "Todos",
    setSelectedTheme: vi.fn(),
    selectedResourceTypes: ["Video"],
    setSelectedResourceTypes: vi.fn(),
    resetTheme: vi.fn(),
  }),
}));

vi.mock("../../../hooks/useCtxUser", () => ({
  useCtxUser: () => ({
    user: { id: "123463" },
  }),
}));

const moockResources = moock.resources.map(
  (resource) =>
    ({
      ...resource,
      create_at: "2025-02-25 00:00:00",
      update_at: "2025-02-25 00:00:00",
    }) as IntResource,
);

describe("ListResources Component", () => {
  it("should render the component and display the correct title", () => {
    render(
      <MemoryRouter>
        <ListResources />
      </MemoryRouter>,
    );

    const titleElement = screen.getByText(
      `Recursos ${EnuResourcesCategories.All}`,
    );
    expect(titleElement.tagName).toBe("H2");
  });
});
