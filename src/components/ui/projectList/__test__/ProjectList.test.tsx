import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import ProjectList from "../ProjectList";
import projectsData from "../../../../moock/projects.json";

type Project = (typeof projectsData)[number];

function expectedCount(filter: string | null | undefined) {
  const list = projectsData as Project[];
  if (!filter) return list.length;
  const f = filter.toLowerCase();
  return list.filter(
    (p) =>
      p.frontend?.tech?.toLowerCase() === f ||
      p.backend?.tech?.toLowerCase() === f,
  ).length;
}

function countRenderedCards() {
  return screen.queryAllByText("Frontend").length;
}

describe("ProjectList tech filter", () => {
  it("renders all projects when filter is null", () => {
    render(
      <MemoryRouter>
        <ProjectList filter={null} />
      </MemoryRouter>,
    );
    expect(countRenderedCards()).toBe(expectedCount(null));
  });

  it("filters by frontend tech (React)", () => {
    render(
      <MemoryRouter>
        <ProjectList filter="React" />
      </MemoryRouter>,
    );
    expect(countRenderedCards()).toBe(expectedCount("React"));
  });

  it("filters by backend tech (PHP)", () => {
    render(
      <MemoryRouter>
        <ProjectList filter="PHP" />
      </MemoryRouter>,
    );
    expect(countRenderedCards()).toBe(expectedCount("PHP"));
  });

  it("is case-insensitive (rEaCt)", () => {
    render(
      <MemoryRouter>
        <ProjectList filter="rEaCt" />
      </MemoryRouter>,
    );
    expect(countRenderedCards()).toBe(expectedCount("rEaCt"));
  });

  it("returns 0 when no projects match", () => {
    render(
      <MemoryRouter>
        <ProjectList filter="go" />
      </MemoryRouter>,
    );
    expect(countRenderedCards()).toBe(0);
  });
});
