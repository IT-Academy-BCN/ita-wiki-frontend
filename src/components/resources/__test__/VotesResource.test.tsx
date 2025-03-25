import { render, screen } from "@testing-library/react";
import { VotesResource } from "../VotesResource";

const votes = 55 as number;

describe("VotesResource Component", () => {
  it("The component must have the initial styles", () => {
    render(<VotesResource votes={votes} />);
    const votesResource = screen.getByTestId("resource-votes");
    expect(votesResource).toHaveClass("flex flex-col items-center");
  });
});
