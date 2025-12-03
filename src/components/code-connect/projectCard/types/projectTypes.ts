import type { ReactNode } from "react";
import type { ProgrammingRole } from "../../../../api/endPointJoinProject";

export type PendingSlot = {
  area: "frontend" | "backend";
  index: number;
  role: ProgrammingRole;
};

export interface Participant {
  name: string;
  avatar: string;
}

export interface Role {
  tech: string;
  logo: string;
  positions: number;
  participants: Participant[];
}

export interface Project {
  id: number;
  title: string;
  duration: string;
  frontend: Role;
  backend: Role;
  startDate: string;
  endDate: string;
}

export interface ProjectCardProps {
  project: Project;
  onClick?: (id: number) => void;
}

export interface ProgressBarProps {
  title: string;
  startDate: string;
  endDate: string;
}

export interface ProjectButtonProps {
  children?: ReactNode;
  onClick?: () => void;
}
