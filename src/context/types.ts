import { IntUseMainMenu } from "../hooks/useMainMenu";
import { IntResource, IntUser } from "../types";
import { IUseResize } from "../hooks/useResize";
import { AccessProps } from "../hooks/useAccess";
import { AccessModalProps } from "../components/access/useAccessModal";
import { UseUserRol } from "../hooks/user/useUser";
import { ModalState } from "../hooks/useModals";
import { EnuResourcesCategories, EnuResourceThemes, EnuResourceTypes } from "../enums";

export interface PropsContextUser extends UseUserRol {
  user: IntUser;
  saveUser: (user: IntUser) => void;
  signIn: () => void;
  signOut: () => void;
  error: string | null;
  setError: (error: string | null) => void;
}
export interface PropsContexGLobal
  extends IUseResize,
  IntUseMainMenu,
  AccessProps,
  AccessModalProps,
  ModalState { }


export interface PropsContextResources {
  showFilters: boolean;
  filters: {
    category: EnuResourcesCategories[];
    theme: EnuResourceThemes;
    type: EnuResourceTypes;
  };
  filteredResources: IntResource[];
  selectedTheme: EnuResourceThemes;
  selectedType: EnuResourceTypes;
  selectTheme: (theme: EnuResourceThemes) => void;
  selectType: (type: EnuResourceTypes) => void;
  selectCategory: (category: EnuResourcesCategories) => void;
  selectNone: () => void;
  toggleFilter: () => void;
  closeFilter: () => void;
  resetTheme: () => void;
  updateFilterURL: () => void;
  toggleResourceType: (resourceType: EnuResourceTypes) => void;
}