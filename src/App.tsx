import { FC } from "react";
import menu from "./assets/Vector-7.svg";
import node from "./assets/logo-node 1.svg";
import react from "./assets/react.svg";
import angular from "./assets/angular.svg";
import javascript from "./assets/javascript.svg";
import java from "./assets/logo-java 1.svg";
import php from "./assets/logo-php 1.svg";
import dataScience from "./assets/data-science.svg";
import bbdd from "./assets/logo-bbdd 1.svg";
import close from "./assets/close.svg";
import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import ItaResources from "./components/ItaResources";

const App: FC = () => {

  return (
    <>
      <header>
        <button type="button">
          <img src={menu} alt="menu" width={29} height={19.36} />
        </button>
        <select title='lang'>
          <option>ES</option>
          <option>EN</option>
        </select>
        <nav>
          <button className="open__menu" type="button">
            <img src={close} alt="close" width={29} height={19.36} />
          </button>
          <ul>
            <li>
              <i>
                <img src={node} alt="Node" width={29} height={19.36} />
              </i>
              <span>Node</span>
            </li>
            <li>
              <i>
                <img src={react} alt="React" width={29} height={19.36} />
              </i>
              <span>React</span>
            </li>
            <li>
              <i>
                <img src={angular} alt="Angular" width={29} height={19.36} />
              </i>
              <span>Angular</span>
            </li>
            <li>
              <i>
                <img
                  src={javascript}
                  alt="Javascript"
                  width={29}
                  height={19.36}
                />
              </i>
              <span>Javascript</span>
            </li>
            <li>
              <i>
                <img src={java} alt="Java" width={29} height={19.36} />
              </i>
              <span>Java</span>
            </li>
            <li>
              <i>
                <img src={php} alt="Fullstack PHP" width={29} height={19.36} />
              </i>
              <span>Fullstack PHP</span>
            </li>
            <li>
              <i>
                <img
                  src={dataScience}
                  alt="Data Science"
                  width={29}
                  height={19.36}
                />
              </i>
              <span>Data Science</span>
            </li>
            <li>
              <i>
                <img src={bbdd} alt="BBDD" width={29} height={19.36} />
              </i>
              <span>BBDD</span>
            </li>
          </ul>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
      <ItaResources />
    </>
  );
};

export default App;
