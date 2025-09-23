import { FC, useState } from "react";
import { asideContentForTechnicalTest } from "../Layout/aside/asideContent";

interface TechnicalTestFilterProps {
  onFiltersChange?: (filters: {
    languages: string[];
    years: string[];
    difficulties: string[];
  }) => void;
}

export const TechnicalTestFilter: FC<TechnicalTestFilterProps> = ({
  onFiltersChange,
}) => {
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([
    "JavaScript",
    "Java",
  ]);
  const [selectedYears, setSelectedYears] = useState<string[]>([
    "2025",
    "2024",
  ]);
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([
    "Básica",
  ]);

  const years = ["2025", "2024", "2023"];
  const difficulties = ["Básica", "Intermedia", "Difícil"];

  const toggleLanguage = (language: string) => {
    const newLanguages = selectedLanguages.includes(language)
      ? selectedLanguages.filter((l) => l !== language)
      : [...selectedLanguages, language];
    setSelectedLanguages(newLanguages);
    onFiltersChange?.({
      languages: newLanguages,
      years: selectedYears,
      difficulties: selectedDifficulties,
    });
  };

  const toggleYear = (year: string) => {
    const newYears = selectedYears.includes(year)
      ? selectedYears.filter((y) => y !== year)
      : [...selectedYears, year];
    setSelectedYears(newYears);
    onFiltersChange?.({
      languages: selectedLanguages,
      years: newYears,
      difficulties: selectedDifficulties,
    });
  };

  const toggleDifficulty = (difficulty: string) => {
    const newDifficulties = selectedDifficulties.includes(difficulty)
      ? selectedDifficulties.filter((d) => d !== difficulty)
      : [...selectedDifficulties, difficulty];
    setSelectedDifficulties(newDifficulties);
    onFiltersChange?.({
      languages: selectedLanguages,
      years: selectedYears,
      difficulties: newDifficulties,
    });
  };

  const renderCheckbox = (
    label: string,
    isSelected: boolean,
    onChange: () => void,
  ) => (
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        checked={isSelected}
        onChange={onChange}
        className="hidden"
      />
      <div
        className={`w-5 h-5 flex items-center justify-center rounded ${
          isSelected
            ? "bg-[#B91879] border-[#B91879]"
            : "border-[1px] border-gray-400"
        }`}
      >
        {isSelected && (
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </div>
      <span className="text-[14px] text-[#282828]">{label}</span>
    </label>
  );

  return (
    <div className="w-1/3 ps-10 pt-4">
      <h2 className="text-[26px] text-[#282828] font-bold mb-8">Filtros</h2>

      {/* Language Filter */}
      <div className="mb-6">
        <h3 className="text-[16px] text-[#282828] font-bold mb-6">Lenguaje</h3>
        <div className="space-y-2">
          {asideContentForTechnicalTest.map((item) => {
            const isSelected = selectedLanguages.includes(item.label);
            return (
              <div key={item.label}>
                {renderCheckbox(item.label, isSelected, () =>
                  toggleLanguage(item.label),
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Year Filter */}
      <div className="mb-6">
        <h3 className="text-[16px] text-[#282828] font-bold mb-6">Año</h3>
        <div className="space-y-2">
          {years.map((year) => {
            const isSelected = selectedYears.includes(year);
            return (
              <div key={year}>
                {renderCheckbox(year, isSelected, () => toggleYear(year))}
              </div>
            );
          })}
        </div>
      </div>

      {/* Difficulty Filter */}
      <div className="mb-6">
        <h3 className="text-[16px] text-[#282828] font-bold mb-6">
          Dificultad
        </h3>
        <div className="space-y-2">
          {difficulties.map((difficulty) => {
            const isSelected = selectedDifficulties.includes(difficulty);
            return (
              <div key={difficulty}>
                {renderCheckbox(difficulty, isSelected, () =>
                  toggleDifficulty(difficulty),
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TechnicalTestFilter;
