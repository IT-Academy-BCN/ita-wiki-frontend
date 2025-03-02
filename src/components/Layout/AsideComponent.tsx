import node from "../../assets/logo-node 1.svg";
import react from "../../assets/react.svg";
import angular from "../../assets/angular.svg";
import javascript from "../../assets/javascript.svg";
import java from "../../assets/logo-java 1.svg";
import php from "../../assets/logo-php 1.svg";
import dataScience from "../../assets/data-science.svg";
import bbdd from "../../assets/logo-bbdd 1.svg";
import { Link, useLocation } from 'react-router';
import { useEffect, useState } from "react";

const AsideComponent = () => {
    const location = useLocation();
    const [currentPath, setCurrentPath] = useState((location.pathname));

    useEffect(() => {
        setCurrentPath((location.pathname));
    }, [location]);

    const asideContent = [
        { icon: node, label: "Node" },
        { icon: react, label: "React" },
        { icon: angular, label: "Angular" },
        { icon: javascript, label: "JavaScript" },
        { icon: java, label: "Java" },
        { icon: php, label: "FullStack PHP" }, // Tiene espacios
        { icon: dataScience, label: "Data Science" }, // Tiene espacios
        { icon: bbdd, label: "BBDD" },
    ];

    return (
        <aside className="flex items-center pr-[80px] max-h-[calc(100vh-114px)] min-h-[calc(100vh-114px)] w-[280px]">
            <ul className="space-y-6">
                {asideContent.map((item, index) => {
                    const resources = (`/resources/${item.label}`).replace(' ', '%20')
                    const isActive = currentPath === resources;

                    return (
                        <li key={index} className="flex items-center space-x-3 ">
                            <img src={item.icon} alt={item.label} className="w-6 h-6" />
                            <div className="relative">
                                {isActive && <span className="absolute left-[0px] text-[#B91879]">•</span>}
                                <Link to={`/resources/${encodeURIComponent(item.label)}`} className="relative ml-3">
                                    <span
                                        className={`text-[#7e7e7e] hover:text-[#B91879] ${isActive ? "text-[#B91879]" : ""}`}
                                    >
                                        {item.label}
                                    </span>
                                </Link>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </aside>
    );
}

export default AsideComponent;
