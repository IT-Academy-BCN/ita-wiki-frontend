import { Link, useLocation, useNavigate, useSearchParams } from "react-router";
import classNames from "classnames";
import SearchComponent from "./header/SearchComponent";
import { useState } from "react";
import BookMarkList from "../resources/bookmarks/BookMarkList";
import { useResources } from "../../context/ResourcesContext";
import { Bookmark, PenSquare } from "lucide-react";

type AsideItem = {
  icon: string;
  label: string;
};

type AsideComponentProps = {
  asideContent: AsideItem[];
};

const AsideComponent: React.FC<AsideComponentProps> = ({ asideContent }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [resource] = useState("");
  const isSearchDisabled = location.pathname === "/";
  const { resources } = useResources();

  const handleSearch = (query: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("search", query);
    navigate(`?${params.toString()}`);
  };

  return (
    <aside className="flex flex-col p-6 lg:w-56">
      <div className="space-y-3 py-3">
        <SearchComponent
          onSearch={handleSearch}
          disabled={isSearchDisabled}
          resetTrigger={resource}
        />
      </div>
      <section>
        <p className="space-y-3 py-6 font-bold text-lg">Categorias</p>
        <ul className="space-y-6">
          {asideContent.map((item, index) => {
            const path = `/resources/${item.label}`;
            const isActive =
              currentPath === `/resources/${encodeURIComponent(item.label)}`;

            return (
              <li key={index} className="flex items-center space-x-3 ">
                <img src={item.icon} alt={item.label} className="w-6 h-6" />
                <Link
                  to={path}
                  className={classNames("transition-colors", {
                    "!text-[var(--color-primary)] !font-bold": isActive,
                    "text-gray-700 ": !isActive,
                  })}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="pt-6">
        <p className="pb-3 font-bold text-lg">Mis recursos</p>

        <div className="flex items-center gap-2 py-1 text-gray-500">
          <Bookmark size={25} />
          <span>Guardados</span>
        </div>

        <p className="flex items-center gap-2 py-1 text-gray-500">
          <PenSquare size={25} />
          <span>Creados</span>
        </p>

        <div className="py-1">
          <BookMarkList resources={resources} />
        </div>
      </section>
    </aside>
  );
};

export default AsideComponent;
