import { FC, useState } from "react";
import { asideContentForTechnicalTest } from "../Layout/aside/asideContent";
import FilterGroup from "../ui/FilterGroup";
import { useArrayToggle } from "../../hooks/useArrayToggle";

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
    "Bàsica",
  ]);

  const years = ["2025", "2024", "2023"];
  const difficulties = ["Bàsica", "Intermèdia", "Difícil"];
  const languages = asideContentForTechnicalTest.map((item) => item.label);

  const toggleLanguage = useArrayToggle(setSelectedLanguages);
  const toggleYear = useArrayToggle(setSelectedYears);
  const toggleDifficulty = useArrayToggle(setSelectedDifficulties);

  const handleLanguageToggle = (language: string) => {
    toggleLanguage(language);
    onFiltersChange?.({
      languages: selectedLanguages.includes(language)
        ? selectedLanguages.filter((l) => l !== language)
        : [...selectedLanguages, language],
      years: selectedYears,
      difficulties: selectedDifficulties,
    });
  };

  const handleYearToggle = (year: string) => {
    toggleYear(year);
    onFiltersChange?.({
      languages: selectedLanguages,
      years: selectedYears.includes(year)
        ? selectedYears.filter((y) => y !== year)
        : [...selectedYears, year],
      difficulties: selectedDifficulties,
    });
  };

  const handleDifficultyToggle = (difficulty: string) => {
    toggleDifficulty(difficulty);
    onFiltersChange?.({
      languages: selectedLanguages,
      years: selectedYears,
      difficulties: selectedDifficulties.includes(difficulty)
        ? selectedDifficulties.filter((d) => d !== difficulty)
        : [...selectedDifficulties, difficulty],
    });
  };

  return (
    <div className="w-1/3 ps-10 pt-4">
      <h2 className="text-[26px] text-[#282828] font-bold mb-8">Filtres</h2>

      <FilterGroup
        title="Llenguatge"
        options={languages}
        selectedValues={selectedLanguages}
        onToggle={handleLanguageToggle}
      />

      <FilterGroup
        title="Any"
        options={years}
        selectedValues={selectedYears}
        onToggle={handleYearToggle}
      />

      <FilterGroup
        title="Dificultad"
        options={difficulties}
        selectedValues={selectedDifficulties}
        onToggle={handleDifficultyToggle}
      />
    </div>
  );
};

export default TechnicalTestFilter;
