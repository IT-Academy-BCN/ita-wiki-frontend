import ProjectButton from "../projectCard/ProjectButton";
import ProgressBar from "../projectCard/ProgressBar";
import ButtonComponent from "../../atoms/ButtonComponent";

interface ProjectTeamProps {
  logoFront?: string;
  logoBack?: string;
  avatarSrc?: string;
  avatarSrc2?: string;
  avatarSrc3?: string;
}
function ProjectTeam({
  logoFront,
  logoBack,
  avatarSrc,
  avatarSrc2,
  avatarSrc3,
}: ProjectTeamProps) {
  return (
    <div className="flex flex-col items-start border border-gray-500 text-black w-80 pt-7 pb-10 px-6 rounded-3xl">
      <div>
        <h2 className="font-extrabold text-xl text-start">Equipo</h2>
      </div>

      <div className="w-full mt-5">
        <div className="flex w-full items-center gap-4 mb-4">
          <h2 className="text-sm font-bold">Frontend</h2>
          <img className="w-7" src={logoFront} alt="Logo" />
        </div>

        <div className="w-full flex gap-6 pr-2 mb-4">
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

        <div className="flex w-full items-center gap-4 mb-4">
          <h2 className="text-sm font-bold">Backend</h2>
          <img className="w-7" src={logoBack} alt="Logo" />
        </div>

        <div className="w-full flex gap-6 pr-2 mb-14">
          <figure className="flex flex-col items-center">
            <img className="w-12 h-12" src={avatarSrc3} alt="Logo" />
            <figcaption className="text-xs mt-1 font-bold text-gray-500">
              Aina
            </figcaption>
          </figure>
          <ProjectButton>+</ProjectButton>
          <ProjectButton>+</ProjectButton>
        </div>
      </div>

      <div className="w-full mb-14">
        <h2 className="font-extrabold text-xl text-start mb-4">
          Plazo inscripción
        </h2>
        <ProgressBar
          title="Progreso del proyecto"
          startDate="2025-10-01"
          endDate="2025-11-13"
        />
      </div>

      <div className="mb-10">
        <h2 className="font-extrabold text-xl text-start">Duración</h2>
        <p className="text-sm font-bold text-start">1 mes</p>
      </div>

      <div className="w-full">
        <ButtonComponent
          className="my-5 w-full"
          type="button"
          variant="primary"
        >
          Apuntarme
        </ButtonComponent>
      </div>
    </div>
  );
}

export default ProjectTeam;
