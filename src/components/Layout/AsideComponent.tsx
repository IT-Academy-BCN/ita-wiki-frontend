import { useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router";
import { SVGProps, FC } from "react";
import classNames from "classnames";
import { Bookmark, PenSquare } from "lucide-react";
import { useUserContext } from "../../context/UserContext";
import SearchComponent from "./header/SearchComponent";
import ButtonComponent from "../atoms/ButtonComponent";

type SvgIcon = FC<SVGProps<SVGSVGElement>>;
type AsideItem = {
  icon: SvgIcon;
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
  const { user } = useUserContext();

  const handleSearch = (query: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("search", query);
    navigate(`?${params.toString()}`);
  };

  const goToResourcesPage = () => {
    navigate("/resources/add");
  };

  const isPathActive = (path: string) => {
    return currentPath === path;
  };

  return (
    <aside className="flex flex-col px-6 lg:w-56">
      <SearchComponent
        onSearch={handleSearch}
        disabled={isSearchDisabled}
        resetTrigger={resource}
      />

      <section>
        <p className="space-y-3 py-6 font-bold text-lg">Categorias</p>
        <ul className="space-y-6">
          {asideContent.map((item, index) => {
            const path = `/resources/${encodeURIComponent(item.label)}`;
            const isActive = isPathActive(path);
            const IconComponent = item.icon as unknown as React.FC<
              React.SVGProps<SVGSVGElement>
            >;
            return (
              <li key={index} className="flex items-center space-x-3">
                <IconComponent
                  className={classNames("w-6 h-6", {
                    "text-[var(--color-primary)]": isActive,
                    "text-gray-500": !isActive,
                  })}
                />

                <Link
                  to={path}
                  className={classNames("transition-colors", {
                    "!text-[var(--color-primary)] !font-bold": isActive,
                    "text-gray-700": !isActive,
                  })}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      {user && (
        <>
          <section className="py-6">
            <p className="pb-3 font-bold text-lg">Mis recursos</p>

            <div className="flex items-center space-x-3 py-1">
              <Bookmark size={25} />
              <Link
                to="/resources/bookmarks"
                className={classNames("transition-colors", {
                  "!text-[var(--color-primary)] !font-bold": isPathActive(
                    "/resources/bookmarks",
                  ),
                  "text-gray-700": !isPathActive("/resources/bookmarks"),
                })}
              >
                Guardados
              </Link>
            </div>

            <div className="flex items-center space-x-3 py-1">
              <PenSquare size={25} />
              <Link
                to="/resources/my-resources"
                className={classNames("transition-colors", {
                  "!text-[var(--color-primary)] !font-bold": isPathActive(
                    "/resources/my-resources",
                  ),
                  "text-gray-700": !isPathActive("/resources/my-resources"),
                })}
              >
                Creados
              </Link>
            </div>
          </section>
          <section>
            <ButtonComponent
              type="button"
              variant="primary"
              onClick={goToResourcesPage}
            >
              Crear recurso
            </ButtonComponent>
          </section>
        </>
      )}
    </aside>
  );
};

export default AsideComponent;
