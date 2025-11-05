import { render, screen } from "@testing-library/react";
import ProjectList from "../ProjectList";
import projects from "../../../../moock/projects.json";

describe("ProjectList", () => {
  test("renders all project titles and check the number of cards", () => {
    render(<ProjectList />);

    const titles = (projects as Array<{ title: string }>).map((p) => p.title);
    titles.forEach((title) => {
      expect(screen.getByText(title)).toBeTruthy();
    });

    const h1Titles = screen.getAllByRole("heading", { level: 1 });
    expect(h1Titles.length).toBe(titles.length);
  });
});
