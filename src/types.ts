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
}

export interface IntResource {
  id?: number;
  github_id: number;
  title: string;
  description: string;
  url: string;
  create_at?: string;
  update_at?: string;
  category: Category;
  theme: Theme;
  type: ResourceType;
}

export enum Categories {
  ALL = "Todos",
  Node = "Node",
  React = "React",
  NoAngulare = "Angular",
  Javascript = "Javascript",
  Java = "Java",
  FullstackPHP = "Fullstack PHP",
  DataScience = "Data Science",
  BBDD = "BBDD",
};
