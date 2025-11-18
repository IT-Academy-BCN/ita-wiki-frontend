import { useNavigate } from "react-router";
import CalendarIcon from "../../assets/Calendar.svg";
import JSIcon from "../../assets/javascript.svg";

const TechnicalPage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-7xl p-6">
        {/* TARJETA BLANCA */}
        <div className="bg-white rounded-xl shadow-sm p-8 min-h-[600px]">
          {/* BOTÓN DE VOLVER */}
          <button
            onClick={() => navigate(-1)}
            className="text-pink-600 font-weight: bold text-sm mb-4 flex items-center hover:underline"
          >
            ← Tornar a Proves Tècniques
          </button>

          <h1 className="text-2xl font-bold mb-2">Cifrado César</h1>

          {/* FECHA + LENGUAJE */}
          <div className="flex items-center gap-6 mb-6">
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <img src={CalendarIcon} alt="Calendar" className="w-4 h-4" />
              <span>20 Dic 2024</span>
            </div>

            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <img src={JSIcon} alt="JavaScript" className="w-4 h-4" />
              <span>JavaScript</span>
            </div>
          </div>

          <div className="pt-5 space-y-4 text-gray-700 leading-relaxed mb-6">
            <p>
              Debes diseñar una función de encriptado que reciba una frase y la
              codifique con el algoritmo de César, que consiste en sustituir
              cada letra por otra obtenida desplazando la posición de la actual
              un determinado número de posiciones dentro del abecedario. Ese
              desplazamiento es la clave del cifrado.
            </p>

            <p>
              Si al desplazar la letra actual llegamos a la posición 0, seguimos
              por la última letra del alfabeto.
            </p>

            <p>
              La función{" "}
              <code className="bg-gray-200 px-1 rounded">
                cifrar(frase, clave)
              </code>{" "}
              lleva dos argumentos: el primero la frase a cifrar y el segundo la
              clave. Debe devolver la frase cifrada.
            </p>

            <p>Se acepta que todas las frases deberán ir en minúsculas.</p>

            <p>
              Para comprobar el funcionamiento deberías crear la función{" "}
              <code className="bg-gray-200 px-1 rounded">descifrar()</code>.
            </p>
          </div>

          {/* EJEMPLOS */}
          <div className="bg-gray-100 p-4 rounded-md text-sm">
            <p className="mb-2">
              <code>cifrar("casa blanca", 3)</code> → zxpx yixkzx
            </p>
            <p>
              <code>cifrar("hola", 3)</code> → elix
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicalPage;
