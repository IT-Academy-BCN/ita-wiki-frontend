import { FC, ReactNode } from 'react';
import closeIcon from '../../assets/close.svg';

type ItaBtnVariant =
  | "primary"
  | "secondary"
  | "neutral"
  | "github"
  | "close"
  | "icon"
  | "custom";
interface ItaButtonProps {
  children?: ReactNode;
  variant?: ItaBtnVariant;
  text?: string;
  title?: string;
  icon?: string;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const basicCss =
  "block text-[14px] h-[41px] capitalize text-center rounded-[12px] outline-none cursor-pointer box-sizing w-full";
const classList = {
  primary: `${basicCss} text-white min-w-[152px] bg-primary font-[600] hover:opacity-90 border-none`,
  secondary: `${basicCss} border border-gray-foreground font-[600] text-gray-foregorund hover:bg-neutral-50 min-w-[138px]`,
  neutral: `${basicCss} bg-white text-gray-foreground font-[500] min-w-[138px] hover:bg-neutral-50`,
  github:
    'text-[var(--github-color)] bg-[var(--github-bg)]  justify-between max-w-60 hover:bg-[var(--github-color)] hover:text-[var(--github-bg)] hover:border-black outline-none cursor-pointer box-sizing',
  close:
    'inline-flex items-center justify-center w-[21px] h-[19px] text-[#282828] bg-transparent border-none hover:duration-100 will-change-transform hover:opacity-50 outline-none cursor-pointer box-sizing m-[10px]',
  icon: 'inline-flex items-center justify-center h-[41px] px-4 text-[#808080] border-2 rounded-[10px] border-white bg-white hover:duration-200 will-change-transform ease-in-out hover:bg-[#dcdcdc]  hover:border-[#808080] hover:scale-95 outline-none cursor-pointer box-sizing',
};

const ButtonComponent: FC<ItaButtonProps> = ({
  children,
  variant,
  text,
  icon,
  type,
  className,
  onClick,
}) => {
  const baseClass =
    variant === "custom" ? className || "" : classList[variant ?? "primary"];

  return (
    <button type={type || "button"} onClick={onClick} className={baseClass}>
      {variant === "close" && <img src={closeIcon} alt="Close" />}

      {variant === "icon" && text && (
        <>
          <span className="mr-2">{text}</span>
          <img src={icon} alt="icon" className="h-[17px]" />
        </>
      )}

      {variant === "icon" && !text && (
        <img src={icon} alt="icon" className="h-[17px]" />
      )}

      {variant !== "icon" && (text || children)}
    </button>
  );
};

export default ButtonComponent;
