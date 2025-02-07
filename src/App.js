import folder from "./assets/new-folder-dynamic-color.svg";
import puzzle from "./assets/puzzle-dynamic-color.svg";
import ok from "./assets/thumb-up-dynamic-color.svg";
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




const App = () => {
  return (
    <div className="App">
      <header>
        <button type="button">
          <img src={menu} alt="menu" width={29} height={19.36} />
        </button>
        <select>
          <option>ES</option>
          <option>EN</option>
        </select>
        <nav>
          <button type="button">
            <img src={close} alt="close" width={29} height={19.36} />
          </button>
          <ul>
            <li>
              <i><img src={node} alt="Node" width={29} height={19.36} /></i>
              <span>Node</span>
            </li>
            <li>
              <i><img src={react} alt="React" width={29} height={19.36} /></i>
              <span>React</span>
            </li>
            <li>
              <i><img src={angular} alt="Angular" width={29} height={19.36} /></i>
              <span>Angular</span>
            </li>
            <li>
              <i><img src={javascript} alt="Javascript" width={29} height={19.36} /></i>
              <span>Javascript</span>
            </li>
            <li>
              <i><img src={java} alt="Java" width={29} height={19.36} /></i>
              <span>Java</span>
            </li>
            <li>
              <i><img src={php} alt="Fullstack PHP" width={29} height={19.36} /></i>
              <span>Fullstack PHP</span>
            </li>
            <li>
              <i><img src={dataScience} alt="Data Science" width={29} height={19.36} /></i>
              <span>Data Science</span>
            </li>
            <li>
              <i><img src={bbdd} alt="BBDD" width={29} height={19.36} /></i>
              <span>BBDD</span>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <aside>listado techs</aside>
        <section>
          <h1 className="bg-red-500">¡Bienvenid@ a la wiki de la IT Academy!</h1>
          <p>Registrate o haz login para poder subir y votar recursos</p>
          <div>
            <button type="button">Registrarme</button>
            <button type="button">Entrar</button>
          </div>
          <div>
            <div>
              <h2>Funcionalidades básicas que te ofrece esta plataforma:</h2>
              <section>
                <div>
                  <span>/1</span>
                  <img src={folder} alt="folder" width={100} height={100} />
                  <h3>Guarda tus recursos favoritos</h3>
                  <p>Ten tus recursos bien organizados</p>
                </div>
                <div>
                  <span>/2</span>
                  <img src={puzzle} alt="puzzle" width={100} height={100} />
                  <h3>Colabora con tus compañer@s</h3>
                  <p>Recursos compartidos</p>
                </div>
                <div>
                  <span>/3</span>
                  <img src={ok} alt="ok" width={100} height={100} />
                  <h3>Vota los recursos</h3>
                  <p>La comunidad decide cuáles son más relevantes</p>
                </div>
              </section>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;
