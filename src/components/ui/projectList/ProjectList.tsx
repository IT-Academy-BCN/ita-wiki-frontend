import ProjectCard from "../projectCard/ProjectCard";
import type { Project } from "../projectCard/types/projectTypes";
import projectsData from "../../../moock/projects.json";

function ProjectList({ onCardClick }: { onCardClick?: (id: number) => void }) {
  const projects = projectsData as Project[];

  return (
    <>
      <h2 className="text-2xl font-bold mb-6">Lista de proyectos</h2>
      <div className="grid gap-10 grid-cols-[repeat(auto-fill,minmax(300px,1fr))] w-full">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onClick={onCardClick}
          />
        ))}
      </div>
    </>
  );
}

export default ProjectList;
