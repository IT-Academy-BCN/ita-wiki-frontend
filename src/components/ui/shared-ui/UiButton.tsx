import { FC, ReactNode } from "react";
import clsx from "clsx";

//Variantes y tamaños disponibles//
type ButtonVariant = "primary" | "secondary" | "ghost" | "icon";
type ButtonSize = "sm" | "md" | "lg";

interface UiButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
  icon?: ReactNode;
}

// Estilos de base//
const baseStyles =
  "inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none rounded-md";

// Estilos por variante visual

const variantStyles = {
  primary: "bg-[#B91879] text-white hover:bg-[#a1156a]",
  secondary: "border border-gray-300 text-gray-800 bg-white hover:bg-gray-100",
  ghost: "text-gray-600 hover:bg-gray-100",
  icon: "p-2 rounded-full hover: bg-gray-200",
};

// Estilos por tamaño

const sizeStyles = {
  sm: "text-sm px-3 py-1",
  md: "text-base px-4 py-2",
  lg: "text-lg px-6 py-3",
};

export const UiButton: FC<UiButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  onClick,
  type = "button",
  icon,
}) => {
  return (
    <button
      className={clsx(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className,
        disabled && "opacity-60 cursor-not-allowed",
      )}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

export default UiButton;
