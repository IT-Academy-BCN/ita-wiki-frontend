import { createContext, useContext, useState, ReactNode } from "react";
/* eslint-disable react-refresh/only-export-components */
interface TechnicalTestsFilters {
  languages: string[];
  years: string[];
  difficulties: string[];
}

interface TechnicalTestsFiltersContextType {
  filters: TechnicalTestsFilters;
  setFilters: (filters: TechnicalTestsFilters) => void;
}

const TechnicalTestsFiltersContext =
  createContext<TechnicalTestsFiltersContextType | null>(null);

export const TechnicalTestsFiltersProvider = ({ children }: { children: ReactNode }) => {
  const [filters, setFilters] = useState<TechnicalTestsFilters>({
    languages: ["JavaScript", "Java"],
    years: ["2025", "2024"],
    difficulties: ["Bàsica"],
  });

  return (
    <TechnicalTestsFiltersContext.Provider value={{ filters, setFilters }}>
      {children}
    </TechnicalTestsFiltersContext.Provider>
  );
};

export const useTechnicalTestsFilters = () => {
  const ctx = useContext(TechnicalTestsFiltersContext);
  if (!ctx) throw new Error("useTechnicalTestsFilters must be used inside provider");
  return ctx;
};
