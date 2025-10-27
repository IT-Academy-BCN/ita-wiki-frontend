import { ReactNode } from "react";

interface ProjectButtonProps {
    children?: ReactNode;
    onClick?: () => void;
}

function ProjectButton({ children, onClick }: ProjectButtonProps) {
  return (
    <button onClick={onClick} className="border-2 cursor-pointer rounded-full w-12 h-12 border-primary border-dotted text-2xl text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors duration-300">
      {children}
    </button>
  )
}

export default ProjectButton