import { FC } from "react";

interface FilterButtonProps {
  setShowFilters: (value: boolean) => void;
  showFilters: boolean;
}

const FilterButton: FC<FilterButtonProps> = ({
  setShowFilters,
  showFilters,
}) => {
  return (
    <button
      className="sm:hidden bg-[#B91879] text-white px-4 py-2 rounded-md flex items-center gap-2"
      onClick={() => setShowFilters(!showFilters)}
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
    </button>
  );
};

export default FilterButton;
