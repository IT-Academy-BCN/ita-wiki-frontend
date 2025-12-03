import ProjectCard from "../projectCard/ProjectCard";
import type { Project } from "../projectCard/types/projectTypes";
import projectsData from "../../../moock/projects.json";

function ProjectList({
  onCardClick,
  filter,
}: {
  onCardClick?: (id: number) => void;
  filter?: string | null;
}) {
  const projects = (projectsData as Project[]).filter((p) => {
    if (!filter) return true;
    const f = filter.toLowerCase();
    return (
      p.frontend?.tech?.toLowerCase() === f ||
      p.backend?.tech?.toLowerCase() === f
    );
  });

  return (
    <>
      <h2 className="text-2xl font-bold  py-4 sm:py-6 text-black sm:mb-4">
        Llista de projectes
      </h2>
      <div className="grid justify-center ml-3 sm:ml-0 gap-1 sm:gap-10 grid-cols-[repeat(auto-fill,minmax(300px,1fr))] w-full">
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
