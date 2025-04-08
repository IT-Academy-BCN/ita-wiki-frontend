import { ReactNode } from "react";
import { categories } from "./data/categories";
import { themes } from "./data/themes";
import { resourceTypes } from "./data/resourceTypes";

export type Category = (typeof categories)[number];
export type Theme = (typeof themes)[number] | null;
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
  id?: number;
  github_id: number;
  title: string;
  description: string;
  url: string;
  created_at?: Date | string;
  updated_at?: Date | string;
  category: Category;
  theme: Theme;
  type: ResourceType;
  votes: number;
  bookmark_count?: number;
  comment_count?: number;
  tags: string[];
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
  created_at: string;
}
