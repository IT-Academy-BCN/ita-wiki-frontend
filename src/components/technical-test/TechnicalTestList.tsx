import useTechnicalTests from "../../hooks/useTechnicalTests";
import TechnicalTestCard from "./TechnicalTestCard";
import LoadingImage from "../ui/LoadingImage";
import { useMinLoading } from "../../hooks/useMinLoading";
import { useNavigate } from "react-router";
import ButtonComponent from "../atoms/ButtonComponent";

const TechnicalTestList = () => {
  const { technicalTests, isLoading, error } = useTechnicalTests();
  const showLoader = useMinLoading(isLoading);
  const navigate = useNavigate();

  return (
    <div className=" w-full flex flex-col sm:m-4">
      <div className="flex justify-start md:justify-between items-center mb-8 flex-wrap gap-4">
        <h2 className="text-2xl font-bold">Proves tècniques</h2>
        <div>
          <ButtonComponent
            variant="primary"
            onClick={() => navigate("/resources/technical-test/create")}
          >
            Crear prova
          </ButtonComponent>
        </div>
      </div>
      {showLoader && <LoadingImage text="Carregant proves tècniques..." />}
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
