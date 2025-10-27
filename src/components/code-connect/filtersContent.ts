import { Category } from "../../types";
import JavaIcon from "../../../assets/logo-java 1.svg?react";
import PhpIcon from "../../../assets/logo-php 1.svg?react";
import ReactIcon from "../../../assets/react.svg?react";
import AngularIcon from "../../../assets/angular.svg?react";
import { FC, SVGProps } from "react";

export type FilterItem = {
  icon: FC<SVGProps<SVGSVGElement>>;
  label: Category;
};

export const filtersContent: FilterItem[] = [
  { icon: JavaIcon, label: "Java" },
  { icon: PhpIcon, label: "PHP" },
  { icon: ReactIcon, label: "React" },
  { icon: AngularIcon, label: "Angular" },
];
