import { useEffect, useState } from "react";
import { TechnicalTest } from "../types/TechnicalTest";

const useTechnicalTests = () => {
  const [technicalTests, setTechnicalTests] = useState<TechnicalTest[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";
  const API_URL_TECHNICAL_TESTS = `${API_URL}technical-tests`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(API_URL_TECHNICAL_TESTS);
        if (!response.ok) {
          throw new Error("Failed to fetch technical tests");
        }
        const data = await response.json();
        setTechnicalTests(data.data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err);
          console.error(err.message);
        } else {
          setError(new Error("An unknown error occurred"));
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  return { technicalTests, isLoading, error };
};

export default useTechnicalTests;
