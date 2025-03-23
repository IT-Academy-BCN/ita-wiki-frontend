import { FC } from "react";
import node from "../assets/svg/node.svg";
import react from "../assets/svg/react.svg";
import angular from "../assets/svg/angular.svg";
import javascript from "../assets/svg/javascript.svg";
import java from "../assets/svg/java.svg";
import php from "../assets/svg/php.svg";
import dataScience from "../assets/svg/data-science.svg";
import bbdd from "../assets/svg/bbdd.svg";
import { Link } from "react-router";
import logoItAcademy from "../assets/svg/LogoItAcademy.svg";
import close from "../assets/svg/close.svg";
import { useGlobalCtx } from "../hooks/useGlobalCtx";

const AsideComponent: FC = () => {
  const { isDesktop, toggleMainMenu, closeMainMenu } = useGlobalCtx();

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
    <>
      <section className="col-1 flex items-center pt-[21px] pl-[23px]">
        {!isDesktop ? (
          <button onClick={toggleMainMenu} type="button">
            <img src={close} alt="logo" width={"32"} height={32} />
          </button>
        ) : (
          <Link to="/">
            <img src={logoItAcademy} alt="logo" width={"116px"} height={29} />
          </Link>
        )}
      </section>
      <ul className="space-y-6 pt-[21px] pl-[23px] flex flex-col justify-center">
        {asideContent.map((item, index) => (
          <li
            key={index}
            className="flex items-center space-x-3"
            onClick={closeMainMenu}
          >
            <img src={item.icon} alt={item.label} className="w-6 h-6" />
            <Link to={`/resources/${item.label}`}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default AsideComponent;
