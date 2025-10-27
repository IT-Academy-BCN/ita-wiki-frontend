import { Category } from "../../types";

import java_vector from "../../../assets/logo-java 1.svg?react";
import php_vector from "../../../assets/logo-php 1.svg?react";
import react_vector from "../../../assets/react.svg?react";
import angular from "../../../assets/angular.svg?react";

import { FC, SVGProps } from "react";

type SvgIcon = FC<SVGProps<SVGSVGElement>>;

export const filtersContent: { icon: SvgIcon; label: Category }[] =
  [
    { icon: java_vector, label: "Java" },
    { icon: php_vector, label: "PHP" },
    { icon: react_vector, label: "React" },
    { icon: angular, label: "Angular" },

  ];