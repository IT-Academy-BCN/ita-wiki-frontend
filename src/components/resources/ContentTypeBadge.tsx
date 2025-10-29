import { FC } from "react";
import { resourceTypes } from "../../data/resourceTypes";

import VideoIcon from "../../assets/VideoIcon.svg";
import CourseIcon from "../../assets/CourseIcon.svg";
import BlogIcon from "../../assets/BlogIcon.svg";

type ContentType = (typeof resourceTypes)[number];

interface ContentTypeBadgeProps {
  type: ContentType;
  size?: number;
}

const iconMap: Record<ContentType, string> = {
  Video: VideoIcon,
  Cursos: CourseIcon,
  Blog: BlogIcon,
};

const ContentTypeBadge: FC<ContentTypeBadgeProps> = ({ type, size = 16 }) => {
  const iconSrc = iconMap[type];
  return (
    <span className="flex items-center gap-1">
      {iconSrc && (
        <img
          src={iconSrc}
          alt={`${type} icon`}
          width={size}
          height={size}
          style={{ display: "inline-block" }}
        />
      )}
      {type}
    </span>
  );
};

export default ContentTypeBadge;
