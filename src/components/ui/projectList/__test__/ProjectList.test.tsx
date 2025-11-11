import { render, screen } from "@testing-library/react";
import ProjectList from "../ProjectList";
import projects from "../../../../moock/projects.json";
import { MemoryRouter } from "react-router";

describe("ProjectList", () => {
  test("renders all project titles and check the number of cards", () => {
    render(
      <MemoryRouter>
        <ProjectList />
      </MemoryRouter>
    );

    const titles = (projects as Array<{ title: string }>).map((p) => p.title);
    titles.forEach((title) => {
      expect(screen.getByText(title)).toBeTruthy();
    });

    const h1Titles = screen.getAllByRole("heading", { level: 1 });
    expect(h1Titles.length).toBe(titles.length);

    const links = screen.getAllByRole("link");
    const ids = (projects as Array<{ id: number }>).map((p) => p.id);
    ids.forEach((id) => {
      expect(links.some((a) => a.getAttribute("href") === `/codeconnect/${id}`)).toBe(true);
    });
  });
});
