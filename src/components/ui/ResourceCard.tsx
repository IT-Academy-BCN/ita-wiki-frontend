import { FC, useState } from "react";
import { MessageCircle, PlayCircle, Clock } from "lucide-react";
import { IntResource } from "../../types";
import { useCtxUser } from "../../hooks/useCtxUser";
import { useResources } from "../../context/ResourcesContext";

import BookmarkIconComponent from "../resources/BookmarkIconComponent";
import LikeIcon from "../resources/LikeIcon";
import { useLikeToggle } from "../../hooks/useLikeToggle";

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
  const { title, description, type, created_at, votes, comment_count } =
    resource;

  const { user } = useCtxUser();

  const [likedResources, setLikedResources] = useState<number[]>([]);
  const [voteCount, setVoteCount] = useState<number>(votes ?? 0);

  const { toggleLike } = useLikeToggle();

  const { getBookmarkCount } = useResources();

  const bookmarkCount = resource.id ? getBookmarkCount(resource.id) : 0;

  const handleBookmarkClick = () => {
    if (!user) {
      return;
    }

    if (toggleBookmark) {
      toggleBookmark(resource);
    }
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
    <div className="bg-white rounded-2xl shadow-sm border border-gray-400 p-6 flex justify-between items-center w-full max-w-[710px] h-[109px]">
      {/* Left Section */}
      <div className="flex flex-col space-y-2 overflow-hidden">
        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block space-y-2"
        >
          <h3 className="text-lg font-bold text-black truncate">{title}</h3>
          <p className="text-gray-500 text-sm truncate">{description}</p>
        </a>
        <div className="flex items-center gap-4 text-gray-500 text-sm">
          <span className="flex items-center gap-1">
            <PlayCircle size={16} />
            {type}
          </span>
          <span className="flex items-center gap-1">
            <div
              onClick={handleBookmarkClick}
              className={`${user ? "cursor-pointer" : "cursor-not-allowed opacity-70"}`}
              title={user ? undefined : "Inicia sesión para guardar recursos"}
            >
              <BookmarkIconComponent marked={isBookmarked} />
            </div>
            {bookmarkCount}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={16} />
            {formattedDate}
          </span>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4 shrink-0">
        <div className="flex flex-col items-center justify-center border border-gray-200 rounded-lg px-3 py-2">
          <MessageCircle size={16} className="text-black" />
          <span className="text-sm font-medium">{comment_count ?? 0}</span>
        </div>
        <div
          onClick={() => {
            if (user && user.role === "alumno") {
              toggleLike(resource, likedResources, setLikedResources, setVoteCount);
            }
          }}
          className={`flex flex-col items-center justify-center border border-gray-200 rounded-lg px-3 py-2 ${user?.role !== "alumno" ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
            }`}
        >
          <LikeIcon liked={likedResources.includes(resource.id!)} />
          <span className="text-sm font-medium">{voteCount}</span>
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;
