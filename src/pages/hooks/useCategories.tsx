import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";

export const useCategories = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const redirectTo = (category: string) => {
    navigate(`/resources/${category}`);
  };
  useEffect(() => {
    if (!category) {
      navigate(`/resources`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, redirectTo]);

  return { category, redirectTo };
}