import useTechnicalTestList from "../../hooks/useTechnicalTestList";
import TechnicalTestCard from "./TechnicalTestCard";
import LoadingImage from "../ui/LoadingImage";
import { useMinLoading } from "../../hooks/useMinLoading";
import { useNavigate } from "react-router";
import ButtonComponent from "../atoms/ButtonComponent";
import { TechnicalTest } from "../../types/TechnicalTest";

const TechnicalTestList = () => {
  const { technicalTests, isLoading, error } = useTechnicalTestList();
  const showLoader = useMinLoading(isLoading);
  const navigate = useNavigate();

  const appliedFilters = filters ?? {
    languages: [],
    years: [],
    difficulties: [],
  };

  const testsWithDifficulty: TechnicalTestWithDifficulty[] =
    technicalTests ?? [];

  const filteredTechnicalTests = testsWithDifficulty.filter(
    (test: TechnicalTestWithDifficulty) => {
      const testLanguage = test.language ?? "";

      let testYear = "";
      if (test.created_at) {
        const date = new Date(test.created_at);
        if (!Number.isNaN(date.getTime())) {
          testYear = String(date.getFullYear());
        }
      }

      const rawDifficulty = test.difficulty ?? test.difficulty_level;
      const difficultyLabel = mapDifficultyToLabel(rawDifficulty);

      const matchesLanguage =
        appliedFilters.languages.length === 0 ||
        appliedFilters.languages.includes(testLanguage);

      const matchesYear =
        appliedFilters.years.length === 0 ||
        (testYear !== "" && appliedFilters.years.includes(testYear));

      const matchesDifficulty =
        appliedFilters.difficulties.length === 0 ||
        (difficultyLabel !== null &&
          appliedFilters.difficulties.includes(difficultyLabel));

      return matchesLanguage && matchesYear && matchesDifficulty;
    },
  );

  return (
    <div className="w-full flex flex-col sm:m-4">
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
          {filteredTechnicalTests.map((test) => (
            <TechnicalTestCard key={test.id} test={test} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TechnicalTestList;
