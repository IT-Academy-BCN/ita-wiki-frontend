import { FC, useEffect, useState } from "react";
import { asideContentForTechnicalTest } from "../Layout/aside/asideContent";
import FilterGroup from "../ui/FilterGroup";

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

  const toggleValue = (
    value: string,
    selected: string[],
    setSelected: (values: string[]) => void,
  ) => {
    let updated: string[];
    if (selected.includes(value)) {
      updated = selected.filter((v) => v !== value);
    } else {
      updated = [...selected, value];
    }
    setSelected(updated);
    return updated;
  };

  const handleLanguageToggle = (language: string) => {
    const updatedLanguages = toggleValue(
      language,
      selectedLanguages,
      setSelectedLanguages,
    );

    onFiltersChange?.({
      languages: updatedLanguages,
      years: selectedYears,
      difficulties: selectedDifficulties,
    });
  };

  const handleYearToggle = (year: string) => {
    const updatedYears = toggleValue(year, selectedYears, setSelectedYears);

    onFiltersChange?.({
      languages: selectedLanguages,
      years: updatedYears,
      difficulties: selectedDifficulties,
    });
  };

  const handleDifficultyToggle = (difficulty: string) => {
    const updatedDifficulties = toggleValue(
      difficulty,
      selectedDifficulties,
      setSelectedDifficulties,
    );

    onFiltersChange?.({
      languages: selectedLanguages,
      years: selectedYears,
      difficulties: updatedDifficulties,
    });
  };

  useEffect(() => {
    onFiltersChange?.({
      languages: selectedLanguages,
      years: selectedYears,
      difficulties: selectedDifficulties,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="md:w-1/3 w-full pt-4">
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
        title="Dificultat"
        options={difficulties}
        selectedValues={selectedDifficulties}
        onToggle={handleDifficultyToggle}
      />
    </div>
  );
};

export default TechnicalTestFilter;
