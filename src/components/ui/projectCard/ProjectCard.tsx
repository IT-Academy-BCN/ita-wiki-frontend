import ProjectButton from "./ProjectButton";
import ProgressBar from "./ProgressBar";
import { resolveAsset } from "../../../utils/resolveAsset";
import type { ProjectCardProps } from "./types/projectTypes";
export type { Participant, Role } from "./types/projectTypes";
import { Link } from "react-router";

function ProjectCard({ project }: ProjectCardProps) {
  const availableFrontend =
    project.frontend.positions - project.frontend.participants.length;
  const availableBackend =
    project.backend.positions - project.backend.participants.length;
  return (
    <Link to={`/codeconnect/${project.id}`}>
      <div className="flex flex-col hover:bg-gray-100 cursor-pointer border border-gray-500 text-black items-center w-70 sm:w-76 xl:w-82 px-6 rounded-3xl py-7 pb-10">
        <div className="w-full">
          <h1 className="font-extrabold text-xl  text-start">
            {project.title}
          </h1>
          <p className="text-sm font-bold text-gray-500 text-start">
            Duración: {project.duration}
          </p>
        </div>
        <div className="flex w-full gap-4 mt-5">
          <div className="flex w-full items-center gap-6">
            <h2 className="text-sm font-bold">Frontend</h2>
            <img
              className="w-7"
              src={resolveAsset(project.frontend.logo)}
              alt={project.frontend.tech}
            />
          </div>
          <div className="flex w-full items-center gap-7">
            <h2 className="text-sm font-bold">Backend</h2>
            <img
              className="w-7"
              src={resolveAsset(project.backend.logo)}
              alt={project.backend.tech}
            />
          </div>
        </div>
        <div className="flex w-full gap-2 mt-4">
          <div className="w-full grid grid-cols-2 gap-4 grid-rows-2 border-r-2 pr-2 border-gray-200">
            {project.frontend.participants.map((p, i) => (
              <figure className="flex flex-col items-center" key={i}>
                <img
                  className="w-12 h-12"
                  src={resolveAsset(p.avatar)}
                  alt={p.name}
                />
                <figcaption className="text-xs mt-1 font-bold text-gray-500">
                  {p.name}
                </figcaption>
              </figure>
            ))}
            {[...Array(availableFrontend)].map((_, i) => (
              <ProjectButton key={`front-${i}`}>+</ProjectButton>
            ))}
          </div>
          <div className="w-full grid grid-cols-2 justify-items-center grid-rows-2 pl-1 gap-4">
            {project.backend.participants.map((p, i) => (
              <figure className="flex flex-col items-center" key={i}>
                <img
                  className="w-12 h-12"
                  src={resolveAsset(p.avatar)}
                  alt={p.name}
                />
                <figcaption className="text-xs mt-1 font-bold text-gray-500">
                  {p.name}
                </figcaption>
              </figure>
            ))}
            {[...Array(availableBackend)].map((_, i) => (
              <ProjectButton key={`back-${i}`}>+</ProjectButton>
            ))}
          </div>
        </div>
        <div className="w-full">
          <h2 className="text-sm mt-10 font-bold text-start mb-2">
            Inscripción
          </h2>
          <ProgressBar
            title="Progreso del proyecto"
            startDate={project.startDate}
            endDate={project.endDate}
          />
        </div>
      </div>
    </Link>
  );
}

export default ProjectCard;
