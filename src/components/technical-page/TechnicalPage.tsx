import { useNavigate } from "react-router";
import CalendarIcon from "../../assets/Calendar.svg";
import JSIcon from "../../assets/javascript.svg";
import Container from "../ui/Container";

const TechnicalPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Container className="px-4 py-6 lg:pl-8 xl:pl-6">
        <button
          onClick={() => navigate(-1)}
          className="text-pink-600 font-bold text-sm mb-4 flex items-center hover:underline"
        >
          ← Tornar a Proves Tècniques
        </button>

        <h1 className="text-2xl font-bold mb-2">Xifratge Cèsar</h1>

        <div className="flex items-center gap-6 mb-6">
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <img src={CalendarIcon} alt="Calendari" className="w-4 h-4" />
            <span>20 Des 2024</span>
          </div>

          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <img src={JSIcon} alt="JavaScript" className="w-4 h-4" />
            <span>JavaScript</span>
          </div>
        </div>

        <div className="pt-5 space-y-4 text-gray-700 leading-relaxed mb-6">
          <p>
            Has de dissenyar una funció d'encriptació que rebi una frase i la
            codifiqui amb l'algoritme del Cèsar, que consisteix a substituir
            cada lletra per una altra obtinguda desplaçant la posició de
            l'actual un determinat nombre de posicions dins de l'abecedari.
            Aquest desplaçament és la clau del xifrat.
          </p>

          <p>
            Si en desplaçar la lletra actual arribem a la posició 0, continuem
            per l'última lletra de l'alfabet.
          </p>

          <p>
            La funció{" "}
            <code className="bg-gray-200 px-1 rounded">
              cifrar(frase, clau)
            </code>{" "}
            rep dos arguments: el primer és la frase a xifrar i el segon és la
            clau. Ha de retornar la frase xifrada.
          </p>

          <p>S'accepta que totes les frases han d'anar en minúscules.</p>

          <p>
            Per comprovar el funcionament hauries de crear la funció{" "}
            <code className="bg-gray-200 px-1 rounded">desxifrar()</code>.
          </p>
        </div>

        <div className="bg-gray-100 p-4 rounded-md text-sm">
          <p className="mb-2">
            <code>cifrar("casa blanca", 3)</code> → zxpx yixkzx
          </p>
          <p>
            <code>cifrar("hola", 3)</code> → elix
          </p>
        </div>
      </Container>
    </>
  );
};

export default TechnicalPage;
