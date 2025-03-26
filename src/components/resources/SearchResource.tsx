import { FC } from "react";
import searchIcon from "../../assets/svg/search.svg";

interface SearchResourceProps {
  children: React.ReactNode;
}

export const SearchIcon: FC = () => {
  return (
    <svg
      xmlns={searchIcon}
      className="h-5 w-5"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M12.9 14.32a8 8 0 111.42-1.42l4.83 4.83a1 1 0 01-1.42 1.42l-4.83-4.83zM8 14a6 6 0 100-12 6 6 0 000 12z"
        clipRule="evenodd"
      />
    </svg>
  );
};
const SearchResource: FC<SearchResourceProps> = ({ children }) => {
  return (
    <article className="relative inline-flex cursor-pointer">
      <input
        type="search"
        placeholder="Buscar recurso"
        className="bg-white pl-10 pr-4 py-2 border border-white font-semibold text-base rounded-lg
                   focus:outline-none focus:ring-2 focus:ring-[#808080]"
      />
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#808080]">
        {children}
      </div>
    </article>
  );
};

export default SearchResource;
