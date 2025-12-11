import js_vector from "../../../assets/javascript.svg?react";
import angular_vector from "../../../assets/angular.svg?react";
import react_vector from "../../../assets/react.svg?react";
import node_vector from "../../../assets/logo-node 1.svg?react";
import { FC, SVGProps } from "react";

type SvgIcon = FC<SVGProps<SVGSVGElement>>;

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