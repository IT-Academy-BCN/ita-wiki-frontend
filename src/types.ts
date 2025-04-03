import { ReactNode } from "react";
import { categories } from "./data/categories";
import { themes } from "./data/themes";
import { resourceTypes } from "./data/resourceTypes";

export type Category = (typeof categories)[number];
export type Theme = (typeof themes)[number];
export type ResourceType = (typeof resourceTypes)[number];

export type TypChildren = {
  children?: ReactNode;
};

export interface IntUser {
  id: number;
  displayName: string | null;
  photoURL: string | undefined;
  role?: string;
  github_id?: number;
}

export interface IntResource {
  votes: number;
  id?: number;
  github_id: number;
  title: string;
  description: string;
  url: string;
  create_at?: Date | string;
  update_at?: Date | string;
  category: Category;
  theme: Theme;
  type: ResourceType;
}

export type TypTechnologyResource =
  | "All"
  | "Node"
  | "React"
  | "Angular"
  | "JavaScript"
  | "Java"
  | "FullStack PHP"
  | "Data Science"
  | "BBDD";

export type SortOption = "recent" | "oldest" | "year" | "votes";

export interface Bookmark {
  id: number;
  github_id: number;
  resource_id: number;
  created_at: string;
  updated_at: string;
}
export interface Message {
  message: string;
}

export interface IntBookmarkElement {
  id: number;
  github_id: number;
  title: string;
  description: string;
  url: string;
}
