import { useState, useEffect } from "react";
import { fetchTechnicalTestById } from "../api/endPointTechnicalTests";
import type { TechnicalTest } from "../types/TechnicalTest";

const useTechnicalTestPage = (projectId: string | null) => {
  const [technicalTest, setTechnicalTest] = useState<TechnicalTest | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data: TechnicalTest = await fetchTechnicalTestById(
          Number(projectId),
        );
        if (!data) throw new Error("No data received");
        setTechnicalTest(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (projectId) {
      fetchData();
    }
  }, [projectId]);

  return { technicalTest, isLoading };
};

export default useTechnicalTestPage;
