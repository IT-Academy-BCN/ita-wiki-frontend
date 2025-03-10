import node from "../../assets/logo-node 1.svg";
import react from "../../assets/react.svg";
import angular from "../../assets/angular.svg";
import javascript from "../../assets/javascript.svg";
import java from "../../assets/logo-java 1.svg";
import php from "../../assets/logo-php 1.svg";
import dataScience from "../../assets/data-science.svg";
import bbdd from "../../assets/logo-bbdd 1.svg";
import { Link } from "react-router";

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

  return (
    <aside className="flex items-center p-6 pl-0 pr-[80px] max-h-[calc(100vh-90px)]">
      <ul className="space-y-6">
        {asideContent.map((item, index) => (
          <li key={index} className="flex items-center space-x-3">
            <img src={item.icon} alt={item.label} className="w-6 h-6" />
            <Link to={`/resources/${item.label}`}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default AsideComponent;
