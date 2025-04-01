import { render, screen } from "@testing-library/react";
import moock from "../../../moock/resources.json";
import { IntResource } from "../../../types";
import { Resource } from "../Resource";

const moockrResources = moock.resources.map(
  (resource) =>
    ({
      ...resource,
      created_at: "2025-02-25 00:00:00",
      updated_at: "2025-02-25 00:00:00",
    }) as IntResource,
);

describe("Resource Component", () => {
  it("should render the component and display the correct title", () => {
    render(
      <Resource
        resource={moockrResources[0]}
        isBookmarked={false}
        toggleBookmark={() => {}}
      />,
    );

    const titleElement = screen.getByTestId("resource");
    expect(titleElement).toHaveClass(
      "border-[1px] border-[#7E7E7E] rounded-[20px] w-full lg:max-w-[467.27px]",
    );
  });
});
