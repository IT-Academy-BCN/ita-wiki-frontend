import { FC } from "react";
import UiButton from "../ui/shared-ui/UiButton";

interface FilterButtonProps {
  setShowFilters: (value: boolean) => void;
  showFilters: boolean;
}

const FilterButton: FC<FilterButtonProps> = ({
  setShowFilters,
  showFilters,
}) => {
  return (
    <UiButton
      onClick={() => setShowFilters(!showFilters)}
      variant="primary"
      size="md"
      className="sm:hidden flex items-center gap-2"
    >
      <span>Filtrar</span>
      {showFilters ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      )}
    </UiButton>
  );
};

export default FilterButton;
