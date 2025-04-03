import { Link, useLocation, useNavigate, useSearchParams } from "react-router";
import classNames from "classnames";
import SearchComponent from "./header/SearchComponent";
import { useState } from "react";
import BookMarkList from "../resources/bookmarks/BookMarkList";
import { useResources } from "../../context/ResourcesContext";

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
    <aside className="flex flex-col p-3 lg:w-56">
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
                    "!text-[#b91879] !font-bold": isActive,
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
      <section>
        <p className="space-y-6 pt-6 pb-3 font-bold text-lg">Mis recursos</p>
        <p className="space-y-6 py-1 ">Guardados</p>
        <p className="space-y-6 py-1 ">Creados</p>
        <p className="space-y-6 py-1 ">
          <BookMarkList resources={resources} />
        </p>
      </section>
    </aside>
  );
};

export default AsideComponent;
