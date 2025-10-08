import useTechnicalTests from "../../hooks/useTechnicalTests";
import TechnicalTestCard from "./TechnicalTestCard";
import LoadingImage from "../ui/LoadingImage";
import {useMinLoading} from "../../hooks/useMinLoading";


const TechnicalTestList = () => {
  const { technicalTests, isLoading, error } = useTechnicalTests();
  const showLoader = useMinLoading(isLoading);

  return (
    <div className="w-2/3 flex flex-col m-4">
      <h2 className="text-2xl font-bold mb-8">Pruebas técnicas</h2>
      {showLoader && <LoadingImage text="Cargando pruebas técnicas..." />}
      {error && <p className="m-4 text-red-500">Error: {error.message}</p>}
      {!showLoader && !error && (
        <ul className="flex flex-col gap-4">
          {technicalTests.map((test) => (
            <TechnicalTestCard key={test.id} test={test} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TechnicalTestList;
