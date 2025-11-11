import { FC } from "react";
import { useState, useEffect } from "react";
import searchIcon from "../../../assets/search.svg";

interface SearchComponentProps {
  onSearch: (query: string) => void;
  resetTrigger?: string;
}

const SearchComponent: FC<SearchComponentProps> = ({
  onSearch,
  resetTrigger,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  useEffect(() => {
    setSearchTerm("");
  }, [resetTrigger]);

  return (
    <div className="relative mr-4">
      <input
        type="text"
        placeholder="Cerca recurs"
        className="max-w-[200px] bg-white pl-10 pr-4 py-2 border border-gray-300 font-semibold text-base rounded-[12px]
                   focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
        value={searchTerm}
        onChange={handleChange}
      />
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
        <img src={searchIcon} alt="Cerca" className="h-5 w-5 text-gray-500" />
      </div>
    </div>
  );
};

export default SearchComponent;
