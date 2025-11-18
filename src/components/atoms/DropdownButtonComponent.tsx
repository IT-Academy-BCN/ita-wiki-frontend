import { FC } from "react";

interface DropdownButtonComponentProps {
  title: string | null;
  onClick?: () => void;
  icon?: string;
  disabled?: boolean;
}

const DropdownButtonComponent: FC<DropdownButtonComponentProps> = ({
  title,
  onClick,
  icon,
  disabled = false,
}) => {
  return (
    <button
      title={title || "Usuari"}
      onClick={onClick}
      className={`flex items-center justify-start gap-3 px-3 py-1 mx-3 text-[0.85rem] whitespace-nowrap transition rounded-md ${disabled ? "cursor-default" : "cursor-pointer hover:bg-[#fcecec]"}`}
      disabled={disabled}
    >
      <span>
        {title ? title.charAt(0).toUpperCase() + title.slice(1) : "Usuari"}
      </span>
      {icon && <img src={icon} alt={`${title} icon`} className="w-4 h-4" />}
    </button>
  );
};

export default DropdownButtonComponent;
