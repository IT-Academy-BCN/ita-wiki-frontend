import node from "../../assets/logo-node 1.svg";
import react from "../../assets/react.svg";
import angular from "../../assets/angular.svg";
import javascript from "../../assets/javascript.svg";
import java from "../../assets/logo-java 1.svg";
import php from "../../assets/logo-php 1.svg";
import dataScience from "../../assets/data-science.svg";
import bbdd from "../../assets/logo-bbdd 1.svg";
import { Link, useLocation } from "react-router";
import classNames from "classnames";

const AsideComponent = () => {
  const asideContent = [
    { icon: node, label: "Node" },
    { icon: react, label: "React" },
    { icon: angular, label: "Angular" },
    { icon: javascript, label: "JavaScript" },
    { icon: java, label: "Java" },
    { icon: php, label: "FullStack PHP" },
    { icon: dataScience, label: "Data Science" },
    { icon: bbdd, label: "BBDD" },
  ];

  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <aside className="flex p-6 items-center justify-center lg:block lg:w-55 lg:h-screen lg:max-h-[calc(100vh-90px)] lg:mt-36">
      <ul className="space-y-6">
        {asideContent.map((item, index) => {
          const path = `/resources/${item.label}`;
          const isActive =
            currentPath === `/resources/${encodeURIComponent(item.label)}`;

          return (
            <li key={index} className="flex items-center space-x-3">
              <img src={item.icon} alt={item.label} className="w-6 h-6" />
              <Link
                to={path}
                className={classNames("transition-colors", {
                  "!text-[#b91879] !font-bold": isActive,
                  "text-gray-700 ": !isActive,
                })}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default AsideComponent;
