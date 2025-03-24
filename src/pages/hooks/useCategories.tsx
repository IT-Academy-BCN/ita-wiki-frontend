import { useEffect } from "react";
import { useParams } from "react-router";

export const useCategories = () => {
  const { category } = useParams();


  useEffect(() => {

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  return { category };
}