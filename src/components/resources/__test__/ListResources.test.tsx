import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { ListResources } from "../ListResources";
import moock from "../../../moock/resources.json";
import { IntResource, TypTechnologyResource } from "../../../types";

const moockrResources = moock.resources.map(
  (resource) =>
    ({
      ...resource,
      create_at: "2025-02-25 00:00:00",
      update_at: "2025-02-25 00:00:00",
    }) as IntResource,
);

const tech = "React" as TypTechnologyResource;

describe("ListResources Component", () => {
  it("should render the component and display the correct title", () => {
    render(
      <MemoryRouter>
        <ListResources resources={moockrResources} technology={tech} />
      </MemoryRouter>,
    );

    const titleElement = screen.getByText("Recursos React");
    expect(titleElement.tagName).toBe("H2");
  });
});
