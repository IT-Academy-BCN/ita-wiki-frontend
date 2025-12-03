import ProjectButton from "./ProjectButton";
import ProgressBar from "./ProgressBar";
import { resolveAsset } from "../../../utils/resolveAsset";
import GenericModal from "../../ui/Modal/GenericModal";
import avatarPlaceholder from "../../../assets/project-avatar3.jpg";
import type { ProjectCardProps } from "./types/projectTypes";
export type { Participant } from "./types/projectTypes";
import { Link } from "react-router";
import { useProjectJoin } from "./hooks/useProjectJoin";

function ProjectCard({ project }: ProjectCardProps) {
  const {
    joinModalOpen,
    decisionModalOpen,
    selectedSlot,
    isSubmitting,
    handleOpenModal,
    handleConfirmJoin,
    isSlotPending,
    isSlotAccepted,
    handleOpenDecisionModal,
    handleAcceptContributor,
    handleRejectContributor,
    setJoinModalOpen,
    setDecisionModalOpen,
  } = useProjectJoin(project.id);

  const availableFrontend =
    project.frontend.positions - project.frontend.participants.length;
  const availableBackend =
    project.backend.positions - project.backend.participants.length;
  return (
    <div className="flex flex-col border scale-95 sm:scale-none border-gray-500 text-black items-center w-70 sm:w-76 xl:w-82 px-6 rounded-3xl py-7 pb-10">
      <div className="w-full">
        <Link to={`/codeconnect/${project.id}`}>
          <h1 className="font-extrabold text-black w-fit hover:text-primary transition-colors duration-300 text-xl text-start">
            {project.title}
          </h1>
        </Link>
        <p className="text-sm font-bold text-gray-500 text-start">
          Durada: {project.duration}
        </p>
      </div>
      <div className="flex w-full gap-4 mt-5">
        <div className="flex w-full items-center gap-3 sm:gap-4 xl:gap-6">
          <h2 className="text-sm font-bold">Frontend</h2>
          <img
            className="w-7"
            src={resolveAsset(project.frontend.logo)}
            alt={project.frontend.tech}
          />
        </div>
        <div className="flex w-full items-center gap-3 sm:gap-5 xl:gap-7">
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
          {[...Array(availableFrontend)].map((_, i) => {
            const index = project.frontend.participants.length + i;
            const pending = isSlotPending("frontend", index);
            const accepted = isSlotAccepted("frontend", index);

            if (pending) {
              return (
                <figure
                  key={`front-pending-${index}`}
                  className="flex flex-col items-center"
                  onClick={() => handleOpenDecisionModal("frontend", index)}
                >
                  <div
                    className={`w-12 h-12 rounded-full border-2 cursor-pointer overflow-hidden flex items-center justify-center ${accepted ? "border-transparent" : "border-orange-500"}`}
                  >
                    <img
                      className={`w-full h-full object-cover ${accepted ? "" : "grayscale"}`}
                      src={avatarPlaceholder}
                      alt="Pending contributor"
                    />
                  </div>
                  <figcaption className="text-xs mt-1 font-bold text-gray-500">
                    {accepted ? "Contributor" : "Pending"}
                  </figcaption>
                </figure>
              );
            }

            return (
              <ProjectButton
                key={`front-${index}`}
                onClick={() =>
                  handleOpenModal({
                    area: "frontend",
                    index,
                    role: "Frontend Developer",
                  })
                }
              >
                +
              </ProjectButton>
            );
          })}
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
          {[...Array(availableBackend)].map((_, i) => {
            const index = project.backend.participants.length + i;
            const pending = isSlotPending("backend", index);
            const accepted = isSlotAccepted("backend", index);

            if (pending) {
              return (
                <figure
                  key={`back-pending-${index}`}
                  className="flex flex-col items-center"
                  onClick={() => handleOpenDecisionModal("backend", index)}
                >
                  <div
                    className={`w-12 h-12 rounded-full cursor-pointer border-2 overflow-hidden flex items-center justify-center ${accepted ? "border-transparent" : "border-orange-500"}`}
                  >
                    <img
                      className={`w-full h-full object-cover ${accepted ? "" : "grayscale"}`}
                      src={avatarPlaceholder}
                      alt="Pending contributor"
                    />
                  </div>
                  <figcaption className="text-xs mt-1 font-bold text-gray-500">
                    {accepted ? "Contributor" : "Pending"}
                  </figcaption>
                </figure>
              );
            }

            return (
              <ProjectButton
                key={`back-${index}`}
                onClick={() =>
                  handleOpenModal({
                    area: "backend",
                    index,
                    role: "Backend Developer",
                  })
                }
              >
                +
              </ProjectButton>
            );
          })}
        </div>
      </div>
      <div className="w-full">
        <h2 className="text-sm mt-10 font-bold text-start mb-2">Inscripció</h2>
        <ProgressBar
          title="Progrés del projecte"
          startDate={project.startDate}
          endDate={project.endDate}
        />
      </div>
      <GenericModal
        isOpen={joinModalOpen}
        onClose={() => setJoinModalOpen(false)}
        title="Unir-te al projecte"
        showPrimaryButton
        primaryButtonText={isSubmitting ? "Enviant..." : "Confirmar"}
        primaryButtonAction={isSubmitting ? undefined : handleConfirmJoin}
        showSecondaryButton
        secondaryButtonText="Cancel·lar"
        secondaryButtonAction={() => setJoinModalOpen(false)}
      >
        <p>
          Vols unir-te com a {selectedSlot?.role ?? "participant"} al projecte "
          {project.title}"?
        </p>
      </GenericModal>
      <GenericModal
        isOpen={decisionModalOpen}
        onClose={() => setDecisionModalOpen(false)}
        title="Gestionar contribuidor"
        showPrimaryButton
        primaryButtonText="Acceptar"
        primaryButtonAction={handleAcceptContributor}
        showSecondaryButton
        secondaryButtonText="Rebutjar"
        secondaryButtonAction={handleRejectContributor}
      >
        <p>
          Vols acceptar o rebutjar aquest contribuidor pendent al projecte "
          {project.title}"?
        </p>
      </GenericModal>
    </div>
  );
}

export default ProjectCard;
