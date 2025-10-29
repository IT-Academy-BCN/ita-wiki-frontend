import ProjectButton from "./ProjectButton";
import ProgressBar from "./ProgressBar";

interface ProjectCardProps {
  logoFront?: string;
  logoBack?: string;
  avatarSrc?: string;
  avatarSrc2?: string;
  avatarSrc3?: string;
}
function ProjectCard({
  logoFront,
  logoBack,
  avatarSrc,
  avatarSrc2,
  avatarSrc3,
}: ProjectCardProps) {
  return (
    <div className="flex flex-col border border-gray-500 text-black items-center w-70 sm:w-76 xl:w-82 px-6 rounded-3xl py-7 pb-10">
      <div>
        <h1 className="font-extrabold text-xl text-start">
          TaskForge: forja tu productividad
        </h1>
        <p className="text-sm font-bold text-gray-500 text-start">
          Duración: 1 mes
        </p>
      </div>
      <div className="flex w-full gap-4 mt-5">
        <div className="flex w-full items-center gap-6">
          <h2 className="text-sm font-bold">Frontend</h2>
          <img className="w-7" src={logoFront} alt="Logo" />
        </div>
        <div className="flex w-full items-center gap-7">
          <h2 className="text-sm font-bold">Backend</h2>
          <img className="w-7" src={logoBack} alt="Logo" />
        </div>
      </div>
      <div className="flex w-full gap-2 mt-4">
        <div className="w-full grid grid-cols-2 gap-4 justify-items-center border-r-2 pr-2 border-gray-200">
          <figure className="flex flex-col items-center">
            <img className="w-12 h-12" src={avatarSrc} alt="Logo" />
            <figcaption className="text-xs mt-1 font-bold text-gray-500">
              Natasha
            </figcaption>
          </figure>
          <figure className="flex flex-col items-center">
            <img className="w-12 h-12" src={avatarSrc2} alt="Logo" />
            <figcaption className="text-xs mt-1 font-bold text-gray-500">
              Jordi
            </figcaption>
          </figure>
          <ProjectButton>+</ProjectButton>
        </div>
        <div className="w-full grid grid-cols-2 justify-items-center pl-1 gap-4">
          <figure className="flex flex-col items-center">
            <img className="w-12 h-12" src={avatarSrc3} alt="Logo" />
            <figcaption className="text-xs mt-1 font-bold text-gray-500">
              Aina
            </figcaption>
          </figure>
          <ProjectButton>+</ProjectButton>
          <ProjectButton>+</ProjectButton>
          <ProjectButton>+</ProjectButton>
        </div>
      </div>
      <div className="w-full">
        <h2 className="text-sm mt-10 font-bold text-start mb-2">Inscripción</h2>
        <ProgressBar
          title="Progreso del proyecto"
          startDate="2025-10-01"
          endDate="2025-11-13"
        />
      </div>
    </div>
  );
}

export default ProjectCard;
