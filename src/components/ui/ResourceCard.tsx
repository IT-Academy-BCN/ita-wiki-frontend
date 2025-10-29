import { FC, useState } from "react";
import { MessageCircle, Calendar } from "lucide-react";
import { IntResource } from "../../types";
import { useUserContext } from "../../context/UserContext";
import { useResources } from "../../context/ResourcesContext";

import BookmarkIconComponent from "../resources/BookmarkIconComponent";
import { canBookmark } from "../../data/permission/tempRolesPremission";
import LikeIcon from "../resources/LikeIcon";
import { useLikeResources } from "../../hooks/useLikeResources";
import GenericModal from "./Modal/GenericModal";
import ContentTypeBadge from "../resources/ContentTypeBadge";

interface ResourceCardProps {
  resource: IntResource;
  isBookmarked?: boolean;
  toggleBookmark?: (resource: IntResource) => void;
}

const ResourceCard: FC<ResourceCardProps> = ({
  resource,
  isBookmarked,
  toggleBookmark,
}) => {
  const [showModal, setShowModal] = useState(false);

  const { title, description, type, created_at, comment_count } = resource;

  const { user } = useUserContext();

  const { voteCount, handleLike, disabled, isLikedByUser } =
    useLikeResources(resource);

  const { getBookmarkCount } = useResources();

  const bookmarkCount = resource.id ? getBookmarkCount(resource.id) : 0;

  const hasBookmarkPermission = user && canBookmark(user.role);

  const handleBookmarkClick = () => {
    if (!user || !canBookmark(user.role)) {
      setShowModal(true);
      return;
    }

    if (toggleBookmark) {
      toggleBookmark(resource);
    }
  };

  const handleLikeDisabled = () => {
    setShowModal(true);
    return;
  };

  const formattedDate =
    typeof created_at === "string" && isNaN(Date.parse(created_at))
      ? created_at
      : created_at
        ? new Date(created_at).toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
        : "Fecha desconocida";

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-400 p-6 flex justify-between items-center gap-2 w-full h-[109px] hover:bg-gray-100">
      {/* Left Section */}
      <div className="flex flex-col space-y-2 overflow-hidden">
        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block space-y-2"
        >
          <h3 className="text-lg font-bold text-black line-clamp-1">{title}</h3>
          <p className="text-gray-500 text-sm line-clamp-1">{description}</p>
        </a>
        <div className="flex items-center gap-4 text-gray-500 text-sm">
          <ContentTypeBadge type={type} />
          <span className="flex items-center gap-1">
            <div
              onClick={handleBookmarkClick}
              className={`${hasBookmarkPermission ? "cursor-pointer" : "cursor-not-allowed opacity-70"}`}
              title={
                !user
                  ? "Inicia sesión para guardar recursos"
                  : !hasBookmarkPermission
                    ? "No tienes permiso para guardar recursos. Contacta con un admin."
                    : undefined
              }
            >
              <BookmarkIconComponent marked={isBookmarked} />
            </div>
            {bookmarkCount}
          </span>
          <span className="flex items-center gap-1">
            <Calendar size={16} />
            {formattedDate}
          </span>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4 shrink-0">
        <div className="flex flex-col items-center justify-center border-2 border-gray-200 rounded-lg px-4 py-1 hover:border-2 hover:border-[#c20087]">
          <MessageCircle size={16} className="text-black mb-1" />
          <span className="text-sm font-medium leading-none">
            {comment_count ?? 0}
          </span>
        </div>
        <div
          onClick={() => (disabled ? handleLikeDisabled() : handleLike())}
          className={`flex flex-col items-center justify-center border-2 border-gray-200 rounded-lg px-4 py-1 hover:border-2 hover:border-[#c20087] ${
            disabled ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          <LikeIcon active={isLikedByUser} />

          <span
            className={`text-sm font-medium ${
              isLikedByUser ? "text-green-custom" : "text-black"
            }`}
          >
            {voteCount}
          </span>
        </div>
      </div>

      {/* Modal */}
      <GenericModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Permisos insuficientes"
        size="md"
        showPrimaryButton
        primaryButtonText="De acuerdo"
        primaryButtonAction={() => setShowModal(false)}
      >
        <p>No tienes permisos para realizar esta acción</p>
      </GenericModal>
    </div>
  );
};

export default ResourceCard;
