import { FC } from "react";
import {
  MessageCircle,
  Bookmark,
  PlayCircle,
  Clock,
  Triangle,
} from "lucide-react";
import { IntResource } from "../../types";

interface ResourceCardProps {
  resource: IntResource;
  bookmarkCount?: number;
  commentsCount?: number;
}

const ResourceCard: FC<ResourceCardProps> = ({
  resource,
  bookmarkCount = 0,
  commentsCount = 0,
}) => {
  const { title, description, type, create_at, votes } = resource;

  const formattedDate =
    typeof create_at === "string" && isNaN(Date.parse(create_at))
      ? create_at
      : create_at
        ? new Date(create_at).toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
        : "Fecha desconocida";

  return (
    <div className="bg-white rounded-2xl shadow-sm border p-6 flex justify-between items-center w-full max-w-[710px] h-[109px]">
      {/* Left Section */}
      <div className="flex flex-col space-y-2 overflow-hidden">
        <div>
          <h3 className="text-lg font-bold text-black truncate">{title}</h3>
          <p className="text-gray-500 text-sm truncate">{description}</p>
        </div>
        <div className="flex items-center gap-4 text-gray-500 text-sm">
          <span className="flex items-center gap-1">
            <PlayCircle size={16} />
            {type}
          </span>
          <span className="flex items-center gap-1">
            <Bookmark size={16} />
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
        <div className="flex flex-col items-center justify-center border rounded-lg px-3 py-2">
          <MessageCircle size={16} className="text-black" />
          <span className="text-sm font-medium">{commentsCount}</span>
        </div>
        <div className="flex flex-col items-center justify-center border rounded-lg px-3 py-2">
          <Triangle size={16} className="text-black" />
          <span className="text-sm font-medium">{votes ?? 0}</span>
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;
