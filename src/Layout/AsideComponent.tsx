import node from "../assets/svg/logo-node 1.svg";
import react from "../assets/svg/react.svg";
import angular from "../assets/svg/angular.svg";
import javascript from "../assets/svg/javascript.svg";
import java from "../assets/svg/logo-java 1.svg";
import php from "../assets/svg/logo-php 1.svg";
import dataScience from "../assets/svg/data-science.svg";
import bbdd from "../assets/svg/logo-bbdd 1.svg";
import { Link } from "react-router";
import logoItAcademy from "../assets/svg/LogoItAcademy.svg";
import close from "../assets/svg/close.svg";
import { useCtxUser } from "../hooks/useCtxUser";
const AsideComponent = () => {
  const { isTablet, isMobile, toggleMainMenu, isOpenMainMenu } = useCtxUser();

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
    <aside
      className="sidebar grid grid-cols-3 bg-[#EBEBEB]"
      style={{
        left: isOpenMainMenu ? "0px" : "-100%",
      }}
    >
      <section className="col-1 flex items-center pt-[21px] pl-[23px]">
        {isTablet || isMobile ? (
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
