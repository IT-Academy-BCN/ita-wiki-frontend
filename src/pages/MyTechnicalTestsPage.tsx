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
      <div className="m-4">
        <button onClick={() => navigate("/resources/technical-test/create")} className="px-4 py-2 bg-primary text-white rounded-lg  h-fit hover:shadow-md cursor-pointer w-fit"
          >
          Crear prueba
        </button>
      </div>
    </>
  );
}

export default MyTechnicalTestsPage;
