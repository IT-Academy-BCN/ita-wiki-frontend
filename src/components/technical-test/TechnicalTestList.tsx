import { FC } from "react";
import useTechnicalTestList from "../../hooks/useTechnicalTestList";
import TechnicalTestCard from "./TechnicalTestCard";
import { useMinLoading } from "../../hooks/useMinLoading";
import { useNavigate } from "react-router";
import ButtonComponent from "../atoms/ButtonComponent";
import TechnicalTestSkeleton from "./TechnicalTestSkeleton";
import { TechnicalTest } from "../../types/TechnicalTest";

interface TechnicalTestListProps {
  filters?: {
    languages: string[];
    years: string[];
    difficulties: string[];
  };
}

type DifficultyLabel = "Bàsica" | "Intermèdia" | "Difícil";

const normalize = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

const mapDifficultyToLabel = (raw?: string | null): DifficultyLabel | null => {
  if (!raw) return null;

  const v = normalize(raw);

  if (["easy", "facil", "basic", "basica"].includes(v)) return "Bàsica";
  if (["medium", "mitjana", "intermedia"].includes(v)) return "Intermèdia";
  if (["hard", "dificil", "expert"].includes(v)) return "Difícil";

  if (v === "basica") return "Bàsica";
  if (v === "intermedia") return "Intermèdia";
  if (v === "dificil") return "Difícil";

  return null;
};

const TechnicalTestList: FC<TechnicalTestListProps> = ({ filters }) => {
  const { technicalTests, isLoading, error } = useTechnicalTestList();
  const showLoader = useMinLoading(isLoading);
  const navigate = useNavigate();

  const appliedFilters = filters ?? {
    languages: [],
    years: [],
    difficulties: [],
  };

  const filteredTechnicalTests = technicalTests?.filter(
    (test: TechnicalTest) => {
      const testLanguage = test.language ?? "";

      let testYear = "";
      if (test.created_at) {
        const date = new Date(test.created_at);
        if (!Number.isNaN(date.getTime())) {
          testYear = String(date.getFullYear());
        }
      }

      const rawDifficulty = test.difficulty_level;
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
    <div className=" w-full flex flex-col">
      <div className="flex justify-start md:justify-between items-center lg:items-start mb-9.5 flex-wrap gap-4">
        <h2 className="text-[26px] text-black font-bold">Proves tècniques</h2>
        <div>
          <ButtonComponent
            variant="primary"
            onClick={() => navigate("/resources/technical-test/create")}
          >
            Crear prova
          </ButtonComponent>
        </div>
      </div>
      {showLoader && !error && (
        <ul className="flex flex-col gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <TechnicalTestSkeleton key={index} />
          ))}
        </ul>
      )}
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
