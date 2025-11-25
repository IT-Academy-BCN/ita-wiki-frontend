import { Category } from "../../../types";
import sql_vector from "../../../assets/sqlVector.svg?react";
import python_vector from "../../../assets/pythonVector.svg?react";
import ts_vector from "../../../assets/TypescriptVector.svg?react";
import js_vector from "../../../assets/javascript.svg?react";
import java_vector from "../../../assets/logo-java 1.svg?react";
import php_vector from "../../../assets/logo-php 1.svg?react";
import angular_vector from "../../../assets/angular.svg?react";
import react_vector from "../../../assets/react.svg?react";
import node_vector from "../../../assets/logo-node 1.svg?react";
import CircleIcon from "../../../assets/circle-icon.svg?react";

import { FC, SVGProps } from "react";

type SvgIcon = FC<SVGProps<SVGSVGElement>>;

export const asideContent: { icon: SvgIcon; label: Category }[] = [
  { icon: CircleIcon, label: "Node" },
  { icon: CircleIcon, label: "React" },
  { icon: CircleIcon, label: "Angular" },
  { icon: CircleIcon, label: "JavaScript" },
  { icon: CircleIcon, label: "Java" },
  { icon: CircleIcon, label: "PHP" },
  { icon: CircleIcon, label: "Data Science" },
  { icon: CircleIcon, label: "BBDD" },
];

export const asideContentResourcesForm: { icon: SvgIcon; label: Category }[] = [
  { icon: node_vector, label: "Node" },
  { icon: react_vector, label: "React" },
  { icon: angular_vector, label: "Angular" },
  { icon: js_vector, label: "JavaScript" },
  { icon: java_vector, label: "Java" },
  { icon: php_vector, label: "PHP" },
  { icon: python_vector, label: "Data Science" },
  { icon: sql_vector, label: "BBDD" },
];

export const asideContentForTechnicalTest: { icon: SvgIcon; label: string }[] =
  [
    { icon: react_vector, label: "React" },
    { icon: sql_vector, label: "SQL" },
    { icon: js_vector, label: "JavaScript" },
    { icon: ts_vector, label: "TypeScript" },
    { icon: java_vector, label: "Java" },
    { icon: php_vector, label: "PHP" },
    { icon: python_vector, label: "Python" },
  ];

export const contentTechsFrontCodeConnect: { icon: SvgIcon; label: string }[] =
  [
    { icon: react_vector, label: "React" },
    { icon: angular_vector, label: "Angular" },
    { icon: js_vector, label: "Svelte" },
    { icon: js_vector, label: "Vue" },
    { icon: js_vector, label: "Java" },
  ];

export const contentTechsBackCodeConnect: { icon: SvgIcon; label: string }[] = [
  { icon: node_vector, label: "Spring" },
  { icon: node_vector, label: "Laravel" },
  { icon: node_vector, label: "Node" },
  { icon: node_vector, label: "Rails" },
  { icon: node_vector, label: "Express" },
];
