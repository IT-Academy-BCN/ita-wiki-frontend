import TechnicalTestFilter from "../components/technical-test/TechnicalTestFilter";
import TechnicalTestList from "../components/technical-test/TechnicalTestList";
import { useNavigate } from "react-router";

function MyTechnicalTestsPage() {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex gap-4 bg-white rounded-lg p-4 m-4 shadow-xl justify-between">
        <TechnicalTestFilter />
        <TechnicalTestList />
      </div>
      <div className="bg-white w-fit p-2 m-4 rounded hover:border-2 hover:border-black cursor-pointer">
        <button onClick={() => navigate("/resources/technical-test/create")}>
          Crear prueba
        </button>
      </div>
    </>
  );
}

export default MyTechnicalTestsPage;
