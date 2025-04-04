import { render, screen } from "@testing-library/react";
import ResourceCard from "../../ui/ResourceCard";
import { IntResource } from "../../../types";

const resourceMock = {
  id: 1,
  title: "React Basics",
  description: "Learn React step-by-step",
  type: "Video",
  create_at: "1 abril de 2023",
  votes: 22,
} as IntResource;

test("renders title and description", () => {
  render(
    <ResourceCard
      resource={{ ...resourceMock, votes: 0 }}
      bookmarkCount={0}
      commentsCount={0}
    />,
  );

  const allZeros = screen.getAllByText("0");
  expect(allZeros.length).toBeGreaterThanOrEqual(3);
});

test("displays correct title and description", () => {
  render(
    <ResourceCard
      resource={resourceMock}
      bookmarkCount={5}
      commentsCount={2}
    />,
  );
  expect(screen.getByText("React Basics")).toBeInTheDocument();
  expect(screen.getByText("Learn React step-by-step")).toBeInTheDocument();
});

test("displays resource type", () => {
  render(
    <ResourceCard
      resource={resourceMock}
      bookmarkCount={5}
      commentsCount={2}
    />,
  );
  expect(screen.getByText("Video")).toBeInTheDocument();
});
