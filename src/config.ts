const API_URL = import.meta.env.VITE_API_URL;
import node from "./assets/svg/node.svg";
import react from "./assets/svg/react.svg";
import angular from "./assets/svg/angular.svg";
import javascript from "./assets/svg/javascript.svg";
import java from "./assets/svg/java.svg";
import php from "./assets/svg/php.svg";
import dataScience from "./assets/svg/data-science.svg";
import bbdd from "./assets/svg/bbdd.svg";
import close from "./assets/svg/close.svg";
type EndPoints = "resources/" | "users/lists" | "roles/";

const END_POINTS = {
  resources: {
    lists: "resources/" as EndPoints,
    post: "resources/" as EndPoints,
  },
  roles: {
    lists: "users/user-signedin-as?github_id=" as EndPoints,
    post: "roles/" as EndPoints,
  },
};
const ICONS = {
  "Todos": close,
  "Node": node,
  "React": react,
  "Angular": angular,
  "Javascript": javascript,
  "Java": java,
  "Fullstack PHP": php,
  "Data Science": dataScience,
  "BBDD": bbdd,
}
export { API_URL, END_POINTS, ICONS };
