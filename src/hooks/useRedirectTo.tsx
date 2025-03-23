import { useNavigate } from "react-router";

export const useRedirectTo = () => {
  const navigate = useNavigate();
  const goTo = (url: string) => {
    navigate(url);
  };
  return {
    goTo,
  };
};
