import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom/vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Project } from "../types/projectTypes";
import ProjectCard from "../ProjectCard";

function makeProject(partial: Partial<Project> = {}): Project {
  const base: Project = {
    id: 1,
    title: "AnimalKing:habla con tus mascota con IA",
    duration: "1 mes",
    frontend: {
      tech: "Angular",
      logo: "../assets/angular.svg",
      positions: 3,
      participants: [
        { name: "Natasha", avatar: "../assets/project-avatar.svg" },
        { name: "Roman", avatar: "../assets/project-avatar4.svg" },
      ],
    },
    backend: {
      tech: "Java",
      logo: "../assets/logo-java 1.svg",
      positions: 2,
      participants: [],
    },
    startDate: "01-10-2025",
    endDate: "13-11-2025",
  };
  return { ...base, ...partial } as Project;
}

describe("ProjectCard", () => {
  it("renders title, duration, and role labels", () => {
    const project = makeProject();
    render(<ProjectCard project={project} />);

    expect(screen.getByText(project.title)).toBeInTheDocument();
    expect(screen.getByText(project.duration)).toBeInTheDocument();
    expect(screen.getByText("Frontend")).toBeInTheDocument();
    expect(screen.getByText("Backend")).toBeInTheDocument();
    expect(screen.getByText("Inscripción")).toBeInTheDocument();
  });

  it("renders logos and participant avatars with correct alt text", () => {
    const project = makeProject();
    render(<ProjectCard project={project} />);

    const frontLogo = screen.getByAltText(
      project.frontend.tech,
    ) as HTMLImageElement;
    const backLogo = screen.getByAltText(
      project.backend.tech,
    ) as HTMLImageElement;
    expect(frontLogo).toBeInTheDocument();
    expect(backLogo).toBeInTheDocument();

    project.frontend.participants.forEach((p) => {
      const avatar = screen.getByAltText(p.name) as HTMLImageElement;
      expect(avatar).toBeInTheDocument();
    });
  });

  it('shows "+" buttons equal to available slots per role', () => {
    const project = makeProject();
    const availableFrontend =
      project.frontend.positions - project.frontend.participants.length;
    const availableBackend =
      project.backend.positions - project.backend.participants.length;

    render(<ProjectCard project={project} />);

    const addButtons = screen.getAllByRole("button", { name: "+" });
    expect(addButtons.length).toBe(availableFrontend + availableBackend);
  });

  it("invokes onClick with project id when clicked", () => {
    const project = makeProject();
    const onClick = vi.fn();
    render(<ProjectCard project={project} onClick={onClick} />);

    fireEvent.click(screen.getByText(project.title));
    expect(onClick).toHaveBeenCalledWith(project.id);
  });
});
