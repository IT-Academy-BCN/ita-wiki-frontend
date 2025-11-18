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
        className={`flex items-center gap-1 transition-colors duration-200 cursor-pointer ${
          sortOption === "likes" ? "font-bold text-black" : "text-gray-500"
        }`}
      >
        <span>Votos</span>
        <span className="flex w-4 justify-center">
          {sortOption === "likes" && <ArrowDown size={16} strokeWidth={3} />}
        </span>
      </button>

      <button
        onClick={() => setSortOption("recent")}
        className={`flex items-center gap-1 transition-colors duration-200 cursor-pointer ${
          sortOption === "recent" ? "font-bold text-black" : "text-gray-500"
        }`}
      >
        <span>Data</span>
        <span className="flex w-4 justify-center">
          {sortOption === "recent" && <ArrowDown size={16} strokeWidth={3} />}
        </span>
      </button>
    </div>
  );
};

export default SortButton;
