import { useEffect, useState } from "react";
import { fetchTechnicalTests } from "../api/endPointTechnicalTests";
import { TechnicalTest } from "../types/TechnicalTest";

const useTechnicalTests = () => {
  const [technicalTests, setTechnicalTests] = useState<TechnicalTest[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchTechnicalTests();
        console.log("Fetched technical tests:", data);
        if (!data) throw new Error("No data received");
        setTechnicalTests(data);
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
