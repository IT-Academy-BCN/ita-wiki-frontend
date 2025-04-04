import { useState, useEffect } from "react";
import { IntResource, SortOption } from "../types";

interface UseResourceSortProps {
  resources: IntResource[];
}

export const useResourceSort = ({ resources }: UseResourceSortProps) => {
  const [sortOption, setSortOption] = useState<SortOption>("recent");
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [sortedResources, setSortedResources] = useState<IntResource[]>([]);
  const [availableYears, setAvailableYears] = useState<number[]>([]);

  useEffect(() => {
    if (!resources || resources.length === 0) {
      setSortedResources([]);
      setAvailableYears([]);
      return;
    }

    const parseDate = (
      dateValue: string | Date | undefined,
    ): { timestamp: number; year: number } => {
      if (!dateValue) return { timestamp: 0, year: 0 };

      if (dateValue instanceof Date) {
        return {
          timestamp: dateValue.getTime(),
          year: dateValue.getFullYear(),
        };
      }

      const dateStr = String(dateValue).trim();
      if (!isNaN(Date.parse(dateStr))) {
        const dateObj = new Date(dateStr);
        return { timestamp: dateObj.getTime(), year: dateObj.getFullYear() };
      }

      const months: { [key: string]: number } = {
        enero: 0,
        febrero: 1,
        marzo: 2,
        abril: 3,
        mayo: 4,
        junio: 5,
        julio: 6,
        agosto: 7,
        septiembre: 8,
        octubre: 9,
        noviembre: 10,
        diciembre: 11,
      };

      const regex = /(\d{1,2}) (\w+) de (\d{4})/;
      const match = dateStr.match(regex);

      if (!match) return { timestamp: 0, year: 0 };

      const [, day, monthStr, year] = match;
      const month = months[monthStr.toLowerCase()] ?? 0;
      return {
        timestamp: new Date(Number(year), month, Number(day)).getTime(),
        year: Number(year),
      };
    };

    const parsedResources = resources.map((res) => ({
      ...res,
      parsedDate: parseDate(res.create_at).timestamp,
      parsedYear: parseDate(res.create_at).year,
    }));

    const yearsSet = new Set(parsedResources.map((res) => res.parsedYear));
    setAvailableYears([...yearsSet].sort((a, b) => b - a));

    let sorted = [...parsedResources];

    if (sortOption === "recent")
      sorted.sort((a, b) => b.parsedDate - a.parsedDate);
    if (sortOption === "oldest")
      sorted.sort((a, b) => a.parsedDate - b.parsedDate);

    if (sortOption === "votes")
      sorted.sort((a, b) => (b.votes) - (a.votes));

    if (selectedYear !== null)
      sorted = sorted.filter((res) => res.parsedYear === selectedYear);

    setSortedResources([...sorted]);
  }, [resources, sortOption, selectedYear]);

  return {
    sortedResources,
    sortOption,
    setSortOption,
    selectedYear,
    setSelectedYear,
    availableYears,
  };
};
