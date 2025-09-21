import { SortOption } from "../../types";
import { ArrowDown } from "lucide-react";

interface SortButtonProps {
  setSortOption: (option: SortOption) => void;
  sortOption: SortOption;
}

const SortButton: React.FC<SortButtonProps> = ({
  setSortOption,
  sortOption,
}) => {
  return (
    <div className="flex gap-4">
      <button
        onClick={() => setSortOption("likes")}
        className={`flex items-center gap-1 transition-colors duration-200 ${
          sortOption === "likes" ? "font-bold text-black" : "text-gray-500"
        }`}
      >
        Votos
        {sortOption === "likes" && <ArrowDown size={16} strokeWidth={3} />}
      </button>

      <button
        onClick={() => setSortOption("recent")}
        className={`flex items-center gap-1 transition-colors duration-200 ${
          sortOption === "recent" ? "font-bold text-black" : "text-gray-500"
        }`}
      >
        Fecha
        {sortOption === "recent" && <ChevronDown size={16} />}
      </button>
    </div>
  );
};

export default SortButton;
