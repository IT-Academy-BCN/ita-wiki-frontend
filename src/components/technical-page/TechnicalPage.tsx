import { useNavigate } from "react-router";
import CalendarIcon from "../../assets/Calendar.svg";
import JSIcon from "../../assets/javascript.svg";
import PageTitle from "../ui/PageTitle";
import Container from "../ui/Container";
import { ArrowLeftIcon } from "lucide-react";
import ButtonComponent from "../atoms/ButtonComponent";
import UiCheckbox from "../ui/shared-ui/UiCheckbox";

const TechnicalPage = () => {

  const navigate = useNavigate();

  return (
    <>
      <PageTitle title="Xifratge Cèsar" />
      <Container className="px-4 py-6 lg:pl-8 xl:pl-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex flex-col lg:flex-row justify-between">
              <div>
                <a
                  className="text-[#B91879] cursor-pointer text-sm"
                  onClick={() =>
                    navigate("/resources/technical-test/all-tech-tests")
                  }
                >
                  <ArrowLeftIcon
                    className="inline text-[#B91879] mb-2 me-1"
                    size="16px"
                  ></ArrowLeftIcon>
                  Tornar a Proves Tècniques
                </a>
                <h2 className="text-2xl font-semibold mt-2">Xifratge Cèsar</h2>
              </div>
            </div>

            <div className="my-3">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <img src={CalendarIcon} alt="Calendari" className="w-4 h-4" />
                  <span>20 Des 2024</span>
                </div>

                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <img src={JSIcon} alt="JavaScript" className="w-4 h-4" />
                  <span>JavaScript</span>
                </div>
              </div>
            </div>

            <div className="my-6 flex gap-3">
              <span className="inline px-2 py-1 rounded-lg border-2 border-gray-300 bg-white text-sm font-medium">
                ORM
              </span>
              <span className="inline px-2 py-1 rounded-lg border-2 border-gray-300 bg-white text-sm font-medium">
                Testing
              </span>
            </div>

            <p className="text-[16px] mb-6">
              Has de dissenyar una funció d'encriptació que rebi una frase i la
              codifiqui amb l'algoritme del Cèsar, que consisteix a substituir
              cada lletra per una altra obtinguda desplaçant la posició de
              l'actual un determinat nombre de posicions dins de l'abecedari.
              Aquest desplaçament és la clau del xifrat.
            </p>

            <p className="text-[16px] mb-6">
              Si en desplaçar la lletra actual arribem a la posició 0, continuem
              per l'última lletra de l'alfabet.
            </p>

            <p className="text-[16px] mb-6">
              La funció{" "}
              <code className="bg-gray-200 px-1 rounded">
                cifrar(frase, clau)
              </code>{" "}
              rep dos arguments: el primer és la frase a xifrar i el segon és la
              clau. Ha de retornar la frase xifrada.
            </p>

            <p className="text-[16px] mb-6">
              S'accepta que totes les frases han d'anar en minúscules.
            </p>

            <p className="text-[16px] mb-6">
              Per comprovar el funcionament hauries de crear la funció{" "}
              <code className="bg-gray-200 px-1 rounded">desxifrar()</code>.
            </p>

            <div className="bg-gray-100 p-4 rounded-md text-sm">
              <p className="mb-2">
                <code>cifrar("casa blanca", 3)</code> → zxpx yixkzx
              </p>
              <p>
                <code>cifrar("hola", 3)</code> → elix
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold mt-8 mb-5">Requisits</h2>
              <ul>
                <li className="my-3">
                  <UiCheckbox
                    label="Implementar la funció xifrar(frase, clau) exactament amb
                      dos paràmetres."
                    checked={false}
                    onChange={() => {}}
                  />
                </li>
                <li className="my-3">
                  <UiCheckbox
                    label="Ha d'aplicar correctament el xifratge César sobre cada lletra."
                    checked={false}
                    onChange={() => {}}
                  />
                </li>
                <li className="my-3">
                  <UiCheckbox
                    label="Ha de mantenir els espais tal qual apareixen."
                    checked={false}
                    onChange={() => {}}
                  />
                </li>
              </ul>
            </div>
          </div>
          <div>
            <div className="border border-gray-500 text-black p-6 rounded-3xl">
              <h3 className="text-xl font-bold">Nivell</h3>
              <p className="my-5">Fàcil</p>
              <h3 className="text-xl font-bold">Temps estimat</h3>
              <p className="my-5">30 minuts</p>
              <ButtonComponent>Marcar com a fet</ButtonComponent>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default TechnicalPage;
