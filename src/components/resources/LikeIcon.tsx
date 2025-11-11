import { FC } from "react";
import { Triangle } from "lucide-react";

interface LikeIconProps {
  active?: boolean;
}

const LikeIcon: FC<LikeIconProps> = ({ active = false }) => {
  return (
    <Triangle
      size={16}
      className={`${active ? "text-green-custom fill-green-custom" : "text-black"}`}
      aria-label={active ? "M'agrada" : ""}
    />
  );
};

export default LikeIcon;
