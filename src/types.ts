import { ReactNode } from "react";

export type TypChildren = {
  children?: ReactNode;
};
export interface IntUser {
  id: number;
  displayName: string | null;
  photoURL: string | undefined;
  role?: string;
}

export interface IntResource {
  id?: number;
  github_id: number;
  title: string;
  description: string;
  url: string;
  type?: string;
  create_at?: string;
  update_at?: string;
}

export type TypTechnologyResource =
  | "All"
  | "Node"
  | "React"
  | "Angular"
  | "Javascript"
  | "Java"
  | "FullStack PHP"
  | "Data Science"
  | "BBDD";
