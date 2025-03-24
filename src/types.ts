import { ReactNode } from "react";

import { EnuResourcesCategories, EnuResourceThemes, EnuResourceTypes } from "./enums";


export type TypModalKey = "addUser" | "addResource" | "access";
export type TypChildren = { children?: ReactNode };

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
  category: EnuResourcesCategories;
  theme: EnuResourceThemes;
  type: EnuResourceTypes;
}
